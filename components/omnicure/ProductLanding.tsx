"use client";
import Image from "next/image";
import { BRAND, CONTACT } from "./copy";
import { track } from "./track";
import LeadForm from "./LeadForm";
import type { ProductLandingConfig } from "./productConfig";

const LINE_URL = CONTACT.lineId && CONTACT.lineId !== "TODO_FILL" ? `https://line.me/R/ti/p/${CONTACT.lineId}` : "#line";

export default function ProductLanding({ config }: { config: ProductLandingConfig }) {
  const c = config;
  const page = `${c.slug}-${c.lang}`;
  const th = c.lang === "th";
  const L = {
    request: th ? "ขอใบเสนอราคา" : "Request a Quote",
    line: th ? "คุยกับเราทาง LINE" : "Talk to us on LINE",
    features: th ? "คุณสมบัติเด่น" : "Key Features",
    specs: th ? "ข้อมูลจำเพาะ" : "Specifications",
    apps: th ? "การใช้งาน" : "Applications",
    faq: th ? "คำถามที่พบบ่อย" : "Frequently asked questions",
    authorized: th ? "ตัวแทนจำหน่าย OmniCure ที่ได้รับอนุญาตในประเทศไทย" : "Authorized OmniCure Distributor in Thailand",
    closing: th ? `ต้องการ ${c.name} ในประเทศไทย? ขอราคาและคำแนะนำวันนี้` : `Need the ${c.name} in Thailand? Get pricing and expert advice today.`,
  };
  const onCall = () => track("click_call", { page, lang: c.lang });
  const onLine = () => track("click_line", { page, lang: c.lang });

  return (
    <div className="pb-20 md:pb-0">
      {/* HERO */}
      <section style={{ background: BRAND.blue }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: BRAND.green }}>
              OmniCure · Thailand
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-2">{c.name}</h1>
            <p className="text-lg font-semibold mb-4" style={{ color: BRAND.green }}>{c.tagline}</p>
            {c.subhead && <p className="text-base text-white/80 mb-6 leading-relaxed">{c.subhead}</p>}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {c.stats.map(([val, label]) => (
                <div key={label} className="rounded-lg px-3 py-2.5" style={{ background: "#ffffff1a", border: "1px solid #ffffff33" }}>
                  <p className="text-lg font-bold text-white leading-tight">{val}</p>
                  <p className="text-[11px] text-white/70 leading-tight mt-0.5">{label}</p>
                </div>
              ))}
            </div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold text-white rounded-full px-3 py-1.5 mb-6" style={{ background: "#ffffff1a", border: "1px solid #ffffff33" }}>
              ✓ {L.authorized}
            </p>
            <div className="hidden md:flex flex-wrap gap-3">
              <a href="#quote" className="rounded-lg px-6 py-3 text-sm font-bold text-white hover:opacity-90" style={{ background: BRAND.green }}>{L.request}</a>
              <a href={LINE_URL} onClick={onLine} className="rounded-lg px-6 py-3 text-sm font-bold text-white border border-white/40 hover:border-white/70">{L.line}</a>
            </div>
          </div>
          <div id="quote">
            {c.image && (
              <div className="rounded-2xl bg-white p-4 mb-4 shadow-lg">
                <div className="relative w-full" style={{ height: 220 }}>
                  <Image src={c.image} alt={c.name} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-contain" unoptimized />
                </div>
              </div>
            )}
            <LeadForm lang={c.lang} page={`${page}-hero`} compact />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      {c.features.length > 0 && (
        <section className="bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: BRAND.blue }}>{L.features}</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {c.features.map((f, i) => (
                <li key={i} className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <span className="shrink-0 text-lg" style={{ color: BRAND.green }}>✓</span>
                  <span className="text-sm text-gray-700 leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* SPECS */}
      {c.specs.length > 0 && (
        <section className="bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: BRAND.blue }}>{L.specs}</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white">
              <table className="w-full text-sm border-collapse">
                <tbody>
                  {c.specs.map(([k, v], i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0">
                      <th className="text-left font-medium text-gray-500 py-2.5 px-4 align-top w-2/5">{k}</th>
                      <td className="py-2.5 px-4 text-gray-800">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* APPLICATIONS */}
      {c.applications.length > 0 && (
        <section className="bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: BRAND.blue }}>{L.apps}</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {c.applications.map((a, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700"><span style={{ color: BRAND.green }}>•</span>{a}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* CLOSING CTA */}
      <section style={{ background: BRAND.blue }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{L.closing}</h2>
            <p className="text-sm text-white/80 mb-6">☎ {CONTACT.phone} · ✉ {CONTACT.email} · 📍 Bangkok, Thailand</p>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${CONTACT.phoneHref}`} onClick={onCall} className="rounded-lg px-5 py-3 text-sm font-bold text-white hover:opacity-90" style={{ background: BRAND.green }}>☎ {CONTACT.phone}</a>
              <a href={LINE_URL} onClick={onLine} className="rounded-lg px-5 py-3 text-sm font-bold text-white border border-white/40 hover:border-white/70">💬 LINE</a>
            </div>
          </div>
          <div id="quote-bottom">
            <LeadForm lang={c.lang} page={`${page}-closing`} compact />
          </div>
        </div>
      </section>

      {/* FAQ */}
      {c.faq.length > 0 && (
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
      )}

      {/* Sticky mobile call / LINE bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 grid grid-cols-2 border-t border-gray-200 bg-white">
        <a href={`tel:${CONTACT.phoneHref}`} onClick={onCall} className="py-3.5 text-center text-sm font-bold text-white" style={{ background: BRAND.blue }}>☎ Call</a>
        <a href={LINE_URL} onClick={onLine} className="py-3.5 text-center text-sm font-bold text-white" style={{ background: BRAND.green }}>💬 LINE</a>
      </div>
    </div>
  );
}
