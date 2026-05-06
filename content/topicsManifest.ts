/**
 * Lightweight topic registry — slug + title only, no data imports.
 *
 * Used by client-side components (ContinueCard, etc.) that just need
 * topic metadata for personalization. Decoupled from `conceptsIndex.ts`
 * so importing this file does NOT pull in all 14 topic data files
 * (~1.4MB) into the consuming bundle.
 *
 * When adding a new topic:
 * 1. Append to `TOPICS_MANIFEST` here.
 * 2. Add the data file + entry to `conceptsIndex.ts`, `searchIndex.ts`,
 *    and `compressData.ts` as before.
 * 3. Order should match `app/page.tsx` topics list for consistency.
 */
export interface TopicManifestEntry {
  slug: string;
  title: string;
}

export const TOPICS_MANIFEST: readonly TopicManifestEntry[] = [
  { slug: "python", title: "Python" },
  { slug: "javascript", title: "JavaScript" },
  { slug: "nodejs", title: "Node.js" },
  { slug: "java", title: "Java" },
  { slug: "kubernetes", title: "Kubernetes & Docker" },
  { slug: "dsa", title: "DSA" },
  { slug: "system-design", title: "System Design" },
  { slug: "hld", title: "High-Level Design" },
  { slug: "lld", title: "Low-Level Design" },
  { slug: "databases", title: "Databases" },
  { slug: "react", title: "React" },
  { slug: "aws", title: "AWS / Cloud" },
  { slug: "sql", title: "SQL Deep Dive" },
  { slug: "ai-agents", title: "AI Coding Agents" },
] as const;

export const topicTitleBySlug: Map<string, string> = new Map(
  TOPICS_MANIFEST.map((t) => [t.slug, t.title])
);

/** Canonical URL for a topic — kept here so ContinueCard doesn't pull conceptsIndex. */
export function topicUrl(slug: string): string {
  return `/topics/${slug}/`;
}
