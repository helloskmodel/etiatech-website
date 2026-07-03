import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { apps, appSlug, getAppBySlug } from "@/components/applicationNotes";
import { productForAppNote } from "@/components/productApplications";
import { productModel, techRouteFor } from "@/components/productCatalog";
import AppNoteView from "@/components/AppNoteView";

const SITE = "https://www.etiatech.com";

export function generateStaticParams() {
  return apps.map((a) => ({ slug: appSlug(a) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getAppBySlug(slug);
  if (!a) return { title: "Application Note — ETIA Technology" };
  const title = `${a.title} — UV Curing Application Note | ETIA Technology`;
  const description = a.intro.slice(0, 160);
  const url = `${SITE}/application/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
  };
}

export default async function ApplicationNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAppBySlug(slug);
  if (!a) notFound();

  const product = productForAppNote(a);
  const techRoute = product ? techRouteFor(product) : undefined;
  const url = `${SITE}/application/${slug}`;

  // TechArticle describes the application note itself; BreadcrumbList gives
  // crawlers the Home › Application › <note> hierarchy for rich results.
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: a.title,
    description: a.intro,
    articleSection: a.industry,
    about: a.subCategory,
    keywords: [a.industry, a.subCategory, "UV curing", product?.brand?.replace(/®/g, ""), product && productModel(product), techRoute?.en].filter(Boolean).join(", "),
    author: { "@type": "Organization", name: "ETIA Technology" },
    publisher: { "@type": "Organization", name: "ETIA Technology" },
    mainEntityOfPage: url,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Application", item: `${SITE}/application` },
      { "@type": "ListItem", position: 3, name: a.title, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <AppNoteView note={a} />
    </>
  );
}
