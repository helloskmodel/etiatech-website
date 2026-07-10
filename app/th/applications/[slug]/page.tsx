import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ApplicationCaseStudyView from "@/components/ApplicationCaseStudyView";
import LocalizedChrome from "@/components/LocalizedChrome";
import { applicationsData, getApplicationBySlug } from "@/data/applicationsData";
import { applicationDetailMetadata, applicationDetailJsonLd } from "@/components/localePageSeo";

export function generateStaticParams() {
  return applicationsData.map((application) => ({ slug: application.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return applicationDetailMetadata(slug, "th");
}

export default async function ApplicationThPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const application = getApplicationBySlug(slug);
  if (!application) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationDetailJsonLd(slug, "th")) }} />
      <LocalizedChrome locale="th">
        <ApplicationCaseStudyView application={application} />
      </LocalizedChrome>
    </>
  );
}
