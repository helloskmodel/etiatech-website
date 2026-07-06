import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marketProducts } from "@/components/markets";
import { localizeProduct } from "@/components/productCatalog";
import { thMailto } from "../../../thContact";
import { isThLocale, getDict, getAuthDict, COMPANY, type ThLocale } from "../../../dictionaries";
import { productContentTh } from "../../../productContentTh";

const SITE = "https://www.etiatech.com";

// Signature stat badges shown in the product hero (like the official site).
// All values are real, from the OmniCure brochures / catalog specs.
const KEY_STATS: Record<string, [string, string][]> = {
  "s2000-elite": [["30 W/cm²", "Peak Irradiance"], ["±5%", "CLF Stability"], ["30 ms", "Shutter"], ["200 W", "Hg Lamp"]],
  lx500: [["27 W/cm²", "Peak @385nm"], ["±5%", "Optical Stability"], ["2 / 4", "Channels"], ["1%", "Intensity Steps"]],
  "s1500-pro": [["37 W/cm²", "Peak Irradiance"], ["Intelli-Lamp 2.0", "Lamp Mgmt"], ['4.3"', "Touchscreen"], ["2000 h", "Lamp Warranty"]],
  r2000: [["±5%", "Accuracy"], ["250 nm–1 µm", "Wavelength"], ["60 W/cm²", "Max Irradiance"], ["NIST", "Traceable"]],
  ls200: [["±10%", "Accuracy"], ["320–750 nm", "Selectable"], ["40 W/cm²", "Max Irradiance"], ["NRC", "Traceable"]],
  "s2e-network-module": [["300", "Stations / LAN"], ["10/100 Mbps", "Ethernet"], ["7", "Email Alerts"], ["Modbus TCP", "PLC"]],
};

export const dynamicParams = false;
export function generateStaticParams() {
  return marketProducts("th").map((p) => ({ slug: p.slug }));
}

function findProduct(slug: string) {
  return marketProducts("th").find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const l: ThLocale = isThLocale(lang) ? lang : "th";
  const p = findProduct(slug);
  if (!p) return {};
  const th = l === "th" ? productContentTh[p.slug] : undefined;
  const loc = localizeProduct(p, l);
  return {
    title: `${p.name} | Authorized OmniCure Distributor Thailand`,
    description: th?.subtitle ?? loc.intro?.slice(0, 160),
    alternates: {
      canonical: `${SITE}/th/${l}/product/${slug}`,
      languages: {
        th: `${SITE}/th/th/product/${slug}`,
        en: `${SITE}/th/en/product/${slug}`,
        zh: `${SITE}/th/zh/product/${slug}`,
        "x-default": `${SITE}/th/th/product/${slug}`,
      },
    },
  };
}

export default async function ThailandProductDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const l: ThLocale = isThLocale(lang) ? lang : "th";
  const p = findProduct(slug);
  if (!p) notFound();

  const d = getDict(l);
  const auth = getAuthDict(l);
  const loc = localizeProduct(p, l);
  const th = l === "th" ? productContentTh[p.slug] : undefined;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    brand: { "@type": "Brand", name: "OmniCure" },
    description: th?.subtitle ?? loc.intro,
    category: p.tech,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: COMPANY.legalName, areaServed: "TH" },
    },
  };

  return (
    <article className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      {/* Header */}
      <div className="py-12 md:py-16" style={{ background: "#0f2444" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`/th/${l}/product`} className="text-sm font-medium text-gray-300 hover:text-white">
            {d.nav.products}
          </Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide" style={{ color: "#44B549" }}>{p.sub}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mt-1">{p.name}</h1>
          {th ? (
            <p className="text-base text-gray-200 mt-3 leading-relaxed">{th.subtitle}</p>
          ) : (
            loc.intro && <p className="text-base text-gray-200 mt-3 leading-relaxed">{loc.intro}</p>
          )}
          <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white rounded px-3 py-1.5" style={{ background: "#16653480", border: "1px solid #44B549" }}>
            ✓ {auth.badge}
          </p>
          {KEY_STATS[p.slug] && (
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {KEY_STATS[p.slug].map(([val, label]) => (
                <div key={label} className="rounded-lg px-3 py-2.5" style={{ background: "#ffffff10", border: "1px solid #ffffff20" }}>
                  <p className="text-lg font-bold text-white leading-tight">{val}</p>
                  <p className="text-[11px] text-gray-300 leading-tight mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Highlight bullets (คุณสมบัติเด่น) — TH brochure */}
        {th?.highlights && th.highlights.length > 0 && (
          <section className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">{d.products.featuresLabel}</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 list-disc pl-5 text-gray-700">
              {th.highlights.map((hl, i) => (
                <li key={i}>{hl}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Narrative — TH from brochure sections; en/zh from catalog features */}
        {th ? (
          <div className="space-y-6 mb-12">
            {th.sections.map((s, i) => (
              <section key={i}>
                {s.heading && <h2 className="text-base font-bold text-gray-800 mb-1">{s.heading}</h2>}
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{s.text}</p>
              </section>
            ))}
          </div>
        ) : (
          <div className="mb-12 space-y-8">
            {loc.features?.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">{d.products.featuresLabel}</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {loc.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </section>
            )}
            {loc.applications?.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">
                  {l === "zh" ? "应用" : "Applications"}
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {loc.applications.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        )}

        {/* Specs — TH renders the authoritative brochure spec groups; en/zh
            render the language-neutral catalog spec table. */}
        {th?.specGroups && th.specGroups.length > 0 ? (
          <section className="mb-12">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">{d.products.fullSpecsLabel}</h2>
            <div className="space-y-6">
              {th.specGroups.map((g, gi) => (
                <div key={gi}>
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">{g.title}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <tbody>
                        {g.rows.map(([k, v], ri) => (
                          <tr key={ri} className="border-b border-gray-100">
                            <th className="text-left font-medium text-gray-500 py-2 pr-4 align-top w-2/5">{k}</th>
                            <td className="py-2 text-gray-800">{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          p.specs?.length > 0 && (
            <section className="mb-12">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">{d.products.fullSpecsLabel}</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    {p.specs.map(([k, v]) => (
                      <tr key={k} className="border-b border-gray-100">
                        <th className="text-left font-medium text-gray-500 py-2 pr-4 align-top w-2/5">{k}</th>
                        <td className="py-2 text-gray-800">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        )}

        <a
          href={thMailto(l, { subject: "Request a Quote — Thailand", context: p.name })}
          className="inline-block text-sm font-semibold text-white rounded px-6 py-3 hover:opacity-90"
          style={{ background: "#1A56DB" }}
        >
          {auth.requestQuote} →
        </a>
      </div>
    </article>
  );
}
