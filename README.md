# Saikumar Bali — Portfolio Website

High-performance portfolio platform showcasing expertise in **AI Integration**, **Automation Engineering**, and **Full Stack Development**.

[![System Status](https://img.shields.io/badge/System-Operational-10b981?style=for-the-badge)](https://portfolio-website-gamma-blue.vercel.app/)

**Live URL:** [https://portfolio-website-gamma-blue.vercel.app/](https://portfolio-website-gamma-blue.vercel.app/)

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | Vite + React 19 + TypeScript + Framer Motion |
| Styling | Tailwind CSS v4 |
| Backend | Vercel Serverless Functions (Node.js/TypeScript) |
| Database | Prisma ORM + Neon PostgreSQL |
| Real-time | Pusher.io (Live ticker / system pulse) |
| ORM | Prisma (schema) + raw Neon queries (API) |

---

## Local Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
The `.env.local` file is already included with credentials.

### 3. Push DB schema
```bash
npx prisma db push
```

### 4. Seed the database (all 20 projects)
```bash
npx prisma db seed
```

### 5. Start dev server (Vercel dev for API + Vite)
```bash
npx vercel dev
```
> The Vite proxy in `vite.config.ts` forwards `/api` requests to `localhost:3000` where Vercel dev runs the serverless functions.

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/projects` | All projects (featured first) |
| GET | `/api/project?slug=xyz` | Single project by slug |
| POST | `/api/project-view` | Track project view + increment viewCount |
| POST | `/api/status` | Broadcast metric via Pusher (admin only) |
| POST | `/api/leads` | Submit contact form lead |

---

## Deployment (Vercel)

```bash
npx vercel --prod
```

The `vercel.json` rewrites handle:
- `/api/*` → serverless functions
- `/*` → `index.html` (SPA fallback)

---

## Adding a New Project

1. Add an entry to `prisma/seed.ts`
2. Run `npx prisma db seed`
3. The project appears automatically in the UI

---

## Project Structure

```
portfolio/
├── api/              # Vercel Serverless Functions
│   ├── projects.ts   # GET all projects
│   ├── project.ts    # GET single project by slug
│   ├── project-view.ts # POST track view
│   ├── status.ts     # POST broadcast Pusher metric
│   └── leads.ts      # POST contact form
├── prisma/
│   ├── schema.prisma # DB schema (Project, ProjectView, Metric, Lead)
│   └── seed.ts       # All 20 projects with full deepDive content
├── src/
│   ├── components/   # ProjectCard, TerminalSearch, CommandPalette, SEO
│   ├── context/      # SearchContext (URL-synced search + filter state)
│   ├── lib/          # neon.ts (DB query helper)
│   ├── pages/        # Home.tsx, ProjectDetail.tsx
│   └── test/         # Vitest setup
└── public/           # Screenshots, icons
```
