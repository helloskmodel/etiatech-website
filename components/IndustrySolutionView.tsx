"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import { PAGE_BANNERS } from "@/components/caseStudies";
import ApplicationCard from "@/components/ApplicationCard";
import FinalCta from "@/components/FinalCta";
import { inquiryMailto } from "@/components/contact";
import { useLocale, t } from "@/components/LocaleContext";
import { localizeHref } from "@/components/localeHref";
import {
  industrySolutions,
  publishedIndustries,
  industryHref,
  industryApplications,
  type IndustrySlug,
} from "@/components/industrySolutions";
import { productCategories, productCategoryHref } from "@/components/productCategories";

/**
 * A "BY INDUSTRY" solution page — the way in for visitors who know their
 * sector and their bonding problem but not which light source solves it. States
 * the processes, points at the product categories, then lists the application
 * notes for that sector.
 */
export default function IndustrySolutionView({ slug }: { slug: IndustrySlug }) {
  const { locale } = useLocale();
  const s = industrySolutions[slug];
  const applications = industryApplications(slug);
  const others = publishedIndustries.filter((o) => o.slug !== slug);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white py-3">
        <div className="mx-auto max-w-7xl px-4 text-xs text-gray-400 sm:px-6 lg:px-8">
          <Link href={localizeHref("/applications", locale)} className="hover:text-[#1A56DB]">
            {t({ en: "Industry Solutions", zh: "行业解决方案", th: "โซลูชันอุตสาหกรรม", vi: "Giải pháp ngành" }, locale)}
          </Link>
          <span className="mx-2">›</span>
          <span style={{ color: s.accent }}>{t(s.name, locale)}</span>
        </div>
      </div>

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
        <HeroBanner src={PAGE_BANNERS.applications} />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[.18em]" style={{ color: s.accent }}>
            {t({ en: "By Industry", zh: "按行业分类", th: "ตามอุตสาหกรรม", vi: "Theo ngành" }, locale)}
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight text-[#143C96] md:text-5xl">{t(s.name, locale)}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#475467] md:text-lg">{t(s.tagline, locale)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={inquiryMailto(locale, { subject: "Application Inquiry", context: s.name.en })}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
              style={{ background: s.accent }}
            >
              {t({ en: "Discuss Your Process", zh: "沟通您的工艺", th: "ปรึกษากระบวนการของคุณ", vi: "Trao đổi về quy trình" }, locale)}
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              href={localizeHref("/product", locale)}
              className="inline-flex items-center gap-2 rounded-xl border border-[#143C96]/25 px-6 py-3 text-sm font-bold text-[#143C96] transition hover:border-[#143C96]/60"
            >
              {t({ en: "Browse by Technology", zh: "按技术浏览", th: "ดูตามเทคโนโลยี", vi: "Xem theo công nghệ" }, locale)}
            </Link>
          </div>
        </div>
      </header>

      {/* Overview */}
      <section className="border-b border-gray-100 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">
            {t({ en: "The problem", zh: "行业课题", th: "โจทย์", vi: "Vấn đề" }, locale)}
          </p>
          <h2 className="mt-3 text-2xl font-bold text-[#143C96] md:text-3xl">
            {t({ en: `UV curing in ${s.name.en}`, zh: `${s.name.zh ?? s.name.en}的紫外固化` }, locale)}
          </h2>
          <div className="mt-4 mb-6 h-1 w-12 rounded" style={{ background: s.accent }} />
          {s.intro.map((para, i) => (
            <p key={i} className="mb-4 text-base leading-7 text-[#475467] last:mb-0">
              {t(para, locale)}
            </p>
          ))}
        </div>
      </section>

      {/* Processes we are asked about */}
      <section className="bg-[#F7FAFC] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-[#143C96] md:text-3xl">
            {t({ en: "Processes we solve", zh: "我们解决的工艺环节", th: "กระบวนการที่เราแก้ปัญหา", vi: "Các công đoạn chúng tôi giải quyết" }, locale)}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.processes.map((p, i) => (
              <div key={i} className="rounded-2xl border border-[#D9E4EA] bg-white p-6">
                <div className="mb-3 h-1 w-8 rounded" style={{ background: s.accent }} />
                <h3 className="text-base font-bold text-[#143C96]">{t(p.title, locale)}</h3>
                <p className="mt-2 text-sm leading-6 text-[#667085]">{t(p.body, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended technologies */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-[#143C96] md:text-3xl">
            {t({ en: "Recommended technologies", zh: "推荐技术方案", th: "เทคโนโลยีที่แนะนำ", vi: "Công nghệ đề xuất" }, locale)}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {s.recommends.filter((cat) => !productCategories[cat].draft).map((cat) => {
              const c = productCategories[cat];
              return (
                <Link
                  key={cat}
                  href={localizeHref(productCategoryHref(cat), locale)}
                  className="group rounded-2xl border border-[#D9E4EA] bg-white p-6 transition hover:border-[#1A56DB]/40 hover:shadow-md"
                >
                  <div className="mb-3 h-1 w-8 rounded" style={{ background: c.accent }} />
                  <h3 className="text-lg font-bold text-[#143C96]">{t(c.name, locale)}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#667085]">{t(c.tagline, locale)}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#41A62A]">
                    {t({ en: "View systems", zh: "查看产品", th: "ดูระบบ", vi: "Xem hệ thống" }, locale)}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application notes for this industry */}
      {applications.length > 0 && (
        <section className="border-t border-gray-100 bg-[#F7FAFC] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold text-[#143C96] md:text-3xl">
                {t({ en: "Application notes", zh: "应用案例", th: "บันทึกการใช้งาน", vi: "Ghi chú ứng dụng" }, locale)}
              </h2>
              <Link href={localizeHref("/applications", locale)} className="hidden items-center gap-1 text-sm font-bold text-[#1A56DB] sm:inline-flex">
                {t({ en: "All applications", zh: "全部应用", th: "การใช้งานทั้งหมด", vi: "Tất cả ứng dụng" }, locale)}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {applications.map((a) => (
                <ApplicationCard key={a.slug} application={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other industries */}
      <section className="border-t border-gray-100 bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-[#143C96] md:text-3xl">
            {t({ en: "Other industries", zh: "其他行业", th: "อุตสาหกรรมอื่น", vi: "Ngành khác" }, locale)}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={localizeHref(industryHref(o.slug), locale)}
                className="group rounded-2xl border border-[#D9E4EA] bg-white p-6 transition hover:border-[#1A56DB]/40 hover:shadow-md"
              >
                <div className="mb-3 h-1 w-8 rounded" style={{ background: o.accent }} />
                <h3 className="text-base font-bold text-[#143C96]">{t(o.name, locale)}</h3>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#41A62A]">
                  {t({ en: "View", zh: "查看", th: "ดู", vi: "Xem" }, locale)} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        heading={t(
          { en: "Bring us the joint that won't hold.", zh: "把固化不住的那道工序交给我们。", th: "ส่งรอยต่อที่ยึดไม่อยู่มาให้เรา", vi: "Hãy gửi cho chúng tôi mối nối chưa đạt." },
          locale
        )}
        body={t(
          { en: "Our engineers work the problem with you — adhesive, geometry, dose and takt — and specify the system that fits your line.", zh: "我们的工程师与您一起分析——胶水、几何形状、剂量与节拍——并给出适配您产线的选型方案。", th: "วิศวกรของเราจะวิเคราะห์ร่วมกับคุณ — กาว รูปทรง ปริมาณแสง และรอบการผลิต — แล้วระบุระบบที่เหมาะกับสายการผลิตของคุณ", vi: "Kỹ sư của chúng tôi cùng bạn phân tích — keo, hình học, liều lượng và nhịp sản xuất — rồi đề xuất hệ thống phù hợp." },
          locale
        )}
        primary={{
          label: t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร", vi: "Trao đổi với kỹ sư" }, locale),
          href: inquiryMailto(locale, { subject: "Application Inquiry", context: s.name.en }),
        }}
        secondary={{
          label: t({ en: "Browse by Technology", zh: "按技术浏览", th: "ดูตามเทคโนโลยี", vi: "Xem theo công nghệ" }, locale),
          href: localizeHref("/product", locale),
        }}
      />
    </>
  );
}
