import Link from "next/link";
import GlobalSearch from "@/components/GlobalSearch";
import ContinueCard from "@/components/ContinueCard";
import StructuredData, {
  collectionPageSchema,
  websiteSchema,
} from "@/components/StructuredData";

const topics = [
  {
    slug: "python",
    title: "Python",
    description: "GIL, memory model, concurrency, decorators, MRO, generators",
    readTime: "45–60 min",
    level: "Mid–Senior",
    available: true,
    tag: "Backend",
  },
  {
    slug: "javascript",
    title: "JavaScript",
    description: "Event loop, closures, prototypes, async/await, type coercion, ES6+",
    readTime: "45–60 min",
    level: "Mid–Senior",
    available: true,
    tag: "Frontend / Fullstack",
  },
  {
    slug: "nodejs",
    title: "Node.js",
    description: "Event loop phases, streams, worker threads, security, performance",
    readTime: "45–60 min",
    level: "Mid–Senior",
    available: true,
    tag: "Backend",
  },
  {
    slug: "java",
    title: "Java",
    description: "JVM internals, concurrency, HashMap internals, Spring, GC algorithms",
    readTime: "50–60 min",
    level: "Mid–Senior",
    available: true,
    tag: "Backend",
  },
  {
    slug: "kubernetes",
    title: "Kubernetes & Docker",
    description: "Containers, pods, deployments, services, networking, and RBAC",
    readTime: "50–60 min",
    level: "Mid–Senior",
    available: true,
    tag: "DevOps",
  },
  {
    slug: "dsa",
    title: "DSA",
    description: "Big O, trees, graphs, dynamic programming, sorting, hash tables",
    readTime: "60–75 min",
    level: "Mid–Senior",
    available: true,
    tag: "Coding Interview",
  },
  {
    slug: "system-design",
    title: "System Design",
    description: "Scalability, caching, CAP theorem, databases, messaging, reliability",
    readTime: "60–90 min",
    level: "Senior",
    available: true,
    tag: "Architecture",
  },
  {
    slug: "hld",
    title: "High-Level Design",
    description: "Microservices, event-driven, API design, observability, CQRS, sagas",
    readTime: "60–75 min",
    level: "Senior",
    available: true,
    tag: "Architecture",
  },
  {
    slug: "lld",
    title: "Low-Level Design",
    description: "SOLID, design patterns (Gang of Four), OOP, concurrency patterns",
    readTime: "50–60 min",
    level: "Mid–Senior",
    available: true,
    tag: "OOP / Patterns",
  },
  {
    slug: "databases",
    title: "Databases",
    description: "OLTP vs OLAP, PostgreSQL, MongoDB, Snowflake, ClickHouse, BigQuery — when to use what",
    readTime: "60–75 min",
    level: "Mid–Senior",
    available: true,
    tag: "Data",
  },
  {
    slug: "react",
    title: "React",
    description: "Hooks, fiber architecture, reconciliation, server components, performance optimization",
    readTime: "45–60 min",
    level: "Mid–Senior",
    available: true,
    tag: "Frontend / Fullstack",
  },
  {
    slug: "aws",
    title: "AWS / Cloud",
    description: "EC2, Lambda, S3, IAM, VPC, DynamoDB, CloudFormation — core cloud interview topics",
    readTime: "50–65 min",
    level: "Mid–Senior",
    available: true,
    tag: "DevOps",
  },
  {
    slug: "sql",
    title: "SQL Deep Dive",
    description: "Window functions, CTEs, query plans, indexes, transactions, MVCC, database internals",
    readTime: "45–60 min",
    level: "Mid–Senior",
    available: true,
    tag: "Data",
  },
  {
    slug: "ai-agents",
    title: "AI Coding Agents",
    description: "Claude Code, CLAUDE.md, skills, subagents, MCP, prompt caching, hooks — how to use Claude & Codex effectively",
    readTime: "45–60 min",
    level: "Mid–Senior",
    available: true,
    tag: "AI / Agents",
  },
];

