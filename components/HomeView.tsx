"use client";
import Link from "next/link";
import Image from "next/image";
import CaseStudyStrip from "@/components/CaseStudyStrip";
import HeroBackdrop from "@/components/HeroBackdrop";
import WhyEtiaCards from "@/components/WhyEtiaCards";
import { heroBannerImages } from "@/components/caseStudies";
import { useLocale, t } from "@/components/LocaleContext";

const BASE = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/homepageproduct";

const techRoutes = [
  {
    label: { en: "UV LED SPOT CURING SYSTEMS", zh: "UV LED 点固化系统" },
    brands: ["OmniCure®"],
    desc: "UV LED spot curing systems are ideal for precision adhesive spot curing applications.",
    img: `${BASE}/HOME%20PAGE%20PRODUCT-LEFT1-UV%20LED%20CURING.png`,
  },
  {
    label: { en: "UV LED AIR-COOLED SYSTEMS", zh: "UV LED 风冷系统" },
    brands: ["Phoseon®", "OmniCure®"],
    desc: "Air-cooled UV LED curing systems allow for easy and cost-effective integration into automated systems without a separate chiller.",
    img: `${BASE}/HOME%20PAGE%20PRODUCT-LEFT%202-UV%20LED%20AIR-COOLED.png`,
  },
  {
    label: { en: "UV LED WATER-COOLED SYSTEMS", zh: "UV LED 水冷系统" },
    brands: ["Phoseon®", "NobleLight®"],
    desc: "Water-cooled UV LED curing systems for environments with extreme temperatures and debris. Ideal for heat-sensitive substrates.",
    img: `${BASE}/HOME%20PAGE%20PRODUCT-LEFT%203-UV-LED%20WATER-COOLED%20SYSTEM.png`,
  },
  {
    label: { en: "UV LAMP SPOT CURING SYSTEMS", zh: "UV 灯式点固化系统" },
    brands: ["OmniCure®"],
    desc: "UV lamp spot curing systems are ideal for precision adhesive spot curing for broad spectrum applications.",
    img: `${BASE}/HOME%20PAGE%20PRODUCT-LEFT4-UV%20LAMP%20SPOT%20CURING%20SYSTEM.png`,
  },
  {
    label: { en: "MICROWAVE UV CURING SYSTEMS", zh: "微波 UV 固化系统" },
    brands: ["Fusion®"],
    desc: "Microwave UV curing systems use electrodeless bulbs offering longer life, consistent output and less heat. Ideal for broad spectrum and UVC applications.",
    img: `${BASE}/HOME%20PAGE%20PRODUCT-LEFT5-MICROWAVE%20UV%20CURING.png`,
  },
  {
    label: { en: "MERCURY ARC LAMPS", zh: "汞弧灯" },
    brands: ["NobleLight®"],
    desc: "Broad spectrum medium pressure mercury arc lamps in various lengths and power classes. Ideal for replacement lamps.",
    img: `${BASE}/HOME%20PAGE%20PRODUCT-LEFT6-MERCURY%20UVC%20LAMPS.png`,
  },
];

