"use client";
import Image from "next/image";
import { BRAND, CONTACT, type Lang } from "./copy";
import { track } from "./track";
import LeadForm from "./LeadForm";
import { LAMP, getLampContent } from "./s2000Lamp";

export default function S2000LampLanding({ lang }: { lang: Lang }) {
  const page = `s2000-lamp-${lang}`;
  const th = lang === "th";
  const c = getLampContent(lang);
  const L = {
    eyebrow: "OmniCure · Replacement Lamp",
    request: th ? "ขอราคา / สั่งซื้อหลอด" : "Request a Quote / Re-order",
    overview: th ? "ข้อมูลผลิตภัณฑ์" : "Overview",
    features: th ? "คุณสมบัติ" : "Features",
    benefits: th ? "ประโยชน์" : "Benefits",
    which: th ? "เลือกหลอดรุ่นไหน?" : "Which lamp do I need?",
    parts: th ? "หมายเลขชิ้นส่วน (Part Numbers)" : "Part Numbers",
    partsHint: th ? "ค้นหาด้วยหมายเลขชิ้นส่วนได้เลย — สั่งหลอดที่ตรงรุ่น" : "Search by part number — order the exact lamp you need.",
    alsoSearched: th ? "ค้นหาด้วยรหัสอื่นได้: " : "Also searched as: ",
    faq: th ? "คำถามที่พบบ่อย" : "Frequently asked questions",
    closing: th ? "ต้องเปลี่ยนหลอด S2000? ขอราคาวันนี้" : "Need a replacement S2000 lamp? Get pricing today.",
    askPrice: th ? "สอบถามราคา →" : "Ask price →",
  };

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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {LAMP.stats.map(([val, label]) => (
                <div key={label} className="rounded-lg px-3 py-2.5" style={{ background: "#ffffff1a", border: "1px solid #ffffff33" }}>
                  <p className="text-base font-bold text-white leading-tight">{val}</p>
                  <p className="text-[11px] text-white/70 leading-tight mt-0.5">{label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="#quote" className="rounded-lg px-6 py-3 text-sm font-bold text-white hover:opacity-90" style={{ background: BRAND.green }}>{L.request}</a>
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
                <p className="text-sm text-gray-600 leading-relaxed">{th ? t.descTh : t.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PART NUMBERS */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: BRAND.blue }}>{L.parts}</h2>
          <p className="text-sm text-gray-500 mb-6">{L.partsHint}</p>
          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm border-collapse">
              <tbody>
                {LAMP.parts.map(([pn, desc]) => (
                  <tr key={pn} id={pn} className="border-b border-gray-100 last:border-0 scroll-mt-24">
                    <th className="text-left font-mono font-semibold py-3 px-4 align-top whitespace-nowrap" style={{ color: BRAND.blue }}>{pn}</th>
                    <td className="py-3 px-4 text-gray-700">{desc}</td>
                    <td className="py-3 px-4 text-right">
                      <a href="#quote" onClick={() => track("ask_price", { page, lang, model: pn })} className="text-xs font-semibold whitespace-nowrap hover:underline" style={{ color: BRAND.green }}>{L.askPrice}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">{L.alsoSearched}{LAMP.variants}</p>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section style={{ background: BRAND.blue }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{L.closing}</h2>
            <p className="text-sm text-white/80">✉ {CONTACT.email} · 📍 Bangkok, Thailand</p>
          </div>
          <div id="quote" className="scroll-mt-24">
            <LeadForm lang={lang} page={`${page}-closing`} compact showModel={false} />
          </div>
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
