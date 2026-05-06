"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { SearchEntry } from "@/content/searchIndex";

// Lazy-loaded so the heavy search index (all 14 topic data files) is split
// into a separate chunk and not bundled into the home-page initial JS.
let searchModule: typeof import("@/content/searchIndex") | null = null;
let searchModulePromise: Promise<typeof import("@/content/searchIndex")> | null = null;
function loadSearchModule() {
  if (searchModule) return Promise.resolve(searchModule);
  if (!searchModulePromise) {
    searchModulePromise = import("@/content/searchIndex").then((mod) => {
      searchModule = mod;
      return mod;
    });
  }
  return searchModulePromise;
}

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    let cancelled = false;
    const timer = setTimeout(() => {
      loadSearchModule().then((mod) => {
        if (cancelled) return;
        setResults(mod.search(query));
        setSelected(0);
      });
    }, 150);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  // Warm the search index chunk on focus so the first keystroke feels instant.
  function handleFocus() {
    setOpen(true);
    loadSearchModule();
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function navigate(entry: SearchEntry) {
    setOpen(false);
    setQuery("");
    router.push(`/topics/${entry.topicSlug}/${entry.conceptId}/`);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[selected]) {
      navigate(results[selected]);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder="Search 399 concepts across all topics..."
          aria-label="Search concepts"
          aria-expanded={open && results.length > 0}
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 pl-10 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-block text-xs text-gray-600 border border-gray-700 rounded px-1.5 py-0.5">
          {"\u2318"}K
        </kbd>
      </div>

      {open && results.length > 0 && (
        <div
          role="listbox"
          className="absolute z-50 mt-2 w-full bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto"
        >
          {results.map((entry, i) => (
            <button
              key={`${entry.topicSlug}-${entry.conceptId}`}
              role="option"
              aria-selected={i === selected}
              onClick={() => navigate(entry)}
              onMouseEnter={() => setSelected(i)}
              className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
                i === selected ? "bg-indigo-600/20" : "hover:bg-gray-800"
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white font-medium truncate">
                    {entry.title}
                  </span>
                  <span className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full shrink-0">
                    {entry.topicTitle}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 truncate">
                  {entry.snippet}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {open && query.trim() && results.length === 0 && (
        <div className="absolute z-50 mt-2 w-full bg-gray-900 border border-gray-700 rounded-xl shadow-2xl p-4 text-center text-gray-500 text-sm">
          No concepts found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
