import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductGuideView from "@/components/ProductGuideView";
import { productGuides, getProductGuide, guideFaqEnglish } from "@/components/productGuideData";

const SITE = "https://www.etiatech.com";

export function generateStaticParams() {
  return productGuides.map((g) => ({ model: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ model: string }> }): Promise<Metadata> {
  const { model } = await params;
  const g = getProductGuide(model);
  if (!g) return {};
  const path = `/product/omnicure/${g.slug}`;
  return {
    title: g.metaTitle,
    description: g.metaDescription,
    keywords: g.keywords,
    alternates: { canonical: SITE + path },
    openGraph: {
      type: "website",
      url: SITE + path,
      siteName: "ETIA",
      title: g.metaTitle,
      description: g.metaDescription,
      images: [{ url: g.heroImage, alt: g.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: g.metaTitle,
      description: g.metaDescription,
      images: [g.heroImage],
    },
  };
}

export default async function ProductGuidePage({ params }: { params: Promise<{ model: string }> }) {
  const { model } = await params;
  const g = getProductGuide(model);
  if (!g) notFound();

  const path = `/product/omnicure/${g.slug}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: g.h1.en,
    brand: { "@type": "Brand", name: "OmniCure" },
    category: g.schemaCategory,
    description: g.schemaDescription,
    image: g.heroImage,
    url: SITE + path,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Etiatec (Thailand) Co., Ltd." },
    },
    subjectOf: [
      g.pdfs.brochure && { "@type": "CreativeWork", name: `${g.productName} Brochure`, url: g.pdfs.brochure },
      g.pdfs.quickStart && { "@type": "CreativeWork", name: `${g.productName} Quick Start Guide`, url: g.pdfs.quickStart },
      g.pdfs.userGuide && { "@type": "CreativeWork", name: `${g.productName} User Guide`, url: g.pdfs.userGuide },
    ].filter(Boolean),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Products", item: SITE + "/product" },
      { "@type": "ListItem", position: 2, name: "OmniCure", item: SITE + "/product/omnicure" },
      { "@type": "ListItem", position: 3, name: g.h1.en, item: SITE + path },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guideFaqEnglish(g).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ProductGuideView slug={g.slug} />
    </>
  );
}
