# InterviewPrep — Project Context

## What This Is
Free open-source interview revision platform for mid-to-senior software engineers. Built with Next.js 16 (App Router, static export), TypeScript, Tailwind CSS 4. Dark theme only.

## Tech Stack
- **Framework**: Next.js 16 with `output: "export"` (fully static, no server)
- **Styling**: Tailwind CSS 4 (dark theme)
- **Deployment**: Vercel (free tier) or Docker (multi-stage: node builder → nginx)
- **State**: localStorage only (no backend, no auth, no database)

## Architecture

### Content Structure
Each topic lives in `content/{slug}/data.ts`, exports `topicData: TopicData`.

**13 topics**: python, javascript, nodejs, java, kubernetes, dsa, system-design, hld, lld, databases, react, aws, sql

Each topic contains:
- `mentalModel` — what/why/when/where-it-fails
- `categories[]` — groupings for concepts
- `mentalModelTree` — TreeNode hierarchy for visual knowledge tree
- `concepts[]` — core content (367 total), each with:
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
- `GlobalSearch` — Cmd+K search across all 367 concepts (home + topic pages)
- `PracticeCard` — code challenge with reveal answer
- `CompressedTopic` — renders one topic at chosen memory-budget tier, live byte counts

### Search
`content/searchIndex.ts` builds flat index from all 13 topics. `components/GlobalSearch.tsx` provides real-time search with ranked results.

### Compression Mode (`/compress`)
Page answers "if I only had a few KB of memory, what would I keep?". `content/compressData.ts` builds `CompressedTopic` per topic by walking `mentalModelTree` for importance, joining with `concepts[]`. Three tiers: **Seed** (critical anchors + top 3 traps, ~2–4 KB per topic), **Cheatsheet** (+ high-importance + key takeaways + one-liners, ~5–7 KB), **Full recall** (+ interview answers, ~10–15 KB). Byte sizes computed with `TextEncoder` so count is real UTF-8 bytes. `app/compress/CompressClient.tsx` has topic picker + tier selector. Every critical concept across all 13 topics has `memoryAnchor` — no fallbacks trigger at seed tier.

### Active Recall (`/recall`)
Flashcards auto-generated from `memoryAnchor` + `trap` fields on every concept. Three card kinds per concept: **anchor → concept** (reveal title from analogy), **concept → anchor** (reverse), **spot the trap** (given concept, name common misconception). `content/recallData.ts` builds all cards once; `conceptsIndex.ts` resolves importance from `mentalModelTree`. SRS scheduler = simplified **SM-2**: three ratings (Again/Good/Easy, keys 1/2/3) update `ef` (ease factor), `interval` (days), `reps`, `lapses`, `due` (epoch ms). State persists in `localStorage` under `recall:state:${cardId}`; session stats (streak, total reviews) under `recall:stats`. Decks = each topic + "Due today" + "All critical". `buildSessionQueue` returns due cards (earliest first) + up to 15 new per session, capped at 40 cards. `RecallSession` keyboard-first: space/enter to flip, 1/2/3 to rate, ⌘U to undo.

### Compare (`/compare`)
Side-by-side compare of any two concepts (same-topic or cross-topic). Deep-linkable via `/compare/?a=topic:conceptId&b=topic:conceptId` — URL synced with pickers via `router.replace`. Six aligned rows: memory anchor, basic, expected, deep, interview answer, trap. `ConceptPicker` uses `searchConcepts` from `conceptsIndex.ts` — starts-with > contains > blob-contains scoring. Empty state shows curated suggestion pairs (Postgres vs Mongo, threading vs multiprocessing, etc.). "Copy link" + "Download image" + "Tweet" buttons when both sides chosen. No new content — derives from existing `concepts[]`.

