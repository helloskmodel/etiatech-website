import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marketProducts } from "@/components/markets";
import { localizeProduct } from "@/components/productCatalog";
import { inquiryMailto } from "@/components/contact";
import { isThLocale, getDict, type ThLocale } from "../../../dictionaries";
import { productContentTh } from "../../../productContentTh";

const SITE = "https://www.etiatech.com";

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
    title: `${p.name} | ETIA Thailand`,
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
  const loc = localizeProduct(p, l);
  const th = l === "th" ? productContentTh[p.slug] : undefined;

  return (
    <article className="bg-white">
      {/* Header */}
      <div className="py-12 md:py-16" style={{ background: "#0f2444" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={`/th/${l}#products`} className="text-sm font-medium text-gray-300 hover:text-white">
            {d.nav.products}
          </Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide" style={{ color: "#44B549" }}>{p.sub}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mt-1">{p.name}</h1>
          {th ? (
            <p className="text-base text-gray-200 mt-3 leading-relaxed">{th.subtitle}</p>
          ) : (
            loc.intro && <p className="text-base text-gray-200 mt-3 leading-relaxed">{loc.intro}</p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Narrative — TH from brochure sections; en/zh from catalog features */}
        {th ? (
          <div className="space-y-6 mb-12">
            {th.sections.map((s, i) => (
              <section key={i}>
                {s.heading && <h2 className="text-base font-bold text-gray-800 mb-1">{s.heading}</h2>}
                <p className="text-gray-700 leading-relaxed">{s.text}</p>
              </section>
            ))}
          </div>
        ) : (
          loc.features?.length > 0 && (
            <section className="mb-12">
              <h2 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">{d.products.featuresLabel}</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {loc.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </section>
          )
        )}

        {/* Specs — language-neutral, from the catalog */}
        {p.specs?.length > 0 && (
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
        )}

        <a
          href={inquiryMailto(l, { subject: "Thailand Product Inquiry", context: p.name })}
          className="inline-block text-sm font-semibold text-white rounded px-6 py-3 hover:opacity-90"
          style={{ background: "#1A56DB" }}
        >
          {d.products.inquire} →
        </a>
      </div>
    </article>
  );
}
