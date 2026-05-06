import { topicData as python } from "./python/data";
import { topicData as javascript } from "./javascript/data";
import { topicData as nodejs } from "./nodejs/data";
import { topicData as java } from "./java/data";
import { topicData as kubernetes } from "./kubernetes/data";
import { topicData as dsa } from "./dsa/data";
import { topicData as systemDesign } from "./system-design/data";
import { topicData as hld } from "./hld/data";
import { topicData as lld } from "./lld/data";
import { topicData as databases } from "./databases/data";
import { topicData as react } from "./react/data";
import { topicData as aws } from "./aws/data";
import { topicData as sql } from "./sql/data";
import { topicData as aiAgents } from "./ai-agents/data";
import type { Concept, TopicData, TreeNode } from "./types";

export type Importance = "critical" | "high" | "medium";

export interface IndexedConcept extends Concept {
  /** `${topicSlug}:${conceptId}` — stable cross-topic id */
  key: string;
  topicSlug: string;
  topicTitle: string;
  importance: Importance;
}

const TOPICS: { slug: string; data: TopicData }[] = [
  { slug: "python", data: python },
  { slug: "javascript", data: javascript },
  { slug: "nodejs", data: nodejs },
  { slug: "java", data: java },
  { slug: "kubernetes", data: kubernetes },
  { slug: "dsa", data: dsa },
  { slug: "system-design", data: systemDesign },
  { slug: "hld", data: hld },
  { slug: "lld", data: lld },
  { slug: "databases", data: databases },
  { slug: "react", data: react },
  { slug: "aws", data: aws },
  { slug: "sql", data: sql },
  { slug: "ai-agents", data: aiAgents },
];

export const ALL_TOPICS: { slug: string; title: string; meta: string }[] = TOPICS.map(
  ({ slug, data }) => ({ slug, title: data.topicTitle, meta: data.topicMeta })
);

/** Full topic data indexed by slug — used by dynamic topic + concept routes. */
export const topicDataBySlug: Map<string, TopicData> = new Map(
  TOPICS.map(({ slug, data }) => [slug, data])
);

/**
 * Hand-curated SEO descriptions per topic (155 chars each, keyword-rich).
 * Preserved from the original hardcoded topic pages so we keep their
 * search-ranking value through the dynamic-route refactor.
 */
export const topicSeoBySlug: Record<string, { title: string; description: string }> = {
  python: {
    title: "Python — Interview Revision | InterviewPrep",
    description:
      "Revise Python in 45–60 minutes. GIL, memory management, concurrency, decorators, generators — structured for fast interview recall.",
  },
  javascript: {
    title: "JavaScript — Interview Revision | InterviewPrep",
    description:
      "Revise JavaScript in 45–60 minutes. Event loop, closures, prototypes, async/await, type coercion, ES6+ — structured for fast interview recall.",
  },
  nodejs: {
    title: "Node.js — Interview Revision | InterviewPrep",
    description:
      "Revise Node.js in 45–60 minutes. Event loop phases, streams, worker threads, security, performance — structured for fast interview recall.",
  },
  java: {
    title: "Java — Interview Revision | InterviewPrep",
    description:
      "Revise Java in 50–60 minutes. JVM internals, concurrency, collections, Spring, garbage collection — structured for fast interview recall.",
  },
  kubernetes: {
    title: "Kubernetes & Docker — Interview Revision | InterviewPrep",
    description:
      "Revise Kubernetes and Docker in 50–60 minutes. Containers, Pods, Deployments, Services, RBAC, networking — structured for fast interview recall.",
  },
  dsa: {
    title: "DSA — Interview Revision | InterviewPrep",
    description:
      "Revise Data Structures & Algorithms in 60–75 minutes. Big O, trees, graphs, dynamic programming, sorting — structured for fast interview recall.",
  },
  "system-design": {
    title: "System Design — Interview Revision | InterviewPrep",
    description:
      "Revise System Design in 60–90 minutes. Scalability, caching, databases, consistency, messaging, reliability — structured for fast interview recall.",
  },
  hld: {
    title: "High-Level Design — Interview Revision | InterviewPrep",
    description:
      "Revise High-Level Design in 60–75 minutes. Architecture patterns, microservices, APIs, observability, security — structured for fast interview recall.",
  },
  lld: {
    title: "Low-Level Design — Interview Revision | InterviewPrep",
    description:
      "Revise Low-Level Design in 50–60 minutes. SOLID principles, design patterns, OOP design, concurrency patterns — structured for fast interview recall.",
  },
  databases: {
    title: "Databases — Interview Revision | InterviewPrep",
    description:
      "Revise Databases in 60–75 minutes. OLTP vs OLAP, PostgreSQL, MongoDB, Snowflake, ClickHouse, BigQuery — when to use what, structured for fast interview recall.",
  },
  react: {
    title: "React — Interview Revision | InterviewPrep",
    description:
      "Revise React in 45–60 minutes. Hooks, fiber architecture, reconciliation, server components, performance — structured for fast interview recall.",
  },
  aws: {
    title: "AWS / Cloud — Interview Revision | InterviewPrep",
    description:
      "Revise AWS in 45–60 minutes. EC2, Lambda, S3, IAM, VPC, DynamoDB, CloudFormation — structured for fast cloud interview recall.",
  },
  sql: {
    title: "SQL Deep Dive — Interview Revision | InterviewPrep",
    description:
      "Revise SQL in 45–60 minutes. Window functions, CTEs, query plans, indexes, transactions, and database internals — structured for fast interview recall.",
  },
  "ai-agents": {
    title: "AI Coding Agents — Interview Revision | InterviewPrep",
    description:
      "Revise AI coding agents in 45–60 minutes. Claude Code, CLAUDE.md, skills, subagents, MCP, prompt caching, hooks — structured for fast interview recall.",
  },
};

