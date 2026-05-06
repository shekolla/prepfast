"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import RecallSession from "@/components/RecallSession";
import {
  allCards,
  buildSessionQueue,
  getAllDecks,
  getDeckCards,
  loadStats,
  type DeckSummary,
  type RecallCard,
} from "@/content/recallData";

type View =
  | { kind: "picker" }
  | { kind: "session"; deckId: string; deckLabel: string; cards: RecallCard[] };

export default function RecallClient() {
  const [view, setView] = useState<View>({ kind: "picker" });
  const [hydrated, setHydrated] = useState(false);
  const [decks, setDecks] = useState<DeckSummary[]>([]);
  const [stats, setStats] = useState({ streak: 0, totalReviews: 0, lastStudyDate: "" });

  useEffect(() => {
    setHydrated(true);
    setDecks(getAllDecks());
    setStats(loadStats());
  }, [view]);

  function startDeck(deck: DeckSummary) {
    const cards = getDeckCards(deck.id);
    const queue = buildSessionQueue(cards);
    if (queue.length === 0) {
      // Fallback: no new/due → just take first 20 oldest to let user study anyway.
      const fallback = cards.slice(0, 20);
      setView({ kind: "session", deckId: deck.id, deckLabel: deck.label, cards: fallback });
      return;
    }
    setView({ kind: "session", deckId: deck.id, deckLabel: deck.label, cards: queue });
  }

  function exitSession() {
    setView({ kind: "picker" });
  }

  if (view.kind === "session") {
    return (
      <div className="min-h-screen bg-gray-950">
        <RecallSession cards={view.cards} deckLabel={view.deckLabel} onExit={exitSession} />
      </div>
    );
  }

  return <DeckPicker decks={decks} stats={stats} hydrated={hydrated} onStart={startDeck} totalCards={allCards.length} />;
}

function DeckPicker({
  decks,
  stats,
  hydrated,
  onStart,
  totalCards,
}: {
  decks: DeckSummary[];
  stats: { streak: number; totalReviews: number; lastStudyDate: string };
  hydrated: boolean;
  onStart: (deck: DeckSummary) => void;
  totalCards: number;
}) {
  const [search, setSearch] = useState("");

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return decks;
    return decks.filter(
      (d) => d.label.toLowerCase().includes(q) || d.sublabel.toLowerCase().includes(q)
    );
  }, [decks, search]);

  const special = visible.slice(0, 2); // due + critical
  const topics = visible.slice(2);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <header className="border-b border-gray-800 bg-gradient-to-b from-indigo-500/[0.05] to-transparent">
        <div className="max-w-4xl mx-auto px-4 pt-8 pb-6">
          <Link
            href="/"
            className="text-xs text-gray-500 hover:text-white transition-colors inline-flex items-center gap-1"
          >
            ← Home
          </Link>
          <div className="mt-3 flex items-baseline gap-3 flex-wrap">
            <h1 className="text-white text-2xl md:text-3xl font-bold">Active Recall</h1>
          </div>
          <p className="mt-2 text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Reading is not remembering. Flashcards auto-generated from every concept —
            memory anchors, titles, traps. Rate each card; a spaced-repetition scheduler
            picks the next one. Everything runs in your browser.
          </p>
        </div>
      </header>

      {/* Stats bar */}
      <div className="border-b border-gray-800 bg-gray-950/80">
        <div className="max-w-4xl mx-auto px-4 py-4 grid grid-cols-3 gap-3 sm:gap-6 text-center">
          <Stat
            label="Streak"
            value={hydrated ? (stats.streak === 0 ? "—" : `${stats.streak}d`) : "·"}
          />
          <Stat
            label="Cards reviewed"
            value={hydrated ? stats.totalReviews.toLocaleString() : "·"}
          />
          <Stat
            label="Total flashcards"
            value={totalCards.toLocaleString()}
            muted
          />
        </div>
      </div>

      {/* Search */}
      <div className="max-w-4xl w-full mx-auto px-4 pt-6">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter decks…"
          className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      {/* Decks */}
      <main id="main-content" className="max-w-4xl w-full mx-auto px-4 py-6 flex-1 space-y-8">
        {special.length > 0 && (
          <section>
            <h2 className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-3">
              Quick picks
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {special.map((d) => (
                <DeckCard key={d.id} deck={d} onStart={() => onStart(d)} hydrated={hydrated} highlight />
              ))}
            </div>
          </section>
        )}

        {topics.length > 0 && (
          <section>
            <h2 className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-3">
              By topic
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {topics.map((d) => (
                <DeckCard key={d.id} deck={d} onStart={() => onStart(d)} hydrated={hydrated} />
              ))}
            </div>
          </section>
        )}

        {visible.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-8">No decks match "{search}".</p>
        )}

        <section className="rounded-xl border border-gray-800 bg-gray-900/40 p-4 text-[13px] text-gray-400 leading-relaxed">
          <p className="text-gray-300 font-semibold mb-1">How it works</p>
          <ul className="space-y-1 list-disc pl-5 marker:text-gray-600">
            <li>
              Three card types per concept: anchor → concept, concept → anchor, and spot-the-trap.
            </li>
            <li>
              Rate <kbd className="font-mono text-[11px] bg-gray-800 border border-gray-700 rounded px-1">1</kbd>{" "}
              Again ·{" "}
              <kbd className="font-mono text-[11px] bg-gray-800 border border-gray-700 rounded px-1">2</kbd>{" "}
              Good ·{" "}
              <kbd className="font-mono text-[11px] bg-gray-800 border border-gray-700 rounded px-1">3</kbd>{" "}
              Easy. Simplified SM-2 picks the next interval.
            </li>
            <li>
              Everything lives in <code className="text-indigo-300">localStorage</code>. Clearing
              browser data resets progress — no accounts, nothing to sync.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

