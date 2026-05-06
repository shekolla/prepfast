import { allConcepts, ALL_TOPICS, type IndexedConcept, type Importance } from "./conceptsIndex";
export { loadStats, saveStats, type SessionStats } from "./recallStats";

export type CardKind = "anchor" | "title" | "trap";

export interface RecallCard {
  /** Stable id: `${topicSlug}:${conceptId}:${kind}`. Used as the SRS key. */
  id: string;
  kind: CardKind;
  conceptId: string;
  conceptTitle: string;
  topicSlug: string;
  topicTitle: string;
  importance: Importance;
  /** What the user sees first (hidden answer). */
  prompt: string;
  /** Revealed on flip. */
  answer: string;
  /** Short label shown in the card header, e.g. "Anchor → Title". */
  directionLabel: string;
}

// ─── Title masking ────────────────────────────────────────────────────────────
// The "Anchor → Concept" card shows the memoryAnchor as the prompt and expects
// the learner to recall the concept's title. Many anchors start with the title
// (e.g. "CloudWatch is the hospital's patient monitoring system...") which
// would give the answer away. Replace title occurrences with a blank so the
// card functions as a real recall test.

const TITLE_STOP_TOKENS = new Set([
  "vs", "and", "the", "or", "for", "with", "to", "of", "in", "on", "at",
  "an", "a", "is", "are", "be", "by", "as", "over", "under", "via", "per",
]);

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function maskTitleInAnchor(anchor: string, title: string): string {
  let out = anchor;
  const phrase = title.trim();
  if (phrase) {
    out = out.replace(new RegExp(escapeRegex(phrase), "gi"), "___");
  }
  const tokens = phrase.split(/[\s/\-&,().]+/);
  for (const tok of tokens) {
    const t = tok.trim();
    if (t.length < 2) continue;
    if (TITLE_STOP_TOKENS.has(t.toLowerCase())) continue;
    // Use non-alpha boundaries so 'reduce' inside 'reducer' isn't masked.
    out = out.replace(new RegExp(`(?<![A-Za-z])${escapeRegex(t)}(?![A-Za-z])`, "gi"), "___");
  }
  // Collapse "___ ___ ___" runs into a single blank so prose stays readable.
  out = out.replace(/___(?:[\s\-/.]+___)+/g, "___");
  return out;
}

/** Build all cards from all concepts. Runs once at module load. */
export const allCards: RecallCard[] = (() => {
  const cards: RecallCard[] = [];
  for (const c of allConcepts) {
    const base = {
      conceptId: c.id,
      conceptTitle: c.title,
      topicSlug: c.topicSlug,
      topicTitle: c.topicTitle,
      importance: c.importance,
    };
    if (c.memoryAnchor && c.memoryAnchor.trim().length > 0) {
      cards.push({
        ...base,
        id: `${c.topicSlug}:${c.id}:anchor`,
        kind: "anchor",
        prompt: maskTitleInAnchor(c.memoryAnchor, c.title),
        answer: c.title,
        directionLabel: "Anchor → Concept",
      });
      cards.push({
        ...base,
        id: `${c.topicSlug}:${c.id}:title`,
        kind: "title",
        prompt: c.title,
        answer: c.memoryAnchor,
        directionLabel: "Concept → Anchor",
      });
    }
    if (c.trap && c.trap.trim().length > 0) {
      cards.push({
        ...base,
        id: `${c.topicSlug}:${c.id}:trap`,
        kind: "trap",
        prompt: `Trap for: ${c.title}`,
        answer: c.trap,
        directionLabel: "Concept → Trap",
      });
    }
  }
  return cards;
})();

export const cardsByTopic: Map<string, RecallCard[]> = (() => {
  const m = new Map<string, RecallCard[]>();
  for (const c of allCards) {
    const arr = m.get(c.topicSlug) ?? [];
    arr.push(c);
    m.set(c.topicSlug, arr);
  }
  return m;
})();

export const criticalCards: RecallCard[] = allCards.filter((c) => c.importance === "critical");

// ─── SRS state (SM-2 simplified) ───────────────────────────────────────────────

export interface SrsState {
  /** Ease factor (≥1.3). Starts at 2.5, drifts based on ratings. */
  ef: number;
  /** Interval in days before next review. */
  interval: number;
  /** Successful reviews in a row. Reset on Again. */
  reps: number;
  /** Number of times the card was failed. */
  lapses: number;
  /** Epoch ms when the card is next due. */
  due: number;
  /** Epoch ms of last review. 0 if never reviewed. */
  lastReviewed: number;
}

export type Rating = "again" | "good" | "easy";

const DAY_MS = 24 * 60 * 60 * 1000;

export function newState(now = Date.now()): SrsState {
  return { ef: 2.5, interval: 0, reps: 0, lapses: 0, due: now, lastReviewed: 0 };
}

export function isDue(state: SrsState, now = Date.now()): boolean {
  return state.due <= now;
}

export function isNew(state: SrsState): boolean {
  return state.reps === 0 && state.lapses === 0 && state.lastReviewed === 0;
}

/**
 * Update an SRS state based on a rating. Simplified SM-2:
 * - Again → 10 min; increment lapses; EF -0.2 (min 1.3).
 * - Good  → reps 0→1d, 1→4d, 2+→interval*EF.
 * - Easy  → reps 0→3d, 1→7d, 2+→interval*EF*1.3; EF +0.15.
 */