const rank: Record<Importance, number> = { critical: 3, high: 2, medium: 1 };

function walkTreeImportance(
  node: TreeNode,
  acc: Map<string, Importance>
) {
  if (node.nodeType === "concept" && node.conceptId) {
    const existing = acc.get(node.conceptId);
    if (!existing || rank[node.importance] > rank[existing]) {
      acc.set(node.conceptId, node.importance);
    }
  }
  if (node.children) for (const c of node.children) walkTreeImportance(c, acc);
}

export const allConcepts: IndexedConcept[] = (() => {
  const out: IndexedConcept[] = [];
  for (const { slug, data } of TOPICS) {
    const imp = new Map<string, Importance>();
    walkTreeImportance(data.mentalModelTree, imp);
    for (const c of data.concepts) {
      out.push({
        ...c,
        key: `${slug}:${c.id}`,
        topicSlug: slug,
        topicTitle: data.topicTitle,
        importance: imp.get(c.id) ?? "medium",
      });
    }
  }
  return out;
})();

export const conceptsByKey: Map<string, IndexedConcept> = new Map(
  allConcepts.map((c) => [c.key, c])
);

export function findConceptByKey(key: string | null | undefined): IndexedConcept | null {
  if (!key) return null;
  return conceptsByKey.get(key) ?? null;
}

/** Canonical URL for a concept's standalone SEO page. */
export function conceptUrl(slug: string, conceptId: string): string {
  return `/topics/${slug}/${conceptId}/`;
}

/** Canonical URL for a topic. */
export function topicUrl(slug: string): string {
  return `/topics/${slug}/`;
}

/**
 * Find concepts related to the given one, combining:
 * - `relatedIds` from the same topic's mentalModelTree (explicit authoring)
 * - Cross-topic concepts sharing a distinctive title token (auto-derived)
 * Caps and dedupes; returns up to `limit` IndexedConcepts.
 */
export function findRelatedConcepts(concept: IndexedConcept, limit = 8): IndexedConcept[] {
  const out: IndexedConcept[] = [];
  const seen = new Set<string>([concept.key]);

  // 1. Explicit related ids from the tree (same topic).
  const topic = topicDataBySlug.get(concept.topicSlug);
  if (topic) {
    const relatedIds = collectRelatedFromTree(topic.mentalModelTree, concept.id);
    for (const id of relatedIds) {
      const key = `${concept.topicSlug}:${id}`;
      const c = conceptsByKey.get(key);
      if (c && !seen.has(c.key)) {
        out.push(c);
        seen.add(c.key);
      }
    }
  }

  // 2. Cross-topic matches via distinctive title tokens.
  const tokens = tokenizeTitle(concept.title);
  if (tokens.length > 0) {
    for (const other of allConcepts) {
      if (out.length >= limit) break;
      if (seen.has(other.key)) continue;
      if (other.topicSlug === concept.topicSlug) continue; // cross-topic only
      const otherTokens = tokenizeTitle(other.title);
      const shared = tokens.filter((t) => otherTokens.includes(t));
      if (shared.length > 0) {
        out.push(other);
        seen.add(other.key);
      }
    }
  }

  return out.slice(0, limit);
}

function collectRelatedFromTree(node: TreeNode, conceptId: string): string[] {
  if (node.nodeType === "concept" && node.conceptId === conceptId) {
    return node.relatedIds ?? [];
  }
  if (node.children) {
    for (const c of node.children) {
      const r = collectRelatedFromTree(c, conceptId);
      if (r.length > 0) return r;
    }
  }
  return [];
}

const TOKEN_STOPWORDS = new Set([
  "the", "and", "for", "with", "vs", "to", "in", "on", "of", "a", "an",
  "is", "are", "or", "by", "at", "as", "it", "be", "we", "our", "its",
  "internals", "basics", "overview", "intro", "introduction", "pattern",
  "patterns", "model", "models", "mode", "modes", "rule", "rules",
  "concept", "concepts", "type", "types", "method", "methods",
]);

function tokenizeTitle(title: string): string[] {
  return Array.from(
    new Set(
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .split(/\s+/)
        .filter((t) => t.length >= 3 && !TOKEN_STOPWORDS.has(t))
    )
  );
}

/** Basic text search across title + category for pickers. */
export function searchConcepts(query: string, limit = 20): IndexedConcept[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const scored: { c: IndexedConcept; score: number }[] = [];
  outer: for (const c of allConcepts) {
    const title = c.title.toLowerCase();
    const blob = `${title} ${c.category.toLowerCase()} ${c.topicTitle.toLowerCase()}`;
    let score = 0;
    for (const t of terms) {
      if (title.startsWith(t)) score += 20;
      else if (title.includes(t)) score += 10;
      else if (blob.includes(t)) score += 2;
      else continue outer;
    }
    scored.push({ c, score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.c);
}
