import { query } from '../src/lib/neon'

async function main() {
  // Create the ProjectView table
  await query(`
    CREATE TABLE IF NOT EXISTS "ProjectView" (
      "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
      "projectId" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "viewedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      "viewerIp" TEXT,
      "userAgent" TEXT
    )
  `)
  console.log('Created ProjectView table')

  // Add viewCount column to Project table
  await query(`
    ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS "viewCount" INTEGER NOT NULL DEFAULT 0
  `)
  console.log('Added viewCount column to Project table')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })