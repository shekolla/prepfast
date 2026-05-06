"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ConceptCard from "@/components/ConceptCard";
import DepthFilter from "@/components/DepthFilter";
import PracticeCard from "@/components/PracticeCard";
import KnowledgeTreeVisual from "@/components/KnowledgeTreeVisual";
import GlobalSearch from "@/components/GlobalSearch";
import type { DepthLevel, TopicData } from "@/content/types";

const sections = [
  { id: "mental-model", label: "Mental Model" },
  { id: "knowledge-tree", label: "Knowledge Tree" },
  { id: "core-concepts", label: "Core Concepts" },
  { id: "interview-patterns", label: "Interview Patterns" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "practice", label: "Practice" },
];

export default function TopicPageLayout(props: TopicData) {
  return (
    <Suspense fallback={null}>
      <TopicPageLayoutInner {...props} />
    </Suspense>
  );
}

function TopicPageLayoutInner({
  topicTitle,
  topicMeta,
  lastUpdated,
  lastHourConceptIds,
  lastHourSummary,
  mentalModel,
  categories,
  mentalModelTree,
  concepts,
  interviewPatterns,
  commonMistakes,
  practiceQuestions,
}: TopicData) {
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState("mental-model");
  const [depth, setDepth] = useState<DepthLevel>("expected");
  const [showTraps, setShowTraps] = useState(false);
  const [showAnchors, setShowAnchors] = useState(false);
  const [lastHourMode, setLastHourMode] = useState(false);
  const [activeConceptId, setActiveConceptId] = useState<string | undefined>(undefined);
  const [reviewedCount, setReviewedCount] = useState(0);

  // Handle deep-link from search results
  useEffect(() => {
    const conceptParam = searchParams.get("concept");
    if (conceptParam && concepts.some((c) => c.id === conceptParam)) {
      handleConceptSelect(conceptParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Count reviewed concepts from localStorage
  useEffect(() => {
    const count = concepts.filter((c) => localStorage.getItem(`reviewed:${c.id}`) === "1").length;
    setReviewedCount(count);
    const handleStorage = () => {
      const newCount = concepts.filter((c) => localStorage.getItem(`reviewed:${c.id}`) === "1").length;
      setReviewedCount(newCount);
    };
    window.addEventListener("storage", handleStorage);
    // Poll for changes from same-tab updates
    const interval = setInterval(handleStorage, 1000);
    return () => { window.removeEventListener("storage", handleStorage); clearInterval(interval); };
  }, [concepts]);

  const visibleConcepts = lastHourMode
    ? concepts.filter((c) => lastHourConceptIds.includes(c.id))
    : concepts;

  const handleConceptSelect = (conceptId: string) => {
    setActiveConceptId(conceptId);
    setActiveSection("core-concepts");
    setTimeout(() => {
      const el = document.getElementById(`concept-${conceptId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-2", "ring-indigo-500/50");
        setTimeout(() => el.classList.remove("ring-2", "ring-indigo-500/50"), 2000);
      }
    }, 50);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <Link href="/" aria-label="Back to all topics" className="text-gray-500 hover:text-gray-300 text-sm transition-colors mb-4 inline-block focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2">
          ← All Topics
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">{topicTitle}</h1>
            <p className="text-gray-400 text-sm">
              {topicMeta} · {concepts.length} concepts
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Last updated: {new Date(lastUpdated).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </p>
            {/* Progress bar */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex-1 max-w-[200px] bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${concepts.length > 0 ? (reviewedCount / concepts.length) * 100 : 0}%` }}
                />
              </div>
              <span className="text-gray-500 text-xs">
                {reviewedCount}/{concepts.length} reviewed
              </span>
            </div>
          </div>
          <DepthFilter
            active={depth}
            onChange={setDepth}
            showTraps={showTraps}
            onToggleTraps={() => setShowTraps((v) => !v)}
            showAnchors={showAnchors}
            onToggleAnchors={() => setShowAnchors((v) => !v)}
            lastHourMode={lastHourMode}
            onToggleLastHour={() => setLastHourMode((v) => !v)}
          />
        </div>
        {/* Search */}
        <div className="mt-4">
          <GlobalSearch />
        </div>
      </div>

      {/* ── Last 1 Hour Compressed Cheatsheet ──────────────────────────── */}
      {lastHourMode && (
        <div className="mb-8 space-y-4">
          <div className="relative bg-gradient-to-br from-indigo-950/80 via-gray-900 to-indigo-950/60 border-2 border-indigo-500/40 rounded-2xl p-6 shadow-lg shadow-indigo-500/10">
            {/* Header bar */}
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-indigo-500/20">
              <div className="bg-indigo-500/20 rounded-lg p-2">
                <span className="text-indigo-300 text-xl" aria-hidden="true">⏱</span>
              </div>
              <div>
                <h2 className="text-indigo-200 font-bold text-lg">
                  Last 1 Hour — Compressed Cheatsheet
                </h2>
                <p className="text-indigo-500 text-xs font-medium">
                  {lastHourConceptIds.length} highest-signal concepts · scan in 5 min
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Key Takeaways */}
              <div>
                <h3 className="text-xs uppercase tracking-wider text-indigo-300 font-bold mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" aria-hidden="true" />
                  Key Takeaways
                </h3>
                <ul className="space-y-2">
                  {lastHourSummary.keyTakeaways.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className="text-indigo-400 shrink-0 mt-0.5 font-bold">{i + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Must-Know One-Liners */}
              <div>
                <h3 className="text-xs uppercase tracking-wider text-indigo-300 font-bold mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" aria-hidden="true" />
                  Must-Know One-Liners
                </h3>
                <div className="space-y-2">
                  {lastHourSummary.mustKnowConcepts.map((item, i) => (
                    <div key={i} className="bg-gray-900/80 border border-indigo-500/10 rounded-lg px-3 py-2">
                      <div className="text-white text-xs font-semibold mb-0.5">{item.name}</div>
                      <div className="text-gray-400 text-xs leading-relaxed">{item.oneLiner}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Traps */}
              <div>
                <h3 className="text-xs uppercase tracking-wider text-orange-300 font-bold mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" aria-hidden="true" />
                  Top Traps to Avoid
                </h3>
                <ul className="space-y-2">
                  {lastHourSummary.topTraps.map((trap, i) => (
                    <li key={i} className="flex items-start gap-2 text-orange-200 text-sm">
                      <span className="text-orange-400 shrink-0 mt-0.5">•</span>
                      {trap}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile nav — outside flex so it doesn't push content */}
      <nav className="md:hidden mb-6" aria-label="Topic sections">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              aria-pressed={activeSection === id}
              className={`shrink-0 px-3 py-2.5 rounded-lg text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 ${
                activeSection === id
                  ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                  : "text-gray-500 border border-gray-800 hover:text-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      <div className="flex gap-8">
        {/* Sidebar — desktop */}
        <nav className="hidden md:flex flex-col gap-1 w-44 shrink-0 sticky top-8 self-start" aria-label="Topic sections">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              aria-pressed={activeSection === id}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 ${
                activeSection === id
                  ? "bg-indigo-600/20 text-indigo-300"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* ── Mental Model ──────────────────────────────────────────── */}
          {activeSection === "mental-model" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">🧠 Mental Model</h2>

              {/* Core mental model card */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">What it is</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{mentalModel.whatItIs}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2">Why it exists</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{mentalModel.whyItExists}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">When to use</h4>
                    <ul className="space-y-2">
                      {mentalModel.whenToUse.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-gray-300 text-sm">
                          <span className="text-green-500 mt-0.5 shrink-0">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-3">Where it fails</h4>
                    <ul className="space-y-2">
                      {mentalModel.whereItFails.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-gray-300 text-sm">
                          <span className="text-red-500 mt-0.5 shrink-0">✗</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Category overview cards */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Topic Areas</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {categories.map((cat) => {
                    const count = concepts.filter((c) => c.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveSection("core-concepts")}
                        className="text-left bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl p-4 transition-all group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-200 font-medium text-sm group-hover:text-white transition-colors">
                            {cat.label}
                          </span>
                          <span className="text-gray-600 text-xs">{count} concepts</span>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed">{cat.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── Knowledge Tree (visual diagram) ────────────────────── */}
          {activeSection === "knowledge-tree" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">🌳 Knowledge Tree</h2>
                <p className="text-gray-500 text-sm">
                  Visual map of every concept organized by category. Click any node to jump to its deep-dive.
                </p>
              </div>
              <KnowledgeTreeVisual
                tree={mentalModelTree}
                onConceptSelect={handleConceptSelect}
                activeConceptId={activeConceptId}
              />
            </div>
          )}

          {/* ── Core Concepts ─────────────────────────────────────────── */}
          {activeSection === "core-concepts" && (
            <div className="space-y-10">
              <h2 className="text-xl font-semibold text-white">⚙️ Core Concepts</h2>
              {lastHourMode && (
                <p className="text-indigo-400 text-sm -mt-4">
                  ⏱ Showing {visibleConcepts.length} highest-signal concepts only.
                </p>
              )}
              {categories.map((cat) => {
                const catConcepts = visibleConcepts.filter((c) => c.category === cat.id);
                if (catConcepts.length === 0) return null;
                return (
                  <div key={cat.id} className="space-y-4">
                    <div className="border-b border-gray-800 pb-3">
                      <h3 className="text-base font-semibold text-gray-200">{cat.label}</h3>
                      <p className="text-gray-600 text-xs mt-0.5">{cat.description}</p>
                    </div>
                    {catConcepts.map((concept) => (
                      <ConceptCard
                        key={concept.id}
                        concept={concept}
                        activeDepth={depth}
                        showTraps={showTraps}
                        showAnchors={showAnchors}
                        highlighted={concept.id === activeConceptId}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Interview Patterns ────────────────────────────────────── */}
          {activeSection === "interview-patterns" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">💡 Interview Patterns</h2>
              {interviewPatterns.map((pattern, i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
                  <p className="text-white font-medium">{pattern.question}</p>
                  <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
                    <div className="text-xs uppercase tracking-wider text-indigo-400 font-semibold mb-2">🎤 Answer</div>
                    <p className="text-indigo-200 text-sm leading-relaxed">{pattern.answer}</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">🧠 Why Asked</div>
                    <p className="text-gray-300 text-sm leading-relaxed">{pattern.whyAsked}</p>
                  </div>
                  {showTraps && (
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                      <div className="text-xs uppercase tracking-wider text-orange-400 font-semibold mb-2">⚠ Trap</div>
                      <p className="text-orange-200 text-sm leading-relaxed">{pattern.trap}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── Common Mistakes ───────────────────────────────────────── */}
          {activeSection === "common-mistakes" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">⚠️ Common Mistakes</h2>
              <div className="bg-gray-900 border border-gray-800 rounded-xl divide-y divide-gray-800">
                {commonMistakes.map((mistake, i) => (
                  <div key={i} className="p-5 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 mt-0.5 shrink-0">✗</span>
                      <p className="text-red-300 text-sm line-through">{mistake.wrong}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                      <p className="text-green-300 text-sm">{mistake.correct}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Practice ─────────────────────────────────────────────── */}
          {activeSection === "practice" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-1">🧪 Practice</h2>
                <p className="text-gray-500 text-sm">
                  Read the scenario, think through your answer, then reveal.
                </p>
              </div>
              {practiceQuestions.map((q, i) => (
                <PracticeCard key={i} item={q} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        data-print-hidden
        className="fixed bottom-6 right-6 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2"
      >
        ↑
      </button>
    </div>
  );
}
