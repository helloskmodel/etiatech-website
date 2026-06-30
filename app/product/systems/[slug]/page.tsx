import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { products, getProduct, productImage, brandAccent } from "@/components/productCatalog";

export function generateStaticParams() {
  // Skip products that have a dedicated rich page (href override).
  return products.filter((p) => !p.href).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Product — ETIA Technology" };
  return {
    title: `${p.name} — ETIA Technology`,
    description: p.intro.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const accent = brandAccent[p.brandId];

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
          <Link href="/product" className="hover:text-[#1A56DB]">Products</Link>
          <span className="mx-2">›</span>
          <Link href="/product/systems" className="hover:text-[#1A56DB]">All Systems</Link>
          <span className="mx-2">›</span>
          <span style={{ color: accent }}>{p.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 relative overflow-hidden border-b border-gray-200" style={{ background: "#f1f5f9" }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded text-white" style={{ background: accent }}>{p.brand}</span>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full border border-gray-300 text-gray-600">{p.tech}{p.sub ? ` · ${p.sub}` : ""}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ color: "#1A56DB" }}>{p.name}</h1>
            <p className="text-base text-gray-600 leading-relaxed mb-8">{p.intro}</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: accent }}>Request a Quote</Link>
              <Link href="/contact" className="px-6 py-3 rounded font-semibold text-gray-700 border border-gray-300 hover:border-gray-500 transition-all">Talk to an Engineer</Link>
            </div>
          </div>
          {/* Product image */}
          <div className="rounded-2xl bg-white border border-gray-200 shadow-sm relative" style={{ height: "360px" }}>
            {productImage(p) ? (
              <Image src={productImage(p)} alt={p.name} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain p-6" priority />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold" style={{ color: accent }}>{p.brand}</span>
            )}
          </div>
        </div>
      </section>

      {/* Features + Applications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Features</p>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#1A56DB" }}>Key Features</h2>
            <ul className="space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                  <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px]" style={{ background: accent }}>✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Applications</p>
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#1A56DB" }}>Where It&apos;s Used</h2>
            <ul className="space-y-3">
              {p.applications.map((a) => (
                <li key={a} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                  <span className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full" style={{ background: "#44B549" }} />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16" style={{ background: "#f0f4f8" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>Specifications</p>
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#1A56DB" }}>Technical Specifications</h2>
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
            <table className="w-full text-sm">
              <tbody>
                {p.specs.map(([label, value], i) => (
                  <tr key={label} className={i % 2 === 1 ? "bg-gray-50" : "bg-white"}>
                    <td className="px-5 py-3 font-medium text-gray-700 align-top w-2/5">{label}</td>
                    <td className="px-5 py-3 text-gray-500">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14" style={{ background: "#0a1628" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Interested in the {p.name.split(" ").slice(0, 3).join(" ")}?</h2>
          <p className="text-gray-300 mb-8">Our UV curing engineers will match the right configuration to your process — from selection to validation.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-8 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#44B549" }}>Request a Quote →</Link>
            <Link href="/product/systems" className="px-8 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">All Systems</Link>
          </div>
        </div>
      </section>
    </>
  );
}
