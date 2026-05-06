"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ConceptPicker from "@/components/ConceptPicker";
import CompareColumn from "@/components/CompareColumn";
import {
  buildTweetUrl,
  downloadBlob,
  generateSharePng,
  tryNativeShare,
} from "@/components/ShareCard";
import {
  conceptsByKey,
  findConceptByKey,
  type IndexedConcept,
} from "@/content/conceptsIndex";

const SECTIONS: { key: "anchor" | "basic" | "expected" | "deep" | "interviewAnswer" | "trap"; label: string; sublabel: string }[] = [
  { key: "anchor", label: "Memory anchor", sublabel: "Vivid analogy — the L1 compression" },
  { key: "basic", label: "Basic", sublabel: "One-sentence definition" },
  { key: "expected", label: "Expected", sublabel: "Mid-level depth — what most interviewers want" },
  { key: "deep", label: "Deep", sublabel: "Senior depth — internals and edge cases" },
  { key: "interviewAnswer", label: "Interview answer", sublabel: "Ready-to-speak response" },
  { key: "trap", label: "Trap", sublabel: "The common gotcha" },
];

// A small curated list of compelling default pairs shown on the empty state.
const SUGGESTIONS: { a: string; b: string; label: string }[] = [
  { a: "databases:postgresql", b: "databases:mongodb", label: "PostgreSQL vs MongoDB" },
  { a: "python:threading", b: "python:multiprocessing", label: "Threading vs Multiprocessing" },
  { a: "javascript:promises", b: "javascript:async-await", label: "Promises vs async/await" },
  { a: "databases:redis", b: "aws:elasticache", label: "Redis vs ElastiCache" },
  { a: "nodejs:process-nexttick", b: "nodejs:setimmediate-vs-settimeout", label: "process.nextTick vs setImmediate" },
  { a: "system-design:cap-theorem", b: "databases:cap-theorem-practical", label: "CAP theorem — theory vs practice" },
];