### Per-concept SEO pages (`/topics/{slug}/{conceptId}/`)
Each of 367 concepts has own canonical page. Built via `app/topics/[slug]/[conceptId]/page.tsx` with `generateStaticParams` enumerating all pairs from `conceptsIndex::allConcepts`. Body component = `components/ConceptDetailPage.tsx` — breadcrumb, H1 + importance pill + category, memory anchor highlight, Expected/Deep/Interview/Trap blocks, related concepts (via `findRelatedConcepts`: explicit `TreeNode.relatedIds` + cross-topic token matches), CTAs back to topic + to Compare. `generateMetadata` outputs concept-specific `<title>`, `<description>` (first sentence of `basic`, truncated to 155 chars), and canonical. JSON-LD via `components/StructuredData.tsx` emits `Article` + `BreadcrumbList` + `QAPage` (Question = "What is X in Topic?", Answer = `interviewAnswer`).

### Dynamic sitemap (`app/sitemap.ts`)
Replaces old `public/sitemap.xml`. Emits ~384 URLs: home, three feature pages, 13 topics, 367 concepts — each with `lastModified` from `topicData.lastUpdated`. Must have `export const dynamic = "force-static"` for compatibility with `output: "export"`.

### Share cards (`components/ShareCard.tsx`)
Zero-dep Canvas API renderer — 1200×630 editorial-minimalist layout. Two presets: `compress` ("I fit {Topic} in X KB" + up to 3 anchors) and `compare` ("A vs B" with color-coded columns). Uses UI-sans-serif system fonts (no font loading). Exposes `generateSharePng`, `downloadBlob`, `tryNativeShare` (Web Share API with `canShare` guard), `buildTweetUrl`. Wired into `/compress` (single Download/Tweet bar under compressed content) and `/compare` (Copy link + Download + Tweet buttons when both concepts chosen).

### Keyboard shortcuts (`components/ShortcutsProvider.tsx`)
Mounted once in `app/layout.tsx`. Listens for `g` then letter within 1s (`gh` home, `gr` recall, `gc` compare, `gs` compress, `gt` topics/home). `?` or `Shift+/` toggles shortcut-cheatsheet modal. `Esc` closes overlay. Disabled while typing in inputs. Visual "g… waiting" pill floats bottom-center while armed.

### Home personalization (`components/ContinueCard.tsx`)
Reads `recall:stats`, `prepfast:last-topic`, `reviewed:*` keys from localStorage. Renders nothing on first visit (no activity) — otherwise "Welcome back" card with streak, reviewed-card count, concepts-checked count, primary CTA to continue last studied topic (or `/recall` if none). Home page also has "How it works" 3-step strip (Compress → Recall → Compare) inserted between search and mode badges.

### Adding a New Topic
1. Create `content/{slug}/data.ts` exporting `topicData: TopicData`
2. Add import + slug entry to `TOPICS` array in `content/conceptsIndex.ts`, `content/searchIndex.ts`, `content/compressData.ts`
3. Add SEO `title` + `description` to `topicSeoBySlug` in `content/conceptsIndex.ts`
4. Add to `topics[]` array in `app/page.tsx`
5. Update stats on home page if counts changed

Routing fully dynamic — no per-topic `app/topics/{slug}/` directory needed. `app/topics/[slug]/page.tsx` and `app/topics/[slug]/[conceptId]/page.tsx` pre-render all topic + concept URLs at build time via `generateStaticParams`. Sitemap (`app/sitemap.ts`) picks up new topics automatically.

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
- All content accuracy-reviewed and corrected
- All `lastHourConceptIds` verified against actual concept IDs
- All category IDs verified as used by concepts
- Stats on home page = accurate counts from data files

## Bundle Hygiene
- `content/topicsManifest.ts` = lightweight slug + title only. Use it in client components that just need topic metadata (e.g. `ContinueCard`).
- `content/recallStats.ts` = pure localStorage helpers, no concept-data imports. Use it for stats reads.
- `content/conceptsIndex.ts`, `searchIndex.ts`, `compressData.ts` import all 14 topic data files (~1.4MB chunk). Do NOT import these from the home page or any always-rendered component.
- `GlobalSearch` lazy-loads `searchIndex` via dynamic `import()` on focus — keeps the heavy chunk out of the initial home bundle.
- When adding a new topic, also append to `topicsManifest.ts`.