function DeckBadge({ deck }: { deck: DeckSummary }) {
  if (deck.id === "all-due") {
    if (deck.due === 0) {
      return (
        <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-600 bg-gray-900 border border-gray-800 rounded-full px-2 py-0.5">
          none yet
        </span>
      );
    }
    return (
      <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300 bg-indigo-500/15 rounded-full px-2 py-0.5">
        {deck.due} due
      </span>
    );
  }
  if (deck.due > 0) {
    return (
      <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300 bg-indigo-500/15 rounded-full px-2 py-0.5">
        {deck.due} due
      </span>
    );
  }
  if (deck.new_ > 0) {
    return (
      <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-800 rounded-full px-2 py-0.5">
        {deck.new_} new
      </span>
    );
  }
  return null;
}

function Stat({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div>
      <div className={`text-xl md:text-2xl font-bold ${muted ? "text-gray-400" : "text-white"}`}>
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-gray-500 mt-0.5">{label}</div>
    </div>
  );
}

function DeckCard({
  deck,
  onStart,
  hydrated,
  highlight,
}: {
  deck: DeckSummary;
  onStart: () => void;
  hydrated: boolean;
  highlight?: boolean;
}) {
  const canStart = deck.total > 0;
  return (
    <button
      onClick={onStart}
      disabled={!canStart}
      className={`text-left rounded-xl border p-4 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
        highlight
          ? "border-indigo-500/30 bg-indigo-500/5 hover:border-indigo-500/60"
          : "border-gray-800 bg-gray-900/40 hover:border-gray-700"
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <h3 className="text-white font-semibold text-base">{deck.label}</h3>
        {hydrated && (
          <DeckBadge deck={deck} />
        )}
      </div>
      <p className="text-gray-400 text-xs leading-snug mb-3 line-clamp-2">{deck.sublabel}</p>
      <div className="flex items-center gap-3 text-[11px] text-gray-500 font-mono">
        <span>{deck.total} cards</span>
        {hydrated && deck.id !== "all-due" && (
          <>
            <span>·</span>
            <span>{deck.new_} new</span>
            <span>·</span>
            <span>{deck.learning} learning</span>
          </>
        )}
      </div>
    </button>
  );
}
