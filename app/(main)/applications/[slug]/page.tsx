import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ApplicationCaseStudyView from "@/components/ApplicationCaseStudyView";
import { applicationsData, getApplicationBySlug } from "@/data/applicationsData";
import { languageAlternates } from "@/components/localePageSeo";

const SITE = "https://www.etiatech.com";

export function generateStaticParams() {
  return applicationsData.map((application) => ({ slug: application.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const application = getApplicationBySlug(slug);
  if (!application) return { title: "Application Case Study | ETIA Technology" };
  const url = `${SITE}/${application.seo.urlSlug}`;
  return {
    title: application.seo.title,
    description: application.seo.description,
    keywords: application.seo.keywords,
    alternates: { canonical: url, languages: languageAlternates(`/applications/${slug}`) },
    openGraph: { title: application.seo.title, description: application.seo.description, url, type: "article", images: [application.image] },
  };
}

export default async function ApplicationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const application = getApplicationBySlug(slug);
  if (!application) notFound();
  const url = `${SITE}/${application.seo.urlSlug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: application.title,
    description: application.seo.description,
    image: application.image,
    articleSection: application.industry.join(", "),
    keywords: application.seo.keywords.join(", "),
    about: [...application.applicationPoints, ...application.technology, ...application.recommendedProducts],
    author: { "@type": "Organization", name: "ETIA Technology" },
    publisher: { "@type": "Organization", name: "ETIA Technology", url: SITE },
    mainEntityOfPage: url,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Applications", item: `${SITE}/applications` },
      { "@type": "ListItem", position: 3, name: application.title, item: url },
    ],
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} /><ApplicationCaseStudyView application={application} /></>;
}
