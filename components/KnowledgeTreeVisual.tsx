"use client";

import type { TreeNode } from "@/content/types";

const importanceDot: Record<string, string> = {
  critical: "bg-red-400",
  high: "bg-yellow-400",
  medium: "bg-gray-500",
};

const categoryBorder: Record<string, string> = {
  critical: "border-red-500/40",
  high: "border-yellow-500/40",
  medium: "border-gray-700",
};

const categoryBg: Record<string, string> = {
  critical: "bg-red-500/5",
  high: "bg-yellow-500/5",
  medium: "bg-gray-800/40",
};

const pillStyle: Record<string, string> = {
  critical:
    "bg-red-500/10 border-red-500/20 text-red-300 hover:bg-red-500/20",
  high: "bg-yellow-500/10 border-yellow-500/20 text-yellow-300 hover:bg-yellow-500/20",
  medium:
    "bg-gray-800/60 border-gray-700 text-gray-400 hover:bg-gray-800",
};

interface Props {
  tree: TreeNode;
  onConceptSelect: (conceptId: string) => void;
  activeConceptId?: string;
}

export default function KnowledgeTreeVisual({
  tree,
  onConceptSelect,
  activeConceptId,
}: Props) {
  const categories = tree.children ?? [];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
      {/* Header / Legend */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <span className="text-white font-semibold text-sm">Knowledge Tree</span>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Critical
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" /> High
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gray-500 inline-block" /> Medium
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* ── Root node ─────────────────────────────────────────── */}
        <div className="flex justify-center">
          <div className="relative bg-indigo-600/20 border-2 border-indigo-500/50 rounded-xl px-8 py-3 text-white font-bold text-sm text-center shadow-lg shadow-indigo-500/5">
            {tree.label}
          </div>
        </div>

        {/* Vertical connector from root */}
        <div className="flex justify-center">
          <div className="w-0.5 h-5 bg-gray-700" />
        </div>

        {/* ── Horizontal connector rail (desktop) / vertical line (mobile) ── */}
        <div className="hidden md:block relative mx-8">
          <div className="border-t-2 border-gray-700 mx-auto" style={{ width: "80%" }} />
        </div>
        <div className="md:hidden flex justify-center">
          <div className="w-0.5 h-3 bg-gray-700" />
        </div>

        {/* ── Category grid ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {categories.map((cat) => {
            const concepts = cat.children ?? [];
            return (
              <div
                key={cat.id}
                className={`relative rounded-xl border-2 ${categoryBorder[cat.importance]} ${categoryBg[cat.importance]} overflow-hidden`}
              >
                {/* Vertical connector from rail to card (desktop) */}
                <div className="hidden md:block absolute left-1/2 -top-4 w-0.5 h-4 bg-gray-700 -translate-x-1/2" />

                {/* Category header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800/50">
                  <div
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${importanceDot[cat.importance]}`}
                  />
                  <span className="text-gray-100 font-semibold text-sm">
                    {cat.label}
                  </span>
                  <span className="ml-auto text-gray-600 text-xs">
                    {concepts.length}
                  </span>
                </div>

                {/* Concept list inside the card */}
                <div className="p-3 space-y-1">
                  {concepts.map((concept) => {
                    const isActive = concept.conceptId === activeConceptId;
                    return (
                      <button
                        key={concept.id}
                        onClick={() =>
                          concept.conceptId && onConceptSelect(concept.conceptId)
                        }
                        className={`w-full flex items-center gap-2 text-left text-xs px-3 py-2 rounded-lg border transition-all ${
                          isActive
                            ? "bg-indigo-600/20 border-indigo-500/40 text-indigo-300 shadow-sm shadow-indigo-500/10"
                            : pillStyle[concept.importance]
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${importanceDot[concept.importance]}`}
                        />
                        <span>{concept.label}</span>
                        {concept.relatedIds && concept.relatedIds.length > 0 && (
                          <span className="ml-auto text-gray-700 text-[10px]">
                            +{concept.relatedIds.length}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-4 py-2 border-t border-gray-800">
        <p className="text-gray-600 text-xs">
          Click any concept to jump to its deep-dive card
        </p>
      </div>
    </div>
  );
}
