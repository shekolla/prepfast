import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms — InterviewPrep",
  description:
    "Use InterviewPrep at your own discretion. Content is provided as-is for educational purposes; verify against authoritative sources before relying on it.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <main id="main-content" className="max-w-2xl mx-auto px-4 py-16">
      <Link
        href="/"
        className="text-gray-500 hover:text-gray-300 text-sm transition-colors mb-6 inline-block"
      >
        ← Home
      </Link>
      <h1 className="text-3xl font-bold text-white mb-2">Terms of Use</h1>
      <p className="text-gray-500 text-xs mb-8">Last updated: 2026-05-04</p>

      <section className="space-y-5 text-gray-300 text-sm leading-relaxed">
        <h2 className="text-xl font-semibold text-white">Use at your own discretion</h2>
        <p>
          InterviewPrep is an educational resource for software-engineering interview
          revision. Content is hand-written, accuracy-reviewed, and corrected in the open
          via GitHub PRs — but it&rsquo;s not infallible. Treat it as study material, not
          authoritative reference. Verify any specific fact (API name, model pricing,
          library version, security advice) against the upstream source before relying on
          it in production code or interviews.
        </p>

        <h2 className="text-xl font-semibold text-white pt-4">License</h2>
        <p>
          Source code is licensed under MIT (see{" "}
          <a
            href="https://github.com/shekolla/prepfast/blob/main/LICENSE"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-400 hover:text-indigo-300"
          >
            LICENSE
          </a>
          ). You may use, copy, modify, and redistribute the source code under the terms
          of that license. Content (concepts, interview answers, traps, memory anchors)
          is also covered by the same MIT license unless a specific concept cites a
          different source.
        </p>

        <h2 className="text-xl font-semibold text-white pt-4">No warranty</h2>
        <p>
          The site and its content are provided <strong>as-is</strong>, without warranty
          of any kind. We make no guarantee of accuracy, completeness, fitness for a
          particular purpose, or availability. We are not responsible for any outcome —
          interview, hiring, or otherwise — that depends on this content.
        </p>

        <h2 className="text-xl font-semibold text-white pt-4">Trademarks</h2>
        <p>
          Library names, framework names, model names, and product names referenced in
          the content (Claude, OpenAI, Python, React, AWS, etc.) belong to their
          respective owners. References here are factual — we are not affiliated with
          any of them.
        </p>

        <h2 className="text-xl font-semibold text-white pt-4">Contributions</h2>
        <p>
          By contributing to the project (PR, issue, discussion), you agree your
          contribution is licensed under the same MIT license. See{" "}
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

        <h2 className="text-xl font-semibold text-white pt-4">Changes to these terms</h2>
        <p>
          If material changes are made, the &ldquo;Last updated&rdquo; date at the top
          will reflect them. Continued use of the site after changes constitutes
          acceptance.
        </p>

        <p className="pt-4 text-xs text-gray-500">
          See also:{" "}
          <Link href="/about/" className="hover:text-gray-300">
            About
          </Link>{" "}
          ·{" "}
          <Link href="/privacy/" className="hover:text-gray-300">
            Privacy
          </Link>
        </p>
      </section>
    </main>
  );
}
