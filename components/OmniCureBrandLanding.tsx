"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ComponentType } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Crosshair,
  Download,
  Layers3,
  ScanLine,
  Zap,
} from "lucide-react";

// OmniCure family literature (verified COS URLs). Shown as downloads on the
// OmniCure brand page — the full catalog + Chinese family brochure.
const COS = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com";
const FAMILY_DOCS: { label: LangText; href: string }[] = [
  { label: { en: "Product Catalog (EN)", zh: "产品目录(英文)", th: "แคตตาล็อกผลิตภัณฑ์ (EN)", vi: "Danh mục sản phẩm (EN)" }, href: `${COS}/PDF/${encodeURIComponent("OmniCure UV Curing Product Catalog.pdf")}` },
  { label: { en: "Family Brochure (中文)", zh: "家族产品手册(中文)", th: "โบรชัวร์ตระกูลผลิตภัณฑ์ (จีน)", vi: "Brochure dòng sản phẩm (Trung)" }, href: `${COS}/PDF/${encodeURIComponent("Brochure - Omnicure family CN.pdf")}` },
];
import { inquiryMailto, localeSalesEmail } from "@/components/contact";
import { useLocale, t, type LangText } from "@/components/LocaleContext";
import {
  localizeProduct,
  popularityRank,
  productHref,
  
  productImage,
  products,
} from "@/components/productCatalog";
import { LAMP, LAMP_PATHS } from "@/components/omnicure/s2000Lamp";
import HeroBanner from "@/components/HeroBanner";
import { PAGE_BANNERS } from "@/components/caseStudies";
import FinalCta from "@/components/FinalCta";
import TrustStrip from "@/components/TrustStrip";

type RouteId = "all" | "lamp-spot" | "led-spot" | "large-area" | "small-area";

const order = [
  "s2000-elite", "s1500-pro", "r2000",
  "s-liquid-light-guide", "s-fiber-light-guide", "s-fiber-light-line", "s-cure-ring-adapter", "s-light-line-adapter", "s-collimating-adapter",
  "lx500", "v3-led-heads", "ls200",
  "ac2", "ac4", "ac5", "ac7", "ac8", "ac8-hd", "ac9225", "ac9225-f",
  "s2e-network-module",
];

const categoryBySlug: Record<string, Exclude<RouteId, "all">> = {
  "s2000-elite": "lamp-spot",
  "s1500-pro": "lamp-spot",
  r2000: "lamp-spot",
  "s-liquid-light-guide": "lamp-spot",
  "s-fiber-light-guide": "lamp-spot",
  "s-fiber-light-line": "lamp-spot",
  "s-cure-ring-adapter": "lamp-spot",
  "s-light-line-adapter": "lamp-spot",
  "s-collimating-adapter": "lamp-spot",
  "s2e-network-module": "lamp-spot",
  "s2000-lamp": "lamp-spot",
  lx500: "led-spot",
  lx505: "led-spot",
  "v3-led-heads": "led-spot",
  ls200: "led-spot",
  ac2: "small-area",
  ac4: "small-area",
  ac5: "small-area",
  ac7: "large-area",
  ac8: "large-area",
  "ac8-hd": "large-area",
  ac9225: "large-area",
  "ac9225-f": "large-area",
  "cv300-conveyor": "large-area",
};

