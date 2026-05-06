import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ConceptDetailPage from "@/components/ConceptDetailPage";
import {
  ALL_TOPICS,
  conceptUrl,
  conceptsByKey,
  topicDataBySlug,
  topicSeoBySlug,
} from "@/content/conceptsIndex";

/** Pre-render all 367 concept pages at build time. */
export function generateStaticParams(): { slug: string; conceptId: string }[] {
  const params: { slug: string; conceptId: string }[] = [];
  for (const t of ALL_TOPICS) {
    const data = topicDataBySlug.get(t.slug);
    if (!data) continue;
    for (const c of data.concepts) {
      params.push({ slug: t.slug, conceptId: c.id });
    }
  }
  return params;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string; conceptId: string }> }
): Promise<Metadata> {
  const { slug, conceptId } = await params;
  const concept = conceptsByKey.get(`${slug}:${conceptId}`);
  const topic = topicDataBySlug.get(slug);
  if (!concept || !topic) return {};

  const seoTopic = topicSeoBySlug[slug];
  const topicLabel = seoTopic?.title.split(" — ")[0] ?? topic.topicTitle;

  const firstSentence = concept.basic.split(/(?<=[.!?])\s+/)[0] ?? concept.basic;
  const description =
    firstSentence.length <= 155
      ? firstSentence
      : firstSentence.slice(0, 152).trimEnd() + "…";

  const title = `${concept.title} — ${topicLabel} Interview Revision | InterviewPrep`;
  const url = conceptUrl(slug, conceptId);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ slug: string; conceptId: string }>;
}) {
  const { slug, conceptId } = await params;
  const concept = conceptsByKey.get(`${slug}:${conceptId}`);
  if (!concept) notFound();
  return <ConceptDetailPage slug={slug} conceptId={conceptId} />;
}