export default function HomeView() {
  const { locale } = useLocale();
  return (
    <>
      {/* HERO */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "#0f2444" }}>
        <HeroBackdrop images={heroBannerImages} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
            <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>
              {t({ en: "Authorized Distributor · Genuine Products Guaranteed", zh: "授权代理商 · 正品保证" }, locale)}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              {t({ en: "Trusted Expertise.", zh: "值得信赖的专业。" }, locale)}<br />
              <span style={{ color: "#44B549" }}>{t({ en: "Responsive Solutions.", zh: "快速响应的方案。" }, locale)}</span>
            </h1>
            <p className="text-base text-gray-200 mb-8 leading-relaxed">
              {t({ en: "ETIA turns 20 years of hands-on UV curing experience into practical support across product selection, process validation, troubleshooting, maintenance, and in-house repair.", zh: "ETIA将20年UV固化实战经验，转化为覆盖选型、工艺验证、故障排查、保养与自有维修的全方位实用支持。" }, locale)}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/product" className="px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#1A56DB" }}>
                {t({ en: "Explore Products →", zh: "浏览产品 →" }, locale)}
              </Link>
              <a href="mailto:mark_tang@etia-tech.com?subject=Engineering%20Inquiry" className="px-6 py-3 rounded font-semibold text-white border border-white/30 hover:border-white/60 transition-all">
                {t({ en: "Talk to an Engineer", zh: "咨询工程师" }, locale)}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY ETIA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Why ETIA", zh: "为何选择 ETIA" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#1A56DB" }}>
            {t({ en: "ETIA — 20 Years of UV Curing Expertise, Delivered in Every Sale, Every Visit, Every Fix.", zh: "ETIA — 20年UV固化专业积淀，融入每一次销售、每一次到访、每一次维修。" }, locale)}
          </h2>
          <p className="text-gray-500 max-w-2xl mb-12">
            {t({ en: "Rooted in engineering excellence, ETIA partners with the world's leading UV curing brands to deliver solutions that are proven, reliable, and backed end-to-end — from selection to support.", zh: "以卓越工程为根基，ETIA携手全球领先UV固化品牌，提供经过验证、可靠、并从选型到支持全程护航的解决方案。" }, locale)}
          </p>
          <WhyEtiaCards />
        </div>
      </section>

      {/* FULL SPECTRUM */}
      <section className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "UV Curing Technology", zh: "UV固化技术" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "The Full Spectrum of UV Curing Solutions", zh: "全光谱UV固化解决方案" }, locale)}</h2>
          <p className="text-gray-500 mb-6">{t({ en: "200–600 nm · 6 Technology Routes · 4 World-Class Brands", zh: "200–600 nm · 6条技术路线 · 4大世界级品牌" }, locale)}</p>

          <div className="rounded-full h-3 mb-1 overflow-hidden" style={{ background: "linear-gradient(to right, #1e1b4b, #4c1d95, #1d4ed8, #0ea5e9, #22c55e, #eab308, #f59e0b)" }} />
          <div className="relative h-4 text-xs text-gray-400 mb-3">
            <span className="absolute" style={{ left: "0%" }}>VUV</span>
            <span className="absolute" style={{ left: "13%" }}>UVC</span>
            <span className="absolute" style={{ left: "26%" }}>UVB</span>
            <span className="absolute" style={{ left: "40%", transform: "translateX(-50%)" }}>UVA</span>
            <span className="absolute" style={{ left: "72%", transform: "translateX(-50%)" }}>{t({ en: "Visible", zh: "可见光" }, locale)}</span>
          </div>

          <div className="flex gap-2 mb-6 text-sm font-semibold text-center">
            <div className="flex-1 py-2 rounded-lg border" style={{ background: "#1A56DB0D", color: "#1A56DB", borderColor: "#1A56DB30" }}>
              {t({ en: "Single Wavelength · 365–405 nm (UVA)", zh: "单一波长 · 365–405 nm (UVA)" }, locale)}
            </div>
            <div className="flex-1 py-2 rounded-lg border" style={{ background: "#44B5490D", color: "#44B549", borderColor: "#44B54930" }}>
              {t({ en: "Broad Spectrum · 200–600 nm (UV + Visible)", zh: "宽光谱 · 200–600 nm (UV + 可见光)" }, locale)}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {techRoutes.map((route) => (
              <div key={route.label.en} className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all flex flex-col">
                <div className="px-3 py-2 text-white text-xs font-bold leading-tight" style={{ background: "#44B549" }}>
                  {t(route.label, locale)}
                </div>
                <div className="bg-gray-50 relative flex-1" style={{ minHeight: "120px" }}>
                  <Image
                    src={route.img}
                    alt={`${route.label.en} from ${route.brands.join(", ")} — ${route.desc}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 16vw"
                    className="object-contain p-3"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/product" className="inline-flex items-center gap-2 px-6 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#1A56DB" }}>
              {t({ en: "View All Products →", zh: "查看全部产品 →" }, locale)}
            </Link>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Case Studies", zh: "案例研究" }, locale)}</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "#1A56DB" }}>{t({ en: "Where Performance Is Proven", zh: "实力，经得起验证" }, locale)}</h2>
          <p className="text-gray-500 mb-10">{t({ en: "See how our UV curing systems deliver where precision and reliability matter most.", zh: "看我们的UV固化系统如何在最看重精度与可靠性的场景中交付成果。" }, locale)}</p>
          <CaseStudyStrip />
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16" style={{ background: "#1A56DB" }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t({ en: "Need help selecting the right UV curing system?", zh: "需要帮助挑选合适的UV固化系统?" }, locale)}
          </h2>
          <p className="text-gray-300 mb-8">
            {t({ en: "Our engineers are ready to help — from spot to area, lamp to LED, selection to validation.", zh: "我们的工程师随时待命——从点固化到面固化，从灯式到LED，从选型到验证。" }, locale)}
          </p>
          <a href="mailto:mark_tang@etia-tech.com?subject=Engineering%20Inquiry" className="px-8 py-3 rounded font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#44B549" }}>
            {t({ en: "Talk to ETIA Engineers →", zh: "联系ETIA工程师 →" }, locale)}
          </a>
        </div>
      </section>
    </>
  );
}
