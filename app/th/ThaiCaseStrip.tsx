"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { marketCases } from "@/components/markets";
import { caseStudyImage, localizeCase } from "@/components/caseStudies";
import { industryColors } from "@/components/industryMedia";
import { brandsForCase, techRoutesForCase } from "@/components/productApplications";
import { brandAccent } from "@/components/productCatalog";
import { caseContentTh } from "./caseContentTh";
import type { ThLocale } from "./dictionaries";

// Thailand microsite case-study strip. Mirrors the main site's <CaseStudyStrip>
// (photo header + sector chip + metric-forward body + brand chips, swipeable),
// but is URL-locale aware (th/en/zh) and links into the /th/{lang} microsite.
export default function ThaiCaseStrip({
  lang,
  labels,
}: {
  lang: ThLocale;
  labels: { readOne: string; swipe: string };
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const cases = marketCases("th");
  // localizeCase only knows the main-site locales (en/zh); Thai titles come from
  // the team-supplied caseContentTh, so base the rest on English for th.
  const base = lang === "zh" ? "zh" : "en";
  const routeLabel = (r: { en: string; zh: string }) => (lang === "zh" ? r.zh : r.en);

  const scrollByCards = (dir: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth / 3 + 16), behavior: "smooth" });
  };

  return (
    <>
      <div className="relative">
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

        <div
          ref={scroller}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {cases.map((raw) => {
            const c = localizeCase(raw, base);
            const title = (lang === "th" ? caseContentTh[raw.id]?.title : undefined) ?? c.title;
            const color = industryColors[c.industry] || "#1A56DB";
            const img = caseStudyImage(c);
            const routes = techRoutesForCase(raw);
            return (
              <Link
                key={c.id}
                href={`/th/${lang}/case-studies/${c.id.toLowerCase()}`}
                className="text-left snap-start shrink-0 w-[82%] sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all group flex flex-col"
              >
                {/* Photo header */}
                <div className="relative h-40 overflow-hidden bg-gray-100">
                  {img && (
                    <Image src={img} alt={title} fill sizes="(max-width: 640px) 82vw, (max-width: 1024px) 45vw, 30vw" className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
                  )}
                  <span className="absolute top-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded text-white" style={{ background: color }}>{c.sector.toUpperCase()}</span>
                  <span className="absolute top-3 right-3 text-[11px] text-white bg-black/40 px-2 py-0.5 rounded">CASE STUDY {c.id}</span>
                </div>
                {/* Body — metric forward */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-2xl font-extrabold leading-none mb-1" style={{ color }}>{c.metric}</p>
                  <p className="text-xs text-gray-400 leading-snug mb-3">{c.metricLabel}</p>
                  <h3 className="font-bold text-sm leading-snug text-gray-800 line-clamp-2 flex-1">{title}</h3>
                  <div className="flex flex-wrap items-center gap-1 mt-3">
                    {brandsForCase(raw).map((bp) => (
                      <span key={bp.brandId} className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white" style={{ background: brandAccent[bp.brandId] }}>{bp.brand}</span>
                    ))}
                    {routes.length > 0 && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full border border-gray-200 text-gray-500">
                        {routeLabel(routes[0])}{routes.length > 1 ? ` +${routes.length - 1}` : ""}
                      </span>
                    )}
                  </div>
                  <span className="mt-3 text-sm font-semibold group-hover:underline" style={{ color }}>{labels.readOne}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-gray-400 md:hidden">{labels.swipe}</p>
    </>
  );
}
