"use client";
import Link from "next/link";
import Image from "next/image";
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
      {/* Hero */}
      <section className="py-16 md:py-20" style={{ background: "linear-gradient(135deg, #1A56DB 0%, #123C94 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>
            {t({ en: "ETIA Insights", zh: "ETIA 洞察" }, locale)}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            {t({ en: "UV Curing Insights & Application Guides", zh: "UV 固化洞察与应用指南" }, locale)}
          </h1>
          <p className="text-base text-gray-200 max-w-2xl leading-relaxed">
            {t(
              {
                en: "Technical guides, market analysis, and application know-how across photonics, medical, automotive, electronics and industrial UV curing — from ETIA's engineering team.",
                zh: "涵盖光子学、医疗、汽车、电子及工业 UV 固化的技术指南、市场分析与应用专知——来自 ETIA 工程团队。",
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
