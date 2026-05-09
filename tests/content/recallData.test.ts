// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import {
  allCards,
  criticalCards,
  buildSessionQueue,
  newState,
  applyRating,
  isDue,
  isNew,
  loadState,
  type SrsState,
} from '../../content/recallData'

beforeEach(() => {
  localStorage.clear()
})

describe('allCards', () => {
  it('is non-empty', () => {
    expect(allCards.length).toBeGreaterThan(0)
  })

  it('every card has kind anchor, title, or trap', () => {
    for (const c of allCards) {
      expect(['anchor', 'title', 'trap']).toContain(c.kind)
    }
  })

  it('every card has a non-empty prompt and answer', () => {
    for (const c of allCards) {
      expect(c.prompt.trim().length).toBeGreaterThan(0)
      expect(c.answer.trim().length).toBeGreaterThan(0)
    }
  })
})

describe('criticalCards', () => {
  it('is a non-empty subset of allCards', () => {
    expect(criticalCards.length).toBeGreaterThan(0)
    expect(criticalCards.length).toBeLessThanOrEqual(allCards.length)
  })

  it('all criticalCards have importance === "critical"', () => {
    for (const c of criticalCards) {
      expect(c.importance).toBe('critical')
    }
  })
})

describe('SM-2 pure functions', () => {
  it('newState returns a default state', () => {
    const s = newState(1000)
    expect(s.ef).toBe(2.5)
    expect(s.reps).toBe(0)
    expect(s.lapses).toBe(0)
    expect(s.due).toBe(1000)
  })

  it('isNew is true for a fresh state', () => {
    expect(isNew(newState())).toBe(true)
  })

  it('isDue returns true when due <= now', () => {
    const s: SrsState = { ...newState(0), due: 0 }
    expect(isDue(s, 100)).toBe(true)
  })

  it('isDue returns false when due > now', () => {
    const s: SrsState = { ...newState(0), due: 99999999999 }
    expect(isDue(s, 0)).toBe(false)
  })

  it('applyRating again increments lapses and resets reps', () => {
    const s = newState(1000)
    const next = applyRating(s, 'again', 1000)
    expect(next.lapses).toBe(1)
    expect(next.reps).toBe(0)
    expect(next.ef).toBeLessThan(2.5)
  })

  it('applyRating good increments reps', () => {
    const s = newState(1000)
    const next = applyRating(s, 'good', 1000)
    expect(next.reps).toBe(1)
    expect(next.lapses).toBe(0)
  })

  it('applyRating easy increments reps and increases ef', () => {
    const s = newState(1000)
    const next = applyRating(s, 'easy', 1000)
    expect(next.reps).toBe(1)
    expect(next.ef).toBeGreaterThan(2.5)
  })

  it('ef never drops below 1.3 on repeated again', () => {
    let s = newState(1000)
    for (let i = 0; i < 20; i++) s = applyRating(s, 'again', 1000)
    expect(s.ef).toBeGreaterThanOrEqual(1.3)
  })
})

describe('loadState', () => {
  it('returns default state when nothing is stored', () => {
    const s = loadState('test:card:anchor')
    expect(s.reps).toBe(0)
    expect(s.lapses).toBe(0)
  })
})

describe('buildSessionQueue', () => {
  it('returns empty array for empty cards', () => {
    expect(buildSessionQueue([])).toEqual([])
  })

  it('returns at most sessionCap cards', () => {
    const result = buildSessionQueue(allCards, { sessionCap: 5 })
    expect(result.length).toBeLessThanOrEqual(5)
  })

  it('all returned cards are from the input array', () => {
    const result = buildSessionQueue(criticalCards, { sessionCap: 10 })
    const inputIds = new Set(criticalCards.map((c) => c.id))
    for (const card of result) {
      expect(inputIds.has(card.id)).toBe(true)
    }
  })
})
