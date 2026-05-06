"use client";

import type { DepthLevel } from "@/content/types";

const levels: { value: DepthLevel; label: string; dot: string }[] = [
  { value: "basic", label: "Basic", dot: "bg-green-500" },
  { value: "expected", label: "Expected", dot: "bg-yellow-500" },
  { value: "deep", label: "Deep", dot: "bg-red-500" },
];

interface DepthFilterProps {
  active: DepthLevel;
  onChange: (level: DepthLevel) => void;
  showTraps: boolean;
  onToggleTraps: () => void;
  lastHourMode: boolean;
  onToggleLastHour: () => void;
  showAnchors?: boolean;
  onToggleAnchors?: () => void;
}

export default function DepthFilter({
  active,
  onChange,
  showTraps,
  onToggleTraps,
  lastHourMode,
  onToggleLastHour,
  showAnchors,
  onToggleAnchors,
}: DepthFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center" role="toolbar" aria-label="Content filters">
      {/* Depth levels */}
      <div className="flex bg-gray-900 border border-gray-800 rounded-lg p-1 gap-1" role="group" aria-label="Depth level">
        {levels.map(({ value, label, dot }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            aria-pressed={active === value}
            className={`flex items-center gap-1.5 px-3 py-2.5 md:py-1.5 rounded-md text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 ${
              active === value
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${dot}`} aria-hidden="true" />
            {label}
          </button>
        ))}
      </div>

      {/* Trap toggle */}
      <button
        onClick={onToggleTraps}
        aria-pressed={showTraps}
        aria-label="Show interview traps"
        className={`flex items-center gap-1.5 px-3 py-2.5 md:py-1.5 rounded-lg text-sm font-medium border transition-all focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 ${
          showTraps
            ? "bg-orange-500/20 border-orange-500/40 text-orange-300"
            : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200"
        }`}
      >
        <span aria-hidden="true">⚠</span> Traps
      </button>

      {/* Memory Anchors toggle */}
      {onToggleAnchors && (
        <button
          onClick={onToggleAnchors}
          aria-pressed={showAnchors}
          aria-label="Show only concepts with memory anchors"
          className={`flex items-center gap-1.5 px-3 py-2.5 md:py-1.5 rounded-lg text-sm font-medium border transition-all focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 ${
            showAnchors
              ? "bg-purple-500/20 border-purple-500/40 text-purple-300"
              : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200"
          }`}
        >
          <span aria-hidden="true">💡</span> Anchors
        </button>
      )}

      {/* Last 1 Hour Mode */}
      <button
        onClick={onToggleLastHour}
        aria-pressed={lastHourMode}
        aria-label="Toggle last 1 hour revision mode"
        className={`flex items-center gap-1.5 px-3 py-2.5 md:py-1.5 rounded-lg text-sm font-medium border transition-all focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 ${
          lastHourMode
            ? "bg-indigo-600/30 border-indigo-500/50 text-indigo-300"
            : "bg-gray-900 border-gray-800 text-gray-400 hover:text-gray-200"
        }`}
      >
        <span aria-hidden="true">⏱</span> Last 1 Hour
      </button>
    </div>
  );
}
