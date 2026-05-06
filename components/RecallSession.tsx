"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  applyRating,
  loadState,
  recordReview,
  saveState,
  type RecallCard,
  type Rating,
  type SrsState,
} from "@/content/recallData";

interface Props {
  cards: RecallCard[];
  deckLabel: string;
  onExit: () => void;
}

interface ReviewRecord {
  cardId: string;
  rating: Rating;
  prevState: SrsState;
  nextState: SrsState;
}

const KIND_BADGE: Record<RecallCard["kind"], { label: string; classes: string }> = {
  anchor: { label: "Anchor → Concept", classes: "bg-indigo-500/15 text-indigo-300" },
  title: { label: "Concept → Anchor", classes: "bg-purple-500/15 text-purple-300" },
  trap: { label: "Spot the trap", classes: "bg-red-500/15 text-red-300" },
};

const IMP_DOT: Record<RecallCard["importance"], string> = {
  critical: "bg-red-500",
  high: "bg-yellow-500",
  medium: "bg-gray-500",
};

function formatInterval(days: number): string {
  if (days < 1 / 24) return "< 1h";
  if (days < 1) return `${Math.round(days * 24)}h`;
  if (days < 30) return `${Math.round(days)}d`;
  return `${Math.round(days / 30)}mo`;
}

