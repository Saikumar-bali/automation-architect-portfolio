import { query } from '../src/lib/neon.js'
import type { VercelRequest, VercelResponse } from '@vercel/node'


export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed')
  }

  try {
    const { slug } = req.query

    if (!slug || typeof slug !== 'string') {
      return res.status(404).json({ error: 'Slug parameter is required' })
    }

    const [project] = await query('SELECT * FROM "Project" WHERE slug = $1 LIMIT 1', [slug])

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    return res.status(200).json(project)
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' })
  }
}
