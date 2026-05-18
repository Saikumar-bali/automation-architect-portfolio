import { query } from '../src/lib/neon.js'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { randomUUID } from 'crypto'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed')
  }

  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'name, email, and message are required' })
    }

    await query(
      `INSERT INTO "Lead" (id, name, email, message) VALUES ($1, $2, $3, $4)`,
      [randomUUID(), name, email, message]
    )

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' })
  }
}
