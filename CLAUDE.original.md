# InterviewPrep — Project Context

## What This Is
A free, open-source interview revision platform for mid-to-senior software engineers. Built with Next.js 16 (App Router, static export), TypeScript, and Tailwind CSS 4. Dark theme only.

## Tech Stack
- **Framework**: Next.js 16 with `output: "export"` (fully static, no server)
- **Styling**: Tailwind CSS 4 (dark theme)
- **Deployment**: Vercel (free tier) or Docker (multi-stage: node builder → nginx)
- **State**: localStorage only (no backend, no auth, no database)

## Architecture

### Content Structure
Each topic lives in `content/{slug}/data.ts` and exports `topicData: TopicData`.

**13 topics**: python, javascript, nodejs, java, kubernetes, dsa, system-design, hld, lld, databases, react, aws, sql

Each topic contains:
- `mentalModel` — what/why/when/where-it-fails
- `categories[]` — groupings for concepts
- `mentalModelTree` — TreeNode hierarchy for visual knowledge tree
- `concepts[]` — the core content (367 total), each with:
  - `basic` / `expected` / `deep` — 3 depth levels
  - `interviewAnswer` — ready-to-speak answer
  - `trap` — common misconception
  - `memoryAnchor` — vivid analogy for memorization
- `interviewPatterns[]` (104 total), `commonMistakes[]` (157 total), `practiceQuestions[]`
- `lastHourConceptIds[]` — subset for compressed revision mode
- `lastHourSummary` — key takeaways, must-know concepts, top traps

### Key Components
- `TopicPageLayout` — main orchestrator (depth filter, section nav, back-to-top, scroll feedback, progress bar)
- `ConceptCard` — renders concept with depth levels, memory anchor, interview answer, trap, review checkbox
- `KnowledgeTreeVisual` — interactive tree visualization
- `DepthFilter` — toolbar with depth, traps, memory anchors, last-1-hour toggles
- `GlobalSearch` — Cmd+K search across all 367 concepts (home page + topic pages)
- `PracticeCard` — code challenge with reveal answer
- `CompressedTopic` — renders one topic at a chosen memory-budget tier, with live byte counts

### Search
`content/searchIndex.ts` builds a flat index from all 13 topics. `components/GlobalSearch.tsx` provides real-time search with ranked results.

### Compression Mode (`/compress`)
Dedicated page that answers "if I only had a few KB of memory, what would I keep?". `content/compressData.ts` builds a `CompressedTopic` per topic by walking `mentalModelTree` to pull importance and joining with `concepts[]`. Three tiers: **Seed** (critical anchors + top 3 traps, ~2–4 KB per topic), **Cheatsheet** (+ high-importance + key takeaways + one-liners, ~5–7 KB), **Full recall** (+ interview answers, ~10–15 KB). Byte sizes computed with `TextEncoder` so the displayed count is real UTF-8 bytes. `app/compress/CompressClient.tsx` has the topic picker + tier selector. Every critical concept across all 13 topics has a `memoryAnchor` — no fallbacks trigger at seed tier.

### Active Recall (`/recall`)
Flashcards auto-generated from `memoryAnchor` + `trap` fields on every concept. Three card kinds per concept: **anchor → concept** (reveal the title from the analogy), **concept → anchor** (reverse), **spot the trap** (given a concept, name its common misconception). `content/recallData.ts` builds all cards once; `conceptsIndex.ts` resolves importance from `mentalModelTree`. SRS scheduler is a simplified **SM-2**: three ratings (Again/Good/Easy, keys 1/2/3) update `ef` (ease factor), `interval` (days), `reps`, `lapses`, `due` (epoch ms). State persists in `localStorage` under `recall:state:${cardId}`; session stats (streak, total reviews) under `recall:stats`. Decks = each topic + "Due today" + "All critical". `buildSessionQueue` returns due cards (earliest first) + up to 15 new per session, capped at 40 cards. `RecallSession` is keyboard-first: space/enter to flip, 1/2/3 to rate, ⌘U to undo.

### Compare (`/compare`)
Side-by-side comparison of any two concepts (same-topic or cross-topic). Deep-linkable via `/compare/?a=topic:conceptId&b=topic:conceptId` — URL kept in sync with pickers via `router.replace`. Six aligned rows: memory anchor, basic, expected, deep, interview answer, trap. `ConceptPicker` component uses `searchConcepts` from `conceptsIndex.ts` — starts-with > contains > blob-contains scoring. Empty state shows curated suggestion pairs (Postgres vs Mongo, threading vs multiprocessing, etc.). "Copy link" + "Download image" + "Tweet" buttons when both sides chosen. No new content — everything derives from existing `concepts[]`.

### Per-concept SEO pages (`/topics/{slug}/{conceptId}/`)
Each of 367 concepts has its own canonical page. Built via `app/topics/[slug]/[conceptId]/page.tsx` with `generateStaticParams` enumerating all pairs from `conceptsIndex::allConcepts`. The body component is `components/ConceptDetailPage.tsx` — breadcrumb, H1 + importance pill + category, memory anchor highlight, Expected/Deep/Interview/Trap blocks, related concepts (via `findRelatedConcepts`: explicit `TreeNode.relatedIds` + cross-topic token matches), CTAs back to topic + to Compare. `generateMetadata` outputs concept-specific `<title>`, `<description>` (first sentence of `basic`, truncated to 155 chars), and canonical. JSON-LD via `components/StructuredData.tsx` emits `Article` + `BreadcrumbList` + `QAPage` (Question = "What is X in Topic?", Answer = `interviewAnswer`).

