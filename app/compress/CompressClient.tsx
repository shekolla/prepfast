"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import CompressedTopic from "@/components/CompressedTopic";
import {
  buildTweetUrl,
  downloadBlob,
  generateSharePng,
  tryNativeShare,
} from "@/components/ShareCard";
import {
  byteSize,
  compressedBySlug,
  compressedTopics,
  TIER_LABEL,
  type CompressedTopic as CT,
  type CompressionTier,
} from "@/content/compressData";

const TIERS: CompressionTier[] = ["seed", "cheatsheet", "full"];

/** Rough byte estimate used only for the tier-selector preview labels. */
function estimateBytes(topic: CT, tier: CompressionTier): number {
  let bytes = byteSize(topic.mentalModelLine);
  bytes += topic.seeds.reduce((a, s) => a + byteSize(s.title) + byteSize(s.anchor), 0);
  if (tier === "seed") {
    bytes += topic.topTraps.slice(0, 3).reduce((a, t) => a + byteSize(t), 0);
    return bytes;
  }
  bytes += topic.highSeeds.reduce((a, s) => a + byteSize(s.title) + byteSize(s.anchor), 0);
  bytes += topic.topTraps.reduce((a, t) => a + byteSize(t), 0);
  bytes += topic.keyTakeaways.reduce((a, k) => a + byteSize(k), 0);
  bytes += topic.oneLiners.reduce((a, o) => a + byteSize(o.name) + byteSize(o.oneLiner), 0);
  if (tier === "cheatsheet") return bytes;
  bytes += [...topic.seeds, ...topic.highSeeds].reduce(
    (a, s) => a + byteSize(s.interviewAnswer),
    0
  );
  return bytes;
}

export default function CompressClient() {
  const [slug, setSlug] = useState<string>(compressedTopics[0]?.slug ?? "python");
  const [tier, setTier] = useState<CompressionTier>("seed");

  const topic = compressedBySlug.get(slug) ?? compressedTopics[0];

  const tierSizes = useMemo(
    () => TIERS.map((t) => ({ tier: t, bytes: estimateBytes(topic, t) })),
    [topic]
  );

  const [sharing, setSharing] = useState(false);
  const [shared, setShared] = useState(false);

  async function handleShare() {
    setSharing(true);
    try {
      const sizeKB = estimateBytes(topic, tier) / 1024;
      const blob = await generateSharePng({
        kind: "compress",
        topicTitle: topic.title,
        sizeKB,
        tierLabel: TIER_LABEL[tier],
        anchors: topic.seeds.slice(0, 4).map((s) => ({
          title: s.title,
          text: s.anchor,
        })),
        shareUrl: "prepfast.in/compress",
      });
      const filename = `prepfast-${topic.slug}-${tier}.png`;
      const text = `I fit ${topic.title} in ${sizeKB.toFixed(2)} KB 🧠`;
      const native = await tryNativeShare(blob, filename, text);
      if (!native) downloadBlob(blob, filename);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } finally {
      setSharing(false);
    }
  }

  function openTweet() {
    const sizeKB = estimateBytes(topic, tier) / 1024;
    const text = `I fit ${topic.title} in ${sizeKB.toFixed(2)} KB 🧠 via`;
    window.open(buildTweetUrl(text, "https://prepfast.in/compress/"), "_blank", "noopener");
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero header */}
      <header className="border-b border-gray-800 bg-gradient-to-b from-indigo-500/[0.04] to-transparent">
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-6">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-white transition-colors inline-flex items-center gap-1"
          >
            ← Home
          </Link>
          <div className="mt-3 flex items-baseline gap-3 flex-wrap">
            <h1 className="text-white text-2xl md:text-3xl font-bold">Compression Mode</h1>
          </div>
          <p className="mt-2 text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
            If you only had a <span className="text-white font-semibold">few KB</span> of memory to
            remember a whole topic, what would you keep? The{" "}
            <span className="text-indigo-300">anchors</span>. Everything else re-derives from
            these. Pick a topic, pick a budget, see what survives.
          </p>
        </div>
      </header>

      {/* Topic picker */}
      <nav className="sticky top-0 z-20 bg-gray-950/95 backdrop-blur border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex gap-1.5 min-w-max">
            {compressedTopics.map((t) => {
              const active = t.slug === slug;
              return (
                <button
                  key={t.slug}
                  onClick={() => setSlug(t.slug)}
                  className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                    active
                      ? "bg-indigo-500/20 text-indigo-200 border border-indigo-500/40"
                      : "bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700 hover:text-gray-200"
                  }`}
                >
                  {t.title}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Tier selector */}
      <div className="border-b border-gray-800 bg-gray-950">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2">
            Memory budget
          </div>
          <div className="grid grid-cols-3 gap-2">
            {tierSizes.map(({ tier: t, bytes }) => {
              const active = t === tier;
              const kb = (bytes / 1024).toFixed(1);
              return (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  className={`text-left rounded-lg p-3 border transition-all ${
                    active
                      ? "border-indigo-500/60 bg-indigo-500/10"
                      : "border-gray-800 bg-gray-900/40 hover:border-gray-700"
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <span className={`font-semibold text-sm ${active ? "text-indigo-200" : "text-white"}`}>
                      {TIER_LABEL[t]}
                    </span>
                    <span className={`text-xs font-mono ${active ? "text-indigo-300" : "text-gray-500"}`}>
                      ~{kb} KB
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5 leading-tight">
                    {t === "seed" && "Anchors + top traps"}
                    {t === "cheatsheet" && "+ high concepts + one-liners"}
                    {t === "full" && "+ interview answers"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Compressed content */}
      <main id="main-content" className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <CompressedTopic topic={topic} tier={tier} />

        <section className="mt-10 rounded-xl border border-indigo-500/30 bg-gradient-to-br from-indigo-500/[0.07] to-transparent p-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h3 className="text-white font-semibold text-base">Share your compressed seed</h3>
              <p className="text-gray-400 text-sm">
                Export as a 1200×630 image — the kind of thing people save and share.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                disabled={sharing}
                className="bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 text-white font-medium text-sm px-4 py-2 rounded-lg"
              >
                {sharing ? "Rendering…" : shared ? "✓ Image ready" : "Download image"}
              </button>
              <button
                onClick={openTweet}
                className="border border-gray-800 hover:border-gray-700 text-gray-300 text-sm px-4 py-2 rounded-lg"
              >
                Tweet
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
