import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FlaskConical, Package, Wrench, ClipboardCheck } from "lucide-react";
import { thMailto } from "../thContact";
import { isThLocale, getDict, getHomeDict, type ThLocale } from "../dictionaries";
import ThaiCaseStrip from "../ThaiCaseStrip";

const SITE = "https://www.etiatech.com";
const IMG = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/homepageproduct";

// Full-spectrum technology overview (brand capability). Category names stay in
// English per the Thailand team's SEO guidance. Informational — the products
// actually sold in Thailand live on the dedicated /product page.
const TECH_ROUTES = [
  { label: "UV LED SPOT CURING SYSTEMS", img: `${IMG}/HOME%20PAGE%20PRODUCT-LEFT1-UV%20LED%20CURING.png` },
  { label: "UV LED AIR-COOLED SYSTEMS", img: `${IMG}/HOME%20PAGE%20PRODUCT-LEFT%202-UV%20LED%20AIR-COOLED.png` },
  { label: "UV LED WATER-COOLED SYSTEMS", img: `${IMG}/HOME%20PAGE%20PRODUCT-LEFT%203-UV-LED%20WATER-COOLED%20SYSTEM.png` },
  { label: "UV LAMP SPOT CURING SYSTEMS", img: `${IMG}/HOME%20PAGE%20PRODUCT-LEFT4-UV%20LAMP%20SPOT%20CURING%20SYSTEM.png` },
  { label: "MICROWAVE UV CURING SYSTEMS", img: `${IMG}/HOME%20PAGE%20PRODUCT-LEFT5-MICROWAVE%20UV%20CURING.png` },
  { label: "MERCURY ARC LAMPS", img: `${IMG}/HOME%20PAGE%20PRODUCT-LEFT6-MERCURY%20UVC%20LAMPS.png` },
];
const WHY_ICONS = [FlaskConical, Package, Wrench, ClipboardCheck];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const l: ThLocale = isThLocale(lang) ? lang : "th";
  const d = getDict(l);
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: {
      canonical: `${SITE}/th/${l}`,
      languages: {
        th: `${SITE}/th/th`,
        en: `${SITE}/th/en`,
        zh: `${SITE}/th/zh`,
        "x-default": `${SITE}/th/th`,
      },
    },
  };
}

export default async function ThailandHome({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: ThLocale = isThLocale(lang) ? lang : "th";
  const h = getHomeDict(l);

  return (
    <>
      {/* HERO */}
      <section className="py-20 md:py-28" style={{ background: "#0f2444" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>
              {h.hero.eyebrow}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              {h.hero.titleA}
              <br />
              <span style={{ color: "#44B549" }}>{h.hero.titleB}</span>
            </h1>
            <p className="text-base text-gray-200 mb-8 leading-relaxed">{h.hero.subtitle}</p>
            <div className="flex flex-wrap gap-4">
              <Link href={`/th/${l}/product`} className="px-6 py-3 rounded font-semibold text-white hover:opacity-90" style={{ background: "#1A56DB" }}>
                {h.hero.btnProducts}
              </Link>
              <a href={thMailto(l, { subject: "Thailand Inquiry" })} className="px-6 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60">
                {h.hero.btnEngineer}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ETIA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{h.why.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1A56DB" }}>{h.why.heading}</h2>
          <p className="text-gray-500 max-w-2xl mb-12">{h.why.intro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {h.why.cards.map((c, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <div key={i} className="rounded-xl p-6 border border-gray-100 hover:border-[#1A56DB]/30 hover:shadow-md transition-all bg-gray-50">
                  <Icon className="mb-4" size={32} strokeWidth={1.75} style={{ color: "#1A56DB" }} />
                  <h3 className="font-semibold text-base mb-2" style={{ color: "#1A56DB" }}>{c.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FULL SPECTRUM (brand capability) */}
      <section className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{h.spectrum.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>{h.spectrum.heading}</h2>
          <p className="text-gray-500 mb-8">{h.spectrum.subtitle}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {TECH_ROUTES.map((route) => (
              <div key={route.label} className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm flex flex-col">
                <div className="px-3 py-2 text-white text-xs font-bold leading-tight" style={{ background: "#44B549" }}>{route.label}</div>
                <div className="bg-gray-50 relative flex-1" style={{ minHeight: "120px" }}>
                  <Image src={route.img} alt={route.label} fill sizes="(max-width: 768px) 50vw, 16vw" className="object-contain p-3" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href={`/th/${l}/product`} className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-white hover:opacity-90" style={{ background: "#1A56DB" }}>
              {h.spectrum.viewAll}
            </Link>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="case-studies" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{h.cases.eyebrow}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#1A56DB" }}>{h.cases.heading}</h2>
          <p className="text-gray-500 mb-10 max-w-2xl">{h.cases.subtitle}</p>
          <ThaiCaseStrip lang={l} labels={{ readOne: h.cases.readOne, swipe: h.cases.swipe }} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "#1A56DB" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{h.cta.heading}</h2>
          <p className="text-gray-200 mb-8">{h.cta.body}</p>
          <a href={thMailto(l, { subject: "Thailand Sales Inquiry" })} className="px-8 py-3 rounded font-semibold text-white hover:opacity-90" style={{ background: "#44B549" }}>
            {h.cta.button}
          </a>
        </div>
      </section>
    </>
  );
}
