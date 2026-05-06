# Future Plans

## High Priority

### Flashcard Mode (Active Recall)
- Show concept title only, hide everything else
- Click to reveal depth levels one by one (basic → expected → deep)
- Confidence rating per card: Easy / Hard / Again
- Reuses existing 287 concepts — no new content needed
- **Why:** Active recall is the #1 most effective memorization technique

### Spaced Repetition Scheduler
- Track when each concept was last reviewed and confidence level
- Surface concepts due for review (1 day → 3 days → 7 days → 30 days)
- "Review Queue" page showing due cards across all topics
- localStorage-based — no backend needed
- **Why:** 90%+ retention vs ~20% with passive reading (research-backed)

---

## Medium Priority

### Quiz Mode
- Multiple choice or fill-in-the-blank generated from existing traps/mistakes data
- Timed mode for interview pressure simulation
- Score tracking per topic
- **Why:** Tests understanding, not just recognition

### More Practice Questions
- Current count varies per topic (5-10 each)
- Target: 15-20 per topic with increasing difficulty
- Add hints system (progressive reveal)
- **Why:** Practice is where learning solidifies

### Real-World Scenario Walkthroughs
- "Design a URL shortener using these concepts" type guided exercises
- Connect concepts across topics (e.g., System Design + Databases + HLD)
- **Why:** Bridges gap between knowing concepts and applying them

### Topic Progress Dashboard
- Visual overview of all topics with completion percentage
- Heatmap of review activity (GitHub-style)
- Weak areas identification based on confidence ratings
- **Why:** Gamification and motivation

---

## Low Priority / Nice-to-Have

### Dark/Light Mode Toggle
- Decided against for now — dark-only fits the audience
- Would require touching every component (~200+ class changes)
- Revisit if users request it

### PDF Export
- Generate printable PDF per topic with all concepts expanded
- Already have print styles — extend to proper PDF generation
- Could use browser print or a library like puppeteer

### Community Contributions
- Allow users to submit memory anchors, practice questions, or corrections
- GitHub PR-based workflow
- **Why:** Scales content without sole maintainer burden

### Mobile App (PWA)
- Add service worker for offline access
- App-like experience with install prompt
- Already static — PWA is a natural fit

### AI-Powered Features
- "Explain this concept differently" using LLM
- Generate practice questions on-the-fly
- Personalized weak-area identification
- **Why:** High wow-factor but adds complexity and API costs

---

## Content Expansion

### New Topics to Consider
- **Go** — goroutines, channels, interfaces, error handling
- **Rust** — ownership, borrowing, lifetimes, async
- **React** — hooks, fiber, reconciliation, server components
- **AWS/Cloud** — EC2, Lambda, S3, IAM, VPC, CloudFormation
- **SQL Deep Dive** — window functions, CTEs, query plans, indexes
- **Behavioral Interviews** — STAR method, leadership principles, conflict resolution
- **Machine Learning** — for ML engineer interviews (transformers, training, inference)

### Content Quality Improvements
- Peer review of all memory anchors for accuracy and vividness
- Add code examples to more concepts (especially DSA, Java, Python)
- Cross-reference related concepts across topics
