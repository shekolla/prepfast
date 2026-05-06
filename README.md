# InterviewPrep

[![CI](https://github.com/shekolla/one-hour-prep/actions/workflows/ci.yml/badge.svg)](https://github.com/shekolla/one-hour-prep/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Revise any tech topic in under 1 hour. High-signal content for mid to senior engineers.

A fast, static revision platform built for engineers cramming before technical interviews. No login, no fluff — just structured content designed for rapid recall.

**14 topics. 399 concepts. Memory anchors. Depth levels. Knowledge trees. Compression Mode. Active Recall flashcards (SM-2). Side-by-side Compare. PWA-installable. A compressed "Last 1 Hour" cheatsheet mode.**

---

## Topics

| Topic | Concepts | Level | Tag |
|---|---|---|---|
| Python | 25 | Mid–Senior | Backend |
| JavaScript | 28 | Mid–Senior | Frontend / Fullstack |
| Node.js | 29 | Mid–Senior | Backend |
| Java | 30 | Mid–Senior | Backend |
| Kubernetes & Docker | 25 | Mid–Senior | DevOps |
| DSA | 29 | Mid–Senior | Coding Interview |
| System Design | 32 | Senior | Architecture |
| High-Level Design | 31 | Senior | Architecture |
| Low-Level Design | 29 | Mid–Senior | OOP / Patterns |
| Databases | 29 | Mid–Senior | Data |
| React | 30 | Mid–Senior | Frontend |
| AWS & Cloud | 24 | Mid–Senior | Cloud / DevOps |
| SQL Deep Dive | 26 | Mid–Senior | Data |
| AI Coding Agents | 32 | Mid–Senior | AI / Agents |

---

## Features

- **Depth Levels** — Basic (green), Expected (yellow), Deep (red). Filter to your comfort level.
- **Memory Anchors** — Vivid analogies on every concept for instant memorization ("GIL = dogs on one leash").
- **Interview Answer Mode** — Toggle to see a ready-made answer for each concept.
- **Trap Mode** — Reveal common interview traps and gotchas per concept.
- **Knowledge Tree** — Visual diagram of every concept organized by category with importance levels.
- **Compression Mode** (`/compress`) — "If you only had a few KB of memory, what would you keep?" Pick a topic, pick a budget (Seed ~2 KB · Cheatsheet ~6 KB · Full ~15 KB) and see what survives. Live UTF-8 byte counts.
- **Active Recall** (`/recall`) — Flashcards auto-generated from every concept (anchor → title, title → anchor, spot-the-trap). Simplified SM-2 spaced repetition, streak tracking, keyboard-first (space to flip, 1/2/3 to rate). Everything in localStorage — zero backend.
- **Compare** (`/compare`) — Side-by-side any two concepts, same-topic or cross-topic. Six aligned rows (anchor, basic, expected, deep, interview answer, trap). Deep-linkable URLs for easy sharing.
- **Per-concept canonical pages** — Every concept has its own SEO-friendly URL at `/topics/{slug}/{conceptId}/` with JSON-LD Article + Breadcrumb + Q&A schema. 399 indexable pages, generated at build time.
- **Share cards** — Zero-dep Canvas-rendered PNG exports on Compress and Compare pages. Tweet buttons with pre-filled text. Web Share API on mobile.
- **Keyboard shortcuts** — `g h` home, `g r` recall, `g c` compare, `g s` compress. `?` opens a shortcut cheatsheet. Disabled while typing.
- **Personalized home** — "How it works" 3-step strip for cold visitors. "Welcome back" continue card with streak and review stats for returning users.
- **Last 1 Hour Mode** — Compressed cheatsheet with key takeaways, must-know one-liners, and top traps.
- **Global Search** — Cmd+K search across all 399 concepts, available on every page.
- **Progress Tracking** — Mark concepts as reviewed with checkboxes, see per-topic progress bar.
- **Practice Questions** — Code scenarios with toggleable answers.
- **Interview Patterns** — Real interview questions with model answers, "why asked" context, and traps.
- **Common Mistakes** — Wrong vs correct pairs for quick review.
- **Print Mode** — Print-friendly styles for cheatsheet printing.

---

## Running locally

### With Node.js

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (static export to ./out)
```

Node 20+ required.

### With Docker

```bash
# Development (hot reload)
docker compose up dev          # http://localhost:3000

# Production (nginx)
docker compose up prod         # http://localhost:8080

# Static export (writes to ./out)
docker compose run --rm export
```

---

## Deployment

### Vercel (recommended — free)

Push to GitHub and connect to [vercel.com](https://vercel.com). Zero config needed.

### Any static host

```bash
npm run build
# Upload the ./out directory to S3, Cloudflare Pages, Netlify, etc.
```

### Docker

```bash
docker compose up prod    # nginx on port 8080
```

All pages are pre-rendered as static HTML at build time — no server required.

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Static export, great SEO |
| Styling | Tailwind CSS v4 | Zero runtime, fast iteration |
| Language | TypeScript | Content is typed, no runtime surprises |
| Content | Static `.ts` files | No database, no cost, version-controlled |
| Deployment | Docker (nginx) or any static host | `output: "export"` produces plain HTML/CSS/JS |

---

## Adding a new topic

1. Create `content/<topic>/data.ts` — export `topicData: TopicData` following types in `content/types.ts`
2. Add to imports + topic list in `content/conceptsIndex.ts`, `content/searchIndex.ts`, `content/compressData.ts`, `content/topicsManifest.ts`
3. Add SEO `title` + `description` to `topicSeoBySlug` in `content/conceptsIndex.ts`
4. Add to `topics[]` array in `app/page.tsx`
5. Update stats counts in `app/page.tsx`, `app/layout.tsx`, `components/GlobalSearch.tsx`

Routing is fully dynamic — `app/topics/[slug]/page.tsx` and `[slug]/[conceptId]/page.tsx` pre-render every URL at build time. The sitemap (`app/sitemap.ts`) auto-emits new topics. No per-topic directory needed.

See `CONTRIBUTING.md` for content quality bar and PR expectations.
