import { describe, it, expect } from 'vitest'
import {
  compressedTopics,
  compressedBySlug,
  byteSize,
  TIER_LABEL,
  TIER_TAGLINE,
} from '../../content/compressData'

describe('byteSize', () => {
  it('counts ASCII bytes correctly', () => {
    expect(byteSize('hello')).toBe(5)
  })

  it('counts UTF-8 multibyte characters', () => {
    // '€' is 3 bytes in UTF-8
    expect(byteSize('€')).toBe(3)
  })

  it('returns 0 for empty string', () => {
    expect(byteSize('')).toBe(0)
  })
})

describe('compressedTopics', () => {
  it('has 14 topics', () => {
    expect(compressedTopics.length).toBe(14)
  })

  it('every topic has required fields', () => {
    for (const t of compressedTopics) {
      expect(t.slug).toBeTruthy()
      expect(t.title).toBeTruthy()
      expect(t.seeds).toBeInstanceOf(Array)
      expect(t.highSeeds).toBeInstanceOf(Array)
    }
  })

  it('every topic has critical seeds (seed tier has content)', () => {
    for (const t of compressedTopics) {
      expect(t.seeds.length).toBeGreaterThan(0)
    }
  })

  it('seed tier is smaller than cheatsheet tier (more content at higher tiers)', () => {
    for (const t of compressedTopics) {
      const seedText = t.seeds.map((s) => s.anchor).join(' ')
      const cheatText = [
        ...t.seeds.map((s) => s.anchor),
        ...t.highSeeds.map((s) => s.anchor),
        ...t.keyTakeaways,
      ].join(' ')
      expect(byteSize(cheatText)).toBeGreaterThanOrEqual(byteSize(seedText))
    }
  })
})

describe('compressedBySlug', () => {
  it('has entries for all topics', () => {
    expect(compressedBySlug.size).toBe(14)
  })

  it('can look up python', () => {
    expect(compressedBySlug.get('python')).toBeDefined()
  })

  it('can look up ai-agents', () => {
    expect(compressedBySlug.get('ai-agents')).toBeDefined()
  })
})

describe('TIER_LABEL', () => {
  it('has labels for all 3 tiers', () => {
    expect(TIER_LABEL.seed).toBeTruthy()
    expect(TIER_LABEL.cheatsheet).toBeTruthy()
    expect(TIER_LABEL.full).toBeTruthy()
  })
})

describe('TIER_TAGLINE', () => {
  it('has taglines for all 3 tiers', () => {
    expect(TIER_TAGLINE.seed).toBeTruthy()
    expect(TIER_TAGLINE.cheatsheet).toBeTruthy()
    expect(TIER_TAGLINE.full).toBeTruthy()
  })
})
