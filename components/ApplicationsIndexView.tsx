"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BadgeCheck, HeartPulse, Car, CircuitBoard, Sparkles, Cable, ArrowRight } from "lucide-react";
import ApplicationCard from "@/components/ApplicationCard";
import { inquiryMailto } from "@/components/contact";
import TrustStrip from "@/components/TrustStrip";
import UvCuringSelector from "@/components/UvCuringSelector";
import { useLocale, t } from "@/components/LocaleContext";
import { APPLICATION_CATEGORIES, getListedApplications } from "@/data/applicationsData";

const listedApplications = getListedApplications();

export default function ApplicationsIndexView() {
  const { locale } = useLocale();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Applications");
  const applications = useMemo(() => {
    const term = query.trim().toLowerCase();
    return listedApplications.filter((application) => {
      if (category !== "All Applications" && application.industryCategory !== category) return false;
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
  }, [category, query]);

  return (
    <>
      <header className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
        <div className="absolute -right-36 -top-36 h-[34rem] w-[34rem] rounded-full bg-[#1F63D6]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#63C94A]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm"><BadgeCheck className="h-4 w-4" /> {t({ en: "Application Notes · Case Studies", zh: "应用说明 · 案例分享", th: "แอปพลิเคชันโน้ต · กรณีศึกษา", vi: "Ghi chú ứng dụng · Case study" }, locale)}</div>
            <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-6xl">{t({ en: "Practical UV Curing Solutions", zh: "实用UV光固化方案", th: "โซลูชัน UV Curing ที่ใช้งานได้จริง", vi: "Giải pháp UV Curing thực tiễn" }, locale)}<span className="mt-2 block text-2xl font-bold text-[#41A62A] md:text-4xl">{t({ en: "For Real Production Challenges.", zh: "应对一线生产挑战", th: "สำหรับความท้าทายการผลิตจริง", vi: "Cho các thách thức sản xuất thực tế." }, locale)}</span></h1>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={inquiryMailto(locale, { subject: "UV Curing Application Inquiry", context: "Application / material / process requirements" })} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]">{t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร", vi: "Trao đổi với kỹ sư" }, locale)} <ArrowRight className="h-4 w-4" /></a>
              <Link href="/product" className="inline-flex items-center justify-center rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:-translate-y-0.5 hover:border-[#143C96] hover:text-[#1F63D6]">{t({ en: "Browse UV Curing Systems", zh: "浏览UV光固化系统", th: "ดูระบบ UV Curing", vi: "Xem hệ thống UV Curing" }, locale)}</Link>
            </div>
          </div>
        </div>
      </header>

      <TrustStrip />

      <main className="bg-[#f6f8fb] py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Application industries" className="mb-8 flex gap-2 overflow-x-auto pb-2">
            {["All Applications", ...APPLICATION_CATEGORIES].map((item) => {
              const count = item === "All Applications" ? listedApplications.length : listedApplications.filter((application) => application.industryCategory === item).length;
              return (
                <button key={item} type="button" onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${category === item ? "border-[#1A56DB] bg-[#1A56DB] text-white" : "border-gray-200 bg-white text-gray-600 hover:border-[#1A56DB] hover:text-[#1A56DB]"}`}>
                  {item} <span className="ml-1 opacity-70">{count}</span>
                </button>
              );
            })}
          </nav>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-gray-900">{applications.length} of {listedApplications.length} application case {listedApplications.length === 1 ? "study" : "studies"}</p>
              <p className="mt-1 text-xs text-gray-500">Filter by industry, process, technology, or product.</p>
            </div>
            <label className="w-full sm:max-w-sm">
              <span className="sr-only">Search applications</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search applications…" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/15" />
            </label>
          </div>
          {applications.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {applications.map((application) => <ApplicationCard key={application.slug} application={application} />)}
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">No applications match this search.</div>
          )}
        </div>
      </main>

      <UvCuringSelector />
    </>
  );
}
