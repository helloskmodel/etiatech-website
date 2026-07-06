"use client";
import Image from "next/image";
import { BRAND, CONTACT, getCopy, type Lang } from "./copy";
import { track } from "./track";
import LeadForm from "./LeadForm";

const LOGO =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo/ETIALOGO.jpg";
const LINE_URL = CONTACT.lineId && CONTACT.lineId !== "TODO_FILL" ? `https://line.me/R/ti/p/${CONTACT.lineId}` : "#line";

export default function OmniCureLanding({ lang }: { lang: Lang }) {
  const c = getCopy(lang);
  const page = `omnicure-${lang}`;

  const onCall = () => track("click_call", { page, lang });
  const onLine = () => track("click_line", { page, lang });

  return (
    <div className="pb-20 md:pb-0">
      {/* HERO */}
      <section style={{ background: BRAND.blue }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: BRAND.green }}>
              OmniCure® · Thailand
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">{c.hero.h1}</h1>
            <p className="text-base md:text-lg text-white/80 mb-6 leading-relaxed">{c.hero.subhead}</p>
            <ul className="flex flex-wrap gap-2 mb-8">
              {c.hero.badges.map((b) => (
                <li key={b} className="inline-flex items-center gap-1.5 text-xs font-semibold text-white rounded-full px-3 py-1.5" style={{ background: "#ffffff1a", border: "1px solid #ffffff33" }}>
                  ✓ {b}
                </li>
              ))}
            </ul>
            <div className="hidden md:flex flex-wrap gap-3">
              <a href="#quote" className="rounded-lg px-6 py-3 text-sm font-bold text-white hover:opacity-90" style={{ background: BRAND.green }}>
                {c.hero.ctaPrimary}
              </a>
              <a href={LINE_URL} onClick={onLine} className="rounded-lg px-6 py-3 text-sm font-bold text-white border border-white/40 hover:border-white/70">
                {c.hero.ctaSecondary}
              </a>
            </div>
          </div>
          <div id="quote">
            <LeadForm lang={lang} page={`${page}-hero`} />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start gap-5">
          {/* Authorization badge / letter thumbnail slot (asset provided later) */}
          <div className="shrink-0 w-24 h-24 rounded-lg border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-[10px] text-gray-400 text-center px-2">
            Authorized<br />Distributor<br />badge
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{c.trustBar}</p>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: BRAND.blue }}>{c.productsHeading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {c.products.map((p) => (
              <div key={p.id} id={p.id} className="scroll-mt-24 rounded-2xl bg-white border border-gray-100 shadow-sm p-6 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{p.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1">{p.desc}</p>
                <a
                  href="#quote"
                  onClick={() => track("ask_price", { page, lang, model: p.name })}
                  className="self-start rounded-lg px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
                  style={{ background: BRAND.blue }}
                >
                  {c.askPrice} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: BRAND.blue }}>{c.whyHeading}</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {c.why.map((w) => (
              <li key={w} className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <span className="shrink-0 text-lg" style={{ color: BRAND.green }}>✓</span>
                <span className="text-sm text-gray-700 leading-relaxed">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* APPLICATIONS + SERVICE */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-3" style={{ color: BRAND.blue }}>{c.applicationsHeading}</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{c.applications}</p>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-3" style={{ color: BRAND.blue }}>{c.serviceHeading}</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{c.service}</p>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section style={{ background: BRAND.blue }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{c.closingHeading}</h2>
            <p className="text-sm text-white/80 mb-6">{c.contactLine}</p>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${CONTACT.phoneHref}`} onClick={onCall} className="rounded-lg px-5 py-3 text-sm font-bold text-white hover:opacity-90" style={{ background: BRAND.green }}>
                ☎ {CONTACT.phone}
              </a>
              <a href={LINE_URL} onClick={onLine} className="rounded-lg px-5 py-3 text-sm font-bold text-white border border-white/40 hover:border-white/70">
                💬 LINE
              </a>
            </div>
          </div>
          <div id="quote-bottom">
            <LeadForm lang={lang} page={`${page}-closing`} compact />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-8" style={{ color: BRAND.blue }}>{c.faqHeading}</h2>
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

      {/* Sticky mobile call / LINE bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50 grid grid-cols-2 border-t border-gray-200 bg-white">
        <a href={`tel:${CONTACT.phoneHref}`} onClick={onCall} className="py-3.5 text-center text-sm font-bold text-white" style={{ background: BRAND.blue }}>
          ☎ Call
        </a>
        <a href={LINE_URL} onClick={onLine} className="py-3.5 text-center text-sm font-bold text-white" style={{ background: BRAND.green }}>
          💬 LINE
        </a>
      </div>

      {/* Minimal footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-xs flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image src={LOGO} alt="ETIA Technology" width={90} height={30} className="object-contain bg-white rounded px-1.5 py-0.5" unoptimized />
            <span>© {new Date().getFullYear()} ETIA · Authorized OmniCure® Distributor in Thailand</span>
          </div>
          <span>📍 {CONTACT.address}</span>
        </div>
      </footer>
    </div>
  );
}
