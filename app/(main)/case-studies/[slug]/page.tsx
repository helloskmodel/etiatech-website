import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { successStories, caseSlug, getCaseBySlug, caseStudyImage } from "@/components/caseStudies";
import { brandsForCase, systemsForCase, techRoutesForCase } from "@/components/productApplications";
import { productModel } from "@/components/productCatalog";
import CaseStudyPageView from "@/components/CaseStudyPageView";
import CaseStudyCnView from "@/components/CaseStudyCnView";
import { caseStudiesCn, getCaseCnBySlug } from "@/data/caseStudiesCn";

const SITE = "https://www.etiatech.com";

export function generateStaticParams() {
  return [
    ...successStories.map((c) => ({ slug: caseSlug(c) })),
    ...caseStudiesCn.map((c) => ({ slug: c.slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cn = getCaseCnBySlug(slug);
  if (cn) {
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
  const c = getCaseBySlug(slug);
  if (!c) return { title: "UV Curing Case Study — ETIA Technology" };
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

  // Curated multilingual case studies (product + result focused).
  const cn = getCaseCnBySlug(slug);
  if (cn) {
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

  const c = getCaseBySlug(slug);
  if (!c) notFound();

  const url = `${SITE}/case-studies/${slug}`;
  const img = caseStudyImage(c);

  // Brand · Product · Technology terms derived from the systems this case uses,
  // folded into the JSON-LD keywords alongside the marketing chips.
  const brandTerms = brandsForCase(c).map((p) => p.brand);
  const productTerms = systemsForCase(c).map((p) => productModel(p));
  const techTerms = techRoutesForCase(c).map((tr) => tr.en);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.overview || c.challenge,
    articleSection: c.industry,
    about: c.sector,
    keywords: [...c.keywords, ...brandTerms, ...productTerms, ...techTerms].join(", "),
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
