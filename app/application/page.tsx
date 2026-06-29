"use client";
import { useState } from "react";
import Link from "next/link";

type App = {
  industry: string;
  subCategory: string;
  product: string;
  title: string;
  titleCN: string;
  hot?: boolean;
  challenge?: string;
  solution?: string;
  benefit?: string;
  noteId?: string;
};

const apps: App[] = [
  // Medical Device
  { industry: "Medical Device", subCategory: "Cardiovascular", product: "S2000 Elite", title: "Balloon Catheter Bonding", titleCN: "球囊导管粘接", hot: true, challenge: "Repeatable, uniform 360° curing of balloon catheter assemblies in high-volume automated production with consistent bond strength.", solution: "S2000 Elite + CLF ±5% + 4-leg Fiber Light Guide or Cure Ring for 360° uniform irradiation. R2000 Radiometer for NIST-traceable validation.", benefit: "Strong, repeatable bonds at every bonding station. CLF eliminates process drift over lamp lifetime. Full process traceability for FDA validation.", noteId: "MED-001" },
  { industry: "Medical Device", subCategory: "Needle & Syringe", product: "S2000 Elite + AC2", title: "Cannula-to-Hub Bonding", titleCN: "针头与针座粘接", hot: true, challenge: "High-speed bonding of stainless steel cannulas to plastic/glass hubs requires consistent dose, low-temperature process, and full traceability.", solution: "S2000 Elite for tack cure + AC2/AC4 LED for full cure. CLF ±5% ensures dose consistency. Fluorescence adhesives for in-line cure verification.", benefit: "Cycle times under 5 seconds. Full 510(k) documentation. Zero process drift over lamp lifetime.", noteId: "MED-002" },
  { industry: "Medical Device", subCategory: "Device Coatings", product: "S2000 Elite", title: "Hydrophilic Lubricious Coating", titleCN: "亲水润滑涂层固化", hot: true, challenge: "Dual-wavelength UVA + UVC curing of lubricious coatings on catheters and guidewires with uniform circumferential coverage.", solution: "S2000 Elite broad spectrum 320–500nm covers both UVA and UVC in a single system. Cure Ring for circumferential uniformity.", benefit: "Improved lubricity performance vs. UVA-only cure. Lower friction coefficient confirmed by mandrel pull testing.", noteId: "MED-003" },
  { industry: "Medical Device", subCategory: "Blood Oxygenator", product: "S2000 Elite", title: "Blood Oxygenator Assembly", titleCN: "血液氧合器组装" },
  { industry: "Medical Device", subCategory: "Endoscope", product: "LX500 V2", title: "Endoscope Lens & Housing Assembly", titleCN: "内窥镜镜头与壳体组装" },
  { industry: "Medical Device", subCategory: "IV & Fluid Delivery", product: "S2000 Elite + AC2", title: "IV Tubing & Connector Bonding", titleCN: "输液管路接头粘接" },
  { industry: "Medical Device", subCategory: "Airway Management", product: "S2000 Elite", title: "Anesthesia Mask & Ventilator Assembly", titleCN: "麻醉面罩与呼吸器组装" },
  { industry: "Medical Device", subCategory: "Medical Wearables", product: "LX500 V2", title: "Medical Wearable Device Assembly & Sealing", titleCN: "可穿戴医疗设备粘接密封", hot: true, challenge: "Assembling flexible skin-contact medical wearables with UV adhesives free of IBOA/TPO skin sensitizers and waterproof sealing.", solution: "LX500 V2 LED for low-temperature cure + DYMAX 2000-MW series (no IBOA, no TPO).", benefit: "ISO 10993-10 compliance. Waterproof IP67+ sealing. Flexible bond lines that survive 10,000+ flexion cycles.", noteId: "MED-008" },
  { industry: "Medical Device", subCategory: "IVD Diagnostics", product: "LX500 V2", title: "IVD Microfluidic Device Assembly", titleCN: "体外诊断微流控设备组装" },
  { industry: "Medical Device", subCategory: "Orthopedics", product: "S2000 Elite", title: "Implant Masking & RFID Bonding", titleCN: "植入体遮蔽与RFID芯片封装" },
  // Automotive
  { industry: "Automotive", subCategory: "Gaskets & Sealing", product: "AC7", title: "Form-in-Place Gasket (FIPG) Curing", titleCN: "FIPG原位成型垫圈固化", hot: true, challenge: "Traditional 2-component FIPG requires hours of cure time, complex mixing equipment, and generates significant VOC waste.", solution: "OmniCure AC7/AC8 LED large-area system integrated with robotic dispensing. <1 second cure of UV-curable one-component FIPG.", benefit: "Cure time: hours → <1 second. Zero VOC. Eliminates 2K mixing equipment. Higher dimensional consistency.", noteId: "AUT-001" },
  { industry: "Automotive", subCategory: "EV Battery", product: "AC7", title: "EV Battery Cell Encapsulation", titleCN: "EV电池单体灌封与结构粘接", hot: true, challenge: "EV battery manufacturing requires UV-curable adhesives providing thermal management, insulation, and vibration resistance at fast cycle times.", solution: "AC7/AC8 LED large-area for cell-to-cell bonding + UV+thermal dual-cure for shadow areas.", benefit: "60% cycle time reduction vs. thermal-only. Zero VOC emissions. Improved cell alignment consistency.", noteId: "AUT-002" },
  { industry: "Automotive", subCategory: "ADAS Camera", product: "LX500 V2", title: "ADAS Camera Module Active Alignment", titleCN: "ADAS摄像头主动对准固化", hot: true, challenge: "ADAS camera assembly requires sub-micron positional accuracy maintained through UV cure. Lamp warm-up drift permanently compromises optical performance.", solution: "LX500 V2 LED 365nm (0ms warm-up, 27.3 W/cm²) with StepCure® 2.0 ramp protocol.", benefit: "Sub-micron (≤0.5µm) alignment maintained. Zero warm-up drift. 50,000h LED lifetime.", noteId: "AUT-003" },
  { industry: "Automotive", subCategory: "Headlamp", product: "S2000 Elite", title: "Headlamp Lens Bonding & Sealing", titleCN: "前大灯镜片粘接密封" },
  { industry: "Automotive", subCategory: "Automotive Electronics", product: "AC2", title: "ECU & PCB Conformal Coating", titleCN: "ECU/车载PCB保形涂覆" },
  { industry: "Automotive", subCategory: "Wheel Coating", product: "AC8-HD", title: "Alloy Wheel Rim UV Clearcoat", titleCN: "铝合金轮毂UV清漆固化" },
  { industry: "Automotive", subCategory: "Body Repair", product: "AC8", title: "UV Rapid Clearcoat Curing — Body Repair", titleCN: "汽车补漆UV快速固化" },
  // Electronics
  { industry: "Electronics", subCategory: "PCB Assembly", product: "AC2", title: "PCB Conformal Coating & Component Staking", titleCN: "PCB保形涂覆与元件固定", hot: true, challenge: "High-throughput conformal coating and component staking requires fast cure, uniform irradiance, and reliable in-line coverage verification.", solution: "OmniCure AC2/AC4/AC5 LED on conveyor. Fluorescence-capable adhesives for camera-based in-line verification.", benefit: "5–30 second cure vs. 1–2h thermal oven. 100% coverage verification by fluorescence inspection.", noteId: "ELC-001" },
  { industry: "Electronics", subCategory: "Display Bonding", product: "AC5", title: "Display Optical Bonding (OCA)", titleCN: "显示屏光学贴合（OCA）", hot: true, challenge: "Full-face optical bonding using OCA requires extremely uniform irradiance to prevent bubbles, refractive index variation, and delamination.", solution: "OmniCure AC5/AC7 LED with high-uniformity optical head (±5% across cure area). LX500 V2 for edge sealing.", benefit: ">98% light transmission. No bubble defects. Thermal cycling stability -40°C to +85°C. No IR heat from LED.", noteId: "ELC-002" },
  { industry: "Electronics", subCategory: "OLED Display", product: "LX500 V2", title: "OLED Encapsulation & Thin Film Sealing", titleCN: "OLED封装与薄膜密封" },
  { industry: "Electronics", subCategory: "Mobile Phone", product: "LX500 V2", title: "Smartphone Camera Active Alignment", titleCN: "手机摄像头主动对准粘接" },
  { industry: "Electronics", subCategory: "Micro Speaker", product: "LX500 V2", title: "Micro Speaker Component Assembly", titleCN: "微型扬声器组件粘接" },
  { industry: "Electronics", subCategory: "Semiconductor", product: "LX500 V2", title: "Die Bonding & Package Sealing", titleCN: "半导体芯片粘接与封装" },
  { industry: "Electronics", subCategory: "AI Data Center", product: "LX500 V2 + AC4", title: "AI Data Center PCB & Fiber Module Assembly", titleCN: "AI数据中心PCB与光纤模块固化" },
  // Cable & Fiber
  { industry: "Cable & Fiber", subCategory: "Optical Fiber Drawing", product: "AC922S-F", title: "Optical Fiber Primary & Secondary Coating", titleCN: "光纤拉丝一次/二次涂层固化", hot: true, challenge: "Optical fiber drawing at 1,000–3,000 m/min requires complete, uniform coating cure within milliseconds across continuous 24/7 production.", solution: "OmniCure AC922S-F UV LED purpose-built for fiber drawing with 360° illumination and water cooling for 24/7 operation.", benefit: "Consistent coating quality at 3,000 m/min. Lower energy vs. microwave UV. No ozone generation.", noteId: "CAB-001" },
  { industry: "Cable & Fiber", subCategory: "Fiber Connector", product: "LX500 V2", title: "Fiber Optic Ferrule & Connector Bonding", titleCN: "光纤连接器法兰粘接" },
  { industry: "Cable & Fiber", subCategory: "Cable Marking", product: "AC4", title: "UV Inkjet Marking on Cables & Fiber", titleCN: "光纤/电缆UV油墨喷码标识" },
  { industry: "Cable & Fiber", subCategory: "Wire Harness", product: "AC4", title: "Wire Harness Identification Marking", titleCN: "线束外皮印字标识" },
  { industry: "Cable & Fiber", subCategory: "Power Cable", product: "S2000 Elite", title: "Power Cable Entry Potting & Sealing", titleCN: "功率电缆入口密封灌封" },
  // Precision Optics
  { industry: "Precision Optics", subCategory: "Optical Assembly", product: "LX500 V2", title: "Precision Lens Active Alignment & Bonding", titleCN: "精密镜片主动对准粘接", challenge: "Sub-micron optical alignment maintenance during UV cure of lens bonding adhesive in cameras, sensors, and laser modules.", solution: "LX500 V2 LED 365nm (0ms warm-up) + StepCure 2.0 for minimal cure-shrinkage stress.", benefit: "Sub-micron alignment maintained. 50,000h LED life enables continuous production." },
  { industry: "Precision Optics", subCategory: "LiDAR Sensor", product: "LX500 V2", title: "LiDAR Optical Module Bonding", titleCN: "LiDAR光学模组粘接" },
  { industry: "Precision Optics", subCategory: "Optical Telecom", product: "LX500 V2 + AC4", title: "Optical Transceiver & WDM Bonding", titleCN: "光学收发器与波分复用器粘接" },
  // UV Printing
  { industry: "UV Printing", subCategory: "Commercial Printing", product: "AC8", title: "UV Inkjet Wide-Format Commercial Printing", titleCN: "UV喷墨宽幅商业印刷" },
  { industry: "UV Printing", subCategory: "Label & Flexo", product: "AC8-HD", title: "Label & Flexographic UV Curing", titleCN: "柔版印刷/标签UV固化" },
  { industry: "UV Printing", subCategory: "Industrial Marking", product: "AC4", title: "Metal Nameplate Silkscreen UV Curing", titleCN: "金属铭牌丝印UV固化" },
  // Wood Coatings
  { industry: "Wood Coatings", subCategory: "Furniture", product: "AC7", title: "Furniture Topcoat & Varnish UV Curing", titleCN: "家具面漆/清漆UV固化", hot: true, challenge: "Traditional furniture coating requires 30–60 minute drying tunnels, significant VOC emissions, and high energy consumption.", solution: "OmniCure AC7/AC8 LED large-area on conveyor line. UV-curable primer, sealer, and topcoat replace solvent-based systems.", benefit: "Cure time: 45 min → <30 seconds. VOC eliminated. Throughput: 400+ panels/hour. Scratch resistance +40%.", noteId: "WOD-001" },
  { industry: "Wood Coatings", subCategory: "Flooring", product: "AC8-HD", title: "Hardwood & Engineered Flooring UV Finish", titleCN: "实木/强化木地板UV涂层固化" },
  { industry: "Wood Coatings", subCategory: "Cabinets & Panels", product: "AC7", title: "Cabinet Door & MDF Panel UV Coating", titleCN: "橱柜门板MDF UV涂层" },
  { industry: "Wood Coatings", subCategory: "Wood Substrates", product: "AC7", title: "Plywood & Particleboard Moisture-Barrier Primer", titleCN: "胶合板/刨花板防潮底涂" },
  // Metal Coatings
  { industry: "Metal Coatings", subCategory: "Beverage Cans", product: "AC8-HD", title: "Aluminum Beverage Can Direct Print", titleCN: "铝罐直接印刷与润滑涂层" },
  { industry: "Metal Coatings", subCategory: "Pipe & Tube", product: "Phoseon FL400-i", title: "Steel Pipe Internal Lining & Corrosion Coating", titleCN: "钢管内壁防腐/外壁保护涂层" },
  { industry: "Metal Coatings", subCategory: "3D Industrial Parts", product: "AC8", title: "3D Metal Part Spray UV Coating", titleCN: "复杂3D金属零件喷涂UV固化" },
  // Aerospace
  { industry: "Aerospace", subCategory: "Avionics", product: "LX500 V2", title: "Avionics PCB Conformal Coating", titleCN: "航电PCB保形涂覆（极端环境）", hot: true, challenge: "Avionics PCBs must survive -55°C to +125°C, salt spray, and vibration. Coating must meet MIL-I-46058C with 100% verifiable coverage.", solution: "OmniCure LX500 V2 or AC2/AC4 LED + fluorescence-enabled coating. Web UI + Intelli-Tap NFC for AS9100 traceability.", benefit: "100% coverage verification by fluorescence. AS9100 traceability. MIL-I-46058C qualification. Fast cure vs. thermal oven.", noteId: "AER-001" },
  { industry: "Aerospace", subCategory: "Rotorcraft", product: "S2000 Elite", title: "Rotor Blade Masking & Anti-Corrosion Coating", titleCN: "旋翼叶片遮蔽与防腐涂覆" },
  { industry: "Aerospace", subCategory: "Imaging Sensors", product: "LX500 V2", title: "Aerospace Imaging Sensor Optical Bonding", titleCN: "航天成像传感器光学粘接" },
];

