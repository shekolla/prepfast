"use client";

import Link from "next/link";
import {
  byteSize,
  TIER_TAGLINE,
  type CompressedSeed,
  type CompressedTopic as CT,
  type CompressionTier,
} from "@/content/compressData";

interface Props {
  topic: CT;
  tier: CompressionTier;
}

function SeedLine({ seed, showTrap, showAnswer }: { seed: CompressedSeed; showTrap: boolean; showAnswer: boolean }) {
  return (
    <div className="py-2 border-b border-gray-800/60 last:border-b-0">
      <div className="text-white text-sm leading-snug">
        <span className="font-semibold text-indigo-300">{seed.title}</span>
        <span className="text-gray-400"> — {seed.anchor}</span>
        {seed.anchorSource === "basic" && (
          <span className="ml-1 text-[10px] uppercase tracking-wider text-gray-600">
            · no anchor
          </span>
        )}
      </div>
      {showTrap && seed.trap && (
        <div className="text-red-300/80 text-xs mt-1 pl-3 border-l-2 border-red-500/30">
          <span className="text-red-400/80 uppercase tracking-wider text-[10px] font-semibold mr-1.5">
            Trap
          </span>
          {seed.trap}
        </div>
      )}
      {showAnswer && (
        <div className="text-gray-300 text-xs mt-1 pl-3 border-l-2 border-green-500/30">
          <span className="text-green-400/80 uppercase tracking-wider text-[10px] font-semibold mr-1.5">
            Say
          </span>
          {seed.interviewAnswer}
        </div>
      )}
    </div>
  );
}

export default function CompressedTopic({ topic, tier }: Props) {
  const includeHigh = tier !== "seed";
  const includeAnswers = tier === "full";
  const includeTraps = tier !== "seed" || true; // seed tier shows topTraps block instead
  const showAllTrapInline = tier === "full";

  const seedPayload = topic.seeds.map((s) => s.anchor).join("\n");
  const highPayload = includeHigh ? topic.highSeeds.map((s) => s.anchor).join("\n") : "";
  const trapsPayload = topic.topTraps.slice(0, tier === "seed" ? 3 : topic.topTraps.length).join("\n");
  const takeawaysPayload = includeHigh ? topic.keyTakeaways.join("\n") : "";
  const oneLinersPayload = includeHigh
    ? topic.oneLiners.map((o) => `${o.name}: ${o.oneLiner}`).join("\n")
    : "";
  const answersPayload = includeAnswers
    ? [...topic.seeds, ...topic.highSeeds].map((s) => s.interviewAnswer).join("\n")
    : "";

  const totalBytes =
    byteSize(topic.mentalModelLine) +
    byteSize(seedPayload) +
    byteSize(highPayload) +
    byteSize(trapsPayload) +
    byteSize(takeawaysPayload) +
    byteSize(oneLinersPayload) +
    byteSize(answersPayload);

  const sizeKB = (totalBytes / 1024).toFixed(2);

  const skippedHigh = tier === "seed" ? topic.highSeeds.length : 0;
  const skippedAnswers = !includeAnswers ? topic.seeds.length + topic.highSeeds.length : 0;

  return (
    <article className="space-y-5">
      {/* Header row */}
      <header className="flex flex-wrap items-end justify-between gap-3 pb-3 border-b border-gray-800">
        <div>
          <h2 className="text-white text-xl font-bold">{topic.title}</h2>
          <p className="text-gray-500 text-xs">{TIER_TAGLINE[tier]}</p>
        </div>
        <div className="text-right">
          <div className="font-mono text-2xl font-bold text-indigo-300">{sizeKB} KB</div>
          <div className="text-gray-500 text-[11px] uppercase tracking-wider">
            {totalBytes.toLocaleString()} bytes
          </div>
        </div>
      </header>

      {/* Mental model one-liner */}
      <section>
        <div className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1.5">
          What it is
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">{topic.mentalModelLine}</p>
      </section>

      {/* Seeds — critical concepts */}
      <section>
        <div className="flex items-baseline justify-between mb-2">
          <div className="text-[10px] uppercase tracking-widest text-indigo-400 font-semibold">
            Seeds · {topic.seeds.length} critical
          </div>
          <div className="text-[10px] text-gray-600 font-mono">
            {(byteSize(seedPayload) / 1024).toFixed(2)} KB
          </div>
        </div>
        <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/[0.03] px-4">
          {topic.seeds.map((s) => (
            <SeedLine
              key={s.id}
              seed={s}
              showTrap={showAllTrapInline}
              showAnswer={includeAnswers}
            />
          ))}
        </div>
      </section>

      {/* High-importance concepts — cheatsheet + full only */}
      {includeHigh && topic.highSeeds.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between mb-2">
            <div className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
              High-importance · {topic.highSeeds.length}
            </div>
            <div className="text-[10px] text-gray-600 font-mono">
              {(byteSize(highPayload) / 1024).toFixed(2)} KB
            </div>
          </div>
          <div className="rounded-lg border border-gray-800 bg-gray-900/40 px-4">
            {topic.highSeeds.map((s) => (
              <SeedLine
                key={s.id}
                seed={s}
                showTrap={showAllTrapInline}
                showAnswer={includeAnswers}
              />
            ))}
          </div>
        </section>
      )}

      {/* Top traps */}
      {includeTraps && topic.topTraps.length > 0 && (
        <section>
          <div className="text-[10px] uppercase tracking-widest text-red-400 font-semibold mb-2">
            Top traps · {tier === "seed" ? Math.min(3, topic.topTraps.length) : topic.topTraps.length}
          </div>
          <ul className="space-y-1.5">
            {(tier === "seed" ? topic.topTraps.slice(0, 3) : topic.topTraps).map((t, i) => (
              <li key={i} className="text-gray-300 text-sm leading-snug pl-3 border-l-2 border-red-500/40">
                {t}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Cheatsheet extras */}
      {includeHigh && (
        <>
          {topic.keyTakeaways.length > 0 && (
            <section>
              <div className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2">
                Key takeaways
              </div>
              <ul className="space-y-1 list-disc list-inside marker:text-gray-600">
                {topic.keyTakeaways.map((k, i) => (
                  <li key={i} className="text-gray-300 text-sm leading-snug">{k}</li>
                ))}
              </ul>
            </section>
          )}

          {topic.oneLiners.length > 0 && (
            <section>
              <div className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2">
                One-liners
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-900/40 divide-y divide-gray-800/60">
                {topic.oneLiners.map((o, i) => (
                  <div key={i} className="p-3 text-sm">
                    <span className="text-white font-semibold">{o.name}</span>
                    <span className="text-gray-400"> — {o.oneLiner}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* What you lose at this tier */}
      {(skippedHigh > 0 || skippedAnswers > 0) && (
        <section className="rounded-lg border border-gray-800 bg-gray-900/40 p-3 text-xs text-gray-500">
          <span className="text-gray-400 font-semibold uppercase tracking-wider text-[10px] mr-2">
            What you lose
          </span>
          {skippedHigh > 0 && (
            <span className="mr-3">{skippedHigh} high-importance concepts</span>
          )}
          {skippedAnswers > 0 && (
            <span>{skippedAnswers} interview-ready answers</span>
          )}
          <span className="text-gray-600"> · re-derive from the anchors above.</span>
        </section>
      )}

      {/* Link back to full topic */}
      <footer className="pt-4">
        <Link
          href={`/topics/${topic.slug}/`}
          className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 text-sm"
        >
          Open full {topic.title} revision →
        </Link>
      </footer>
    </article>
  );
}
