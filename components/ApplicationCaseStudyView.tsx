import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ApplicationCard from "@/components/ApplicationCard";
import ServiceCommitment from "@/components/ServiceCommitment";
import { getRelatedApplications } from "@/data/applicationsData";

function TextSection({ eyebrow, title, paragraphs }: { eyebrow: string; title: string; paragraphs: string[] }) {
  return (
    <section className="border-t border-gray-100 py-9 first:border-0 first:pt-0">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#44B549]">{eyebrow}</p>
      <h2 className="mb-4 text-2xl font-bold text-[#1A56DB]">{title}</h2>
      <div className="space-y-4 text-[15px] leading-7 text-gray-600">
        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>
  );
}

export default function ApplicationCaseStudyView({ application }: { application: any }) {
  const related = getRelatedApplications(application);
  const metadata = [
    ["Industry", application.industry.join(" · ")],
    ["Application", application.applicationPoints.join(" · ")],
    ["Technology", application.technology.join(" · ")],
    ["Recommended Product", application.recommendedProducts.join(" · ")],
  ];

  return (
    <>
      <div className="border-b border-gray-200 bg-white py-3">
        <div className="mx-auto max-w-7xl px-4 text-xs text-gray-400 sm:px-6 lg:px-8">
          <Link href="/" className="hover:text-[#1A56DB]">Home</Link><span className="mx-2">›</span>
          <Link href="/applications" className="hover:text-[#1A56DB]">Applications</Link><span className="mx-2">›</span>
          <span className="text-gray-500">{application.title}</span>
        </div>
      </div>

      <header className="border-b border-gray-200 bg-[#f1f5f9] py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.3fr_.7fr] lg:px-8">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#44B549]">{application.pageType}</p>
            <h1 className="text-3xl font-bold leading-tight text-[#1A56DB] md:text-5xl">{application.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">{application.subtitle}</p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <Image src={application.image} alt={application.title} fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
          </div>
        </div>
      </header>

      <section aria-label="Application metadata" className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-gray-200 px-4 sm:grid-cols-2 sm:divide-x sm:divide-y-0 sm:px-6 lg:grid-cols-4 lg:px-8">
          {metadata.map(([label, value]) => (
            <div key={label} className="px-4 py-5 first:pl-0 sm:first:pl-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#44B549]">{label}</p>
              <p className="mt-2 text-xs font-semibold leading-relaxed text-gray-700">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <main className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8">
          <article className="max-w-3xl">
            <TextSection eyebrow="01 · Application" title="Application" paragraphs={application.sections.application} />
            <TextSection eyebrow="02 · Challenge" title="Challenge" paragraphs={application.sections.challenge} />
            <TextSection eyebrow="03 · Solution" title="UV Curing Solution" paragraphs={application.sections.solution} />

            {application.sections.process?.length > 0 && (
              <div className="mb-9 rounded-xl border border-[#1A56DB]/15 bg-[#f0f5ff] p-5">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#1A56DB]">Typical Process</p>
                <div className="flex flex-wrap items-center gap-2">
                  {application.sections.process.map((step: string, index: number) => (
                    <div key={step} className="contents">
                      <span className="rounded-full border border-[#1A56DB]/20 bg-white px-3 py-2 text-xs font-semibold text-gray-700">{step}</span>
                      {index < application.sections.process.length - 1 && <ArrowRight size={15} className="text-[#44B549]" aria-hidden="true" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <TextSection eyebrow="04 · Recommended Product" title="Recommended UV Curing System" paragraphs={application.sections.recommendedProduct} />
            <div className="mb-9 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Recommended Configuration</p>
              <p className="mt-2 text-lg font-bold text-[#1A56DB]">{application.sections.recommendedConfiguration || application.recommendedProducts.join(" · ")}</p>
              {application.sections.selectionFactors?.length > 0 && (
                <><p className="mt-4 text-xs font-semibold text-gray-500">ETIA evaluates:</p><div className="mt-2 flex flex-wrap gap-2">{application.sections.selectionFactors.map((factor: string) => <span key={factor} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600">{factor}</span>)}</div></>
              )}
            </div>

            <section className="border-t border-gray-100 py-9">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#44B549]">05 · Benefits</p>
              <h2 className="mb-5 text-2xl font-bold text-[#1A56DB]">Benefits</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {application.benefits.map((benefit: string) => <div key={benefit} className="flex gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm font-medium text-gray-700"><CheckCircle2 size={18} className="shrink-0 text-[#44B549]" />{benefit}</div>)}
              </div>
            </section>

            <TextSection eyebrow="06 · ETIA Support" title="ETIA Support" paragraphs={application.sections.etiaSupport} />
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-[#44B549]">Recommended UV Curing System</p>
              <p className="mt-2 text-lg font-bold text-[#1A56DB]">{application.sections.recommendedConfiguration || application.recommendedProducts.join(" · ")}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">Discuss wavelength, curing width, line speed, ink compatibility, and integration with an ETIA engineer.</p>
              <Link href="/contact" className="mt-5 block rounded-lg bg-[#44B549] px-5 py-3 text-center text-sm font-bold text-white hover:opacity-90">Contact ETIA →</Link>
              <ServiceCommitment compact />
            </div>
          </aside>
        </div>
      </main>

      {related.length > 0 && <section className="bg-[#f6f8fb] py-14"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><h2 className="mb-7 text-2xl font-bold text-[#1A56DB]">Related UV Curing Applications</h2><div className="grid gap-5 md:grid-cols-3">{related.map((item: any) => <ApplicationCard key={item.slug} application={item} compact />)}</div></div></section>}
    </>
  );
}