### Dynamic sitemap (`app/sitemap.ts`)
Replaces the old `public/sitemap.xml`. Emits ~384 URLs: home, three feature pages, 13 topics, 367 concepts — each with `lastModified` derived from `topicData.lastUpdated`. Must have `export const dynamic = "force-static"` for compatibility with `output: "export"`.

### Share cards (`components/ShareCard.tsx`)
Zero-dep Canvas API renderer — 1200×630 editorial-minimalist layout. Two presets: `compress` ("I fit {Topic} in X KB" + up to 3 anchors) and `compare` ("A vs B" with color-coded columns). Uses UI-sans-serif system fonts (no font loading needed). Exposes `generateSharePng`, `downloadBlob`, `tryNativeShare` (Web Share API with `canShare` guard), and `buildTweetUrl`. Wired into `/compress` (single Download/Tweet bar under the compressed content) and `/compare` (Copy link + Download + Tweet buttons when both concepts chosen).

### Keyboard shortcuts (`components/ShortcutsProvider.tsx`)
Mounted once in `app/layout.tsx`. Listens for `g` then a letter within 1s (`gh` home, `gr` recall, `gc` compare, `gs` compress, `gt` topics/home). `?` or `Shift+/` toggles a shortcut-cheatsheet modal. `Esc` closes overlay. Disabled while typing in inputs. Visual "g… waiting" pill floats bottom-center while armed.

### Home personalization (`components/ContinueCard.tsx`)
Reads `recall:stats`, `prepfast:last-topic`, and `reviewed:*` keys from localStorage. Renders nothing on first visit (no activity) — otherwise a "Welcome back" card with streak, reviewed-card count, concepts-checked count, and a primary CTA to continue the last studied topic (or `/recall` if none). Home page also has a "How it works" 3-step strip (Compress → Recall → Compare) inserted between search and the mode badges.

### Adding a New Topic
1. Create `content/{slug}/data.ts` exporting `topicData: TopicData`
2. Add the import + slug entry to the `TOPICS` array in `content/conceptsIndex.ts`, `content/searchIndex.ts`, and `content/compressData.ts`
3. Add SEO `title` + `description` to `topicSeoBySlug` in `content/conceptsIndex.ts`
4. Add to `topics[]` array in `app/page.tsx`
5. Update stats on home page if counts changed

Routing is fully dynamic — no per-topic `app/topics/{slug}/` directory needed. `app/topics/[slug]/page.tsx` and `app/topics/[slug]/[conceptId]/page.tsx` pre-render all topic + concept URLs at build time via `generateStaticParams`. The sitemap (`app/sitemap.ts`) also picks up new topics automatically.

## Features Implemented
- 3 depth levels (basic/expected/deep) with color-coded cards
- Memory anchors (vivid analogies) on every concept with filter toggle
- Interview answer toggle per concept
- Trap/misconception warnings
- Last 1 Hour compressed revision mode with distinct visual cheatsheet
- **Compression Mode** (`/compress`) — "store Python in 2 KB" view with Seed / Cheatsheet / Full-recall tiers and live byte counters
- **Active Recall** (`/recall`) — Flashcards (anchor, title, trap) with SM-2 spaced repetition; keyboard-first; localStorage only
- **Compare** (`/compare`) — Side-by-side of any two concepts with deep-linkable URLs; six aligned rows
- **Per-concept SEO pages** — 367 canonical URLs at `/topics/{slug}/{conceptId}/` with Article + Breadcrumb + QAPage JSON-LD
- **Dynamic sitemap** — `app/sitemap.ts` emits all 384 URLs at build time
- **Share cards** — Canvas-rendered 1200×630 PNG exports on `/compress` and `/compare`; Web Share API on mobile, download + tweet fallback
- **Keyboard shortcuts** — `?` overlay + `g h/r/c/s/t` nav + existing Cmd+K search and Recall 1/2/3 ratings
- **Personalized home** — "How it works" 3-step strip + "Welcome back" continue card with streak and review counts
- Knowledge tree visual navigation
- Global search (Cmd+K) across all concepts — available on home + topic pages
- Progress tracking (localStorage checkboxes per concept + per-topic progress bar)
- Back-to-top button, scroll feedback on tree click
- Print styles for cheatsheet printing
- SEO (favicon, OG image PNG, robots.txt, sitemap.xml, meta tags)
- Accessibility (ARIA labels, focus-visible, touch targets, semantic HTML)
- Content freshness indicator (lastUpdated per topic)
- Custom 404 page

## Content Quality Notes
- All content was accuracy-reviewed and corrected
- All `lastHourConceptIds` verified against actual concept IDs
- All category IDs verified as used by concepts
- Stats on home page are accurate counts from data files
