"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Concept, DepthLevel } from "@/content/types";

const ConceptDiagram = dynamic(() => import("./ConceptDiagram"), {
  ssr: false,
  loading: () => (
    <div className="my-4 h-32 rounded-xl border border-gray-800 bg-gray-950/60 grid place-items-center text-gray-500 text-xs">
      Loading diagram…
    </div>
  ),
});

const depthConfig = {
  basic: { label: "Basic", dot: "bg-green-500", text: "text-green-400", border: "border-green-500/30", bg: "bg-green-500/5" },
  expected: { label: "Expected", dot: "bg-yellow-500", text: "text-yellow-400", border: "border-yellow-500/30", bg: "bg-yellow-500/5" },
  deep: { label: "Deep", dot: "bg-red-500", text: "text-red-400", border: "border-red-500/30", bg: "bg-red-500/5" },
};

interface ConceptCardProps {
  concept: Concept;
  activeDepth: DepthLevel;
  showTraps: boolean;
  showAnchors?: boolean;
  highlighted?: boolean;
}

function useReviewed(conceptId: string) {
  const key = `reviewed:${conceptId}`;
  const [reviewed, setReviewed] = useState(false);

  useEffect(() => {
    setReviewed(localStorage.getItem(key) === "1");
  }, [key]);

  const toggle = () => {
    const next = !reviewed;
    setReviewed(next);
    if (next) localStorage.setItem(key, "1");
    else localStorage.removeItem(key);
  };

  return [reviewed, toggle] as const;
}

export default function ConceptCard({ concept, activeDepth, showTraps, showAnchors, highlighted }: ConceptCardProps) {
  const [showInterview, setShowInterview] = useState(false);
  const [reviewed, toggleReviewed] = useReviewed(concept.id);
  const pathname = usePathname() ?? "";
  // pathname on a topic page is `/topics/{slug}` — extract the slug for the standalone link.
  const slug = pathname.startsWith("/topics/") ? pathname.split("/")[2] ?? "" : "";

  const levelsToShow: DepthLevel[] =
    activeDepth === "basic"
      ? ["basic"]
      : activeDepth === "expected"
      ? ["basic", "expected"]
      : ["basic", "expected", "deep"];

  return (
    <div
      id={`concept-${concept.id}`}
      className={`bg-gray-900 rounded-xl p-6 space-y-4 border transition-all ${
        highlighted ? "border-indigo-500/50 ring-1 ring-indigo-500/20" : "border-gray-800"
      } ${reviewed ? "opacity-70" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className={`text-white font-semibold text-lg ${reviewed ? "line-through decoration-gray-600" : ""}`}>
          {concept.title}
        </h3>
        <button
          onClick={toggleReviewed}
          aria-pressed={reviewed}
          aria-label={reviewed ? "Mark as not reviewed" : "Mark as reviewed"}
          title={reviewed ? "Reviewed" : "Mark as reviewed"}
          className={`shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center text-xs transition-all focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 ${
            reviewed
              ? "bg-green-500/20 border-green-500/50 text-green-400"
              : "border-gray-700 text-transparent hover:border-gray-500"
          }`}
        >
          {reviewed ? "✓" : ""}
        </button>
      </div>

      {/* Depth levels */}
      <div className="space-y-3">
        {levelsToShow.map((level) => {
          const cfg = depthConfig[level];
          return (
            <div key={level} className={`rounded-lg p-4 border ${cfg.border} ${cfg.bg}`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${cfg.dot}`} aria-hidden="true" />
                <span className={`text-xs font-semibold uppercase tracking-wider ${cfg.text}`}>
                  {cfg.label}
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{concept[level]}</p>
            </div>
          );
        })}
      </div>

      {/* Diagram — only renders for concepts that ship one */}
      {concept.diagram && (
        <ConceptDiagram source={concept.diagram} caption={concept.diagramCaption} />
      )}

      {/* Memory Anchor — shown when Anchors toggle is on */}
      {showAnchors && concept.memoryAnchor && (
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-purple-400 text-xs font-semibold uppercase tracking-wider">
              <span aria-hidden="true">💡</span> Memory Anchor
            </span>
          </div>
          <p className="text-purple-200 text-sm leading-relaxed">{concept.memoryAnchor}</p>
        </div>
      )}

      {/* Interview Answer toggle */}
      <button
        onClick={() => setShowInterview((v) => !v)}
        aria-expanded={showInterview}
        className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 rounded"
      >
        <span aria-hidden="true">🎤</span>
        <span>{showInterview ? "Hide" : "Show"} Interview Answer</span>
      </button>
      {showInterview && (
        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
          <p className="text-indigo-200 text-sm leading-relaxed">{concept.interviewAnswer}</p>
        </div>
      )}

      {/* Trap */}
      {showTraps && (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <span aria-hidden="true">⚠</span> Trap
            </span>
          </div>
          <p className="text-orange-200 text-sm leading-relaxed">{concept.trap}</p>
        </div>
      )}

      {/* Standalone page link — SEO internal link */}
      {slug && (
        <div className="pt-1 flex justify-end">
          <Link
            href={`/topics/${slug}/${concept.id}/`}
            className="text-[11px] text-gray-500 hover:text-indigo-300 transition-colors"
          >
            View full page →
          </Link>
        </div>
      )}
    </div>
  );
}