const routes: Array<{
  id: Exclude<RouteId, "all">;
  eyebrow: LangText;
  title: LangText;
  body: LangText;
  featured?: string;
  color: string;
  soft: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}> = [
  {
    id: "lamp-spot",
    eyebrow: { en: "UV Lamp Spot Curing", zh: "紫外灯点固化", th: "การคิวริ่งแบบจุดด้วยหลอด UV", vi: "Đóng rắn điểm bằng đèn UV" },
    title: { en: "UV Spot Lamp Curing", zh: "汞灯点固化", th: "การบ่มแบบจุดด้วยหลอด", vi: "Đóng rắn điểm bằng đèn" },
    body: { en: "Broad-spectrum UV output for precise adhesive bonding and established production processes.", zh: "宽光谱紫外输出，实现精准胶粘与成熟的量产工艺。", th: "เอาต์พุต UV แบบสเปกตรัมกว้าง สำหรับการยึดติดกาวที่แม่นยำและกระบวนการผลิตที่ผ่านการพิสูจน์แล้ว", vi: "Đầu ra UV phổ rộng cho liên kết keo chính xác và quy trình sản xuất đã được kiểm chứng." },
    featured: "S2000 Elite",
    color: "#1A56DB",
    soft: "#F3F7FF",
    icon: Crosshair,
  },
  {
    id: "led-spot",
    eyebrow: { en: "UV LED Spot Curing", zh: "UV LED 点固化", th: "การคิวริ่งแบบจุดด้วย UV LED", vi: "Đóng rắn điểm bằng UV LED" },
    title: { en: "UV LED Spot Curing", zh: "LED 点固化", th: "การบ่มแบบจุด UV LED", vi: "Đóng rắn điểm UV LED" },
    body: { en: "Wavelength-specific LED spot curing with long life, modular control and low maintenance.", zh: "特定波长 LED 点固化，寿命长、模块化控制、维护成本低。", th: "การคิวริ่งแบบจุดด้วย LED เฉพาะความยาวคลื่น อายุการใช้งานยาว ควบคุมแบบโมดูลาร์ และบำรุงรักษาน้อย", vi: "Đóng rắn điểm bằng LED theo bước sóng riêng, tuổi thọ dài, điều khiển mô-đun và ít bảo trì." },
    featured: "LX500",
    color: "#2F80ED",
    soft: "#F3F8FF",
    icon: Zap,
  },
  {
    id: "large-area",
    eyebrow: { en: "UV LED Air-Cooled Large-Area", zh: "UV LED 风冷大面积", th: "UV LED ระบายความร้อนด้วยอากาศ พื้นที่กว้าง", vi: "UV LED làm mát bằng khí, diện tích lớn" },
    title: { en: "UV LED Large-Area Curing", zh: "LED 大面积固化", th: "การบ่มพื้นที่กว้าง UV LED", vi: "Đóng rắn diện rộng UV LED" },
    body: { en: "Scalable UV LED curing for fixtures, larger bonding zones and production assemblies.", zh: "可扩展的 UV LED 固化，适用于工装夹具、较大粘接区域与量产装配。", th: "การคิวริ่ง UV LED ที่ขยายได้ สำหรับฟิกซ์เจอร์ พื้นที่ยึดติดขนาดใหญ่ และงานประกอบในสายการผลิต", vi: "Đóng rắn UV LED có thể mở rộng cho đồ gá, vùng liên kết lớn và cụm lắp ráp sản xuất." },
    featured: "AC8 Series",
    color: "#087F6B",
    soft: "#F2FBF8",
    icon: ScanLine,
  },
  {
    id: "small-area",
    eyebrow: { en: "UV LED Air-Cooled Small-Area", zh: "UV LED 风冷小面积", th: "UV LED ระบายความร้อนด้วยอากาศ พื้นที่เล็ก", vi: "UV LED làm mát bằng khí, diện tích nhỏ" },
    title: { en: "UV LED Small-Area Curing", zh: "LED 小面积固化", th: "การบ่มพื้นที่เล็ก UV LED", vi: "Đóng rắn diện hẹp UV LED" },
    body: { en: "Compact area curing for small components, controlled windows and laboratory workflows.", zh: "紧凑型面固化，适用于小型部件、受控窗口与实验室工艺。", th: "การคิวริ่งพื้นที่ขนาดกะทัดรัด สำหรับชิ้นส่วนขนาดเล็ก หน้าต่างควบคุม และงานในห้องปฏิบัติการ", vi: "Đóng rắn diện tích nhỏ gọn cho linh kiện nhỏ, cửa sổ kiểm soát và quy trình phòng thí nghiệm." },
    featured: "AC5 Series",
    color: "#25A970",
    soft: "#F2FBF8",
    icon: Layers3,
  },
];


