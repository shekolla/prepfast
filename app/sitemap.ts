import type { MetadataRoute } from "next";
import { ALL_TOPICS, conceptUrl, topicDataBySlug, topicUrl } from "@/content/conceptsIndex";

// Required when using next.config `output: "export"` — sitemap is fully static.
export const dynamic = "force-static";

const SITE = "https://prepfast.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  entries.push({ url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 });
  entries.push({ url: `${SITE}/recall/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 });
  entries.push({ url: `${SITE}/compare/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 });
  entries.push({ url: `${SITE}/compress/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 });

  for (const t of ALL_TOPICS) {
    const data = topicDataBySlug.get(t.slug);
    if (!data) continue;
    const lastModified = new Date(data.lastUpdated);
    entries.push({
      url: `${SITE}${topicUrl(t.slug)}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    });
    for (const c of data.concepts) {
      entries.push({
        url: `${SITE}${conceptUrl(t.slug, c.id)}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
