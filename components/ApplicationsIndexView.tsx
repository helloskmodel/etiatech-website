"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BadgeCheck, ArrowRight } from "lucide-react";
import ApplicationCard from "@/components/ApplicationCard";
import HeroBanner from "@/components/HeroBanner";
import { PAGE_BANNERS } from "@/components/caseStudies";
import { inquiryMailto } from "@/components/contact";
import TrustStrip from "@/components/TrustStrip";
import UvCuringSelector from "@/components/UvCuringSelector";
import { useLocale, t, type LangText } from "@/components/LocaleContext";
import { CATEGORY_LABEL } from "@/components/industries";
import { APPLICATION_CATEGORIES, getListedApplications } from "@/data/applicationsData";
import type { Application } from "@/data/applicationTypes";

const listedApplications = getListedApplications();

// Product filter bar — match against each case's recommendedProducts text.
const PRODUCT_FILTERS: { key: string; label: LangText; token?: string }[] = [
  { key: "All", label: { en: "All Products", zh: "全部产品" } },
  { key: "s2000", label: { en: "OmniCure S2000 Elite", zh: "OmniCure S2000 Elite" }, token: "S2000" },
  { key: "lx500", label: { en: "OmniCure LX500", zh: "OmniCure LX500" }, token: "LX500" },
  { key: "ac", label: { en: "OmniCure AC Series", zh: "OmniCure AC 系列" }, token: "AC" },
];

function matchesProduct(application: Application, key: string): boolean {
  if (key === "All") return true;
  const token = PRODUCT_FILTERS.find((p) => p.key === key)?.token;
  if (!token) return true;
  return (application.recommendedProducts as string[]).some((p) => p.includes(token));
}

export default function ApplicationsIndexView() {
  const { locale } = useLocale();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Applications");
  const [product, setProduct] = useState("All");
  const applications = useMemo(() => {
    const term = query.trim().toLowerCase();
    return listedApplications.filter((application) => {
      if (category !== "All Applications" && application.industryCategory !== category) return false;
      if (!matchesProduct(application, product)) return false;
      if (!term) return true;
      return [
      application.title,
      application.subtitle,
      application.industryCategory,
      ...application.industry,
      ...application.applicationPoints,
      ...application.technology,
      ...application.recommendedProducts,
      ].join(" ").toLowerCase().includes(term);
    });
  }, [category, product, query]);

  return (
    <>
      <header className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
        <HeroBanner src={PAGE_BANNERS.applications} />
        <div className="absolute -right-36 -top-36 h-[34rem] w-[34rem] rounded-full bg-[#1F63D6]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#63C94A]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm"><BadgeCheck className="h-4 w-4" /> {t({ en: "Application Notes · Case Studies", zh: "应用说明 · 案例分享", th: "แอปพลิเคชันโน้ต · กรณีศึกษา", vi: "Ghi chú ứng dụng · Case study" }, locale)}</div>
            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-6xl">{t({ en: "Practical UV Curing Solutions", zh: "实用紫外线固化解决方案", th: "โซลูชัน UV Curing สำหรับงานจริง", vi: "Giải pháp UV Curing thực tiễn" }, locale)}<span className="mt-2 block text-2xl font-bold text-[#41A62A] md:text-4xl">{t({ en: "For Real Production Challenges.", zh: "应用驱动 解决难题", th: "ขับเคลื่อนด้วยการใช้งาน แก้ปัญหาหน้างาน", vi: "Định hướng ứng dụng, giải quyết thách thức." }, locale)}</span></h1>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={inquiryMailto(locale, { subject: "UV Curing Application Inquiry", context: "Application / material / process requirements" })} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]">{t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร", vi: "Trao đổi với kỹ sư" }, locale)} <ArrowRight className="h-4 w-4" /></a>
              <Link href="/product" className="inline-flex items-center justify-center rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:-translate-y-0.5 hover:border-[#143C96] hover:text-[#1F63D6]">{t({ en: "Browse UV Curing Systems", zh: "浏览UV Curing 紫外线固化系统", th: "ดูระบบ UV Curing", vi: "Xem hệ thống UV Curing" }, locale)}</Link>
            </div>
          </div>
        </div>
      </header>

      <TrustStrip />

      <main className="bg-[#f6f8fb] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Product filter bar */}
          <div className="mb-4">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#44B549]">{t({ en: "Filter by Product", zh: "按产品筛选", th: "กรองตามผลิตภัณฑ์", vi: "Lọc theo sản phẩm" }, locale)}</p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {PRODUCT_FILTERS.map((p) => {
                const count = p.key === "All" ? listedApplications.length : listedApplications.filter((a) => matchesProduct(a, p.key)).length;
                return (
                  <button key={p.key} type="button" onClick={() => setProduct(p.key)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${product === p.key ? "border-[#44B549] bg-[#44B549] text-white" : "border-gray-200 bg-white text-gray-600 hover:border-[#44B549] hover:text-[#44B549]"}`}>
                    {t(p.label, locale)} <span className="ml-1 opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Industry filter */}
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#1A56DB]">{t({ en: "Filter by Industry", zh: "按行业筛选", th: "กรองตามอุตสาหกรรม", vi: "Lọc theo ngành" }, locale)}</p>
          <nav aria-label="Application industries" className="mb-8 flex gap-2 overflow-x-auto pb-2">
            {["All Applications", ...APPLICATION_CATEGORIES].map((item) => {
              const count = item === "All Applications" ? listedApplications.length : listedApplications.filter((application) => application.industryCategory === item).length;
              return (
                <button key={item} type="button" onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${category === item ? "border-[#1A56DB] bg-[#1A56DB] text-white" : "border-gray-200 bg-white text-gray-600 hover:border-[#1A56DB] hover:text-[#1A56DB]"}`}>
                  {CATEGORY_LABEL[item] ? t(CATEGORY_LABEL[item], locale) : item} <span className="ml-1 opacity-70">{count}</span>
                </button>
              );
            })}
          </nav>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-gray-900">{t({ en: `${applications.length} of ${listedApplications.length} application case studies`, zh: `共 ${listedApplications.length} 个应用案例，当前显示 ${applications.length} 个`, th: `${applications.length} จาก ${listedApplications.length} กรณีศึกษา`, vi: `${applications.length} / ${listedApplications.length} case study ứng dụng` }, locale)}</p>
              <p className="mt-1 text-xs text-gray-500">{t({ en: "Filter by industry, process, technology, or product.", zh: "可按行业、工艺、技术或产品筛选。", th: "กรองตามอุตสาหกรรม กระบวนการ เทคโนโลยี หรือผลิตภัณฑ์", vi: "Lọc theo ngành, quy trình, công nghệ hoặc sản phẩm." }, locale)}</p>
            </div>
            <label className="w-full sm:max-w-sm">
              <span className="sr-only">{t({ en: "Search applications", zh: "搜索应用", th: "ค้นหาการใช้งาน", vi: "Tìm ứng dụng" }, locale)}</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t({ en: "Search applications…", zh: "搜索应用…", th: "ค้นหาการใช้งาน…", vi: "Tìm ứng dụng…" }, locale)} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/15" />
            </label>
          </div>
          {applications.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {applications.map((application) => <ApplicationCard key={application.slug} application={application} />)}
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">{t({ en: "No applications match this search.", zh: "没有符合条件的应用案例。", th: "ไม่พบการใช้งานที่ตรงกับการค้นหา", vi: "Không có ứng dụng phù hợp." }, locale)}</div>
          )}
        </div>
      </main>

      <UvCuringSelector />
    </>
  );
}
