"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const NAV_MAP: Record<string, { href: string; label: string }> = {
  h: { href: "/", label: "Home" },
  r: { href: "/recall/", label: "Active Recall" },
  c: { href: "/compare/", label: "Compare" },
  s: { href: "/compress/", label: "Compression Mode" },
  t: { href: "/", label: "Topics (home)" },
};

/**
 * Site-wide keyboard shortcuts.
 * - `g` followed by (h|r|c|s|t) within 1s navigates to the corresponding page.
 * - `?` toggles a cheat-sheet overlay.
 * - `Esc` closes the overlay.
 *
 * Listens only when no input/textarea/contenteditable element is focused.
 */
export default function ShortcutsProvider() {
  const router = useRouter();
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [gArmed, setGArmed] = useState(false);

  const close = useCallback(() => setOverlayOpen(false), []);

  useEffect(() => {
    let gTimer: ReturnType<typeof setTimeout> | null = null;

    function disarm() {
      setGArmed(false);
      if (gTimer) clearTimeout(gTimer);
      gTimer = null;
    }

    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;

      // Don't hijack shortcut chords with a modifier.
      if (e.altKey || e.ctrlKey || e.metaKey) return;

      // `?` (Shift+/) toggles overlay.
      if (e.key === "?" || (e.key === "/" && e.shiftKey)) {
        e.preventDefault();
        setOverlayOpen((v) => !v);
        disarm();
        return;
      }

      // Esc closes overlay.
      if (e.key === "Escape" && overlayOpen) {
        e.preventDefault();
        setOverlayOpen(false);
        disarm();
        return;
      }

      if (gArmed) {
        const dest = NAV_MAP[e.key.toLowerCase()];
        if (dest) {
          e.preventDefault();
          router.push(dest.href);
        }
        disarm();
        return;
      }

      if (e.key === "g") {
        setGArmed(true);
        gTimer = setTimeout(disarm, 1000);
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (gTimer) clearTimeout(gTimer);
    };
  }, [gArmed, overlayOpen, router]);

  return (
    <>
      {gArmed && (
        <div
          aria-hidden="true"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 border border-gray-700 text-gray-200 text-xs px-3 py-1.5 rounded-full font-mono shadow-lg"
        >
          g… (then h / r / c / s / t)
        </div>
      )}
      {overlayOpen && <ShortcutsOverlay onClose={close} />}
    </>
  );
}

function ShortcutsOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
      className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 md:p-10 overflow-y-auto"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-gray-950 border border-gray-800 rounded-xl shadow-2xl"
      >
        <header className="flex items-center justify-between px-5 py-3 border-b border-gray-800">
          <h2 className="text-white font-semibold text-sm">Keyboard shortcuts</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-500 hover:text-white text-lg leading-none px-2 -mr-2"
          >
            ×
          </button>
        </header>
        <div className="p-5 space-y-5 text-sm">
          <Section title="Navigation">
            <Row keys={["g", "h"]} label="Go to home" />
            <Row keys={["g", "r"]} label="Active Recall (flashcards)" />
            <Row keys={["g", "c"]} label="Compare concepts" />
            <Row keys={["g", "s"]} label="Compression Mode" />
            <Row keys={["g", "t"]} label="Topics list (home)" />
          </Section>
          <Section title="Global">
            <Row keys={["⌘", "K"]} label="Open search" />
            <Row keys={["?"]} label="Show this overlay" />
            <Row keys={["Esc"]} label="Close / clear" />
          </Section>
          <Section title="Active Recall">
            <Row keys={["Space"]} label="Flip card" />
            <Row keys={["1"]} label="Again" />
            <Row keys={["2"]} label="Good" />
            <Row keys={["3"]} label="Easy" />
            <Row keys={["⌘", "U"]} label="Undo last rating" />
          </Section>
        </div>
        <footer className="px-5 py-3 border-t border-gray-800 text-[11px] text-gray-500">
          Shortcuts are disabled while typing in input fields.
        </footer>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-2">{title}</h3>
      <div className="space-y-1.5">{children}</div>
    </section>
  );
}

function Row({ keys, label }: { keys: string[]; label: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-0.5">
      <span className="text-gray-300">{label}</span>
      <span className="flex items-center gap-1">
        {keys.map((k, i) => (
          <kbd
            key={i}
            className="font-mono text-[11px] bg-gray-800 border border-gray-700 text-gray-200 rounded px-1.5 py-0.5 min-w-[22px] text-center"
          >
            {k}
          </kbd>
        ))}
      </span>
    </div>
  );
}
