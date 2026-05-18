import { query } from '../src/lib/neon.js'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { randomUUID } from 'crypto'

function parseUserAgent(userAgent: string | null): { deviceType: string; browser: string } {
  const ua = userAgent ?? ''

  let deviceType = 'desktop'
  if (/mobile/i.test(ua)) deviceType = 'mobile'
  else if (/tablet/i.test(ua)) deviceType = 'tablet'
  else if (/bot|crawler|spider/i.test(ua)) deviceType = 'bot'

  let browser = 'unknown'
  if (/chrome/i.test(ua) && !/edge|edg/i.test(ua)) browser = 'chrome'
  else if (/firefox/i.test(ua)) browser = 'firefox'
  else if (/safari/i.test(ua) && !/chrome|chromium/i.test(ua)) browser = 'safari'
  else if (/edge|edg/i.test(ua)) browser = 'edge'
  else if (/opera|opera mini/i.test(ua)) browser = 'opera'
  else if (/bot|crawler|spider/i.test(ua)) browser = 'bot'

  return { deviceType, browser }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed')
  }

  try {
    const { slug } = req.body

    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ error: 'Slug is required' })
    }

    const [project] = await query<{ id: string }>(
      'SELECT id FROM "Project" WHERE slug = $1 LIMIT 1',
      [slug]
    )

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    const viewerIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? null
    const userAgent = (req.headers['user-agent'] as string) ?? null
    const referrer = (req.headers['referer'] as string) ?? null

    const cookieHeader = req.headers['cookie'] as string ?? ''
    let sessionId: string | null = null
    const sessionMatch = cookieHeader.match(/sessionId=([a-f0-9-]+)/i)
    if (sessionMatch) {
      sessionId = sessionMatch[1]
    } else {
      sessionId = randomUUID()
      res.setHeader('Set-Cookie', `sessionId=${sessionId}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`)
    }

    const { deviceType, browser } = parseUserAgent(userAgent)

    const now = new Date()
    const today = now.toISOString().split('T')[0]

    // Check if unique today for this session
    const [existingView] = await query(
      'SELECT id FROM "ProjectView" WHERE "sessionId" = $1 AND slug = $2 AND "viewedAt" >= $3 LIMIT 1',
      [sessionId, slug, today]
    )
    const isUnique = !existingView

    const viewId = randomUUID()

    await query(
      `INSERT INTO "ProjectView" (id, "projectId", slug, "viewedAt", "viewerIp", "userAgent", referrer, "sessionId", "deviceType", browser, "isUnique")
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [viewId, project.id, slug, now, viewerIp, userAgent, referrer, sessionId, deviceType, browser, isUnique]
    )

    await query(
      `UPDATE "Project" SET "viewCount" = "viewCount" + 1 WHERE id = $1`,
      [project.id]
    )

    await query(
      `INSERT INTO "DailyViewStats" (id, "projectId", date, slug, "totalViews", "uniqueViews", "deviceType")
       VALUES ($1, $2, $3, $4, 1, $5, $6)
       ON CONFLICT ("projectId", date) DO UPDATE SET 
         "totalViews" = "DailyViewStats"."totalViews" + 1,
         "uniqueViews" = "DailyViewStats"."uniqueViews" + $5`,
      [randomUUID(), project.id, today, slug, isUnique ? 1 : 0, deviceType]
    )

    await query(
      `INSERT INTO "ViewSession" (id, "sessionId", "startTime", "endTime", "pageViews", "deviceType", browser)
       VALUES ($1, $2, $3, $4, 1, $5, $6)
       ON CONFLICT ("sessionId") DO UPDATE SET
         "endTime" = EXCLUDED."endTime",
         "pageViews" = "ViewSession"."pageViews" + 1`,
      [randomUUID(), sessionId, now, now, deviceType, browser]
    )

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' })
  }
}