const industries = [...new Set(apps.map((a) => a.industry))];

const industryIcons: Record<string, string> = {
  "Medical Device": "🏥",
  "Automotive": "🚗",
  "Electronics": "💡",
  "Cable & Fiber": "🔌",
  "Precision Optics": "🔬",
  "UV Printing": "🖨️",
  "Wood Coatings": "🪵",
  "Metal Coatings": "⚙️",
  "Aerospace": "✈️",
};

const successStories = [
  { industry: "Electronics", company: "PCB Manufacturer", challenge: "Increasing silkscreen/solder mask production demands required stable UV curing over extended runs.", result: "↑ Throughput", detail: "Improved efficiency, throughput, and yield on extended production runs." },
  { industry: "Medical Device", company: "Cardiovascular Device OEM", challenge: "Balloon catheter assembly required repeatable UV spot curing with full FDA process traceability.", result: "100% Traceability", detail: "Identical UV dose across all lines. Full NIST-traceable calibration for 510(k)." },
  { industry: "Automotive", company: "EV Battery Module Supplier", challenge: "EV battery cell production required fast structural adhesive bonding to replace slow thermal-only processes.", result: "60% Faster", detail: "Cycle time reduced by 60% vs. thermal-only. Zero VOC emissions." },
  { industry: "Precision Optics", company: "Automotive Camera Manufacturer", challenge: "ADAS camera module active alignment required sub-micron accuracy during cure. Lamp warm-up caused drift.", result: "≤0.5µm", detail: "Sub-micron alignment maintained. 35% faster cycle time vs. lamp system." },
  { industry: "Wood Coatings", company: "Furniture Panel Manufacturer", challenge: "Traditional solvent-based lacquer finishing required 45-minute drying tunnels and significant VOC emissions.", result: "200× Faster", detail: "Cure time: 45 min → 30 seconds. VOC eliminated. Throughput +160%." },
];