function CompareInner() {
  const router = useRouter();
  const params = useSearchParams();

  const keyA = params.get("a");
  const keyB = params.get("b");

  const [a, setA] = useState<IndexedConcept | null>(findConceptByKey(keyA));
  const [b, setB] = useState<IndexedConcept | null>(findConceptByKey(keyB));

  // Keep local state in sync with URL when the user uses back/forward.
  useEffect(() => {
    setA(findConceptByKey(keyA));
    setB(findConceptByKey(keyB));
  }, [keyA, keyB]);

  const updateUrl = useCallback(
    (next: { a: IndexedConcept | null; b: IndexedConcept | null }) => {
      const sp = new URLSearchParams();
      if (next.a) sp.set("a", next.a.key);
      if (next.b) sp.set("b", next.b.key);
      const qs = sp.toString();
      router.replace(`/compare/${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router]
  );

  const onPickA = useCallback(
    (c: IndexedConcept | null) => {
      setA(c);
      updateUrl({ a: c, b });
    },
    [b, updateUrl]
  );

  const onPickB = useCallback(
    (c: IndexedConcept | null) => {
      setB(c);
      updateUrl({ a, b: c });
    },
    [a, updateUrl]
  );

  const swap = useCallback(() => {
    setA(b);
    setB(a);
    updateUrl({ a: b, b: a });
  }, [a, b, updateUrl]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    if (!a || !b) return "";
    return `${window.location.origin}/compare/?a=${a.key}&b=${b.key}`;
  }, [a, b]);

  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    if (!shareUrl || typeof navigator === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }, [shareUrl]);

  const [sharing, setSharing] = useState(false);
  const [shared, setShared] = useState(false);

  const handleShareImage = useCallback(async () => {
    if (!a || !b) return;
    setSharing(true);
    try {
      const blob = await generateSharePng({
        kind: "compare",
        a: {
          title: a.title,
          topic: a.topicTitle,
          anchor: a.memoryAnchor || a.basic,
        },
        b: {
          title: b.title,
          topic: b.topicTitle,
          anchor: b.memoryAnchor || b.basic,
        },
        shareUrl: "prepfast.in/compare",
      });
      const filename = `prepfast-compare-${a.id}-vs-${b.id}.png`;
      const text = `${a.title} vs ${b.title} — side-by-side`;
      const native = await tryNativeShare(blob, filename, text);
      if (!native) downloadBlob(blob, filename);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } finally {
      setSharing(false);
    }
  }, [a, b]);

  const openTweet = useCallback(() => {
    if (!a || !b) return;
    const text = `${a.title} vs ${b.title} — side-by-side memory anchors via`;
    window.open(buildTweetUrl(text, shareUrl), "_blank", "noopener");
  }, [a, b, shareUrl]);

  const bothChosen = a !== null && b !== null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <header className="border-b border-gray-800 bg-gradient-to-b from-pink-500/[0.04] via-indigo-500/[0.03] to-transparent">
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-6">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-white transition-colors inline-flex items-center gap-1"
          >
            ← Home
          </Link>
          <div className="mt-3 flex items-baseline gap-3 flex-wrap">
            <h1 className="text-white text-2xl md:text-3xl font-bold">Compare</h1>
          </div>
          <p className="mt-2 text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Interview questions love comparisons. Pick any two concepts — from the same
            topic or across topics — and see them aligned row-by-row: anchor, basic, deep,
            interview answer, and trap.
          </p>
        </div>
      </header>

      {/* Pickers */}
      <section className="border-b border-gray-800 bg-gray-950/80 sticky top-0 z-20 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-3 items-end">
            <ConceptPicker
              value={a}
              onChange={onPickA}
              placeholder="Search concept A…"
              excludeKey={b?.key ?? null}
              label="Concept A"
              accent="a"
            />
            <button
              onClick={swap}
              disabled={!a && !b}
              className="h-10 px-3 rounded-lg border border-gray-800 bg-gray-900 hover:border-gray-700 text-gray-300 text-sm disabled:opacity-30 disabled:cursor-not-allowed self-end mb-0.5"
              aria-label="Swap A and B"
              title="Swap"
            >
              ⇄
            </button>
            <ConceptPicker
              value={b}
              onChange={onPickB}
              placeholder="Search concept B…"
              excludeKey={a?.key ?? null}
              label="Concept B"
              accent="b"
            />
          </div>

          {bothChosen && (
            <div className="flex items-center justify-end mt-3 gap-2 text-xs flex-wrap">
              <button
                onClick={copy}
                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white px-2 py-1 rounded border border-gray-800 hover:border-gray-700"
              >
                {copied ? "✓ Link copied" : "Copy link"}
              </button>
              <button
                onClick={handleShareImage}
                disabled={sharing}
                className="inline-flex items-center gap-1.5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 text-white font-medium px-2.5 py-1 rounded"
              >
                {sharing ? "Rendering…" : shared ? "✓ Image ready" : "Download image"}
              </button>
              <button
                onClick={openTweet}
                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white px-2 py-1 rounded border border-gray-800 hover:border-gray-700"
              >
                Tweet
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <main id="main-content" className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {!bothChosen ? (
          <EmptyState onChoose={(pair) => {
            setA(pair.a);
            setB(pair.b);
            updateUrl({ a: pair.a, b: pair.b });
          }} />
        ) : (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
              <CompareColumn concept={a} accent="a" section="header" />
              <CompareColumn concept={b} accent="b" section="header" />
            </div>

            {SECTIONS.map((s) => (
              <div key={s.key}>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-white text-sm font-semibold">{s.label}</h3>
                  <span className="text-[10px] uppercase tracking-wider text-gray-600">{s.sublabel}</span>
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                  <CompareColumn concept={a} accent="a" section={s.key} />
                  <CompareColumn concept={b} accent="b" section={s.key} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function EmptyState({ onChoose }: { onChoose: (pair: { a: IndexedConcept; b: IndexedConcept }) => void }) {
  const resolved = SUGGESTIONS.map((s) => {
    const a = conceptsByKey.get(s.a);
    const b = conceptsByKey.get(s.b);
    if (!a || !b) return null;
    return { label: s.label, a, b };
  }).filter((s): s is { label: string; a: IndexedConcept; b: IndexedConcept } => Boolean(s));

  return (
    <div>
      <div className="text-center py-10">
        <div className="text-5xl mb-3">⇄</div>
        <h2 className="text-white font-semibold text-lg mb-1">Start with a comparison</h2>
        <p className="text-gray-500 text-sm">Pick two concepts above, or try one of these.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
        {resolved.map((s) => (
          <button
            key={s.label}
            onClick={() => onChoose({ a: s.a, b: s.b })}
            className="text-left rounded-lg border border-gray-800 bg-gray-900/40 hover:border-indigo-500/40 p-4 transition-colors"
          >
            <div className="text-white text-sm font-semibold mb-1">{s.label}</div>
            <div className="text-gray-500 text-xs">
              {s.a.topicTitle} · {s.b.topicTitle}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CompareClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
      <CompareInner />
    </Suspense>
  );
}
