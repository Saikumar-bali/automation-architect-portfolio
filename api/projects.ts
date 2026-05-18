import { query } from '../src/lib/neon.js'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed')
  }

  try {
    const projects = await query(
      'SELECT * FROM "Project" ORDER BY featured DESC NULLS LAST, title ASC'
    )
    return res.status(200).json(projects)
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' })
  }
}
