"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ApplicationCard from "@/components/ApplicationCard";
import ServiceCommitment from "@/components/ServiceCommitment";
import { getRelatedApplications } from "@/data/applicationsData";
import { applicationsZh } from "@/data/applicationsData.zh";
import { useLocale, t } from "@/components/LocaleContext";

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
  const { locale } = useLocale();
  const related = getRelatedApplications(application);

  // Merge the client-supplied Chinese content when viewing in zh.
  const zh = locale === "zh" ? applicationsZh[application.slug] : undefined;
  const a = zh
    ? {
        ...application,
        title: zh.title,
        subtitle: zh.subtitle,
        pageType: zh.pageType,
        industry: zh.industry,
        applicationPoints: zh.applicationPoints,
        technology: zh.technology,
        recommendedProducts: zh.recommendedProducts,
        benefits: zh.benefits,
        sections: {
          ...application.sections,
          application: zh.sections.application,
          challenge: zh.sections.challenge,
          solution: zh.sections.solution,
          recommendedProduct: zh.sections.recommendedProduct,
          etiaSupport: zh.sections.etiaSupport,
          recommendedConfiguration: zh.recommendedConfiguration,
        },
      }
    : application;

  const metadata = [
    [t({ en: "Industry", zh: "行业" }, locale), a.industry.join(" · ")],
    [t({ en: "Application", zh: "应用" }, locale), a.applicationPoints.join(" · ")],
    [t({ en: "Technology", zh: "技术" }, locale), a.technology.join(" · ")],
    [t({ en: "Recommended Product", zh: "推荐产品" }, locale), a.recommendedProducts.join(" · ")],
  ];

  return (
    <>
      <div className="border-b border-gray-200 bg-white py-3">
        <div className="mx-auto max-w-7xl px-4 text-xs text-gray-400 sm:px-6 lg:px-8">
          <Link href="/" className="hover:text-[#1A56DB]">{t({ en: "Home", zh: "首页" }, locale)}</Link><span className="mx-2">›</span>
          <Link href="/applications" className="hover:text-[#1A56DB]">{t({ en: "Applications", zh: "应用" }, locale)}</Link><span className="mx-2">›</span>
          <span className="text-gray-500">{a.title}</span>
        </div>
      </div>

      <header className="border-b border-gray-200 bg-[#f1f5f9] py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.3fr_.7fr] lg:px-8">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#44B549]">{a.pageType}</p>
            <h1 className="text-3xl font-bold leading-tight text-[#1A56DB] md:text-5xl">{a.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">{a.subtitle}</p>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <Image src={a.image} alt={a.title} fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
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
            <TextSection eyebrow={t({ en: "01 · Application", zh: "01 · 应用" }, locale)} title={t({ en: "Application", zh: "应用概述" }, locale)} paragraphs={a.sections.application} />
            <TextSection eyebrow={t({ en: "02 · Challenge", zh: "02 · 工艺难点" }, locale)} title={t({ en: "Challenge", zh: "工艺难点" }, locale)} paragraphs={a.sections.challenge} />
            <TextSection eyebrow={t({ en: "03 · Solution", zh: "03 · 解决方案" }, locale)} title={t({ en: "UV Curing Solution", zh: "UV Curing 紫外线固化方案" }, locale)} paragraphs={a.sections.solution} />

            {a.sections.process?.length > 0 && (
              <div className="mb-9 rounded-xl border border-[#1A56DB]/15 bg-[#f0f5ff] p-5">
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#1A56DB]">{t({ en: "Typical Process", zh: "典型工艺流程" }, locale)}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {a.sections.process.map((step: string, index: number) => (
                    <div key={step} className="contents">
                      <span className="rounded-full border border-[#1A56DB]/20 bg-white px-3 py-2 text-xs font-semibold text-gray-700">{step}</span>
                      {index < a.sections.process.length - 1 && <ArrowRight size={15} className="text-[#44B549]" aria-hidden="true" />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <TextSection eyebrow={t({ en: "04 · Recommended Product", zh: "04 · 推荐设备" }, locale)} title={t({ en: "Recommended UV Curing System", zh: "推荐 UV Curing 紫外线固化系统" }, locale)} paragraphs={a.sections.recommendedProduct} />
            <div className="mb-9 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{t({ en: "Recommended Configuration", zh: "推荐配置" }, locale)}</p>
              <p className="mt-2 text-lg font-bold text-[#1A56DB]">{a.sections.recommendedConfiguration || a.recommendedProducts.join(" · ")}</p>
              {a.sections.selectionFactors?.length > 0 && (
                <><p className="mt-4 text-xs font-semibold text-gray-500">{t({ en: "ETIA evaluates:", zh: "ETIA 评估：" }, locale)}</p><div className="mt-2 flex flex-wrap gap-2">{a.sections.selectionFactors.map((factor: string) => <span key={factor} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-600">{factor}</span>)}</div></>
              )}
            </div>

            <section className="border-t border-gray-100 py-9">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#44B549]">{t({ en: "05 · Benefits", zh: "05 · 工艺优势" }, locale)}</p>
              <h2 className="mb-5 text-2xl font-bold text-[#1A56DB]">{t({ en: "Benefits", zh: "核心工艺优势" }, locale)}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {a.benefits.map((benefit: string) => <div key={benefit} className="flex gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm font-medium text-gray-700"><CheckCircle2 size={18} className="shrink-0 text-[#44B549]" />{benefit}</div>)}
              </div>
            </section>

            <TextSection eyebrow={t({ en: "06 · ETIA Support", zh: "06 · ETIA 技术支持" }, locale)} title={t({ en: "ETIA Support", zh: "ETIA 配套技术服务" }, locale)} paragraphs={a.sections.etiaSupport} />
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-[#44B549]">{t({ en: "Recommended UV Curing System", zh: "推荐 UV Curing 紫外线固化系统" }, locale)}</p>
              <p className="mt-2 text-lg font-bold text-[#1A56DB]">{a.sections.recommendedConfiguration || a.recommendedProducts.join(" · ")}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">{t({ en: "Discuss wavelength, curing width, line speed, ink compatibility, and integration with an ETIA engineer.", zh: "就波长、固化宽度、产线速度、油墨兼容性与产线集成等细节，与 ETIA 工程师沟通。" }, locale)}</p>
              <Link href="/contact" className="mt-5 block rounded-lg bg-[#44B549] px-5 py-3 text-center text-sm font-bold text-white hover:opacity-90">{t({ en: "Contact ETIA →", zh: "联系 ETIA →" }, locale)}</Link>
              <ServiceCommitment compact />
            </div>
          </aside>
        </div>
      </main>

      {related.length > 0 && <section className="bg-[#f6f8fb] py-14"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><h2 className="mb-7 text-2xl font-bold text-[#1A56DB]">{t({ en: "Related UV Curing Applications", zh: "相关 UV Curing 紫外线固化应用" }, locale)}</h2><div className="grid gap-5 md:grid-cols-3">{related.map((item: any) => <ApplicationCard key={item.slug} application={item} compact />)}</div></div></section>}
    </>
  );
}
