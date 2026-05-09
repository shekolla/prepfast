import { describe, it, expect } from 'vitest'
import {
  allConcepts,
  ALL_TOPICS,
  searchConcepts,
  findRelatedConcepts,
  findConceptByKey,
} from '../../content/conceptsIndex'

describe('allConcepts', () => {
  it('has at least 390 concepts', () => {
    expect(allConcepts.length).toBeGreaterThanOrEqual(390)
  })

  it('every concept has required fields', () => {
    for (const c of allConcepts) {
      expect(c.key).toMatch(/^[a-z0-9-]+:[a-z0-9-]+$/)
      expect(c.topicSlug).toBeTruthy()
      expect(c.topicTitle).toBeTruthy()
      expect(c.importance).toMatch(/^(critical|high|medium)$/)
      expect(c.title).toBeTruthy()
    }
  })

  it('keys are unique', () => {
    const keys = allConcepts.map((c) => c.key)
    const unique = new Set(keys)
    expect(unique.size).toBe(keys.length)
  })
})

describe('ALL_TOPICS', () => {
  it('has 14 topics', () => {
    expect(ALL_TOPICS.length).toBe(14)
  })

  it('includes expected slugs', () => {
    const slugs = ALL_TOPICS.map((t) => t.slug)
    expect(slugs).toContain('python')
    expect(slugs).toContain('javascript')
    expect(slugs).toContain('ai-agents')
  })
})

describe('searchConcepts', () => {
  it('returns empty array for empty query', () => {
    expect(searchConcepts('')).toEqual([])
  })

  it('returns results for a valid query', () => {
    const results = searchConcepts('closure')
    expect(results.length).toBeGreaterThan(0)
  })

  it('respects the limit parameter', () => {
    const results = searchConcepts('a', 5)
    expect(results.length).toBeLessThanOrEqual(5)
  })
})

describe('findRelatedConcepts', () => {
  it('returns at most 8 concepts', () => {
    const concept = allConcepts[0]
    const related = findRelatedConcepts(concept)
    expect(related.length).toBeLessThanOrEqual(8)
  })

  it('does not include the input concept itself', () => {
    const concept = allConcepts[0]
    const related = findRelatedConcepts(concept)
    expect(related.every((r) => r.key !== concept.key)).toBe(true)
  })
})

describe('findConceptByKey', () => {
  it('returns null for null input', () => {
    expect(findConceptByKey(null)).toBeNull()
  })

  it('returns null for undefined input', () => {
    expect(findConceptByKey(undefined)).toBeNull()
  })

  it('returns null for nonexistent key', () => {
    expect(findConceptByKey('notaslug:notanid')).toBeNull()
  })

  it('returns the concept for a valid key', () => {
    const first = allConcepts[0]
    const found = findConceptByKey(first.key)
    expect(found).not.toBeNull()
    expect(found!.key).toBe(first.key)
  })
})
