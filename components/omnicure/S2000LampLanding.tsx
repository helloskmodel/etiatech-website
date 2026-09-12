"use client";
import Image from "next/image";
import { BRAND, CONTACT } from "./copy";
import { LAMP, LAMP_UI, getLampContent, type LampLang } from "./s2000Lamp";
import { localeSalesEmail } from "@/components/contact";
import { OfficeBar, LampShop, defaultOfficeId } from "./LampShop";
import { useState } from "react";

export default function S2000LampLanding({ lang }: { lang: LampLang }) {
  const page = `s2000-lamp-${lang}`;
  const c = getLampContent(lang);
  const L = LAMP_UI[lang];
  // Which country's contact details the page is showing. The shop reads it too,
  // so an inquiry carries the market it came from.
  const [officeId, setOfficeId] = useState<string>(defaultOfficeId(lang));
  // EN/TH are the Thailand SEM pair (Bangkok office); ZH/VI route to the
  // country-specific sales inbox and drop the Thailand address line.
  const thailandContact = lang === "en" || lang === "th";
  const email = thailandContact ? CONTACT.email : localeSalesEmail(lang);

  return (
    <div>
      {/* HERO */}
      <section style={{ background: BRAND.blue }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: BRAND.green }}>{L.eyebrow}</p>
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-2">{c.h1}</h1>
            <p className="text-base text-white/80 mb-1">{LAMP.tagline}</p>
            <p className="text-sm font-semibold mb-6" style={{ color: BRAND.green }}>{LAMP.spec}</p>
            <div className="mb-8 space-y-3">
              {LAMP.pillars.map((p) => (
                <div key={p.icon} className="rounded-lg px-4 py-3" style={{ background: "#ffffff1a", border: "1px solid #ffffff33" }}>
                  <p className="text-sm font-bold leading-tight text-white">{p.title[lang]}</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-white/75">{p.body[lang]}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#shop" className="rounded-lg px-6 py-3 text-sm font-bold text-white hover:opacity-90" style={{ background: BRAND.green }}>{L.request}</a>
            </div>
          </div>
          <div>
            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <div className="relative w-full" style={{ height: 260 }}>
                <Image src={LAMP.heroImage} alt={LAMP.heroAlt} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-contain" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      <OfficeBar lang={lang} officeId={officeId} onPick={setOfficeId} />

      {/* OVERVIEW + spectral image */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-5" style={{ color: BRAND.blue }}>{L.overview}</h2>
            {c.intro.map((p, i) => (
              <p key={i} className="text-sm text-gray-600 leading-relaxed mb-3">{p}</p>
            ))}
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 relative" style={{ height: 320 }}>
            <Image src={LAMP.spectralImage} alt={LAMP.spectralAlt} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain p-6" unoptimized />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: BRAND.blue }}>{L.features}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.features.map((f, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-gray-100 bg-white p-4">
                <span className="shrink-0 text-lg" style={{ color: BRAND.green }}>✓</span>
                <span className="text-sm text-gray-700 leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BENEFITS + life image */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 relative order-2 lg:order-1" style={{ height: 320 }}>
            <Image src={LAMP.lifeImage} alt={LAMP.lifeAlt} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain p-6" unoptimized />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-5" style={{ color: BRAND.blue }}>{L.benefits}</h2>
            <ul className="space-y-3">
              {c.benefits.map((b, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 text-lg" style={{ color: BRAND.green }}>✓</span>
                  <span className="text-sm text-gray-700 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHICH LAMP */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: BRAND.blue }}>{L.which}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {LAMP.lampTypes.map((t) => (
              <div key={t.name} className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-2 gap-3">
                  <h3 className="text-lg font-bold text-gray-900">{t.name}</h3>
                  <span className="text-xs font-mono font-semibold px-2 py-1 rounded whitespace-nowrap" style={{ background: "#1A3DAD10", color: BRAND.blue }}>{t.pn}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{t.desc[lang]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP — the four lamps, a quantity box, one ask for price and date */}
      <LampShop lang={lang} officeId={officeId} page={page} />

      {/* CLOSING — contact only. The ask is the form directly above; repeating
          it here asked a visitor who has just filled it in to do it again. */}
      <section style={{ background: BRAND.blue }}>
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-sm text-white/80">✉ {email}{thailandContact && " · 📍 Bangkok, Thailand"}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: BRAND.blue }}>{L.faq}</h2>
          <div className="divide-y divide-gray-100">
            {c.faq.map((f) => (
              <details key={f.q} className="py-4 group">
                <summary className="cursor-pointer font-semibold text-gray-900 list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-gray-400 group-open:rotate-45 transition-transform">＋</span>
                </summary>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
