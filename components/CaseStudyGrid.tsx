"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { successStories, caseStudyImage, localizeCase, type CaseStudy } from "@/components/caseStudies";
import CaseStudyModal from "@/components/CaseStudyModal";
import { useLocale, t, type LangText } from "@/components/LocaleContext";

// Three metric-forward featured case studies for the home page. Replaces the
// old carousel so the headline numbers are always visible (not hidden behind
// arrows). Clicking a card opens the full case-study modal.
const featured: {
  id: string;
  color: string;
  category: LangText;
  metric: LangText;
  metricSub: LangText;
  extra?: LangText;
}[] = [
  {
    id: "B1",
    color: "#44B549",
    category: { en: "AUTOMOTIVE & EV", zh: "汽车与电动车" },
    metric: { en: "Up to 80%", zh: "最高 80%" },
    metricSub: { en: "Cost Reduction", zh: "成本降低" },
    extra: { en: "VOCs Eliminated", zh: "消除 VOC 排放" },
  },
  {
    id: "B2",
    color: "#1A56DB",
    category: { en: "PHOTONICS", zh: "光子学" },
    metric: { en: "±5%", zh: "±5%" },
    metricSub: { en: "Dose Stability", zh: "剂量稳定性" },
    extra: { en: "400G → 1.6T", zh: "400G → 1.6T" },
  },
  {
    id: "B9",
    color: "#0d9488",
    category: { en: "MEDICAL DEVICE", zh: "医疗器械" },
    metric: { en: "NIST-Traceable", zh: "NIST 溯源" },
    metricSub: { en: "360° Cure", zh: "360° 固化" },
    extra: { en: "Patient Safety", zh: "患者安全" },
  },
];

export default function CaseStudyGrid() {
  const { locale } = useLocale();
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((f) => {
          const raw = successStories.find((s) => s.id === f.id);
          if (!raw) return null;
          const c = localizeCase(raw, locale);
          const img = caseStudyImage(c);
          return (
            <button
              key={f.id}
              onClick={() => setSelected(c)}
              className="text-left rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all group flex flex-col"
            >
              {/* Photo header */}
              <div className="relative h-36 overflow-hidden bg-gray-100">
                {img && (
                  <Image src={img} alt={c.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                )}
                <span className="absolute top-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded text-white" style={{ background: f.color }}>{t(f.category, locale)}</span>
                <span className="absolute top-3 right-3 text-[11px] text-white bg-black/40 px-2 py-0.5 rounded">CASE STUDY {f.id}</span>
              </div>
              {/* Metric-forward body */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-3xl md:text-4xl font-extrabold leading-none mb-1" style={{ color: f.color }}>{t(f.metric, locale)}</p>
                <p className="text-sm font-semibold text-gray-700">{t(f.metricSub, locale)}</p>
                {f.extra && <p className="text-xs text-gray-400 mt-0.5">{t(f.extra, locale)}</p>}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-800 leading-snug pr-2">{c.company}</span>
                  <span className="text-sm font-semibold whitespace-nowrap group-hover:underline" style={{ color: f.color }}>→</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link href="/application#case-studies" className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold border-2 border-[#1A56DB] text-[#1A56DB] hover:bg-[#1A56DB] hover:text-white transition-all">
          {t({ en: "Explore All 10 Case Studies →", zh: "查看全部 10 个案例 →" }, locale)}
        </Link>
      </div>

      {selected && <CaseStudyModal caseStudy={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
