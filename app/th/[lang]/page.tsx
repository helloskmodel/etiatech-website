import type { Metadata } from "next";
import Link from "next/link";
import { marketProducts } from "@/components/markets";
import { inquiryMailto } from "@/components/contact";
import { isThLocale, getDict, type ThLocale } from "../dictionaries";
import type { Product } from "@/components/productCatalog";

const SITE = "https://www.etiatech.com";

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
      // hreflang: one URL per language + x-default, so Google indexes each
      // language version separately for Thailand.
      languages: {
        th: `${SITE}/th/th`,
        en: `${SITE}/th/en`,
        zh: `${SITE}/th/zh`,
        "x-default": `${SITE}/th/th`,
      },
    },
  };
}

function ProductCard({ p, l, specsLabel, inquire }: { p: Product; l: ThLocale; specsLabel: string; inquire: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col">
      <div className="p-5 text-white" style={{ background: p.accent }}>
        <p className="text-xs opacity-80 mb-1 tracking-wider font-medium">{p.sub}</p>
        <h3 className="text-lg font-bold">{p.name}</h3>
      </div>
      <div className="p-5 bg-white flex flex-col flex-1">
        {/* Specs are numeric / units — language-neutral, no translation needed */}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">{specsLabel}</p>
        <dl className="text-sm text-gray-600 space-y-1 mb-5">
          {p.specs.slice(0, 4).map(([k, v]) => (
            <div key={k} className="flex gap-2">
              <dt className="text-gray-400 min-w-[42%]">{k}</dt>
              <dd className="font-medium text-gray-700">{v}</dd>
            </div>
          ))}
        </dl>
        <a
          href={inquiryMailto(l, { subject: "Thailand Inquiry", context: p.name })}
          className="mt-auto inline-block text-center text-sm font-semibold text-white rounded px-4 py-2 hover:opacity-90"
          style={{ background: "#1A56DB" }}
        >
          {inquire} →
        </a>
      </div>
    </div>
  );
}

export default async function ThailandHome({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l: ThLocale = isThLocale(lang) ? lang : "th";
  const d = getDict(l);

  const products = marketProducts("th");
  const led = products.filter((p) => p.sub === "UV LED Spot");
  const lamp = products.filter((p) => p.sub !== "UV LED Spot");

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24" style={{ background: "#0f2444" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>
            {d.hero.kicker}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">{d.hero.title}</h1>
          <p className="text-base text-gray-200 mb-8 leading-relaxed">{d.hero.subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <a
              href={inquiryMailto(l, { subject: "Thailand Inquiry" })}
              className="px-6 py-3 rounded font-semibold text-white hover:opacity-90"
              style={{ background: "#1A56DB" }}
            >
              {d.hero.cta} →
            </a>
            <Link
              href="#products"
              className="px-6 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60"
            >
              {d.hero.ctaProducts} →
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* Products — scoped to what ETIA sells in Thailand */}
      <section id="products" className="py-16 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#1A56DB" }}>
            {d.products.heading}
          </h2>
          <p className="text-gray-500 mb-10">{d.products.subheading}</p>

          {led.length > 0 && (
            <div className="mb-12">
              <span className="inline-block text-xs font-bold px-3 py-1 rounded mb-5 text-white" style={{ background: "#44B549" }}>
                {d.products.ledFamily}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {led.map((p) => (
                  <ProductCard key={p.slug} p={p} l={l} specsLabel={d.products.specsLabel} inquire={d.products.inquire} />
                ))}
              </div>
            </div>
          )}

          {lamp.length > 0 && (
            <div>
              <span className="inline-block text-xs font-bold px-3 py-1 rounded mb-5 text-white" style={{ background: "#166534" }}>
                {d.products.lampFamily}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {lamp.map((p) => (
                  <ProductCard key={p.slug} p={p} l={l} specsLabel={d.products.specsLabel} inquire={d.products.inquire} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "#1A56DB" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{d.cta.heading}</h2>
          <p className="text-gray-200 mb-8">{d.cta.body}</p>
          <a
            href={inquiryMailto(l, { subject: "Thailand Sales Inquiry" })}
            className="px-8 py-3 rounded font-semibold text-white hover:opacity-90"
            style={{ background: "#44B549" }}
          >
            {d.cta.button} →
          </a>
        </div>
      </section>
    </>
  );
}