const tagColors: Record<string, string> = {
  "Backend": "bg-blue-500/10 text-blue-400",
  "Frontend / Fullstack": "bg-purple-500/10 text-purple-400",
  "DevOps": "bg-cyan-500/10 text-cyan-400",
  "Coding Interview": "bg-green-500/10 text-green-400",
  "Architecture": "bg-orange-500/10 text-orange-400",
  "OOP / Patterns": "bg-pink-500/10 text-pink-400",
  "Data": "bg-emerald-500/10 text-emerald-400",
  "AI / Agents": "bg-indigo-500/10 text-indigo-400",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <StructuredData
        data={[
          websiteSchema(),
          collectionPageSchema({
            name: "InterviewPrep — 14 Topics",
            description:
              "Interview revision platform with 399 concepts across Python, JavaScript, Node.js, Java, DSA, System Design, HLD, LLD, Kubernetes, Databases, React, AWS, SQL, AI Coding Agents.",
            url: "/",
            items: topics.map((t) => ({ name: t.title, url: `/topics/${t.slug}/` })),
          }),
        ]}
      />
      <main id="main-content" className="max-w-4xl w-full mx-auto px-4 py-16 flex-1">
        {/* Hero */}
        <header className="mb-12 text-center">
          <div className="inline-block bg-indigo-600/20 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            Interview Revision Platform
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Revise any tech topic
            <br />
            <span className="text-indigo-400">in under 1 hour.</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            High-signal content for mid to senior engineers. Structured for fast
            recall, not passive reading.
          </p>
        </header>

        {/* Search */}
        <div className="mb-10">
          <GlobalSearch />
        </div>

        {/* Personalized continue card — only renders if user has activity */}
        <ContinueCard />

        {/* How it works — 3-step loop */}
        <section
          aria-labelledby="how-it-works"
          className="mb-12"
        >
          <h2 id="how-it-works" className="sr-only">How it works</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              {
                step: "1",
                title: "Compress",
                body: "Pick a topic at a memory budget — Python in 2 KB. See only the anchors you must remember.",
                href: "/compress/",
                accent: "from-purple-500/10 border-purple-500/30 text-purple-300",
              },
              {
                step: "2",
                title: "Recall",
                body: "Flashcards test the anchors. Spaced repetition picks the next card.",
                href: "/recall/",
                accent: "from-indigo-500/10 border-indigo-500/30 text-indigo-300",
              },
              {
                step: "3",
                title: "Compare",
                body: "Postgres vs Mongo, threading vs async. Side-by-side, shareable links.",
                href: "/compare/",
                accent: "from-pink-500/10 border-pink-500/30 text-pink-300",
              },
            ].map((s) => (
              <Link
                key={s.step}
                href={s.href}
                className={`group rounded-xl border bg-gradient-to-br ${s.accent} to-transparent p-4 hover:border-white/30 transition-colors`}
              >
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`font-mono text-xs font-semibold ${s.accent.split(" ").pop()}`}>
                    0{s.step}
                  </span>
                  <span className="text-white font-semibold text-sm">{s.title}</span>
                </div>
                <p className="text-gray-400 text-xs leading-snug">{s.body}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Mode badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-14">
          {[
            { icon: "⏱", label: "Last 1 Hour Mode" },
            { icon: "🎤", label: "Interview Answer Mode" },
            { icon: "⚠️", label: "Trap Mode" },
            { icon: "🌳", label: "Knowledge Tree" },
            { icon: "🟢🟡🔴", label: "Depth Levels" },
          ].map(({ icon, label }) => (
            <span
              key={label}
              className="bg-gray-800 text-gray-300 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-700"
            >
              <span aria-hidden="true">{icon}</span> {label}
            </span>
          ))}
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-6 mb-14 text-center" aria-label="Platform statistics">
          {[
            { value: "14", label: "Topics" },
            { value: "399", label: "Concepts" },
            { value: "112", label: "Interview Patterns" },
            { value: "168", label: "Common Mistakes" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-gray-500 text-sm uppercase tracking-wider mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Topics */}
        <section className="mb-8" aria-labelledby="topics-heading">
          <h2 id="topics-heading" className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-4">
            Topics
          </h2>
          <div className="grid gap-3">
            {topics.map((topic) => (
              <Link key={topic.slug} href={`/topics/${topic.slug}`} className="focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2 rounded-xl">
                <div className="group bg-gray-900 border border-gray-800 hover:border-indigo-500 rounded-xl p-5 flex items-center justify-between transition-all cursor-pointer">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-white font-semibold text-base group-hover:text-indigo-300 transition-colors">
                        {topic.title}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[topic.tag] ?? "bg-gray-700/50 text-gray-400"}`}>
                        {topic.tag}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm truncate">{topic.description}</p>
                  </div>
                  <div className="text-right ml-4 shrink-0">
                    <div className="text-gray-300 text-sm font-medium">{topic.readTime}</div>
                    <div className="text-gray-500 text-xs">{topic.level}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12" data-print-hidden>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">Stop reading docs. Start recalling.</p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <a
              href="https://github.com/shekolla/prepfast"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
            <p className="text-gray-600 text-xs">
              Open source — contributions welcome! Found a mistake or want to add a topic? Open a PR.
            </p>
            <nav aria-label="Site links" className="mt-2 text-xs text-gray-600 flex gap-3 flex-wrap justify-center">
              <Link href="/about/" className="hover:text-gray-300">About</Link>
              <span aria-hidden="true">·</span>
              <Link href="/privacy/" className="hover:text-gray-300">Privacy</Link>
              <span aria-hidden="true">·</span>
              <Link href="/terms/" className="hover:text-gray-300">Terms</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
