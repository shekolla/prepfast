import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — InterviewPrep",
  description:
    "InterviewPrep is a free, open-source revision platform for software-engineering interviews. 14 topics, 396 concepts, dark theme, no signup.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="max-w-2xl mx-auto px-4 py-16">
      <Link
        href="/"
        className="text-gray-500 hover:text-gray-300 text-sm transition-colors mb-6 inline-block"
      >
        ← Home
      </Link>
      <h1 className="text-3xl font-bold text-white mb-6">About InterviewPrep</h1>

      <section className="space-y-5 text-gray-300 text-sm leading-relaxed">
        <p>
          InterviewPrep is a free, open-source revision platform for mid-to-senior
          software engineers. The goal is simple: revise any tech topic in under an hour
          before an interview, with content structured for fast recall — not passive
          reading.
        </p>

        <p>
          Every concept has three depth levels (basic / expected / deep), a ready-to-speak
          interview answer, a common-trap warning, and a vivid memory anchor. The
          knowledge tree visualizes how concepts connect; the &ldquo;Last 1 Hour&rdquo;
          cheatsheet compresses each topic into the highest-signal subset.
        </p>

        <p>
          Three feature pages take this further:{" "}
          <Link href="/recall/" className="text-indigo-400 hover:text-indigo-300">
            /recall
          </Link>{" "}
          turns the memory anchors and traps into spaced-repetition flashcards,{" "}
          <Link href="/compress/" className="text-indigo-400 hover:text-indigo-300">
            /compress
          </Link>{" "}
          shows what each topic looks like at a few KB of memory, and{" "}
          <Link href="/compare/" className="text-indigo-400 hover:text-indigo-300">
            /compare
          </Link>{" "}
          puts any two concepts side-by-side.
        </p>

        <h2 className="text-xl font-semibold text-white pt-4">How it works</h2>

        <p>
          The site is built with Next.js 16 (static export), TypeScript, and Tailwind 4.
          There is no backend, no auth, no database. Progress (reviewed cards, streak,
          last topic) is stored entirely in your browser&rsquo;s localStorage. Hosted on
          Vercel; also runs as a Docker container behind nginx.
        </p>

        <p>
          All content is hand-written, accuracy-reviewed, and corrected in the open via
          GitHub PRs. No AI hallucination passed through unchecked. Every fact-claim that
          could go stale (model pricing, API names, library versions) is reviewed against
          current docs.
        </p>

        <h2 className="text-xl font-semibold text-white pt-4">Open source</h2>

        <p>
          The full source — including every concept, every interview pattern, every
          common-mistake entry — is on GitHub at{" "}
          <a
            href="https://github.com/shekolla/prepfast"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-400 hover:text-indigo-300"
          >
            shekolla/prepfast
          </a>
          . MIT licensed. PRs welcome — see{" "}
          <a
            href="https://github.com/shekolla/prepfast/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-400 hover:text-indigo-300"
          >
            CONTRIBUTING.md
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold text-white pt-4">Contact</h2>

        <p>
          Best path: open an{" "}
          <a
            href="https://github.com/shekolla/prepfast/issues"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-400 hover:text-indigo-300"
          >
            issue on GitHub
          </a>{" "}
          for bugs or content corrections.
        </p>

        <p className="pt-4 text-xs text-gray-500">
          See also:{" "}
          <Link href="/privacy/" className="hover:text-gray-300">
            Privacy
          </Link>{" "}
          ·{" "}
          <Link href="/terms/" className="hover:text-gray-300">
            Terms
          </Link>
        </p>
      </section>
    </main>
  );
}
