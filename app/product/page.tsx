"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { modelToSlug, getProduct, productHref } from "@/components/productCatalog";
import { heroBannerImage } from "@/components/caseStudies";

const brands = [
  {
    id: "omnicure",
    name: "OmniCure®",
    tagline: "UV Spot & Area Curing",
    logo: "●",
    color: "#1A56DB",
    available: true,
    families: [
      {
        category: "UV SPOT CURING SYSTEMS",
        items: [
          {
            series: "S SERIES · LAMP-BASED · 200W HG",
            name: "UV Lamp Spot Curing",
            desc: "Broad-spectrum 200W mercury high-pressure lamp spot curing. Industry-proven for medical devices and precision assembly.",
            models: ["S2000 Elite", "S1500 Pro", "R2000 Radiometer", "S2E Network Module", "S Series Light Guide"],
            bg: "#166534",
          },
          {
            series: "LX SERIES · LED BASED · SINGLE WAVELENGTH",
            name: "UV LED Spot Curing",
            desc: "Single-wavelength LED spot curing at 365 nm. 0 ms warm-up, 50,000h lifespan, Industry 4.0 ready.",
            models: ["LX500 V2", "LS200 Radiometer", "UV LED Heads (V3)"],
            bg: "#44B549",
          },
        ],
      },
      {
        category: "UV AREA CURING SYSTEMS",
        items: [
          {
            series: "AC LARGE · AIR-COOLED LED · >75MM WIDTH",
            name: "Air-Cooled UV LED Large Area",
            desc: "High-output LED area curing for wide substrates. Conveyor-integrated, uniform irradiance across full panel width.",
            models: ["AC7", "AC8", "AC8-HD", "AC9225", "AC UVC LED – 275nm"],
            bg: "#1A56DB",
          },
          {
            series: "AC SMALL · AIR-COOLED LED · UP TO 240MM",
            name: "Air-Cooled UV LED Small Area",
            desc: "Compact LED area curing for inline PCB, display, and small component applications. Fast, consistent, zero warm-up.",
            models: ["AC2", "AC6", "AC5"],
            bg: "#60a5fa",
          },
        ],
      },
    ],
  },
  {
    id: "phoseon",
    name: "Phoseon®",
    tagline: "UV LED Air & Water-Cooled",
    logo: "◆",
    color: "#0ea5e9",
    available: true,
    families: [
      {
        category: "WATER-COOLED UV LED AREA CURING SYSTEMS",
        items: [
          {
            series: "FIRELINE · VERICURE · SEMRAY · HIGH-POWER INDUSTRIAL",
            name: "Water-Cooled UV LED",
            desc: "High-intensity water-cooled UV LED systems for demanding industrial processes. Stable output under extreme temperatures and debris environments.",
            models: ["Nexus II", "FireLine FL200", "FireLine FL400", "FireLine FL400-i Industrial", "FireLine FL440", "VeriCure Water-Cooled", "Semray 5000+"],
            bg: "#0d9488",
          },
        ],
      },
      {
        category: "AIR-COOLED UV LED AREA CURING SYSTEMS",
        items: [
          {
            series: "FIREJET · AIR-COOLED · LARGE AREA",
            name: "Air-Cooled UV LED Large Area",
            desc: "Cost-effective air-cooled UV LED systems for wide-format and large-area curing. Conveyor-integrated, no chiller required.",
            models: ["Nexus II Air-Cooled", "FireJet ONE", "FireJet FJ100", "FireJet FJ240", "FireJet FJ800", "FireJet FJ801", "Optical Fiber UV LED"],
            bg: "#1A56DB",
          },
          {
            series: "FIREEDGE · PASSIVE COOLING · SMALL AREA",
            name: "Air-Cooled UV LED Small Area",
            desc: "Passively cooled, ultra-slim form factor. Ideal for digital inkjet pinning and space-limited inline applications.",
            models: ["FireEdge FE100", "FireEdge FE400", "FireEdge FE410"],
            bg: "#60a5fa",
          },
        ],
      },
    ],
  },
  {
    id: "fusionuv",
    name: "Fusion®",
    tagline: "Microwave UV Curing",
    logo: "▲",
    color: "#f59e0b",
    available: true,
    families: [
      {
        category: "MICROWAVE UV CURING SYSTEMS",
        items: [
          {
            series: "F SERIES · LIGHTHAMMER · INDUSTRIAL BROADBAND",
            name: "Microwave UV Curing",
            desc: "Electrodeless microwave-powered UV systems for production lines. Modular design, Industry 4.0 ready, broad spectrum output. Easy retrofit into existing processes.",
            models: ["LightHammer 6 Mark II", "LightHammer 10 Mark III", "F Series"],
            bg: "#b45309",
          },
          {
            series: "OPTICAL FIBER · DRAW TOWER · CABLE & WIRE",
            name: "Microwave UV · Optical Fiber",
            desc: "Modular 6- or 10-inch microwave UV systems for draw towers, coloring lines, and cable marking. Patented secondary reflector maximizes UV delivery to fiber.",
            models: ["Optical Fiber UV Systems"],
            bg: "#f59e0b",
          },
        ],
      },
    ],
  },
  {
    id: "noblelight",
    name: "NobleLight®",
    tagline: "UV LED High-Intensity Systems",
    logo: "■",
    color: "#7c3aed",
    available: true,
    families: [
      {
        category: "WATER-COOLED UV LED SYSTEMS",
        items: [
          {
            series: "SEMRAY UV5000+ · WATER-COOLED · HIGH INTENSITY",
            name: "Water-Cooled UV LED",
            desc: "Water-cooled high-intensity UV LED system with dedicated optics for even irradiance at large working distances. Designed for flexible industrial integration.",
            models: ["Semray UV5000+"],
            bg: "#0d9488",
          },
        ],
      },
      {
        category: "UV LED CURING SYSTEMS",
        items: [
          {
            series: "UV PC6003 · CUSTOMIZED · UV LED SOLUTIONS",
            name: "UV LED Curing",
            desc: "UV LED systems for optical fiber draw, wire marking, and bespoke process requirements. 360° curing coverage and custom-engineered solutions available.",
            models: ["Semray UV PC6003", "Customized UV LED Solutions"],
            bg: "#44B549",
          },
        ],
      },
    ],
  },
];