export default function OmniCureBrandLanding() {
  const { locale } = useLocale();
  const allProducts = useMemo(() => products
    .filter((product) => product.brandId === "omnicure")
    .sort((a, b) => {
      const ai = order.indexOf(a.slug);
      const bi = order.indexOf(b.slug);
      return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi) || popularityRank(a.slug) - popularityRank(b.slug);
    }), []);
  const mailto = inquiryMailto(locale, { subject: "OmniCure Engineering Inquiry", context: "OmniCure technology selection" });

  const [showOrder, setShowOrder] = useState(false);
  const [orderQty, setOrderQty] = useState<Record<string, number>>({});
  const orderLines = LAMP.parts.filter(([code]) => (orderQty[code] ?? 0) > 0);
  const orderTotal = orderLines.reduce((sum, [code]) => sum + (orderQty[code] ?? 0), 0);
  const orderMailto = `mailto:${localeSalesEmail(locale)}?subject=${encodeURIComponent("OmniCure S2000 Elite Lamp — Stock Check")}&body=${encodeURIComponent(["OmniCure S2000 Elite Lamp — Stock / Availability Check", "", ...orderLines.map(([code, desc]) => `${code} x ${orderQty[code]}  — ${desc}`), "", "Company / contact / phone:", "Delivery location / country:", "", "Thank you!"].join("\n"))}`;

  // The routes are sections now, not filters: the button jumps to the right
  // shelf rather than hiding the others.
  function chooseRoute(id: Exclude<RouteId, "all">) {
    document.getElementById(`route-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="bg-white text-[#14213D]">
      <section className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
        <HeroBanner src={PAGE_BANNERS.omnicure} />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#1A56DB]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-[#63C94A]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm">
              <BadgeCheck className="h-4 w-4" /> {t({ en: "Authorized OmniCure® Distributor", zh: "OmniCure® 授权代理商", th: "ตัวแทนจำหน่ายที่ได้รับอนุญาต OmniCure®", vi: "Nhà phân phối ủy quyền OmniCure®" }, locale)}
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-6xl">{t({ en: "OmniCure UV Curing Solutions", zh: "OmniCure 紫外线固化解决方案", th: "โซลูชัน UV Curing จาก OmniCure", vi: "Giải pháp UV Curing OmniCure" }, locale)}<span className="mt-2 block text-2xl font-bold text-[#41A62A] md:text-4xl">{t({ en: "Precision Cures. Supreme Control.", zh: "精准固化 稳定掌控", th: "การคิวริ่งแม่นยำ ควบคุมได้อย่างเสถียร", vi: "Đóng rắn chính xác, kiểm soát ổn định." }, locale)}</span></h1>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#choose-technology" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]">{t({ en: "Choose Your Technology", zh: "选择适合的技术", th: "เลือกเทคโนโลยีของคุณ", vi: "Chọn công nghệ phù hợp" }, locale)} <ArrowRight className="h-4 w-4" /></a>
              <a href={mailto} className="inline-flex items-center justify-center rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:border-[#143C96] hover:text-[#1A56DB]">{t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร", vi: "Trao đổi với kỹ sư" }, locale)}</a>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <section id="choose-technology" className="scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">{t({ en: "Technology Selector", zh: "技术选型", th: "ตัวเลือกเทคโนโลยี", vi: "Bộ chọn công nghệ" }, locale)}</p>
          <div className="mt-3 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div><h2 className="text-3xl font-bold text-[#102A43] md:text-4xl">{t({ en: "Choose by Technology", zh: "按技术选择", th: "เลือกตามเทคโนโลยี", vi: "Chọn theo công nghệ" }, locale)}</h2><p className="mt-3 max-w-3xl text-[#5F6C7B]">{t({ en: "Select the curing method that best matches your adhesive, curing area, production speed and process control requirements.", zh: "根据您的胶粘剂、固化面积、生产速度与工艺控制要求，选择最合适的固化方式。", th: "เลือกวิธีการคิวริ่งที่เหมาะกับกาว พื้นที่คิวริ่ง ความเร็วการผลิต และความต้องการควบคุมกระบวนการของคุณมากที่สุด", vi: "Chọn phương pháp đóng rắn phù hợp nhất với keo, diện tích đóng rắn, tốc độ sản xuất và yêu cầu kiểm soát quy trình của bạn." }, locale)}</p></div>
            <div className="flex rounded-xl border border-[#E3EAF2] bg-[#F7FAFC] p-1 text-xs font-semibold"><span className="rounded-lg bg-white px-3 py-2 text-[#1A56DB] shadow-sm">{t({ en: "Spot · Focused energy", zh: "点固化 · 能量聚焦", th: "จุด · พลังงานโฟกัส", vi: "Điểm · Năng lượng tập trung" }, locale)}</span><span className="px-3 py-2 text-[#087F6B]">{t({ en: "Area · Uniform exposure", zh: "面固化 · 均匀照射", th: "พื้นที่ · ฉายแสงสม่ำเสมอ", vi: "Diện tích · Chiếu xạ đồng đều" }, locale)}</span></div>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {routes.map((route) => {
              const Icon = route.icon;
              return <button key={route.id} onClick={() => chooseRoute(route.id)} className="group flex flex-col rounded-2xl border border-[#E3EAF2] bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,36,68,.09)]" style={{ borderTopColor: route.color, borderTopWidth: 4 }}>
                <div className="flex items-center gap-3.5">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ color: route.color, background: route.soft }}><Icon className="h-7 w-7" strokeWidth={1.8} /></span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[.1em]" style={{ color: route.color }}>{t(route.eyebrow, locale)}</p>
                    <h3 className="mt-1 text-base font-bold leading-snug text-[#102A43]">{t(route.title, locale)}</h3>
                  </div>
                </div>
                <p className="mt-4 flex-1 text-xs leading-5 text-[#5F6C7B]">{t(route.body, locale)}</p>
                {route.featured && <p className="mt-3 text-[11px] text-[#7B8794]">{t({ en: "Featured:", zh: "推荐型号：", th: "แนะนำ:", vi: "Nổi bật:" }, locale)} <span className="font-semibold text-[#102A43]">OmniCure {route.featured}</span></p>}
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold" style={{ color: route.color }}>{t({ en: "View matching products", zh: "查看匹配产品", th: "ดูผลิตภัณฑ์ที่ตรงกัน", vi: "Xem sản phẩm phù hợp" }, locale)} <ArrowRight className="h-3.5 w-3.5" /></span>
              </button>;
            })}
          </div>
        </div>
      </section>

      {/* Every route laid out, all of it visible. The grid used to be filtered
          by the route buttons above, so a visitor saw one slice at a time and
          had to guess which slice held the machine they wanted. A distributor's
          page should behave like a shop: the whole shelf, grouped, with the
          picture doing the work. */}
      <section id="omnicure-products" className="scroll-mt-20 bg-[#F7FAFC] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">{t({ en: "OmniCure Product Family", zh: "OmniCure 产品家族", th: "ตระกูลผลิตภัณฑ์ OmniCure", vi: "Dòng sản phẩm OmniCure" }, locale)}</p>
          <h2 className="mt-3 text-3xl font-bold text-[#102A43] md:text-4xl">{t({ en: "The full OmniCure range", zh: "OmniCure 全系列", th: "ผลิตภัณฑ์ OmniCure ทั้งหมด", vi: "Toàn bộ dải sản phẩm OmniCure" }, locale)}</h2>

          {routes.map((route) => {
            const items = allProducts.filter((product) => categoryBySlug[product.slug] === route.id);
            if (items.length === 0) return null;
            return (
              <div key={route.id} id={`route-${route.id}`} className="mt-12 scroll-mt-24">
                <div className="mb-5 flex items-baseline gap-3">
                  <h3 className="shrink-0 text-lg font-bold sm:text-xl" style={{ color: route.color }}>{t(route.title, locale)}</h3>
                  <span className="h-px flex-1" style={{ background: "#E1E8F0" }} />
                  <span className="shrink-0 text-xs text-[#7B8794]">{items.length} {t({ en: "models", zh: "款", th: "รุ่น", vi: "model" }, locale)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                  {items.map((raw) => {
                    const product = localizeProduct(raw, locale);
                    return (
                      <Link key={product.slug} href={productHref(product)} className="group flex flex-col overflow-hidden rounded-2xl border border-[#E3EAF2] bg-white transition hover:border-[#1A56DB]/40 hover:shadow-lg">
                        <div className="relative h-28 border-b border-[#EEF2F6] bg-white sm:h-40">
                          {productImage(product) ? (
                            <Image src={productImage(product)} alt={product.name} fill sizes="(max-width: 640px) 48vw, (max-width: 1024px) 31vw, 24vw" className="object-contain p-3 transition duration-300 group-hover:scale-105 sm:p-5" />
                          ) : (
                            <span className="absolute inset-0 flex items-center justify-center font-bold text-[#1A56DB]">OmniCure</span>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-3 sm:p-4">
                          <h4 className="text-[12px] font-bold leading-snug text-[#102A43] group-hover:text-[#1A56DB] sm:text-sm">{product.name}</h4>
                          <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[11px] font-bold text-[#1A56DB] sm:text-xs">{t({ en: "View product", zh: "查看产品", th: "ดูผลิตภัณฑ์", vi: "Xem sản phẩm" }, locale)} <ArrowRight className="h-3.5 w-3.5" /></span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>


      {/* Product literature — full OmniCure family catalog downloads */}
      <section className="px-4 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl border border-[#D9E4EA] bg-gradient-to-br from-[#143C96] to-[#1A56DB] p-7 text-white sm:p-9 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#8FE0B0]">{t({ en: "Product Literature", zh: "产品资料", th: "เอกสารผลิตภัณฑ์", vi: "Tài liệu sản phẩm" }, locale)}</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">{t({ en: "The complete OmniCure product family", zh: "OmniCure 完整产品家族", th: "ตระกูลผลิตภัณฑ์ OmniCure ทั้งหมด", vi: "Toàn bộ dòng sản phẩm OmniCure" }, locale)}</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">{t({ en: "Download the full catalog covering every OmniCure UV curing system — spot, LED spot and large-area.", zh: "下载覆盖全部 OmniCure 紫外线固化系统的完整目录——点固化、LED 点固化与大面积。", th: "ดาวน์โหลดแคตตาล็อกฉบับเต็มครอบคลุมระบบ UV curing ของ OmniCure ทุกรุ่น", vi: "Tải danh mục đầy đủ bao gồm mọi hệ thống UV curing OmniCure." }, locale)}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:shrink-0">
            {FAMILY_DOCS.map((doc) => (
              <a key={doc.href} href={doc.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:-translate-y-0.5 hover:bg-[#EAF1FF]">
                <Download className="h-4 w-4" /> {t(doc.label, locale)}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[32px] border border-[#DCE9EE] bg-gradient-to-br from-[#F3F7FF] to-[#F2FBF8] p-7 sm:p-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#087F6B]">{t({ en: "Critical Consumable", zh: "关键耗材", th: "วัสดุสิ้นเปลืองสำคัญ", vi: "Vật tư tiêu hao quan trọng" }, locale)}</p><h2 className="mt-3 text-3xl font-bold text-[#102A43] md:text-4xl">{t({ en: "Need a Replacement Lamp for Your S2000?", zh: "需要为 S2000 更换灯管吗？", th: "ต้องการหลอดเปลี่ยนสำหรับ S2000 หรือไม่?", vi: "Cần đèn thay thế cho S2000?" }, locale)}</h2><p className="mt-5 max-w-3xl leading-7 text-[#5F6C7B]">{t({ en: "The S2000 lamp is critical for curing performance and production continuity. ETIA supplies genuine replacement lamps and can verify compatibility and check stock for you.", zh: "S2000 灯管对固化性能与生产连续性至关重要。ETIA 提供原厂替换灯管，并可为您核对兼容性与查询库存。", th: "หลอด S2000 มีความสำคัญต่อประสิทธิภาพการคิวริ่งและความต่อเนื่องของการผลิต ETIA จัดหาหลอดเปลี่ยนของแท้ และตรวจสอบความเข้ากันได้พร้อมเช็คสต็อกให้คุณได้", vi: "Đèn S2000 rất quan trọng đối với hiệu suất đóng rắn và tính liên tục của sản xuất. ETIA cung cấp đèn thay thế chính hãng và có thể xác minh tính tương thích và kiểm tra tồn kho cho bạn." }, locale)}</p><div className="mt-7 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={() => { const next = !showOrder; setShowOrder(next); if (next) setTimeout(() => document.getElementById("s2000-order")?.scrollIntoView({ behavior: "smooth", block: "center" }), 60); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1A56DB] to-[#087F6B] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5">{showOrder ? t({ en: "Hide Stock Form", zh: "隐藏库存表单", th: "ซ่อนแบบฟอร์ม", vi: "Ẩn biểu mẫu" }, locale) : t({ en: "Check the Stock", zh: "查询库存", th: "เช็คสต็อก S2000", vi: "Kiểm tra tồn kho" }, locale)} <ArrowRight className="h-4 w-4" /></button><a href={inquiryMailto(locale, { subject: "S2000 Lamp Compatibility Check", context: "System model / serial number / lamp photo" })} className="inline-flex items-center justify-center rounded-xl border border-[#BFD2DD] bg-white px-6 py-3.5 text-sm font-bold text-[#102A43]">{t({ en: "Check Compatibility", zh: "核对兼容性", th: "ตรวจสอบความเข้ากันได้", vi: "Kiểm tra tương thích" }, locale)}</a></div><p className="mt-4 text-xs text-[#7B8794]">{t({ en: "Send us your system model, serial number or lamp photo for compatibility support.", zh: "请把系统型号、序列号或灯管照片发给我们，以便协助核对兼容性。", th: "ส่งรุ่นระบบ หมายเลขซีเรียล หรือรูปหลอดมาให้เรา เพื่อช่วยตรวจสอบความเข้ากันได้", vi: "Gửi cho chúng tôi model hệ thống, số sê-ri hoặc ảnh đèn để được hỗ trợ kiểm tra tương thích." }, locale)}</p></div>
          <Link href={LAMP_PATHS.en} className="relative block aspect-video overflow-hidden rounded-3xl border border-white bg-white shadow-[0_20px_55px_rgba(15,36,68,.10)]"><Image src={LAMP.promoImage} alt={LAMP.name} fill sizes="(max-width: 1024px) 100vw, 36vw" className="object-cover" /></Link>
        </div>
        {showOrder && <div id="s2000-order" className="mx-auto mt-6 max-w-7xl scroll-mt-24 rounded-[28px] border border-[#DCE9EE] bg-white p-6 shadow-[0_18px_50px_rgba(15,36,68,.08)] sm:p-8">
          <div><h3 className="text-xl font-bold text-[#102A43]">{t({ en: "S2000 Elite Lamp — Check the Stock", zh: "S2000 Elite 灯管 — 查询库存", th: "หลอด S2000 Elite — เช็คสต็อก", vi: "Đèn S2000 Elite — Kiểm tra tồn kho" }, locale)}</h3><p className="mt-1 text-sm text-[#5F6C7B]">{t({ en: "Enter the quantities you need and our sales team will check stock and reply with availability. Genuine OmniCure® lamps.", zh: "输入所需数量，我们的销售团队将为您查询库存并回复可供情况。原厂 OmniCure® 灯管。", th: "กรอกจำนวนที่ต้องการ ทีมขายของเราจะเช็คสต็อกและแจ้งความพร้อมจำหน่ายกลับไป หลอด OmniCure® ของแท้", vi: "Nhập số lượng bạn cần, đội ngũ bán hàng sẽ kiểm tra tồn kho và phản hồi tình trạng còn hàng. Đèn OmniCure® chính hãng." }, locale)}</p></div>
          <div className="mt-6 space-y-3">{LAMP.parts.map(([code, desc]) => <div key={code} className="flex flex-col gap-3 rounded-2xl border border-[#E3EAF2] bg-[#F9FBFD] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="font-mono text-sm font-bold text-[#1A56DB]">{code}</p><p className="mt-0.5 text-xs text-[#5F6C7B]">{desc}</p></div>
            <div className="flex items-center gap-3"><label htmlFor={`qty-${code}`} className="text-xs font-bold uppercase tracking-wider text-[#7B8794]">{t({ en: "Qty", zh: "数量", th: "จำนวน", vi: "SL" }, locale)}</label><input id={`qty-${code}`} type="number" min={0} inputMode="numeric" value={orderQty[code] ?? ""} onChange={(e) => setOrderQty((q) => ({ ...q, [code]: Math.max(0, parseInt(e.target.value, 10) || 0) }))} placeholder="0" className="w-24 rounded-lg border border-[#D4DFEC] px-3 py-2 text-sm font-semibold text-[#102A43] outline-none focus:border-[#1A56DB]" /></div>
          </div>)}</div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"><a href={orderTotal > 0 ? orderMailto : undefined} aria-disabled={orderTotal === 0} className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition ${orderTotal > 0 ? "bg-gradient-to-r from-[#1A56DB] to-[#087F6B] hover:-translate-y-0.5" : "pointer-events-none bg-[#B9C6D6]"}`}>{t({ en: "Check Stock by Email", zh: "邮件查询库存", th: "เช็คสต็อกทางอีเมล", vi: "Kiểm tra tồn kho qua email" }, locale)} <ArrowRight className="h-4 w-4" /></a><p className="text-xs text-[#7B8794]">{orderTotal > 0 ? t({ en: `${orderTotal} lamp${orderTotal > 1 ? "s" : ""} selected — opens your email app to ${localeSalesEmail(locale)}.`, zh: `已选择 ${orderTotal} 支灯管 — 将打开邮件应用发送至 ${localeSalesEmail(locale)}。`, th: `เลือกหลอดแล้ว ${orderTotal} หลอด — จะเปิดแอปอีเมลไปที่ ${localeSalesEmail(locale)}`, vi: `Đã chọn ${orderTotal} đèn — mở ứng dụng email tới ${localeSalesEmail(locale)}.` }, locale) : t({ en: "Enter a quantity above to check stock by email.", zh: "请在上方输入数量以邮件查询库存。", th: "กรอกจำนวนด้านบนเพื่อเช็คสต็อกทางอีเมล", vi: "Nhập số lượng ở trên để kiểm tra tồn kho qua email." }, locale)}</p></div>
        </div>}
      </section>

      <FinalCta heading={t({ en: "Not Sure Which OmniCure System Fits Your Process?", zh: "如果您不确定哪款 OmniCure UV Curing 系统适合您？", th: "ไม่แน่ใจว่าระบบ OmniCure รุ่นใดเหมาะกับกระบวนการของคุณ?", vi: "Chưa chắc hệ thống OmniCure nào phù hợp với quy trình của bạn?" }, locale)} body={t({ en: "Tell us your adhesive, substrate, curing area, cycle time and production requirements. ETIA can help recommend the right UV curing solution.", zh: "告诉我们您的胶粘剂、基材、固化面积、节拍时间与生产要求，ETIA 可协助推荐合适的紫外线固化方案。", th: "บอกเราเกี่ยวกับกาว วัสดุรองรับ พื้นที่คิวริ่ง เวลารอบการผลิต และความต้องการด้านการผลิตของคุณ ETIA ช่วยแนะนำโซลูชัน UV Curing ที่เหมาะสมได้", vi: "Cho chúng tôi biết keo, vật liệu nền, diện tích đóng rắn, thời gian chu kỳ và yêu cầu sản xuất của bạn. ETIA có thể giúp đề xuất giải pháp UV Curing phù hợp." }, locale)} primary={{ label: t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร", vi: "Trao đổi với kỹ sư" }, locale), href: mailto }} secondary={{ label: t({ en: "Request Product Recommendation", zh: "获取产品推荐", th: "ขอคำแนะนำผลิตภัณฑ์", vi: "Yêu cầu tư vấn sản phẩm" }, locale), href: inquiryMailto(locale, { subject: "OmniCure Product Recommendation", context: "Adhesive / substrate / curing area / cycle time" }) }} />

      <div className="border-t border-[#E6EAF0] bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
        <p className="mx-auto max-w-4xl text-center text-xs leading-5 text-[#94A3B8]">{t({
          en: "ETIA is an authorized distributor of OmniCure® products in designated territories. OmniCure® and related trademarks are owned by their respective trademark owners. Product names and trademarks are used for identification and product reference only. Authorization scope, availability, warranty and service terms may vary by country and product model.",
          zh: "在指定地区，ETIA 是 OmniCure® 产品的授权经销商。OmniCure® 及相关商标归其各自的商标所有者所有。产品名称与商标仅用于标识与产品参考。授权范围、供货情况、保修与服务条款可能因国家/地区与产品型号而异。",
          th: "ETIA เป็นตัวแทนจำหน่ายที่ได้รับอนุญาตของผลิตภัณฑ์ OmniCure® ในพื้นที่ที่กำหนด OmniCure® และเครื่องหมายการค้าที่เกี่ยวข้องเป็นของเจ้าของเครื่องหมายการค้านั้น ๆ ชื่อผลิตภัณฑ์และเครื่องหมายการค้าใช้เพื่อการระบุและอ้างอิงผลิตภัณฑ์เท่านั้น ขอบเขตการได้รับอนุญาต ความพร้อมจำหน่าย การรับประกันและเงื่อนไขบริการอาจแตกต่างกันตามประเทศและรุ่นผลิตภัณฑ์",
          vi: "ETIA là nhà phân phối được ủy quyền của các sản phẩm OmniCure® tại các khu vực được chỉ định. OmniCure® và các nhãn hiệu liên quan thuộc sở hữu của các chủ sở hữu nhãn hiệu tương ứng. Tên sản phẩm và nhãn hiệu chỉ được sử dụng để nhận diện và tham chiếu sản phẩm. Phạm vi ủy quyền, tình trạng sẵn có, bảo hành và điều khoản dịch vụ có thể khác nhau theo quốc gia và mẫu sản phẩm.",
        }, locale)}</p>
      </div>
    </div>
  );
}
