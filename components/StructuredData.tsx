/**
 * Inline JSON-LD script for search engines. Server-renderable.
 * Each invocation outputs one <script type="application/ld+json"> block.
 */
export default function StructuredData({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      // Safe — JSON.stringify escapes quotes; the < > chars are the only XSS risk and are not in JSON values we author.
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
    />
  );
}

const SITE_URL = "https://prepfast.in";

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.url}`,
    })),
  };
}

export function articleSchema(params: {
  headline: string;
  description: string;
  url: string;
  datePublished: string; // ISO
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.headline,
    description: params.description,
    url: `${SITE_URL}${params.url}`,
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,
    author: { "@type": "Organization", name: "InterviewPrep", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "InterviewPrep",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
    },
    image: `${SITE_URL}/og-image.png`,
  };
}

export function qaSchema(question: string, answer: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: question,
      answerCount: 1,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
        url: `${SITE_URL}${url}`,
      },
    },
  };
}

export function collectionPageSchema(params: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: params.name,
    description: params.description,
    url: `${SITE_URL}${params.url}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: params.items.length,
      itemListElement: params.items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        url: `${SITE_URL}${it.url}`,
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "InterviewPrep",
    alternateName: "PrepFast",
    url: SITE_URL,
    description:
      "Free, open-source interview revision platform for mid-to-senior engineers. 367 concepts across 13 topics with memory anchors, spaced-repetition flashcards, compression mode, and side-by-side comparison.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
