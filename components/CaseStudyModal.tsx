"use client";
import Image from "next/image";
import { type CaseStudy, caseStudyImage, localizeCase } from "@/components/caseStudies";
import { industryColors, industryImage, industryFallbackIcon } from "@/components/industryMedia";
import { useLocale, t } from "@/components/LocaleContext";

// Rich case-study detail modal, shared by the Application page and the
// home Case Study carousel.
export default function CaseStudyModal({
  caseStudy,
  onClose,
}: {
  caseStudy: CaseStudy;
  onClose: () => void;
}) {
  const { locale } = useLocale();
  const c = localizeCase(caseStudy, locale);
  const color = industryColors[c.industry] || "#1A56DB";
  const headerImg = caseStudyImage(c) || industryImage[c.industry];
  const Icon = industryFallbackIcon[c.industry];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white relative max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Visual header — real photo (icon fallback) */}
        <div className="relative h-36 overflow-hidden rounded-t-2xl bg-gray-100">
          {headerImg ? (
            <Image src={headerImg} alt={c.industry} fill sizes="(max-width: 768px) 100vw, 32rem" className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)` }}>
              {Icon ? <Icon className="w-12 h-12 text-white/90" strokeWidth={1.5} /> : null}
            </div>
          )}
          <span className="absolute top-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded text-white" style={{ background: color }}>{c.industry.toUpperCase()}</span>
          <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 text-lg leading-none">✕</button>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-1" style={{ color: "#1A56DB" }}>{c.title}</h2>
          <p className="text-xs text-gray-400 mb-3">{c.company} · {c.id}</p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {c.keywords.map((k) => (
              <span key={k} className="text-[11px] font-medium px-2 py-0.5 rounded-full border" style={{ borderColor: `${color}40`, color, background: `${color}0d` }}>{k}</span>
            ))}
          </div>

          <div className="space-y-3 mb-5">
            {c.overview && (
              <div className="rounded-lg p-4 bg-gray-50 border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t({ en: "Application Overview", zh: "应用概述" }, locale)}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{c.overview}</p>
              </div>
            )}
            <div className="rounded-lg p-4 bg-red-50 border border-red-100">
              <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2">{t({ en: "The Challenge", zh: "挑战" }, locale)}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{c.challenge}</p>
            </div>
            <div className="rounded-lg p-4 border" style={{ background: "#f0f5ff", borderColor: "#c7d9ff" }}>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#1A56DB" }}>{t({ en: "The Solution", zh: "解决方案" }, locale)}</p>
              <p className="text-sm text-gray-700 leading-relaxed">{c.solution}</p>
            </div>
            {c.materials && (
              <div className="rounded-lg p-4 border" style={{ background: "#fafafa", borderColor: "#e5e7eb" }}>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{t({ en: "Compatible Materials", zh: "兼容材料" }, locale)}</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px] text-left text-gray-600">
                    <thead>
                      <tr className="text-gray-400">
                        <th className="py-1 pr-2 font-semibold">{t({ en: "Application", zh: "应用" }, locale)}</th>
                        <th className="py-1 pr-2 font-semibold">{t({ en: "System", zh: "系统" }, locale)}</th>
                        <th className="py-1 pr-2 font-semibold">{t({ en: "Adhesive / Category", zh: "胶粘剂 / 类别" }, locale)}</th>
                        <th className="py-1 font-semibold">{t({ en: "Notes", zh: "备注" }, locale)}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {c.materials.rows.map((m, i) => (
                        <tr key={i} className="border-t border-gray-100 align-top">
                          <td className="py-1 pr-2">{m.application}</td>
                          <td className="py-1 pr-2">{m.system}</td>
                          <td className="py-1 pr-2">{m.category}</td>
                          <td className="py-1">{m.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {c.materials.disclaimer && (
                  <p className="text-[11px] text-orange-500 mt-2 leading-relaxed">⚠ {c.materials.disclaimer}</p>
                )}
              </div>
            )}
            {c.benefits && c.benefits.length > 0 ? (
              <div className="rounded-lg p-4 bg-green-50 border border-green-100">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">{t({ en: "The Benefit", zh: "效益" }, locale)}</p>
                <ul className="text-sm text-gray-700 leading-relaxed list-disc pl-5 space-y-1">
                  {c.benefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ) : c.results ? (
              <div className="rounded-lg p-4 bg-green-50 border border-green-100">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2">{t({ en: "Results & Metrics", zh: "成果与指标" }, locale)}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{c.results}</p>
              </div>
            ) : null}
            {c.marketContext && (
              <div className="rounded-lg p-4 border" style={{ background: "#0891b20d", borderColor: "#0891b233" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#0891b2" }}>{t({ en: "Market Context", zh: "市场背景" }, locale)}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{c.marketContext}</p>
              </div>
            )}
          </div>

          <div className="mb-5 px-1">
            <p className="text-2xl font-bold" style={{ color: "#1A56DB" }}>{c.metric}</p>
            <p className="text-xs text-gray-400 mt-0.5">{c.metricLabel}</p>
          </div>

          <a
            href="mailto:mark_tang@etia-tech.com?subject=Sales%20Inquiry"
            className="block text-center py-2.5 rounded font-semibold text-white text-sm hover:opacity-90"
            style={{ background: "#2563eb" }}
            onClick={onClose}
          >
            {t({ en: "Talk to Our Sales →", zh: "联系我们的销售 →" }, locale)}
          </a>
        </div>
      </div>
    </div>
  );
}
