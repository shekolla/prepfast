"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { loadStats, countReviewedConcepts, type SessionStats } from "@/content/recallStats";
import { topicTitleBySlug, topicUrl } from "@/content/topicsManifest";

interface Summary {
  streak: number;
  totalReviews: number;
  lastTopicSlug: string | null;
  lastTopicTitle: string | null;
  reviewedConceptCount: number;
}

function buildSummary(): Summary | null {
  if (typeof window === "undefined") return null;

  const stats: SessionStats = loadStats();
  let lastTopicSlug: string | null = null;
  try {
    lastTopicSlug = localStorage.getItem("prepfast:last-topic");
  } catch {
    lastTopicSlug = null;
  }

  const reviewedConceptCount = countReviewedConcepts();

  const hasAny =
    stats.totalReviews > 0 || stats.streak > 0 || lastTopicSlug !== null || reviewedConceptCount > 0;
  if (!hasAny) return null;

  const lastTopicTitle = lastTopicSlug ? topicTitleBySlug.get(lastTopicSlug) ?? null : null;

  return {
    streak: stats.streak,
    totalReviews: stats.totalReviews,
    lastTopicSlug,
    lastTopicTitle,
    reviewedConceptCount,
  };
}

export default function ContinueCard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setSummary(buildSummary());
  }, []);

  if (!hydrated || !summary) return null;

  const primaryHref =
    summary.lastTopicSlug && summary.lastTopicTitle
      ? topicUrl(summary.lastTopicSlug)
      : "/recall/";
  const primaryLabel =
    summary.lastTopicTitle
      ? `Continue ${summary.lastTopicTitle}`
      : "Study due flashcards";

  return (
    <section
      aria-label="Your progress"
      className="mb-8 rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/[0.08] via-indigo-500/[0.04] to-transparent p-5"
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-indigo-300">
              Welcome back
            </span>
            {summary.streak > 0 && (
              <span className="text-[10px] font-semibold uppercase tracking-wider bg-orange-500/15 text-orange-300 rounded-full px-2 py-0.5">
                🔥 {summary.streak}-day streak
              </span>
            )}
          </div>
          <div className="flex items-baseline gap-4 flex-wrap">
            <div>
              <div className="text-white text-xl font-bold">
                {summary.totalReviews.toLocaleString()}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">Cards reviewed</div>
            </div>
            <div>
              <div className="text-white text-xl font-bold">
                {summary.reviewedConceptCount.toLocaleString()}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500">Concepts checked</div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-400 text-white font-medium text-sm px-3.5 py-2 rounded-lg"
          >
            {primaryLabel} →
          </Link>
          <Link
            href="/recall/"
            className="inline-flex items-center gap-1.5 border border-gray-800 hover:border-gray-700 text-gray-300 text-sm px-3.5 py-2 rounded-lg"
          >
            Flashcards
          </Link>
        </div>
      </div>
    </section>
  );
}