export function applyRating(state: SrsState, rating: Rating, now = Date.now()): SrsState {
  let { ef, interval, reps, lapses } = state;
  if (rating === "again") {
    lapses += 1;
    reps = 0;
    interval = 10 / (60 * 24); // 10 minutes expressed in days
    ef = Math.max(1.3, ef - 0.2);
  } else if (rating === "good") {
    if (reps === 0) interval = 1;
    else if (reps === 1) interval = 4;
    else interval = Math.round(interval * ef * 10) / 10;
    reps += 1;
  } else {
    // easy
    if (reps === 0) interval = 3;
    else if (reps === 1) interval = 7;
    else interval = Math.round(interval * ef * 1.3 * 10) / 10;
    reps += 1;
    ef = Math.min(3.2, ef + 0.15);
  }
  return {
    ef,
    interval,
    reps,
    lapses,
    lastReviewed: now,
    due: now + interval * DAY_MS,
  };
}

// ─── localStorage persistence ─────────────────────────────────────────────────

const STATE_KEY_PREFIX = "recall:state:";

export function loadState(cardId: string): SrsState {
  if (typeof window === "undefined") return newState(0);
  try {
    const raw = localStorage.getItem(STATE_KEY_PREFIX + cardId);
    if (!raw) return newState(0);
    return JSON.parse(raw) as SrsState;
  } catch {
    return newState(0);
  }
}

export function saveState(cardId: string, state: SrsState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STATE_KEY_PREFIX + cardId, JSON.stringify(state));
  } catch {
    // quota exceeded — ignore silently
  }
}

import { loadStats as _loadStats, saveStats as _saveStats } from "./recallStats";

function todayKey(now = new Date()): string {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function recordReview(): import("./recallStats").SessionStats {
  const stats = _loadStats();
  const today = todayKey();
  if (stats.lastStudyDate === today) {
    stats.totalReviews += 1;
  } else {
    // Check if yesterday
    const yest = new Date();
    yest.setDate(yest.getDate() - 1);
    if (stats.lastStudyDate === todayKey(yest)) stats.streak += 1;
    else if (stats.lastStudyDate === "") stats.streak = 1;
    else stats.streak = 1;
    stats.lastStudyDate = today;
    stats.totalReviews += 1;
  }
  _saveStats(stats);
  return stats;
}

// ─── Deck helpers ──────────────────────────────────────────────────────────────

export interface DeckSummary {
  id: string;
  label: string;
  sublabel: string;
  total: number;
  due: number;
  new_: number;
  learning: number;
}

export function getDeckCards(deckId: string): RecallCard[] {
  if (deckId === "all-critical") return criticalCards;
  if (deckId === "all-due") {
    if (typeof window === "undefined") return [];
    // "Due today" = previously studied cards that are ready for re-review.
    // New cards are surfaced through topic decks so the counts mean something.
    return allCards.filter((c) => {
      const st = loadState(c.id);
      return !isNew(st) && isDue(st);
    });
  }
  return cardsByTopic.get(deckId) ?? [];
}

export function summarizeDeck(deckId: string, label: string, sublabel: string): DeckSummary {
  const cards = deckId === "all-due" ? allCards : getDeckCards(deckId);
  let due = 0;
  let new_ = 0;
  let learning = 0;
  if (typeof window !== "undefined") {
    const now = Date.now();
    for (const c of cards) {
      const st = loadState(c.id);
      if (isNew(st)) {
        new_++;
      } else {
        if (st.reps < 3) learning++;
        if (st.due <= now) due++;
      }
    }
  }
  return {
    id: deckId,
    label,
    sublabel,
    // For the "all-due" virtual deck, `total` should equal `due` (both exclude new cards).
    total: deckId === "all-due" ? due : cards.length,
    due,
    new_,
    learning,
  };
}

/** All decks available on the /recall landing page. */
export function getAllDecks(): DeckSummary[] {
  const decks: DeckSummary[] = [];
  decks.push(
    summarizeDeck(
      "all-due",
      "Due today",
      "Previously-studied cards ready for re-review. Starts empty until you study a topic."
    )
  );
  decks.push(
    summarizeDeck("all-critical", "All critical", "Only the critical-importance concepts — the hubs")
  );
  for (const t of ALL_TOPICS) {
    decks.push(summarizeDeck(t.slug, t.title, t.meta));
  }
  return decks;
}

/**
 * Given a deck's cards, return the study order for this session:
 * - Due cards first (ordered by earliest due)
 * - Then up to N new cards (cap to avoid overwhelming)
 * Returns max `sessionCap` cards.
 */
export function buildSessionQueue(
  cards: RecallCard[],
  opts: { newPerSession?: number; sessionCap?: number; now?: number } = {}
): RecallCard[] {
  const { newPerSession = 15, sessionCap = 40, now = Date.now() } = opts;
  if (typeof window === "undefined") return [];
  const due: { card: RecallCard; dueAt: number }[] = [];
  const new_: RecallCard[] = [];
  for (const c of cards) {
    const st = loadState(c.id);
    if (isNew(st)) new_.push(c);
    else if (st.due <= now) due.push({ card: c, dueAt: st.due });
  }
  due.sort((a, b) => a.dueAt - b.dueAt);
  const queue: RecallCard[] = due.map((d) => d.card);
  // Shuffle new cards so the same topic block doesn't come in a boring order.
  const shuffledNew = [...new_].sort(() => Math.random() - 0.5).slice(0, newPerSession);
  queue.push(...shuffledNew);
  return queue.slice(0, sessionCap);
}
