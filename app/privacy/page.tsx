import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy — InterviewPrep",
  description:
    "InterviewPrep stores progress entirely in your browser. No accounts, no third-party tracking beyond aggregated Vercel Web Analytics.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <main id="main-content" className="max-w-2xl mx-auto px-4 py-16">
      <Link
        href="/"
        className="text-gray-500 hover:text-gray-300 text-sm transition-colors mb-6 inline-block"
      >
        ← Home
      </Link>
      <h1 className="text-3xl font-bold text-white mb-2">Privacy</h1>
      <p className="text-gray-500 text-xs mb-8">Last updated: 2026-05-04</p>

      <section className="space-y-5 text-gray-300 text-sm leading-relaxed">
        <h2 className="text-xl font-semibold text-white">Short version</h2>
        <p>
          InterviewPrep does not have user accounts, does not collect personal data, and
          does not set tracking cookies. Your study progress is stored entirely in your
          own browser via <code className="bg-gray-900 px-1 rounded">localStorage</code>.
          The only analytics we run is Vercel Web Analytics, which is privacy-friendly
          (no cookies, no cross-site tracking, IP addresses are not retained).
        </p>

        <h2 className="text-xl font-semibold text-white pt-4">What we store</h2>
        <p>
          The following keys are written to your browser&rsquo;s localStorage as you use
          the site:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code className="bg-gray-900 px-1 rounded">reviewed:&lt;conceptId&gt;</code>{" "}
            — boolean flag per concept you mark as reviewed.
          </li>
          <li>
            <code className="bg-gray-900 px-1 rounded">recall:state:&lt;cardId&gt;</code>{" "}
            — SRS scheduling state per flashcard (ease factor, interval, due date).
          </li>
          <li>
            <code className="bg-gray-900 px-1 rounded">recall:stats</code> — aggregate
            study stats (streak, total reviews, last study date).
          </li>
          <li>
            <code className="bg-gray-900 px-1 rounded">prepfast:last-topic</code> — the
            slug of the last topic you opened (used to render the &ldquo;Continue X&rdquo;
            card on the home page).
          </li>
        </ul>
        <p>
          None of this data leaves your browser. We never see it. To wipe it, clear your
          browser&rsquo;s site data for InterviewPrep.
        </p>

        <h2 className="text-xl font-semibold text-white pt-4">Analytics</h2>
        <p>
          We use{" "}
          <a
            href="https://vercel.com/docs/analytics"
            target="_blank"
            rel="noreferrer"
            className="text-indigo-400 hover:text-indigo-300"
          >
            Vercel Web Analytics
          </a>{" "}
          to count page views and anonymous visit metrics. Vercel does not use cookies,
          does not track users across sites, and does not retain raw IP addresses. The
          data we see is aggregated: which pages are popular, which countries visitors
          are in, etc. We do not connect this to any individual user.
        </p>

        <h2 className="text-xl font-semibold text-white pt-4">Third-party links</h2>
        <p>
          Pages may link to GitHub, Anthropic docs, MCP specifications, or other external
          sites. We&rsquo;re not responsible for their privacy practices.
        </p>

        <h2 className="text-xl font-semibold text-white pt-4">Cookies</h2>
        <p>
          We do not set any cookies. We do not embed third-party widgets that set
          cookies. The site works entirely on static HTML/JS/CSS plus your local browser
          storage.
        </p>

        <h2 className="text-xl font-semibold text-white pt-4">Changes to this page</h2>
        <p>
          If we add a feature that changes data handling (e.g. an opt-in account system),
          we&rsquo;ll update this page and the &ldquo;Last updated&rdquo; date at the top.
        </p>

        <p className="pt-4 text-xs text-gray-500">
          See also:{" "}
          <Link href="/about/" className="hover:text-gray-300">
            About
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
