"use client";
import Link from "next/link";
import { SOLUTIONS, solutionApplications } from "@/components/solutions";
import HeroBackdrop from "@/components/HeroBackdrop";
import { heroBannerImages } from "@/components/caseStudies";
import FinalCta from "@/components/FinalCta";
import { inquiryHref } from "@/components/contact";
import { useLocale, t } from "@/components/LocaleContext";

const ACCENT = "#1A56DB";
const GREEN = "#41A62A";

export default function SolutionsIndexView() {
  const { locale } = useLocale();

  return (
    <>
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1A56DB 0%, #123C94 100%)" }}>
        <HeroBackdrop images={heroBannerImages} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: GREEN }}>
              {t({ en: "Industry Solutions", zh: "行业解决方案", th: "โซลูชันอุตสาหกรรม", vi: "Giải pháp ngành" }, locale)}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white mb-4">
              {t({ en: "UV curing, by industry", zh: "按行业选择 UV 固化方案" }, locale)}
            </h1>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed max-w-2xl">
              {t({
                en: "Start from your process, not from a brand. Each industry page collects the applications we have run, the systems we recommend, and the process points our engineers see most often.",
                zh: "从您的工艺出发，而不是从品牌出发。每个行业页面汇总了我们做过的应用、推荐的机型，以及工程师最常遇到的工艺问题。",
              }, locale)}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((s) => {
              const count = solutionApplications(s).length;
              return (
                <Link
                  key={s.id}
                  href={`/solutions/${s.id}`}
                  className="group rounded-xl border border-gray-200 bg-white p-6 hover:border-[#1A56DB] hover:shadow-md transition-all flex flex-col"
                >
                  <h2 className="text-lg font-bold mb-2 group-hover:text-[#1A56DB]" style={{ color: ACCENT }}>{t(s.label, locale)}</h2>
                  <p className="text-sm leading-relaxed text-gray-600 mb-4">{t(s.blurb, locale)}</p>
                  {count > 0 && (
                    <span className="text-[11px] font-semibold text-gray-400 mb-3">
                      {t({ en: `${count} published applications`, zh: `${count} 篇应用案例` }, locale)}
                    </span>
                  )}
                  <span className="mt-auto text-sm font-semibold" style={{ color: GREEN }}>
                    {t({ en: "View solution →", zh: "查看方案 →" }, locale)}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCta
        heading={t({ en: "Not sure which fits your process?", zh: "不确定哪个方案适合您的工艺?" }, locale)}
        body={t({
          en: "Describe the bond, the substrate and the line rate — our engineers will point you at the right system.",
          zh: "描述一下粘接部位、基材与产线节拍 —— 工程师会为您指出合适的机型。",
        }, locale)}
        primary={{ label: t({ en: "Talk to an Engineer", zh: "咨询工程师" }, locale), href: inquiryHref(locale, { subject: "Sales Inquiry", context: "Industry Solutions" }) }}
        secondary={{ label: t({ en: "All Applications", zh: "全部应用" }, locale), href: "/applications" }}
      />
    </>
  );
}
