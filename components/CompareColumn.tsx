"use client";

import Link from "next/link";
import type { IndexedConcept } from "@/content/conceptsIndex";

interface Props {
  concept: IndexedConcept | null;
  accent: "a" | "b";
  section: "anchor" | "basic" | "expected" | "deep" | "interviewAnswer" | "trap" | "header";
}

const accentClasses = {
  a: {
    pill: "bg-indigo-500/15 text-indigo-300",
    title: "text-indigo-200",
    border: "border-indigo-500/20",
  },
  b: {
    pill: "bg-pink-500/15 text-pink-300",
    title: "text-pink-200",
    border: "border-pink-500/20",
  },
};

export default function CompareColumn({ concept, accent, section }: Props) {
  const a = accentClasses[accent];

  if (!concept) {
    if (section === "header") {
      return (
        <div className={`rounded-xl border border-dashed border-gray-800 p-5 text-center text-gray-600 text-sm`}>
          Pick a concept above
        </div>
      );
    }
    return (
      <div className="rounded-lg border border-dashed border-gray-800/60 bg-gray-900/20 p-4 text-gray-700 text-xs">
        —
      </div>
    );
  }

  if (section === "header") {
    return (
      <div className={`rounded-xl border ${a.border} bg-gray-900 p-5`}>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${a.pill}`}>
            {concept.topicTitle}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-gray-500">{concept.category}</span>
          {concept.importance === "critical" && (
            <span className="text-[10px] uppercase font-semibold text-red-300 bg-red-500/15 rounded px-1.5 py-0.5">
              critical
            </span>
          )}
        </div>
        <h2 className={`font-bold text-xl leading-tight ${a.title}`}>{concept.title}</h2>
        <Link
          href={`/topics/${concept.topicSlug}/?concept=${concept.id}`}
          className="mt-3 inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white"
        >
          Open in {concept.topicTitle} →
        </Link>
      </div>
    );
  }

  const body = (() => {
    switch (section) {
      case "anchor":
        return concept.memoryAnchor || "";
      case "basic":
        return concept.basic;
      case "expected":
        return concept.expected;
      case "deep":
        return concept.deep;
      case "interviewAnswer":
        return concept.interviewAnswer;
      case "trap":
        return concept.trap;
    }
  })();

  if (!body) {
    return (
      <div className="rounded-lg border border-dashed border-gray-800/60 bg-gray-900/20 p-4 text-gray-700 text-xs italic">
        not provided
      </div>
    );
  }

  const sectionClasses =
    section === "anchor"
      ? "border-indigo-500/20 bg-indigo-500/[0.04]"
      : section === "trap"
      ? "border-red-500/20 bg-red-500/[0.04]"
      : section === "interviewAnswer"
      ? "border-green-500/20 bg-green-500/[0.04]"
      : "border-gray-800 bg-gray-900/40";

  return (
    <div className={`rounded-lg border p-4 ${sectionClasses}`}>
      <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{body}</p>
    </div>
  );
}
