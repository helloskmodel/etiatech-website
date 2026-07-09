"use client";
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { useLocale, t } from "@/components/LocaleContext";

type CardLocale = { title: string; description: string };
export type ArticleCard = {
  slug: string;
  date: string;
  tags: string[];
  author: string;
  cover?: string;
  readingMinutes: number;
  locales: { en: CardLocale; zh?: CardLocale };
};

function fmtDate(iso: string, locale: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00Z");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function InsightsIndexView({ articles }: { articles: ArticleCard[] }) {
  const { locale } = useLocale();
  const pick = (a: ArticleCard) => (locale === "zh" && a.locales.zh) || a.locales.en;

  return (
    <>
      {/* Hero — site standard (matches Sales & Support) */}
      <section className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF] py-16 md:py-24">
        <div className="absolute -right-36 -top-36 h-[34rem] w-[34rem] rounded-full bg-[#1F63D6]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#63C94A]/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm">
            <BadgeCheck className="h-4 w-4" /> {t({ en: "ETIA Insights", zh: "ETIA 洞察" }, locale)}
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-6xl">
            {t({ en: "UV Curing Insights", zh: "UV光固化洞察", th: "ข้อมูลเชิงลึก UV Curing", vi: "Thông tin chuyên sâu UV Curing" }, locale)}<span className="mt-2 block text-2xl font-bold text-[#41A62A] md:text-4xl">{t({ en: "& Application Guides", zh: "和应用指南", th: "และคู่มือการใช้งาน", vi: "& Hướng dẫn ứng dụng" }, locale)}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#667085] md:text-lg">
            {t(
              {
                en: "Technical guides, market analysis, and application know-how across photonics, medical, automotive, electronics and industrial UV curing — from ETIA's engineering team.",
                zh: "涵盖光子学、医疗、汽车、电子及工业 UV 光固化的技术指南、市场分析与应用专知——来自 ETIA 工程团队。",
              },
              locale
            )}
          </p>
        </div>
      </section>

      {/* Article grid */}
      <section className="py-14" style={{ background: "#f5f7fa" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <p className="text-center text-gray-400 py-20">
              {t({ en: "New articles are coming soon.", zh: "新文章即将发布。" }, locale)}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((a) => {
                const c = pick(a);
                return (
                  <Link
                    key={a.slug}
                    href={`/insights/${a.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="relative h-44 bg-gray-100 overflow-hidden">
                      {a.cover ? (
                        <Image src={a.cover} alt={c.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1A56DB 0%, #123C94 100%)" }}>
                          <span className="text-white/90 text-4xl font-bold">ETIA</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {a.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-full border" style={{ borderColor: "#1A56DB33", color: "#1A56DB", background: "#1A56DB0d" }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="font-bold text-base leading-snug text-gray-800 group-hover:text-[#1A56DB] transition-colors line-clamp-2 mb-2">{c.title}</h2>
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">{c.description}</p>
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                        <span>{fmtDate(a.date, locale)}</span>
                        <span>{a.readingMinutes} {t({ en: "min read", zh: "分钟阅读" }, locale)}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
