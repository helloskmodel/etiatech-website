import Link from "next/link";

const brands = [
  {
    name: "OmniCure®",
    tagline: "Precision UV Spot & Area Curing",
    desc: "The world's leading UV curing platform for medical devices, electronics, and precision manufacturing.",
    available: true,
    href: "/product/omnicure",
    color: "#2563eb",
  },
  {
    name: "Phoseon®",
    tagline: "UV LED Air & Water-Cooled Systems",
    desc: "High-power LED curing for printing, labels, packaging, and industrial coating applications.",
    available: false,
    color: "#16a34a",
  },
  {
    name: "Fusion UV®",
    tagline: "Microwave UV Curing Systems",
    desc: "Electrodeless microwave UV systems for broad-spectrum, high-power industrial curing.",
    available: false,
    color: "#d97706",
  },
  {
    name: "NobleLight®",
    tagline: "Mercury Arc Lamps & Water-Cooled Systems",
    desc: "Broad-spectrum mercury arc lamps for printing, wood coating, and replacement applications.",
    available: false,
    color: "#7c3aed",
  },
];

export default function ProductPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2444 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest text-[#3b82f6] uppercase mb-3">Our Products</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Precision Cures.<br /><span className="text-[#3b82f6]">Supreme Control.</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            4 world-class brands. 6 technology routes. One authorized partner who stocks it, supports it, and stands behind every system.
          </p>
        </div>
      </section>

      {/* Brand Selection */}
      <section className="py-20" style={{ background: "#0a1628" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 mb-12 text-sm">Select a brand to explore products and solutions</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className={`relative rounded-2xl p-6 border transition-all flex flex-col ${
                  brand.available
                    ? "border-white/20 hover:border-[#3b82f6]/60 hover:shadow-lg cursor-pointer"
                    : "border-white/10 opacity-60"
                }`}
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                {!brand.available && (
                  <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400">
                    Coming Soon
                  </span>
                )}
                <div
                  className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center text-white font-bold text-sm"
                  style={{ background: brand.color }}
                >
                  {brand.name[0]}
                </div>
                <h2 className="text-white font-bold text-xl mb-1">{brand.name}</h2>
                <p className="text-[#3b82f6] text-xs font-medium mb-3">{brand.tagline}</p>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{brand.desc}</p>
                {brand.available ? (
                  <Link
                    href={brand.href!}
                    className="mt-5 block text-center py-2 rounded font-semibold text-white text-sm hover:opacity-90 transition-all"
                    style={{ background: brand.color }}
                  >
                    Explore {brand.name} →
                  </Link>
                ) : (
                  <div className="mt-5 py-2 rounded text-center text-sm text-gray-500 border border-white/10">
                    Coming Soon
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "#1e3a5f" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Not sure which system is right for you?</h2>
          <p className="text-gray-300 mb-6">Download our Product Selector Guide or talk directly to an ETIA engineer.</p>
          <Link href="/contact" className="px-8 py-3 rounded font-semibold text-white hover:opacity-90" style={{ background: "#2563eb" }}>
            Talk to ETIA Engineers →
          </Link>
        </div>
      </section>
    </>
  );
}
