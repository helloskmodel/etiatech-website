import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyCnView from "@/components/CaseStudyCnView";
import { caseStudiesCn, getCaseCnBySlug } from "@/data/caseStudiesCn";

const SITE = "https://www.etiatech.com";

export function generateStaticParams() {
  return caseStudiesCn.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cn = getCaseCnBySlug(slug);
  if (!cn) return { title: "UV Curing Case Study — ETIA Technology" };
  const url = `${SITE}/case-studies/${slug}`;
  const seoTitle = cn.seoTitle.en;
  const seoDesc = cn.seoDesc.en;
  const keywords = [cn.primaryKw.en, cn.primaryKw.zh, ...`${cn.secondaryKw.en}，${cn.secondaryKw.zh ?? ""}`.split(/[，,]/).map((s) => s.trim())].filter((s): s is string => Boolean(s));
  return {
    title: `${seoTitle} | ETIA`,
    description: seoDesc,
    keywords,
    alternates: { canonical: url },
    openGraph: { title: seoTitle, description: seoDesc, url, type: "article", images: cn.image ? [cn.image] : undefined },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const cn = getCaseCnBySlug(slug);
  if (!cn) notFound();

  const url = `${SITE}/case-studies/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: cn.seoTitle.en,
    description: cn.seoDesc.en,
    articleSection: cn.industry.en,
    keywords: `${cn.primaryKw.en}, ${cn.secondaryKw.en}`,
    image: cn.image || undefined,
    author: { "@type": "Organization", name: "ETIA Technology" },
    publisher: { "@type": "Organization", name: "ETIA Technology" },
    mainEntityOfPage: url,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${SITE}/case-studies` },
      { "@type": "ListItem", position: 3, name: cn.title.en, item: url },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <CaseStudyCnView caseStudy={cn} />
    </>
  );
}