export default function ApplicationPage() {
  const [activeIndustry, setActiveIndustry] = useState<string>("All");
  const [selectedApp, setSelectedApp] = useState<App | null>(null);

  const filtered = activeIndustry === "All" ? apps : apps.filter((a) => a.industry === activeIndustry);

  return (
    <>
      {/* Hero */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0f2444 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest text-[#3b82f6] uppercase mb-3">Applications</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">9 Industries · 51 Application Workstations</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Find Your Application — Browse UV curing solutions by industry.</p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-16 z-40 border-b border-white/10" style={{ background: "#060e1f" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveIndustry("All")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeIndustry === "All" ? "bg-[#2563eb] text-white" : "text-gray-400 hover:text-white border border-white/20"}`}
          >
            All ({apps.length})
          </button>
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setActiveIndustry(ind)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeIndustry === ind ? "bg-[#2563eb] text-white" : "text-gray-400 hover:text-white border border-white/20"}`}
            >
              {industryIcons[ind]} {ind} ({apps.filter((a) => a.industry === ind).length})
            </button>
          ))}
        </div>
      </section>

      {/* Application Cards */}
      <section className="py-12" style={{ background: "#0a1628" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((app, i) => (
              <button
                key={i}
                onClick={() => setSelectedApp(app)}
                className="text-left rounded-xl p-5 border border-white/10 hover:border-[#3b82f6]/50 hover:bg-white/5 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs text-[#3b82f6] font-medium">{industryIcons[app.industry]} {app.industry}</span>
                  {app.hot && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">⭐ Hot</span>}
                </div>
                <h3 className="text-white font-semibold mb-1 group-hover:text-[#3b82f6] transition-colors">{app.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{app.titleCN}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">{app.product}</span>
                  <span className="text-xs text-gray-500">{app.subCategory}</span>
                </div>
                <div className="mt-3 text-xs text-[#3b82f6] opacity-0 group-hover:opacity-100 transition-opacity">
                  View details →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Success */}
      <section className="py-20" style={{ background: "#0d1f3c" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest text-[#3b82f6] uppercase mb-2">Customer Success</p>
          <h2 className="text-3xl font-bold text-white mb-10">Real Results from Real Manufacturers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {successStories.map((s, i) => (
              <div key={i} className="rounded-xl p-6 border border-white/10" style={{ background: "rgba(255,255,255,0.04)" }}>
                <span className="text-xs text-[#3b82f6] font-medium">{industryIcons[s.industry]} {s.industry}</span>
                <h3 className="text-white font-semibold mt-2 mb-1">{s.company}</h3>
                <p className="text-gray-400 text-sm mb-4">{s.challenge}</p>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-2xl font-bold text-[#3b82f6] mb-1">{s.result}</p>
                  <p className="text-sm text-gray-300">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "#1e3a5f" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Find the Right UV Curing Solution for Your Process</h2>
          <p className="text-gray-300 mb-6">Our engineers are ready to help — from application validation to system selection.</p>
          <Link href="/contact" className="px-8 py-3 rounded font-semibold text-white hover:opacity-90" style={{ background: "#2563eb" }}>
            Talk to ETIA Engineers →
          </Link>
        </div>
      </section>

      {/* Modal */}
      {selectedApp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.8)" }}
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl p-6 border border-white/20 relative max-h-[90vh] overflow-y-auto"
            style={{ background: "#0d1f3c" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setSelectedApp(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">✕</button>
            <span className="text-xs text-[#3b82f6] font-medium">{industryIcons[selectedApp.industry]} {selectedApp.industry} · {selectedApp.subCategory}</span>
            <h2 className="text-xl font-bold text-white mt-2 mb-1">{selectedApp.title}</h2>
            <p className="text-sm text-gray-400 mb-4">{selectedApp.titleCN}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="text-xs px-2 py-1 rounded bg-[#2563eb]/20 border border-[#2563eb]/40 text-[#3b82f6]">Recommended: {selectedApp.product}</span>
              {selectedApp.hot && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">⭐ Hot Application</span>}
            </div>

            {selectedApp.challenge ? (
              <>
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">The Challenge</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{selectedApp.challenge}</p>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">The Solution</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{selectedApp.solution}</p>
                </div>
                <div className="mb-5">
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">The Benefit</p>
                  <p className="text-sm text-gray-300 leading-relaxed">{selectedApp.benefit}</p>
                </div>
                {selectedApp.noteId && (
                  <p className="text-xs text-gray-500 mb-4">App Note: {selectedApp.noteId}</p>
                )}
              </>
            ) : (
              <p className="text-sm text-gray-400 mb-5">Detailed application notes available — contact our engineers for full Challenge / Solution / Benefit documentation.</p>
            )}

            <Link
              href="/contact"
              className="block text-center py-2.5 rounded font-semibold text-white text-sm hover:opacity-90"
              style={{ background: "#2563eb" }}
              onClick={() => setSelectedApp(null)}
            >
              Talk to an Engineer About This Application →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
