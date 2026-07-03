"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { successStories, caseStudyImage, caseSlug, localizeCase } from "@/components/caseStudies";
import { industryColors } from "@/components/industryMedia";
import { brandsForCase, techRoutesForCase } from "@/components/productApplications";
import { brandAccent } from "@/components/productCatalog";
import { useLocale, t } from "@/components/LocaleContext";

// Horizontal, swipeable strip of all 10 case studies. Shows ~3 per screen on
// desktop; native touch-swipe on mobile plus arrow buttons on desktop.
// Tapping a card navigates to that case study's landing page.
export default function CaseStudyStrip() {
  const { locale } = useLocale();
  const scroller = useRef<HTMLDivElement>(null);

  const scrollByCards = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    // Scroll by ~one visible card width.
    el.scrollBy({ left: dir * (el.clientWidth / 3 + 16), behavior: "smooth" });
  };

  return (
    <>
      <div className="relative">
        {/* Arrow buttons (desktop) */}
        <button
          onClick={() => scrollByCards(-1)}
          aria-label="Previous"
          className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow items-center justify-center text-gray-600 hover:bg-gray-50 text-xl leading-none"
        >
          ‹
        </button>
        <button
          onClick={() => scrollByCards(1)}
          aria-label="Next"
          className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 shadow items-center justify-center text-gray-600 hover:bg-gray-50 text-xl leading-none"
        >
          ›
        </button>

        {/* Swipeable track */}
        <div
          ref={scroller}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {successStories.map((raw) => {
            const c = localizeCase(raw, locale);
            const color = industryColors[c.industry] || "#1A56DB";
            const img = caseStudyImage(c);
            return (
              <Link
                key={c.id}
                href={`/case-studies/${caseSlug(raw)}`}
                className="text-left snap-start shrink-0 w-[82%] sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all group flex flex-col"
              >
                {/* Photo header */}
                <div className="relative h-40 overflow-hidden bg-gray-100">
                  {img && (
                    <Image src={img} alt={c.title} fill sizes="(max-width: 640px) 82vw, (max-width: 1024px) 45vw, 30vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  )}
                  <span className="absolute top-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded text-white" style={{ background: color }}>{c.sector.toUpperCase()}</span>
                  <span className="absolute top-3 right-3 text-[11px] text-white bg-black/40 px-2 py-0.5 rounded">CASE STUDY {c.id}</span>
                </div>
                {/* Body — metric forward */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-2xl font-extrabold leading-none mb-1" style={{ color }}>{c.metric}</p>
                  <p className="text-xs text-gray-400 leading-snug mb-3">{c.metricLabel}</p>
                  <h3 className="font-bold text-sm leading-snug text-gray-800 line-clamp-2 flex-1">{c.title}</h3>
                  {/* Brand + primary UV technology hint */}
                  <div className="flex flex-wrap items-center gap-1 mt-3">
                    {brandsForCase(raw).map((bp) => (
                      <span key={bp.brandId} className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white" style={{ background: brandAccent[bp.brandId] }}>{bp.brand}</span>
                    ))}
                    {(() => {
                      const routes = techRoutesForCase(raw);
                      if (!routes.length) return null;
                      return (
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full border border-gray-200 text-gray-500">
                          {t(routes[0], locale)}{routes.length > 1 ? ` +${routes.length - 1}` : ""}
                        </span>
                      );
                    })()}
                  </div>
                  <span className="mt-3 text-sm font-semibold group-hover:underline" style={{ color }}>{t({ en: "Read this case study →", zh: "查看此案例 →" }, locale)}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-400 md:hidden">{t({ en: "← swipe to see all 10 cases →", zh: "← 左右滑动查看全部 10 个案例 →" }, locale)}</p>

      <div className="mt-8 text-center">
        <Link href="/application#case-studies" className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold border-2 border-[#1A56DB] text-[#1A56DB] hover:bg-[#1A56DB] hover:text-white transition-all">
          {t({ en: "Explore All Case Studies →", zh: "查看全部案例 →" }, locale)}
        </Link>
      </div>
    </>
  );
}
