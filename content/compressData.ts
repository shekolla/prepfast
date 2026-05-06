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

export interface CompressedSeed {
  id: string;
  title: string;
  /** The vivid analogy — the L1 compression. Falls back to `basic` if no anchor. */
  anchor: string;
  anchorSource: "memoryAnchor" | "basic";
  trap?: string;
  interviewAnswer: string;
}

export interface CompressedTopic {
  slug: string;
  title: string;
  meta: string;
  mentalModelLine: string;
  /** Critical-importance concepts — the absolute must-remember. */
  seeds: CompressedSeed[];
  /** High-importance concepts — included in cheatsheet tier and up. */
  highSeeds: CompressedSeed[];
  topTraps: string[];
  keyTakeaways: string[];
  oneLiners: { name: string; oneLiner: string }[];
}

const topics: { slug: string; data: TopicData }[] = [
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

function collectImportance(
  node: TreeNode,
  acc: Map<string, Importance>
) {
  if (node.nodeType === "concept" && node.conceptId) {
    // Keep the highest importance if a conceptId appears in multiple tree nodes.
    const existing = acc.get(node.conceptId);
    const rank = { critical: 3, high: 2, medium: 1 } as const;
    if (!existing || rank[node.importance] > rank[existing]) {
      acc.set(node.conceptId, node.importance);
    }
  }
  if (node.children) {
    for (const c of node.children) collectImportance(c, acc);
  }
}

function toSeed(c: Concept): CompressedSeed {
  const anchor = c.memoryAnchor?.trim();
  return {
    id: c.id,
    title: c.title,
    anchor: anchor && anchor.length > 0 ? anchor : c.basic,
    anchorSource: anchor && anchor.length > 0 ? "memoryAnchor" : "basic",
    trap: c.trap || undefined,
    interviewAnswer: c.interviewAnswer,
  };
}

function buildOne(slug: string, data: TopicData): CompressedTopic {
  const importanceById = new Map<string, Importance>();
  collectImportance(data.mentalModelTree, importanceById);

  const seeds: CompressedSeed[] = [];
  const highSeeds: CompressedSeed[] = [];
  for (const c of data.concepts) {
    const imp = importanceById.get(c.id) ?? "medium";
    if (imp === "critical") seeds.push(toSeed(c));
    else if (imp === "high") highSeeds.push(toSeed(c));
  }

  return {
    slug,
    title: data.topicTitle,
    meta: data.topicMeta,
    mentalModelLine: data.mentalModel.whatItIs,
    seeds,
    highSeeds,
    topTraps: data.lastHourSummary.topTraps,
    keyTakeaways: data.lastHourSummary.keyTakeaways,
    oneLiners: data.lastHourSummary.mustKnowConcepts,
  };
}

export const compressedTopics: CompressedTopic[] = topics.map(({ slug, data }) =>
  buildOne(slug, data)
);

export const compressedBySlug: Map<string, CompressedTopic> = new Map(
  compressedTopics.map((t) => [t.slug, t])
);

/**
 * Three memory budgets for extreme compression.
 *
 * - `seed`: anchors only for critical concepts + top 3 traps. "Matchbox" tier.
 * - `cheatsheet`: + high-importance anchors, key takeaways, one-liners, all traps.
 * - `full`: + interview answers for every critical+high concept. "Pre-interview".
 */
export type CompressionTier = "seed" | "cheatsheet" | "full";

export const TIER_LABEL: Record<CompressionTier, string> = {
  seed: "Seed",
  cheatsheet: "Cheatsheet",
  full: "Full recall",
};

export const TIER_TAGLINE: Record<CompressionTier, string> = {
  seed: "Just the anchors — everything else re-derives from these.",
  cheatsheet: "Anchors, traps, and one-liners. What you'd scan 10 min before.",
  full: "Anchors + interview-ready answers for every high-signal concept.",
};

/** Byte count of a UTF-8 encoded string. Works in both SSR and browser. */
export function byteSize(text: string): number {
  if (typeof TextEncoder !== "undefined") {
    return new TextEncoder().encode(text).length;
  }
  return unescape(encodeURIComponent(text)).length;
}