const uvCuringBenefits = [
  { icon: "⚡", title: "Speed", desc: "UV curing converts liquid formulations to solid materials in seconds — eliminating thermal ovens, long cure queues, and handling delays that slow production lines." },
  { icon: "🌿", title: "Clean & Safe", desc: "UV curable materials are 100% solid with no solvents — zero VOC emissions, no hazardous waste disposal, and no fumes in the clean room." },
  { icon: "🔬", title: "Precision", desc: "Spectral output, peak irradiance, and energy dose precisely determine the physical properties of the cured material. The right equipment controls all three." },
];

export default function ProductPage() {
  const [activeBrand, setActiveBrand] = useState("omnicure");
  const brand = brands.find((b) => b.id === activeBrand)!;

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-20 relative overflow-hidden" style={{ background: "#0f2444" }}>
        {heroBannerImage && <Image src={heroBannerImage} alt="" fill priority sizes="100vw" className="object-cover" />}
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(13,30,58,0.94) 0%, rgba(18,65,163,0.82) 50%, rgba(26,86,219,0.45) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>UV Curing Systems · 4 Product Lines</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
              Precision Cures.<br />
              <span style={{ color: "#44B549" }}>Supreme Control.</span>
            </h1>
            <p className="text-base text-gray-200 mb-6 leading-relaxed">
              Advanced UV curing systems engineered for precise output, stable performance, and repeatable manufacturing results.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:support@etiatech.com?subject=Sales%20Inquiry" className="px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#1A56DB" }}>
                Talk to Our Sales
              </a>
              <Link href="/application" className="px-6 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">
                Browse Applications
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Selector + Products — light */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <Link href="/product/systems" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: "#1A56DB" }}>
              Browse the full product catalog — every system with specs →
            </Link>
          </div>

          {/* 4 Brand Icons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {brands.map((b) => (
              <button
                key={b.id}
                onClick={() => b.available && setActiveBrand(b.id)}
                className={`relative flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all ${
                  activeBrand === b.id
                    ? "shadow-md"
                    : b.available
                    ? "border-gray-200 hover:border-gray-300 hover:shadow-sm bg-white"
                    : "border-gray-100 bg-gray-50 opacity-40 cursor-default"
                }`}
                style={activeBrand === b.id ? { borderColor: b.color, background: `${b.color}0d` } : {}}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-base font-bold flex-shrink-0" style={{ background: b.color }}>
                  {b.logo}
                </div>
                <span className="font-bold text-sm" style={{ color: activeBrand === b.id ? b.color : b.available ? "#374151" : "#9ca3af" }}>{b.name}</span>
                {!b.available && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-400">Soon</span>
                )}
              </button>
            ))}
          </div>

          {/* Product Cards */}
          {brand.available ? (
            <div>
              {brand.families.map((group) => (
                <div key={group.category} className="mb-10">
                  <span className="inline-block whitespace-nowrap text-xs font-bold px-3 py-1 rounded mb-5 text-white" style={{ background: "#1A56DB" }}>
                    {group.category}
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {group.items.map((item) => (
                      <div key={item.name} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                        {/* Card header */}
                        <div className="p-5 text-white" style={{ background: item.bg }}>
                          <p className="text-xs opacity-70 mb-1 tracking-wider font-medium">{item.series}</p>
                          <h3 className="text-lg font-bold">{item.name}</h3>
                        </div>
                        {/* Card body */}
                        <div className="p-5 bg-white">
                          <p className="text-gray-500 text-sm mb-4 leading-relaxed">{item.desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.models.map((m) => {
                              const slug = modelToSlug[m];
                              const product = slug ? getProduct(slug) : undefined;
                              return product ? (
                                <Link
                                  key={m}
                                  href={productHref(product)}
                                  className="text-xs px-3 py-1 rounded-full border font-medium hover:text-white transition-colors"
                                  style={{ borderColor: item.bg, color: item.bg, background: `${item.bg}10` }}
                                >
                                  {m} →
                                </Link>
                              ) : (
                                <span key={m} className="text-xs px-3 py-1 rounded-full border font-medium" style={{ borderColor: item.bg, color: item.bg, background: `${item.bg}10` }}>
                                  {m}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="text-center mt-4 text-sm text-gray-400">
                *Custom Engineering Solutions Available ·{" "}
                <a href="mailto:support@etiatech.com?subject=Sales%20Inquiry" className="font-medium hover:underline" style={{ color: "#1A56DB" }}>Talk to Our Sales →</a>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50">
              <div className="text-5xl mb-4">🔧</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: "#1A56DB" }}>{brand.name} — Coming Soon</h3>
              <p className="text-gray-400 mb-6">Product details for {brand.name} are being prepared. Contact us for information.</p>
              <Link href="/contact" className="px-6 py-3 rounded font-semibold text-white hover:opacity-90" style={{ background: "#1A56DB" }}>
                Enquire About {brand.name} →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why UV Curing — light gray */}
      <section className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>UV Curing Technology</p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A56DB" }}>Why UV Curing?</h2>
          <div className="w-10 h-1 rounded mb-8" style={{ background: "#44B549" }} />
          <p className="text-gray-500 max-w-2xl mb-10">
            UV curing is a photochemical process that converts liquid formulations — adhesives, coatings, inks — into fully solid materials instantly when exposed to high-intensity UV energy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {uvCuringBenefits.map((b) => (
              <div key={b.title} className="rounded-xl p-6 border border-gray-100 bg-white hover:shadow-md transition-all">
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="font-semibold mb-2" style={{ color: "#1A56DB" }}>{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark */}
      <section className="py-16" style={{ background: "#1A56DB" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Not sure which system is right for you?</h2>
          <p className="text-gray-300 mb-8">Our engineers will match the right UV curing system to your exact application — from selection to validation.</p>
          <a href="mailto:support@etiatech.com?subject=Sales%20Inquiry" className="px-8 py-3 rounded font-semibold text-white hover:opacity-90" style={{ background: "#44B549" }}>
            Talk to Our Sales →
          </a>
        </div>
      </section>
    </>
  );
}
