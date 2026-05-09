import { describe, it, expect } from 'vitest'
import { topicData as python } from '../../content/python/data'
import { topicData as javascript } from '../../content/javascript/data'
import { topicData as nodejs } from '../../content/nodejs/data'
import { topicData as java } from '../../content/java/data'
import { topicData as kubernetes } from '../../content/kubernetes/data'
import { topicData as dsa } from '../../content/dsa/data'
import { topicData as systemDesign } from '../../content/system-design/data'
import { topicData as hld } from '../../content/hld/data'
import { topicData as lld } from '../../content/lld/data'
import { topicData as databases } from '../../content/databases/data'
import { topicData as react } from '../../content/react/data'
import { topicData as aws } from '../../content/aws/data'
import { topicData as sql } from '../../content/sql/data'
import { topicData as aiAgents } from '../../content/ai-agents/data'
import type { TopicData } from '../../content/types'

const ALL_TOPIC_DATA: { slug: string; data: TopicData }[] = [
  { slug: 'python', data: python },
  { slug: 'javascript', data: javascript },
  { slug: 'nodejs', data: nodejs },
  { slug: 'java', data: java },
  { slug: 'kubernetes', data: kubernetes },
  { slug: 'dsa', data: dsa },
  { slug: 'system-design', data: systemDesign },
  { slug: 'hld', data: hld },
  { slug: 'lld', data: lld },
  { slug: 'databases', data: databases },
  { slug: 'react', data: react },
  { slug: 'aws', data: aws },
  { slug: 'sql', data: sql },
  { slug: 'ai-agents', data: aiAgents },
]

describe('topic data files', () => {
  it('loads all 14 topic files without error', () => {
    expect(ALL_TOPIC_DATA.length).toBe(14)
  })

  for (const { slug, data } of ALL_TOPIC_DATA) {
    describe(`${slug}`, () => {
      it('has a non-empty concepts array', () => {
        expect(data.concepts.length).toBeGreaterThan(0)
      })

      it('has a mentalModel with whatItIs', () => {
        expect(data.mentalModel.whatItIs).toBeTruthy()
      })

      it('has a mentalModelTree', () => {
        expect(data.mentalModelTree).toBeDefined()
        expect(data.mentalModelTree.nodeType).toBeDefined()
      })

      it('has lastHourConceptIds that exist in concepts', () => {
        const ids = new Set(data.concepts.map((c) => c.id))
        for (const id of data.lastHourConceptIds) {
          expect(ids.has(id)).toBe(true)
        }
      })

      it('all concepts have required fields', () => {
        for (const c of data.concepts) {
          expect(c.id).toBeTruthy()
          expect(c.title).toBeTruthy()
          expect(c.basic).toBeTruthy()
        }
      })
    })
  }
})
