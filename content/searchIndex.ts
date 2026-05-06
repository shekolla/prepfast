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

export interface SearchEntry {
  conceptId: string;
  title: string;
  category: string;
  topicSlug: string;
  topicTitle: string;
  snippet: string;
}

const topics = [
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

export const searchIndex: SearchEntry[] = topics.flatMap(({ slug, data }) =>
  data.concepts.map((c) => ({
    conceptId: c.id,
    title: c.title,
    category: c.category,
    topicSlug: slug,
    topicTitle: data.topicTitle,
    snippet: c.basic,
    _searchText: `${c.title} ${c.category} ${c.basic} ${c.expected} ${c.interviewAnswer}`.toLowerCase(),
  }))
);

export function search(query: string, limit = 20): SearchEntry[] {
  if (!query.trim()) return [];
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const scored = searchIndex
    .map((entry) => {
      const text = (entry as SearchEntry & { _searchText: string })._searchText;
      const titleLower = entry.title.toLowerCase();
      let score = 0;
      for (const term of terms) {
        if (titleLower.includes(term)) score += 10;
        else if (text.includes(term)) score += 1;
        else return { entry, score: 0 };
      }
      return { entry, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return scored.map((r) => r.entry);
}
