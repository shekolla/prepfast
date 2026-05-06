# Contributing to InterviewPrep

Thanks for considering a contribution! This is a free, open-source revision platform for software-engineering interviews. Most contributions fall into one of two buckets: **content** (new topics, new concepts, corrections) or **product** (UX, features, bug fixes).

## Quick start

```bash
git clone https://github.com/shekolla/one-hour-prep.git
cd one-hour-prep
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run build        # static export to ./out
```

CI runs `typecheck` + `build` on every push and PR. PRs that fail CI will not be merged.

## Content contributions

### Adding or correcting a concept

Concepts live in `content/{topic-slug}/data.ts`. Each concept has a fixed shape — see `content/types.ts::Concept`:

- `id` — kebab-case, unique within the topic
- `title` — short, human-readable
- `category` — must match a `categories[]` entry
- `basic` / `expected` / `deep` — three depth levels (more depth = more detail)
- `interviewAnswer` — ready-to-speak answer
- `trap` — common misconception interviewers test
- `memoryAnchor` — vivid analogy for recall

Quality bar:
- **Accurate.** If a fact has changed (model pricing, library versions, API names), say so. Cite the source in the PR description if non-obvious.
- **Specific.** "useState is for state" is not a `basic` — say what kind of state, why, and the rough mental model.
- **Interview-tested.** Concepts should be things actually asked at mid-to-senior interviews, not encyclopedic trivia.

### Adding a new topic

Follow the existing pattern. See `CLAUDE.md::Adding a New Topic` for the full checklist. Roughly:

1. Create `content/{slug}/data.ts` exporting `topicData: TopicData`.
2. Append entries in `content/conceptsIndex.ts`, `content/searchIndex.ts`, `content/compressData.ts`, `content/topicsManifest.ts`.
3. Add SEO `title` + `description` to `topicSeoBySlug` in `conceptsIndex.ts`.
4. Append to the `topics[]` array in `app/page.tsx`.
5. Update home-page stats counts (`app/page.tsx`, `app/layout.tsx`, `components/GlobalSearch.tsx`).

Routing is fully dynamic — no per-topic `app/topics/{slug}/` directory needed; `app/topics/[slug]/page.tsx` and `[slug]/[conceptId]/page.tsx` pre-render every URL at build time.

## Product contributions

UI changes: keep the dark-theme aesthetic. Tailwind 4 only — no extra CSS frameworks. Test on mobile (375px) and desktop. Run a Lighthouse audit before submitting if you touched layout / accessibility.

Performance: respect the bundle hygiene rules in `CLAUDE.md::Bundle Hygiene`. The home page must stay under ~400KB total JS. Don't add a dependency unless you've checked its bundle cost.

Accessibility: every new interactive element needs an `aria-label` (or visible label), `focus-visible` styling, and keyboard support. Follow patterns in existing components.

## PR expectations

- One change per PR. A new topic and a UX refactor go in separate PRs.
- Keep diffs focused. Don't reformat unrelated files.
- Update `README.md` stats and `app/layout.tsx` description if you change content counts.
- Run `npm run typecheck` and `npm run build` locally before pushing.

## Reporting issues

Use the issue templates in `.github/ISSUE_TEMPLATE/`:

- **Bug** — for broken features, UI bugs, broken builds.
- **Content correction** — for factual errors, outdated material, typos.

Please include the URL, the current text, the corrected text, and a source if applicable.

## License

By contributing, you agree that your contributions will be licensed under the MIT License (see `LICENSE`).
