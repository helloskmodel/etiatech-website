import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products, technologies, productHref, productImage, brandAccent } from "@/components/productCatalog";

export const metadata: Metadata = {
  title: "All UV Curing Systems — ETIA Technology",
  description: "Complete Excelitas UV curing systems portfolio — OmniCure, Phoseon, Fusion UV and Noblelight, organized by technology.",
};

export default function AllSystemsPage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 py-3 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-gray-400">
          <Link href="/product" className="hover:text-[#1A56DB]">Products</Link>
          <span className="mx-2">›</span>
          <span style={{ color: "#1A56DB" }}>All Systems</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-12 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1241a3 0%, #1A56DB 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #1A56DB 0%, transparent 60%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>Complete Product Reference</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">All UV Curing Systems</h1>
          <p className="text-base text-gray-300 max-w-2xl mx-auto leading-relaxed line-clamp-2">
            The complete Excelitas portfolio — OmniCure®, Phoseon®, Fusion UV® and Noblelight® — organized by curing technology.
          </p>
        </div>
      </section>

      {/* Products grouped by technology */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {technologies.map((tech) => {
            const group = products.filter((p) => p.tech === tech);
            if (!group.length) return null;
            return (
              <div key={tech}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded text-white" style={{ background: "#1A56DB" }}>{tech.toUpperCase()}</span>
                  <span className="text-xs text-gray-400">{group.length} systems</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.map((p) => (
                    <Link
                      key={p.slug}
                      href={productHref(p)}
                      className="rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all bg-white flex flex-col group"
                    >
                      <div className="relative h-40 overflow-hidden bg-gray-50">
                        {productImage(p) ? (
                          <Image src={productImage(p)} alt={p.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-center px-3" style={{ color: brandAccent[p.brandId] }}>{p.brand}</span>
                        )}
                        <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded text-white" style={{ background: brandAccent[p.brandId] }}>{p.brand}</span>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-bold text-base leading-snug mb-2" style={{ color: "#1A56DB" }}>{p.name}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">{p.intro}</p>
                        <span className="mt-4 text-sm font-semibold group-hover:underline" style={{ color: brandAccent[p.brandId] }}>View details →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14" style={{ background: "#1A56DB" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Not sure which system fits your process?</h2>
          <p className="text-gray-300 mb-8">Our engineers will match the right UV curing system to your exact application.</p>
          <Link href="/contact" className="px-8 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#44B549" }}>Talk to Our Sales →</Link>
        </div>
      </section>
    </>
  );
}
