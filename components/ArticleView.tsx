"use client";
import Link from "next/link";
import { useLocale, t } from "@/components/LocaleContext";
import { inquiryMailto } from "@/components/contact";
import type { Article } from "@/components/insights";

function fmtDate(iso: string, locale: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00Z");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// Tailwind child-combinator prose styling — keeps article typography scoped to
// this component with no global CSS or typography plugin.
const PROSE = [
  "max-w-none text-gray-700 leading-relaxed",
  "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#1A56DB] [&_h2]:mt-10 [&_h2]:mb-4",
  "[&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-gray-800 [&_h3]:mt-8 [&_h3]:mb-3",
  "[&_p]:my-4 [&_p]:text-[15px] [&_p]:leading-7",
  "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul>li]:my-1.5",
  "[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol>li]:my-1.5",
  "[&_a]:text-[#1A56DB] [&_a]:font-medium [&_a]:underline hover:[&_a]:opacity-80",
  "[&_strong]:font-semibold [&_strong]:text-gray-900",
  "[&_blockquote]:border-l-4 [&_blockquote]:border-[#44B549] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-6",
  "[&_img]:rounded-xl [&_img]:my-6 [&_img]:w-full [&_img]:border [&_img]:border-gray-100",
  "[&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:text-gray-800",
  "[&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:my-6 [&_pre_code]:bg-transparent [&_pre_code]:text-gray-100",
  "[&_hr]:my-8 [&_hr]:border-gray-200",
  "[&_table]:w-full [&_table]:my-6 [&_table]:text-sm [&_th]:text-left [&_th]:font-semibold [&_th]:border-b [&_th]:border-gray-300 [&_th]:py-2 [&_th]:px-2 [&_td]:border-b [&_td]:border-gray-100 [&_td]:py-2 [&_td]:px-2",
].join(" ");

export default function ArticleView({ article }: { article: Article }) {
  const { locale } = useLocale();
  const hasZh = Boolean(article.locales.zh);
  const c = (locale === "zh" && article.locales.zh) || article.locales.en;
  const showFallbackNote = locale === "zh" && !hasZh;

  return (
    <article>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-3 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#1A56DB]">{t({ en: "Home", zh: "首页" }, locale)}</Link>
          <span className="mx-2">›</span>
          <Link href="/insights" className="hover:text-[#1A56DB]">{t({ en: "Insights", zh: "洞察" }, locale)}</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-500">{c.title}</span>
        </div>
      </div>

      {/* Header */}
      <header className="py-12" style={{ background: "#f1f5f9" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {article.tags.map((tag) => (
              <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-full border" style={{ borderColor: "#1A56DB33", color: "#1A56DB", background: "#1A56DB0d" }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: "#1A56DB" }}>{c.title}</h1>
          <p className="text-base text-gray-600 leading-relaxed mb-5">{c.description}</p>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span className="font-medium text-gray-600">{article.author}</span>
            <span>·</span>
            <span>{fmtDate(article.date, locale)}</span>
            <span>·</span>
            <span>{article.readingMinutes} {t({ en: "min read", zh: "分钟阅读" }, locale)}</span>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {showFallbackNote && (
            <p className="mb-6 text-xs text-gray-500 rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
              中文版尚未提供，以下为英文原文。
            </p>
          )}
          <div className={PROSE} dangerouslySetInnerHTML={{ __html: c.html }} />

          {/* CTA */}
          <div className="mt-12 rounded-2xl p-6 text-center" style={{ background: "#1A56DB" }}>
            <h2 className="text-xl font-bold text-white mb-2">{t({ en: "Have a UV curing challenge?", zh: "有 UV Curing 紫外线固化难题?" }, locale)}</h2>
            <p className="text-gray-200 text-sm mb-5">{t({ en: "Our engineers match the right system to your exact process — from selection to validation.", zh: "我们的工程师将为您的具体工艺匹配合适的系统——从选型到验证。" }, locale)}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={inquiryMailto(locale, { subject: "Sales Inquiry" })} className="px-6 py-2.5 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#44B549" }}>{t({ en: "Talk to Our Sales →", zh: "联系我们的销售 →" }, locale)}</a>
              <Link href="/product" className="px-6 py-2.5 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">{t({ en: "Explore Products", zh: "浏览产品" }, locale)}</Link>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/insights" className="text-sm font-semibold hover:underline" style={{ color: "#1A56DB" }}>← {t({ en: "Back to all insights", zh: "返回全部洞察" }, locale)}</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
