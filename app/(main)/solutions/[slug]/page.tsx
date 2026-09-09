import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustrySolutionView from "@/components/IndustrySolutionView";
import {
  INDUSTRY_ORDER,
  isIndustrySlug,
  industryMetadata,
  industryBreadcrumbJsonLd,
} from "@/components/industrySolutions";

export function generateStaticParams() {
  return INDUSTRY_ORDER.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isIndustrySlug(slug)) return { title: "Industry Solutions — ETIA Technology" };
  return industryMetadata(slug);
}

export default async function IndustrySolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isIndustrySlug(slug)) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(industryBreadcrumbJsonLd(slug)) }}
      />
      <IndustrySolutionView slug={slug} />
    </>
  );
}
