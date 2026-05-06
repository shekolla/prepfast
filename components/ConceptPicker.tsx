"use client";

import { useEffect, useRef, useState } from "react";
import {
  allConcepts,
  searchConcepts,
  type IndexedConcept,
} from "@/content/conceptsIndex";

interface Props {
  value: IndexedConcept | null;
  onChange: (c: IndexedConcept | null) => void;
  placeholder?: string;
  excludeKey?: string | null;
  label?: string;
  accent?: "a" | "b";
}

export default function ConceptPicker({
  value,
  onChange,
  placeholder = "Pick a concept…",
  excludeKey,
  label,
  accent = "a",
}: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results: IndexedConcept[] = (() => {
    if (!query.trim()) {
      // Show a few popular defaults: critical concepts across varied topics.
      const criticals = allConcepts.filter((c) => c.importance === "critical");
      return criticals.slice(0, 15);
    }
    return searchConcepts(query, 20);
  })().filter((c) => c.key !== excludeKey);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    setHighlighted(0);
  }, [query]);

  function pick(c: IndexedConcept) {
    onChange(c);
    setQuery("");
    setOpen(false);
  }

  function clear() {
    onChange(null);
    setQuery("");
    inputRef.current?.focus();
  }

  const accentRing = accent === "a" ? "focus-within:ring-indigo-500/60" : "focus-within:ring-pink-500/60";
  const accentBorder = accent === "a" ? "border-indigo-500/30" : "border-pink-500/30";

  return (
    <div ref={wrapperRef} className="relative">
      {label && (
        <div className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1.5">
          {label}
        </div>
      )}
      <div
        className={`flex items-center gap-2 rounded-lg border bg-gray-900 px-3 py-2 ring-1 ring-transparent transition-all ${
          value ? accentBorder : "border-gray-800"
        } ${accentRing}`}
      >
        {value ? (
          <>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-semibold truncate">{value.title}</div>
              <div className="text-gray-500 text-xs truncate">{value.topicTitle} · {value.category}</div>
            </div>
            <button
              onClick={clear}
              aria-label="Clear selection"
              className="text-gray-500 hover:text-white text-lg leading-none px-1"
            >
              ×
            </button>
          </>
        ) : (
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (!open) return;
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setHighlighted((h) => Math.min(results.length - 1, h + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlighted((h) => Math.max(0, h - 1));
              } else if (e.key === "Enter") {
                e.preventDefault();
                if (results[highlighted]) pick(results[highlighted]);
              } else if (e.key === "Escape") {
                setOpen(false);
              }
            }}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-sm text-gray-100 placeholder-gray-600 outline-none"
          />
        )}
      </div>

      {open && !value && results.length > 0 && (
        <div className="absolute z-30 left-0 right-0 mt-1 rounded-lg border border-gray-800 bg-gray-950 shadow-2xl shadow-black/40 max-h-80 overflow-y-auto">
          {!query.trim() && (
            <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-gray-600 border-b border-gray-800">
              Popular · critical concepts
            </div>
          )}
          {results.map((c, i) => (
            <button
              key={c.key}
              onMouseDown={(e) => { e.preventDefault(); pick(c); }}
              onMouseEnter={() => setHighlighted(i)}
              className={`w-full text-left px-3 py-2 flex items-center justify-between gap-2 ${
                highlighted === i ? "bg-indigo-500/10" : "hover:bg-gray-900"
              }`}
            >
              <div className="min-w-0">
                <div className="text-white text-sm truncate">{c.title}</div>
                <div className="text-gray-500 text-xs truncate">{c.topicTitle} · {c.category}</div>
              </div>
              {c.importance === "critical" && (
                <span className="text-[10px] font-semibold uppercase text-red-300 bg-red-500/10 rounded px-1.5 py-0.5">
                  critical
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
