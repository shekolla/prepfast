import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TopicClient from "./TopicClient";
import StructuredData, {
  breadcrumbSchema,
  collectionPageSchema,
} from "@/components/StructuredData";
import {
  ALL_TOPICS,
  conceptUrl,
  topicDataBySlug,
  topicSeoBySlug,
  topicUrl,
} from "@/content/conceptsIndex";

export function generateStaticParams() {
  return ALL_TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const seo = topicSeoBySlug[slug];
  if (!seo) return {};
  const url = topicUrl(slug);
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = topicDataBySlug.get(slug);
  if (!topic) notFound();

  const url = topicUrl(slug);
  const items = topic.concepts.map((c) => ({
    name: c.title,
    url: conceptUrl(slug, c.id),
  }));

  return (
    <>
      <StructuredData
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: topic.topicTitle, url },
          ]),
          collectionPageSchema({
            name: topic.topicTitle,
            description: topicSeoBySlug[slug]?.description ?? topic.topicMeta,
            url,
            items,
          }),
        ]}
      />
      <TopicClient slug={slug} />
    </>
  );
}
