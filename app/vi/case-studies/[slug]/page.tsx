import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyCnView from "@/components/CaseStudyCnView";
import LocalizedChrome from "@/components/LocalizedChrome";
import { caseStudiesCn, getCaseCnBySlug } from "@/data/caseStudiesCn";
import { caseStudyDetailMetadata, caseStudyDetailJsonLd } from "@/components/localePageSeo";

export function generateStaticParams() {
  return caseStudiesCn.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return caseStudyDetailMetadata(slug, "vi");
}

export default async function CaseStudyViPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cn = getCaseCnBySlug(slug);
  if (!cn) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyDetailJsonLd(slug, "vi")) }} />
      <LocalizedChrome locale="vi">
        <CaseStudyCnView caseStudy={cn} />
      </LocalizedChrome>
    </>
  );
}
