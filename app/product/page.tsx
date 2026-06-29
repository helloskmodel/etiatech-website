import Link from "next/link";

const brands = [
  {
    name: "OmniCure®",
    tagline: "Precision UV Spot & Area Curing",
    desc: "The world's leading UV curing platform for medical devices, electronics, and precision manufacturing.",
    available: true,
    href: "/product/omnicure",
    color: "#1B3D8F",
  },
  {
    name: "Phoseon®",
    tagline: "UV LED Air & Water-Cooled Systems",
    desc: "High-power LED curing for printing, labels, packaging, and industrial coating applications.",
    available: false,
    color: "#44B549",
  },
  {
    name: "Fusion UV®",
    tagline: "Microwave UV Curing Systems",
    desc: "Electrodeless microwave UV systems for broad-spectrum, high-power industrial curing.",
    available: false,
    color: "#0ea5e9",
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
      {/* Hero — dark */}
      <section className="py-20" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2444 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>Our Products</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Precision Cures.<br /><span style={{ color: "#44B549" }}>Supreme Control.</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            4 world-class brands. 6 technology routes. One authorized partner who stocks it, supports it, and stands behind every system.
          </p>
        </div>
      </section>

      {/* Brand Selection — light */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 mb-12 text-sm">Select a brand to explore products and solutions</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className={`relative rounded-2xl p-6 border transition-all flex flex-col bg-gray-50 ${
                  brand.available
                    ? "border-gray-200 hover:border-[#1B3D8F]/40 hover:shadow-lg cursor-pointer"
                    : "border-gray-100 opacity-60"
                }`}
              >
                {!brand.available && (
                  <span className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-500">
                    Coming Soon
                  </span>
                )}
                <div className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center text-white font-bold text-sm" style={{ background: brand.color }}>
                  {brand.name[0]}
                </div>
                <h2 className="font-bold text-xl mb-1" style={{ color: "#1B3D8F" }}>{brand.name}</h2>
                <p className="text-xs font-medium mb-3" style={{ color: "#44B549" }}>{brand.tagline}</p>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{brand.desc}</p>
                {brand.available ? (
                  <Link
                    href={brand.href!}
                    className="mt-5 block text-center py-2 rounded font-semibold text-white text-sm hover:opacity-90 transition-all"
                    style={{ background: "#1B3D8F" }}
                  >
                    Explore {brand.name} →
                  </Link>
                ) : (
                  <div className="mt-5 py-2 rounded text-center text-sm text-gray-400 border border-gray-200 bg-white">
                    Coming Soon
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="py-16" style={{ background: "#0a1628" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Not sure which system is right for you?</h2>
          <p className="text-gray-300 mb-6">Talk directly to an ETIA engineer — we'll match the right system to your application.</p>
          <Link href="/contact" className="px-8 py-3 rounded font-semibold text-white hover:opacity-90" style={{ background: "#44B549" }}>
            Talk to ETIA Engineers →
          </Link>
        </div>
      </section>
    </>
  );
}
