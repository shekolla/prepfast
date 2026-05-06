import Link from "next/link";
import {
  conceptUrl,
  findConceptByKey,
  findRelatedConcepts,
  topicDataBySlug,
  topicUrl,
  type IndexedConcept,
} from "@/content/conceptsIndex";
import StructuredData, {
  articleSchema,
  breadcrumbSchema,
  qaSchema,
} from "@/components/StructuredData";
import ConceptDiagram from "@/components/ConceptDiagram";

interface Props {
  slug: string;
  conceptId: string;
}

const importancePill: Record<IndexedConcept["importance"], string> = {
  critical: "bg-red-500/15 text-red-300 border-red-500/30",
  high: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  medium: "bg-gray-700/50 text-gray-300 border-gray-600/40",
};

/** Per-concept SEO landing page. Rendered server-side as part of static export. */
export default function ConceptDetailPage({ slug, conceptId }: Props) {
  const concept = findConceptByKey(`${slug}:${conceptId}`);
  const topic = topicDataBySlug.get(slug);

  if (!concept || !topic) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-white text-2xl font-bold mb-2">Concept not found</h1>
        <p className="text-gray-400">
          <Link href="/" className="text-indigo-400 hover:text-indigo-300">Back to home</Link>
        </p>
      </main>
    );
  }

  const url = conceptUrl(slug, conceptId);
  const related = findRelatedConcepts(concept, 8);
  const categoryLabel = topic.categories.find((c) => c.id === concept.category)?.label ?? concept.category;

  const firstSentence = concept.basic.split(/(?<=[.!?])\s+/)[0] ?? concept.basic;

  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: topic.topicTitle, url: topicUrl(slug) },
            { name: concept.title, url },
          ]),
          articleSchema({
            headline: concept.title,
            description: firstSentence,
            url,
            datePublished: topic.lastUpdated,
          }),
          qaSchema(
            `What is ${concept.title} in ${topic.topicTitle}?`,
            concept.interviewAnswer,
            url
          ),
        ]}
      />

      <div className="min-h-screen flex flex-col">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="border-b border-gray-800 bg-gray-950/80 backdrop-blur sticky top-0 z-20"
        >
          <ol className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-2 text-xs text-gray-500 whitespace-nowrap overflow-x-auto">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link
                href={topicUrl(slug)}
                className="hover:text-white transition-colors"
              >
                {topic.topicTitle}
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="text-gray-300 truncate" aria-current="page">
              {concept.title}
            </li>
          </ol>
        </nav>

        <main className="flex-1">
          <article className="max-w-3xl mx-auto px-4 py-10">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                  {categoryLabel}
                </span>
                <span
                  className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded border ${importancePill[concept.importance]}`}
                >
                  {concept.importance}
                </span>
              </div>
              <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight">
                {concept.title}
              </h1>
              <p className="mt-3 text-gray-400 text-base leading-relaxed">
                {concept.basic}
              </p>
            </header>

            {/* Diagram — visual reinforcement, only when concept ships one */}
            {concept.diagram && (
              <section className="mb-8">
                <ConceptDiagram source={concept.diagram} caption={concept.diagramCaption} />
              </section>
            )}

            {/* Memory anchor */}
            {concept.memoryAnchor && (
              <section className="mb-8 rounded-xl border border-indigo-500/30 bg-indigo-500/[0.06] p-5">
                <div className="text-[10px] uppercase tracking-widest text-indigo-300 font-semibold mb-2">
                  Memory anchor
                </div>
                <p className="text-gray-100 text-base leading-relaxed">
                  {concept.memoryAnchor}
                </p>
              </section>
            )}

            {/* Expected depth */}
            <section className="mb-6 rounded-xl border border-yellow-500/30 bg-yellow-500/[0.04] p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500" aria-hidden="true" />
                <span className="text-[10px] uppercase tracking-widest text-yellow-400 font-semibold">
                  Expected depth
                </span>
              </div>
              <p className="text-gray-200 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {concept.expected}
              </p>
            </section>

            {/* Deep depth */}
            <section className="mb-8 rounded-xl border border-red-500/30 bg-red-500/[0.04] p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500" aria-hidden="true" />
                <span className="text-[10px] uppercase tracking-widest text-red-400 font-semibold">
                  Deep — senior internals
                </span>
              </div>
              <p className="text-gray-200 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {concept.deep}
              </p>
            </section>

            {/* Interview answer */}
            <section className="mb-6 rounded-xl border border-green-500/30 bg-green-500/[0.04] p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-400">🎤</span>
                <span className="text-[10px] uppercase tracking-widest text-green-400 font-semibold">
                  Interview-ready answer
                </span>
              </div>
              <p className="text-gray-100 text-base leading-relaxed whitespace-pre-wrap">
                {concept.interviewAnswer}
              </p>
            </section>

            {/* Trap */}
            {concept.trap && (
              <section className="mb-8 rounded-xl border border-orange-500/30 bg-orange-500/[0.04] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-orange-400">⚠</span>
                  <span className="text-[10px] uppercase tracking-widest text-orange-400 font-semibold">
                    Common trap
                  </span>
                </div>
                <p className="text-gray-200 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {concept.trap}
                </p>
              </section>
            )}

            {/* Related concepts */}
            {related.length > 0 && (
              <section className="mb-10">
                <h2 className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-3">
                  Related concepts
                </h2>
                <div className="grid sm:grid-cols-2 gap-2">
                  {related.map((r) => (
                    <Link
                      key={r.key}
                      href={conceptUrl(r.topicSlug, r.id)}
                      className="group rounded-lg border border-gray-800 hover:border-indigo-500/40 bg-gray-900/40 p-3 transition-colors"
                    >
                      <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-0.5">
                        {r.topicTitle}
                      </div>
                      <div className="text-white group-hover:text-indigo-300 text-sm font-medium">
                        {r.title}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* CTAs */}
            <nav className="pt-6 border-t border-gray-800 flex flex-wrap gap-3 text-sm">
              <Link
                href={topicUrl(slug)}
                className="inline-flex items-center gap-1 text-indigo-300 hover:text-indigo-200"
              >
                ← All {topic.topicTitle} concepts
              </Link>
              <span className="text-gray-700" aria-hidden="true">·</span>
              <Link
                href={`/compare/?a=${concept.key}`}
                className="inline-flex items-center gap-1 text-pink-300 hover:text-pink-200"
              >
                Compare with another concept →
              </Link>
              <span className="text-gray-700" aria-hidden="true">·</span>
              <Link href="/recall/" className="text-gray-400 hover:text-white">
                Study with flashcards
              </Link>
            </nav>
          </article>
        </main>
      </div>
    </>
  );
}
