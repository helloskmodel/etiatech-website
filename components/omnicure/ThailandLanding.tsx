"use client";
import { BRAND, CONTACT, getCopy } from "./copy";
import { track } from "./track";
import LeadForm from "./LeadForm";

// Google Ads landing page for OmniCure UV curing in Thailand ("偷流" / paid
// search). Deliberately NOT the old all-blue SEM form (which was retired) — a
// clean, light, conversion-focused layout: message-matched headline, LINE-first
// CTAs, trust logos, minimal form above the fold. English-primary; noindex.

const LINE_URL = CONTACT.lineUrl || "#quote"; // personal/OA LINE link → copy.ts CONTACT.lineUrl
const HAS_LINE = Boolean(CONTACT.lineUrl);

// A small, credible subset of the customer logo wall (medical + photonics —
// the verticals OmniCure sells hardest into). Grayscale = quiet trust.
const LOGO_BASE =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo";
const logoUrl = (file: string) =>
  `${LOGO_BASE}/${file.replace(/ /g, "%20").replace(/\(/g, "%28").replace(/\)/g, "%29")}`;
const LOGOS: [string, string][] = [
  ["Baxter", "UV_logo (Baxter).png"],
  ["Boston Scientific", "UV_logo (Boston Scientific).png"],
  ["Medtronic", "UV_logo (Medtronic).png"],
  ["GE HealthCare", "UV_logo (GE HealthCare).png"],
  ["Coherent", "UV_logo (Coherent).png"],
  ["IPG Photonics", "UV_logo (IPG Photonics).png"],
  ["Lumentum", "UV_logo (Lumentum).png"],
  ["Seagate", "UV_logo (Seagate).png"],
];

export default function ThailandLanding() {
  const c = getCopy("en");
  const page = "lp-uv-curing-thailand-en";
  const onCall = () => track("click_call", { page, lang: "en" });
  const onLine = () => track("click_line", { page, lang: "en" });

  return (
    <div className="pb-20 md:pb-0" style={{ color: "#111827" }}>
      {/* HERO — light gradient, form on the right above the fold */}
      <section className="relative overflow-hidden border-b border-[#E4ECF4] bg-gradient-to-br from-white via-[#EEF5FF] to-[#F1FAEF]">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-16 lg:px-8">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[.18em]" style={{ color: BRAND.green }}>
              OmniCure · Thailand
            </p>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl" style={{ color: BRAND.blue }}>
              {c.hero.h1}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">{c.hero.subhead}</p>
            <ul className="mt-6 space-y-2">
              {c.hero.badges.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <span className="grid h-5 w-5 place-items-center rounded-full text-[11px] text-white" style={{ background: BRAND.green }}>✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quote" className="rounded-xl px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5" style={{ background: BRAND.green }}>
                {c.hero.ctaPrimary}
              </a>
              <a href={LINE_URL} onClick={onLine} className="inline-flex items-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-bold transition hover:-translate-y-0.5" style={{ borderColor: BRAND.blue, color: BRAND.blue }}>
                💬 {c.hero.ctaSecondary}
              </a>
            </div>
            <p className="mt-5 text-xs text-gray-500">
              ☎ <a href={`tel:${CONTACT.phoneHref}`} onClick={onCall} className="font-semibold hover:underline">{CONTACT.phone}</a> · 📍 Bangkok, Thailand
            </p>
          </div>
          <div id="quote">
            <LeadForm lang="en" page={`${page}-hero`} compact />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-b border-[#E4ECF4] bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="text-sm leading-relaxed text-gray-600">{c.trustBar}</p>
        </div>
      </section>

      {/* CUSTOMER LOGOS */}
      <section className="bg-[#F7F9FC]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <p className="mb-6 text-center text-xs font-bold uppercase tracking-[.18em]" style={{ color: BRAND.green }}>
            Trusted by leading medical &amp; photonics manufacturers
          </p>
          <div className="grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-4 lg:grid-cols-8">
            {LOGOS.map(([name, file]) => (
              <div key={name} className="flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoUrl(file)} alt={name} title={name} loading="lazy" className="h-8 w-auto max-w-[120px] object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold md:text-3xl" style={{ color: BRAND.blue }}>{c.productsHeading}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {c.products.map((p) => (
              <div key={p.id} className="flex flex-col rounded-xl border border-gray-100 bg-[#F9FBFD] p-5">
                <p className="font-bold text-gray-900">{p.name}</p>
                <p className="mt-1 flex-1 text-sm leading-relaxed text-gray-600">{p.desc}</p>
                <a href="#quote" className="mt-3 inline-flex w-fit items-center gap-1 text-sm font-bold hover:underline" style={{ color: BRAND.green }}>
                  {c.askPrice} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-[#F7F9FC]">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold md:text-3xl" style={{ color: BRAND.blue }}>{c.whyHeading}</h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {c.why.map((w, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-gray-100 bg-white p-4">
                <span className="shrink-0 text-lg" style={{ color: BRAND.green }}>✓</span>
                <span className="text-sm leading-relaxed text-gray-700">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* APPLICATIONS + SERVICE */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <h2 className="mb-3 text-xl font-bold md:text-2xl" style={{ color: BRAND.blue }}>{c.applicationsHeading}</h2>
            <p className="text-sm leading-relaxed text-gray-600">{c.applications}</p>
          </div>
          <div>
            <h2 className="mb-3 text-xl font-bold md:text-2xl" style={{ color: BRAND.blue }}>{c.serviceHeading}</h2>
            <p className="text-sm leading-relaxed text-gray-600">{c.service}</p>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section style={{ background: BRAND.blue }}>
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">{c.closingHeading}</h2>
            <p className="mb-6 text-sm text-white/80">☎ {CONTACT.phone} · ✉ {CONTACT.email} · 📍 Bangkok, Thailand</p>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${CONTACT.phoneHref}`} onClick={onCall} className="rounded-lg px-5 py-3 text-sm font-bold text-white hover:opacity-90" style={{ background: BRAND.green }}>☎ {CONTACT.phone}</a>
              <a href={LINE_URL} onClick={onLine} className="rounded-lg border border-white/40 px-5 py-3 text-sm font-bold text-white hover:border-white/70">💬 LINE</a>
            </div>
          </div>
          <div id="quote-bottom">
            <LeadForm lang="en" page={`${page}-closing`} compact />
          </div>
        </div>
      </section>

      {/* FAQ */}
      {c.faq.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-2xl font-bold md:text-3xl" style={{ color: BRAND.blue }}>{c.faqHeading}</h2>
            <div className="divide-y divide-gray-100">
              {c.faq.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-900">
                    {f.q}
                    <span className="text-gray-400 transition-transform group-open:rotate-45">＋</span>
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky mobile call / LINE bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-gray-200 bg-white md:hidden">
        <a href={`tel:${CONTACT.phoneHref}`} onClick={onCall} className="py-3.5 text-center text-sm font-bold text-white" style={{ background: BRAND.blue }}>☎ Call</a>
        <a href={HAS_LINE ? LINE_URL : "#quote"} onClick={onLine} className="py-3.5 text-center text-sm font-bold text-white" style={{ background: BRAND.green }}>💬 LINE</a>
      </div>
    </div>
  );
}
