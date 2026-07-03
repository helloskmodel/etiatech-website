import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { successStories, caseSlug, getCaseBySlug, caseStudyImage } from "@/components/caseStudies";
import CaseStudyPageView from "@/components/CaseStudyPageView";

const SITE = "https://www.etiatech.com";

export function generateStaticParams() {
  return successStories.map((c) => ({ slug: caseSlug(c) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseBySlug(slug);
  if (!c) return { title: "Case Study — ETIA Technology" };
  const title = `${c.title} — UV Curing Case Study | ETIA Technology`;
  const description = (c.overview || c.challenge).slice(0, 160);
  const url = `${SITE}/case-studies/${slug}`;
  const img = caseStudyImage(c);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", images: img ? [img] : undefined },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseBySlug(slug);
  if (!c) notFound();

  const url = `${SITE}/case-studies/${slug}`;
  const img = caseStudyImage(c);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.overview || c.challenge,
    articleSection: c.industry,
    about: c.sector,
    keywords: c.keywords.join(", "),
    image: img || undefined,
    author: { "@type": "Organization", name: "ETIA Technology" },
    publisher: { "@type": "Organization", name: "ETIA Technology" },
    mainEntityOfPage: url,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE}/application#case-studies` },
      { "@type": "ListItem", position: 3, name: c.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CaseStudyPageView caseStudy={c} />
    </>
  );
}
