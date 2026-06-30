"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { successStories, caseStudyImage } from "@/components/caseStudies";
import { industryColors, industryFallbackIcon } from "@/components/industryMedia";

export default function CaseStudyCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = successStories.length;

  const go = useCallback((d: number) => setI((p) => (p + d + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), 6000);
    return () => clearInterval(t);
  }, [paused, n]);

  const c = successStories[i];
  const color = industryColors[c.industry] || "#1A56DB";
  const img = caseStudyImage(c);
  const Icon = industryFallbackIcon[c.industry];

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid md:grid-cols-2">
        {/* Image / fallback */}
        <div className="relative h-56 md:h-auto md:min-h-[20rem]">
          {img ? (
            <Image
              key={c.id}
              src={img}
              alt={c.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={i === 0}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)` }}>
              {Icon && <Icon className="w-16 h-16 text-white/90" strokeWidth={1.25} />}
            </div>
          )}
          <span className="absolute top-3 left-3 text-[11px] font-bold px-2 py-0.5 rounded text-white" style={{ background: color }}>{c.industry.toUpperCase()}</span>
          <span className="absolute bottom-3 left-3 text-[11px] text-white bg-black/40 px-2 py-0.5 rounded">CASE STUDY {c.id}</span>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color }}>{c.company}</p>
          <h3 className="text-lg md:text-xl font-bold mb-3 leading-snug" style={{ color: "#1A56DB" }}>{c.title}</h3>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-bold" style={{ color }}>{c.metric}</span>
            <span className="text-xs text-gray-500 leading-snug">{c.metricLabel}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {c.keywords.slice(0, 4).map((k) => (
              <span key={k} className="text-[11px] font-medium px-2 py-0.5 rounded-full border" style={{ borderColor: `${color}40`, color, background: `${color}0d` }}>{k}</span>
            ))}
          </div>
          <Link href="/application" className="mt-auto inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color }}>
            Explore all case studies →
          </Link>
        </div>
      </div>

      {/* Arrows */}
      <button onClick={() => go(-1)} aria-label="Previous case study" className="absolute left-2 top-[28%] md:top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-gray-200 shadow flex items-center justify-center text-gray-600 hover:bg-white text-lg leading-none">‹</button>
      <button onClick={() => go(1)} aria-label="Next case study" className="absolute right-2 top-[28%] md:top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-gray-200 shadow flex items-center justify-center text-gray-600 hover:bg-white text-lg leading-none">›</button>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 py-3 border-t border-gray-100 bg-gray-50">
        {successStories.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setI(idx)}
            aria-label={`Go to case study ${idx + 1}`}
            className="h-2 rounded-full transition-all"
            style={{ width: idx === i ? "1.25rem" : "0.5rem", background: idx === i ? color : "#cbd5e1" }}
          />
        ))}
      </div>
    </div>
  );
}
