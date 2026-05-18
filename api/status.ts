import Pusher from 'pusher'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed')
  }

  // Security Check: Verify Admin Secret
  const authHeader = req.headers['x-admin-secret']
  if (!process.env.ADMIN_SECRET || authHeader !== process.env.ADMIN_SECRET) {
    console.warn('Unauthorized access attempt to /api/status')
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const { metric, value } = req.body
    
    if (!metric || !value) {
      return res.status(400).json({ error: 'Metric and value are required' })
    }
    
    await pusher.trigger('system-pulse', 'system-update', {
      metric,
      value,
      timestamp: new Date().toISOString()
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Pusher Error:', error)
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' })
  }
}
