import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industries, getIndustry } from "@/data/industriesData";
import IndustryView from "@/components/IndustryView";

const SITE = "https://www.etiatech.com";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  const url = `${SITE}/industries/${ind.slug}`;
  return {
    title: `${ind.headline.en} | ETIA`,
    description: ind.sub.en,
    alternates: { canonical: url },
    openGraph: { type: "website", url, siteName: "ETIA Technology", title: ind.headline.en, description: ind.sub.en },
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  return <IndustryView industry={ind} />;
}
