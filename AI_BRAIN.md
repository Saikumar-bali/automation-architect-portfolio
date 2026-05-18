# AI BRAIN - Portfolio Website

## Project Overview
A modern portfolio website built with Vite, React (TypeScript), Shadcn UI, and Tailwind CSS. The backend uses Vercel Serverless Functions with Prisma and Neon Database.

## Current Project State
- [x] `GEMINI.md` configured with Automation Architect mandates.
- [x] `AI_BRAIN.md` fully synchronized.
- [x] Project structure setup (Vite + React TS).
- [x] UI Scaffolding (Phase 1): Terminal-Glassmorphism UI implemented.
- [x] Backend setup (Phase 2): Vercel Functions + Prisma + Neon DB + Pusher.
- [x] Case Studies (Phase 3): Technical Deep Dive features active (35 unique repositories).
- [x] UI/UX Refinement (Phase 4): Live Data Streams and System Pulse added.
- [x] Public Deployment (Phase 5): Repository initialized and code pushed to GitHub.
- [x] Advanced Case Studies (Phase 6): Dynamic detail pages implemented (Issue #1).
- [x] Site-wide Search (Phase 7): Global Command Palette with URL sync and inline results (Issue #2).
- [x] Advanced Analytics (Phase 8): Session-based project view tracking, referrer capture, and high-fidelity Analytics Dashboard implemented.

## Recent Significant Changes
- **2026-05-18:** Implemented Advanced Analytics foundation:
    - Updated `prisma/schema.prisma` with `ProjectView` enhancements and new `DailyViewStats`, `ViewSession` models.
    - Synchronized Neon Database using `npx prisma db push`.
    - Enhanced `/api/project-view` to capture session IDs (via cookies), device types, browsers, referrers, and unique view detection.
    - Created `src/pages/Analytics.tsx` with a high-fidelity Glassmorphism dashboard UI.
    - Added `/analytics` route to `App.tsx`.
- **2026-05-16:** Upgraded "Android Messaging — SMS Automation Engine" case study with Kotlin Native Module details, APK download link, and screenshot gallery. Synchronized the live database via Vercel build pipeline.
- **2026-05-16:** Corrected Movie Mandir project technical details: switched from Expo to React Native CLI with native core integration. Updated `prisma/seed.ts` and the homepage "About" section to reflect this high-performance architecture.
- **2026-05-16:** Updated professional titles across the website (`Home.tsx` and `SEO.tsx`) to reflect higher-impact roles: Automation Architect, Systems Engineer, and Quantitative Developer.
- **2026-05-16:** Added deployed `liveUrl` values and screenshot mappings for `news-website` (Telugu News Aggregator) and `sharp-computers` using the new public asset folders so both case-study pages can show live links and gallery images.
- **2026-05-16:** Wired newly added public screenshot assets into project records for AAGAM, ReelGenius AI, CineVerse, JY Defence Academy, Vaji News, Paatala Pustakam Studio, Patala Pustakam Bookstore, and HippoClouds Website so project detail galleries can render the new images.
- **2026-05-16:** Added `https://vaji-news.vercel.app/login` as the deployed `liveUrl` for the `vaji-news` project in `prisma/seed.ts`, matching the portfolio homepage/detail live-link behavior.
- **2026-05-16:** Added missing deployed `liveUrl` entries for ReelGenius AI, Paatala Pustakam Studio, Paatala Pustakam Bookstore, HippoClouds Website, CineVerse, Vaji One, JY Defence Academy, and Bill Tracker in `prisma/seed.ts` so homepage cards and project detail pages can surface the live links consistently.
- **2026-05-16:** Resolved `npx vercel dev` errors caused by broad SPA rewrites intercepting Vite's internal modules (/@*) and source files. Optimized `vercel.json` with a surgical regex that excludes assets, source files, and Vite internals from the SPA fallback.
- **2026-05-14:** Implemented global `SearchContext` and site-wide `CommandPalette` triggered by `/` or `Ctrl+K`.
- **2026-05-14:** Integrated URL parameter synchronization for search queries and technology filters.
- **2026-05-14:** Enhanced `Home.tsx` to consume global search state, enabling seamless navigation from search results.
- **2026-05-12:** Implemented dynamic routing with `react-router-dom` and created dedicated `ProjectDetail` page.

## Active Tasks
- [x] Finalize production deployment to Vercel.
- [x] Implement advanced analytics for project views.

## Architectural Notes
- Backend: `/api` directory for Vercel Serverless Functions.
- Real-time: Pusher for live chat.
- Styling: Tailwind CSS + Shadcn UI components.
