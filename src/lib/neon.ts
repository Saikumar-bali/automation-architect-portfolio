import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

neonConfig.webSocketConstructor = ws

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set.')
}

const pool = new Pool({ connectionString })

export async function query<T>(text: string, params: unknown[] = []) {
  const result = await pool.query(text, params)
  return result.rows as T[]
}