export default function RecallSession({ cards, deckLabel, onExit }: Props) {
  const [queue] = useState<RecallCard[]>(cards);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [history, setHistory] = useState<ReviewRecord[]>([]);
  const [done, setDone] = useState(cards.length === 0);
  const cardRef = useRef<HTMLDivElement>(null);

  const current = queue[index] ?? null;
  const progress = queue.length === 0 ? 1 : Math.min(index, queue.length) / queue.length;

  // Preview of next intervals for each button.
  const previews = useMemo(() => {
    if (!current) return null;
    const st = loadState(current.id);
    return {
      again: applyRating(st, "again").interval,
      good: applyRating(st, "good").interval,
      easy: applyRating(st, "easy").interval,
    };
  }, [current, index]);

  const flip = useCallback(() => {
    if (!current) return;
    setRevealed((v) => !v);
  }, [current]);

  const rate = useCallback(
    (rating: Rating) => {
      if (!current || !revealed) return;
      const prevState = loadState(current.id);
      const nextState = applyRating(prevState, rating);
      saveState(current.id, nextState);
      recordReview();
      setHistory((h) => [...h, { cardId: current.id, rating, prevState, nextState }]);
      const nextIndex = index + 1;
      if (nextIndex >= queue.length) {
        setDone(true);
      } else {
        setIndex(nextIndex);
        setRevealed(false);
      }
    },
    [current, revealed, index, queue.length]
  );

  const undo = useCallback(() => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    saveState(last.cardId, last.prevState);
    setHistory((h) => h.slice(0, -1));
    if (done) {
      setDone(false);
      setIndex(queue.length - 1);
    } else {
      setIndex((i) => Math.max(0, i - 1));
    }
    setRevealed(true);
  }, [history, done, queue.length]);

  // Keyboard shortcuts.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // Ignore if typing inside an input/textarea.
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (done) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (!revealed) flip();
      } else if (revealed) {
        if (e.key === "1") { e.preventDefault(); rate("again"); }
        else if (e.key === "2") { e.preventDefault(); rate("good"); }
        else if (e.key === "3") { e.preventDefault(); rate("easy"); }
      }
      if (e.key === "u" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        undo();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [revealed, done, flip, rate, undo]);

  // End of session — summary.
  if (done) {
    const summary = {
      total: history.length,
      again: history.filter((h) => h.rating === "again").length,
      good: history.filter((h) => h.rating === "good").length,
      easy: history.filter((h) => h.rating === "easy").length,
    };
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🎯</div>
        <h2 className="text-white text-2xl font-bold mb-2">Session complete</h2>
        <p className="text-gray-400 mb-8">
          {deckLabel} · {summary.total} card{summary.total === 1 ? "" : "s"} reviewed
        </p>
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8" aria-live="polite">
          <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-4">
            <div className="text-red-300 text-2xl font-bold">{summary.again}</div>
            <div className="text-[11px] uppercase tracking-wider text-gray-500 mt-1">Again</div>
          </div>
          <div className="rounded-lg border border-green-500/30 bg-green-500/5 p-4">
            <div className="text-green-300 text-2xl font-bold">{summary.good}</div>
            <div className="text-[11px] uppercase tracking-wider text-gray-500 mt-1">Good</div>
          </div>
          <div className="rounded-lg border border-indigo-500/30 bg-indigo-500/5 p-4">
            <div className="text-indigo-300 text-2xl font-bold">{summary.easy}</div>
            <div className="text-[11px] uppercase tracking-wider text-gray-500 mt-1">Easy</div>
          </div>
        </div>
        <button
          onClick={onExit}
          className="bg-indigo-500 hover:bg-indigo-400 text-white font-medium px-5 py-2.5 rounded-lg"
        >
          Back to decks
        </button>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 mb-6">Nothing due — come back later.</p>
        <button
          onClick={onExit}
          className="bg-indigo-500 hover:bg-indigo-400 text-white font-medium px-5 py-2.5 rounded-lg"
        >
          Back to decks
        </button>
      </div>
    );
  }

  const badge = KIND_BADGE[current.kind];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col min-h-[calc(100vh-64px)]">
      {/* Top bar: progress + exit */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onExit}
          className="text-sm text-gray-500 hover:text-white transition-colors"
        >
          ← Exit
        </button>
        <div className="flex-1">
          <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 transition-all"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
        <div className="text-xs font-mono text-gray-500 tabular-nums">
          {index + 1} / {queue.length}
        </div>
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        onClick={() => !revealed && flip()}
        className={`flex-1 rounded-2xl border bg-gray-900 transition-all ${
          revealed ? "border-indigo-500/30" : "border-gray-800 cursor-pointer hover:border-gray-700"
        }`}
      >
        <div className="p-5 border-b border-gray-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`inline-block w-2 h-2 rounded-full ${IMP_DOT[current.importance]}`} />
            <span className="text-xs text-gray-500 truncate">{current.topicTitle}</span>
          </div>
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${badge.classes}`}>
            {badge.label}
          </span>
        </div>

        <div className="px-6 py-8 md:px-10 md:py-12" aria-live="polite">
          <div className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-3">
            Prompt
          </div>
          <p className="text-white text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
            {current.prompt}
          </p>

          {revealed && (
            <>
              <div className="border-t border-gray-800 my-6" />
              <div className="text-[10px] uppercase tracking-widest text-indigo-400 font-semibold mb-3">
                Answer
              </div>
              <p className="text-gray-200 text-lg md:text-xl leading-relaxed whitespace-pre-wrap">
                {current.answer}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6">
        {!revealed ? (
          <button
            onClick={flip}
            className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
          >
            Reveal answer
            <kbd className="text-[10px] font-mono bg-white/10 border border-white/20 rounded px-1.5 py-0.5">
              space
            </kbd>
          </button>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <RatingButton
              label="Again"
              hint={previews ? formatInterval(previews.again) : ""}
              shortcut="1"
              color="red"
              onClick={() => rate("again")}
            />
            <RatingButton
              label="Good"
              hint={previews ? formatInterval(previews.good) : ""}
              shortcut="2"
              color="green"
              onClick={() => rate("good")}
            />
            <RatingButton
              label="Easy"
              hint={previews ? formatInterval(previews.easy) : ""}
              shortcut="3"
              color="indigo"
              onClick={() => rate("easy")}
            />
          </div>
        )}
        <div className="flex items-center justify-between mt-3 text-[11px] text-gray-500">
          <span>
            {revealed ? "Rate honestly — the scheduler adapts." : "Space / Enter to reveal"}
          </span>
          <button
            onClick={undo}
            disabled={history.length === 0}
            className="disabled:opacity-30 hover:text-white transition-colors"
          >
            Undo{" "}
            <kbd className="text-[9px] font-mono bg-white/5 border border-white/10 rounded px-1 py-0.5 ml-1">
              ⌘U
            </kbd>
          </button>
        </div>
      </div>
    </div>
  );
}

function RatingButton({
  label,
  hint,
  shortcut,
  color,
  onClick,
}: {
  label: string;
  hint: string;
  shortcut: string;
  color: "red" | "green" | "indigo";
  onClick: () => void;
}) {
  const palette = {
    red: "bg-red-500/10 hover:bg-red-500/20 border-red-500/30 text-red-300",
    green: "bg-green-500/10 hover:bg-green-500/20 border-green-500/30 text-green-300",
    indigo: "bg-indigo-500/10 hover:bg-indigo-500/20 border-indigo-500/30 text-indigo-300",
  }[color];
  return (
    <button
      onClick={onClick}
      className={`border rounded-lg py-3 px-2 transition-colors text-center ${palette}`}
    >
      <div className="font-semibold text-base flex items-center justify-center gap-1.5">
        {label}
        <kbd className="text-[10px] font-mono bg-white/10 border border-white/15 rounded px-1 py-0.5">
          {shortcut}
        </kbd>
      </div>
      <div className="text-[11px] opacity-80 mt-0.5 font-mono">{hint}</div>
    </button>
  );
}
