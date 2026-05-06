/**
 * Recall session stats — pure localStorage helpers, no concept-data imports.
 *
 * Split out of `recallData.ts` so consumers like `ContinueCard` (which only
 * needs streak/totalReviews on the home page) don't pull in the full
 * conceptsIndex (~1.4MB of topic data) just to read a 3-field JSON object.
 *
 * `recallData.ts` re-exports these for back-compat.
 */
const STATS_KEY = "recall:stats";

export interface SessionStats {
  /** Epoch day (YYYY-MM-DD local) of last study day. Used for streaks. */
  lastStudyDate: string;
  /** Consecutive days studied. */
  streak: number;
  /** Total cards reviewed across all sessions. */
  totalReviews: number;
}

const EMPTY_STATS: SessionStats = {
  lastStudyDate: "",
  streak: 0,
  totalReviews: 0,
};

export function loadStats(): SessionStats {
  if (typeof window === "undefined") return EMPTY_STATS;
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return EMPTY_STATS;
    return JSON.parse(raw) as SessionStats;
  } catch {
    return EMPTY_STATS;
  }
}

export function saveStats(stats: SessionStats): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    // ignore
  }
}

/**
 * Count `reviewed:*` localStorage keys with value "1". Used for the
 * "Concepts checked" stat without needing a concept registry.
 */
export function countReviewedConcepts(): number {
  if (typeof window === "undefined") return 0;
  try {
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (key.startsWith("reviewed:") && localStorage.getItem(key) === "1") {
        count++;
      }
    }
    return count;
  } catch {
    return 0;
  }
}
