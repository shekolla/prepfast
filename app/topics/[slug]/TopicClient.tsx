"use client";

import { useEffect } from "react";
import TopicPageLayout from "@/components/TopicPageLayout";
import { topicDataBySlug } from "@/content/conceptsIndex";

/**
 * Thin client wrapper that looks up topic data by slug and renders the
 * existing TopicPageLayout. Also writes the slug to localStorage as the
 * "last topic" so the home page can surface a Continue card.
 */
export default function TopicClient({ slug }: { slug: string }) {
  const topic = topicDataBySlug.get(slug);

  useEffect(() => {
    if (!topic) return;
    try {
      localStorage.setItem("prepfast:last-topic", slug);
    } catch {
      // ignore storage errors
    }
  }, [slug, topic]);

  if (!topic) return null;
  return <TopicPageLayout {...topic} />;
}
