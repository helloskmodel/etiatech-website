"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  GraduationCap,
  Warehouse,
  Wrench,
} from "lucide-react";
import { inquiryMailto } from "@/components/contact";
import { useLocale, t, type LangText, type Locale } from "@/components/LocaleContext";
import { productImage, products } from "@/components/productCatalog";
import { cosResize } from "@/components/cosImage";
import { localizeHref } from "@/components/localeHref";
import { categoriesForBrand } from "@/components/productCategories";
import { publishedIndustries, industryHref } from "@/components/industrySolutions";
import { brandLanding, type BrandSlug } from "@/components/brandLanding";
import TrustStrip from "@/components/TrustStrip";
import FinalCta from "@/components/FinalCta";
import NewsTicker from "@/components/NewsTicker";
import CustomerLogos from "@/components/CustomerLogos";
import HomeCarousel from "@/components/HomeCarousel";
import { LIGHT_SOURCES } from "@/components/lightSources";

const whyCards: { title: LangText; body: LangText; icon: ComponentType<{ className?: string; strokeWidth?: number }> }[] = [
  { title: { en: "20 Years of Application Experience", zh: "20 年应用经验", th: "ประสบการณ์ด้านการใช้งาน 20 ปี", vi: "20 năm kinh nghiệm ứng dụng" }, body: { en: "Hands-on UV curing knowledge across medical, electronics, photonics, automotive and industrial manufacturing.", zh: "覆盖医疗、电子、光子、汽车及工业制造场景，提供贴近现场的紫外线固化经验。", th: "เรามีความรู้ด้าน UV curing จากประสบการณ์จริง ครอบคลุมงานผลิตในอุตสาหกรรมการแพทย์ อิเล็กทรอนิกส์ โฟโตนิกส์ ยานยนต์ และอุตสาหกรรมการผลิตทั่วไป", vi: "Chúng tôi có kiến thức thực tiễn về UV curing trong các lĩnh vực sản xuất thiết bị y tế, điện tử, quang tử, ô tô và sản xuất công nghiệp." }, icon: GraduationCap },
  { title: { en: "Authorized & Genuine Supply", zh: "授权正品供应", th: "ช่องทางจัดจำหน่ายที่ได้รับอนุญาตและสินค้าของแท้", vi: "Nguồn cung được ủy quyền & sản phẩm chính hãng" }, body: { en: "Genuine systems, replacement lamps and accessories through authorized supply channels.", zh: "正品设备、替换灯泡与配套附件，来源可靠，供应规范。", th: "จัดหาเครื่อง UV curing หลอดไฟสำรอง และอุปกรณ์เสริมของแท้ ผ่านช่องทางจัดจำหน่ายที่ได้รับอนุญาต", vi: "Cung cấp hệ thống UV curing, đèn thay thế và phụ kiện chính hãng thông qua các kênh cung ứng được ủy quyền." }, icon: BadgeCheck },
  { title: { en: "Local Stock & Fast Response", zh: "本地库存 快速响应", th: "สต็อกในประเทศ ตอบสนองรวดเร็ว", vi: "Kho hàng địa phương & phản hồi nhanh" }, body: { en: "Local equipment and consumables help reduce lead time and production risk.", zh: "本地备货，缩短交期，降低停线与生产风险。", th: "มีอุปกรณ์และวัสดุสิ้นเปลืองในสต็อกท้องถิ่น ช่วยลดระยะเวลารอสินค้าและลดความเสี่ยงต่อการผลิต", vi: "Thiết bị và vật tư tiêu hao có sẵn tại địa phương giúp rút ngắn thời gian giao hàng và giảm rủi ro gián đoạn sản xuất." }, icon: Warehouse },
  { title: { en: "In-House Repair & Lifecycle Support", zh: "内部维修 长期支持", th: "บริการซ่อมและการสนับสนุนตลอดอายุการใช้งาน", vi: "Sửa chữa nội bộ & hỗ trợ vòng đời sản phẩm" }, body: { en: "Troubleshooting, maintenance and repair coordination to keep your process running.", zh: "故障排查、维护保养与维修协调，保障工艺持续稳定运行。", th: "ให้การสนับสนุนด้านการแก้ไขปัญหา การบำรุงรักษา และการประสานงานซ่อม เพื่อช่วยให้กระบวนการผลิตดำเนินต่อไปอย่างมั่นคง", vi: "Hỗ trợ xử lý sự cố, bảo trì và điều phối sửa chữa nhằm giúp quy trình sản xuất vận hành ổn định." }, icon: Wrench },
];


// The four Excelitas brands, in the order they are shown under BY BRAND.
const HOME_BRAND_ORDER: BrandSlug[] = ["omnicure", "noblelight", "phoseon", "fusion-uv"];

// OmniCure systems featured in the hero product carousel (all have COS assets).
const heroProductSlugs = ["s1500-pro", "lx500", "v3-led-heads", "ac8", "ac5", "ls200"];

// Chinese headings break between any two hanzi by default, which can split a
// bound word (伙伴 / 品牌 / 应用说明 / 案例分享) awkwardly across two lines. For
// zh we render a custom node that keeps the trailing phrase together (and, where
// noted, forces a mobile-only break); every other locale renders normally.
function CjkHeading({ locale, text, zh }: { locale: Locale; text: LangText; zh: ReactNode }) {
  return <>{locale === "zh" ? zh : t(text, locale)}</>;
}

function product(slug: string) {
  return products.find((item) => item.slug === slug);
}

export default function HomeView() {
  const { locale } = useLocale();
  const engineerMail = inquiryMailto(locale, { subject: "UV Curing Engineering Inquiry", context: "Application / adhesive / curing area / wavelength / production requirements" });
  // The hero offers two ways to reach a person rather than a browse link: one
  // for a commercial conversation, one for a technical one.
  const salesMail = inquiryMailto(locale, { subject: "UV Curing Sales Inquiry", context: "Product or model of interest / quantity / delivery location / timeline" });

  const heroProducts = heroProductSlugs
    .map((slug) => product(slug))
    .filter((p): p is NonNullable<typeof p> => !!p && !!productImage(p));
  const [heroIndex, setHeroIndex] = useState(0);
  // Only the current slide downloads on first paint; the next one starts
  // after the first image has loaded. Mounting all six at once made every
  // hidden slide download immediately and compete with the hero LCP.
  const [heroReady, setHeroReady] = useState(false);
  useEffect(() => {
    if (heroProducts.length <= 1) return;
    const timer = setInterval(() => setHeroIndex((i) => (i + 1) % heroProducts.length), 3500);
    return () => clearInterval(timer);
  }, [heroProducts.length]);

  return <div className="bg-white text-[#102038]">
    <section className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
      <div className="absolute -right-36 -top-36 h-[34rem] w-[34rem] rounded-full bg-[#1A56DB]/10 blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#63C94A]/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.05fr_.95fr] lg:items-start lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm"><BadgeCheck className="h-4 w-4" />{t({ en: "Authorized Distributor · Genuine Products Through Official Channels", zh: "授权经销 · 官方渠道正品", th: "ตัวแทนจำหน่ายที่ได้รับอนุญาต · สินค้าของแท้ผ่านช่องทางอย่างเป็นทางการ" , vi: "Nhà phân phối được ủy quyền · Sản phẩm chính hãng qua kênh chính thức" }, locale)}</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-6xl"><CjkHeading locale={locale} text={{ en: "Your UV Curing Solution Partner", zh: "紫外线固化 就找 ETIA", th: "โซลูชัน UV Curing เลือก ETIA", vi: "Giải pháp UV Curing, hãy chọn ETIA" }} zh={<>紫外线固化 就找 ETIA</>} /><span className="mt-2 block text-2xl font-bold text-[#41A62A] md:text-4xl">{t({ en: "From Selection to Support.", zh: "选型 应用 售后 一站支持", th: "การเลือกอุปกรณ์ การใช้งาน และบริการหลังการขาย — รองรับครบวงจร", vi: "Tư vấn lựa chọn, ứng dụng và hậu mãi — hỗ trợ trọn gói." }, locale)}</span></h1>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={salesMail} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]">{t({ en: "Talk to Sales", zh: "联系销售", th: "ติดต่อฝ่ายขาย" , vi: "Liên hệ kinh doanh" }, locale)} <ArrowRight className="h-4 w-4" /></a><a href={engineerMail} className="inline-flex items-center justify-center rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:-translate-y-0.5 hover:border-[#143C96] hover:text-[#1A56DB]">{t({ en: "Connect with Engineer", zh: "对接工程师", th: "เชื่อมต่อกับวิศวกร" , vi: "Kết nối với kỹ sư" }, locale)}</a></div>
        </div>
        <div className="relative min-h-[340px] rounded-[32px] border border-white/80 bg-white/75 p-5 shadow-[0_25px_80px_rgba(20,60,150,.12)] backdrop-blur sm:p-8">
          <div className="absolute left-10 right-10 top-1/2 h-24 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#1A56DB]/20 via-[#63C94A]/35 to-transparent blur-2xl" />
          {heroProducts.map((p, i) => {
            const n = heroProducts.length;
            const isCurrent = i === heroIndex;
            const isNeighbor = i === (heroIndex + 1) % n || i === (heroIndex + n - 1) % n;
            // Mount only the visible slide plus (once it has loaded) its
            // neighbors, so the next fade-in is already cached without
            // downloading all slides up front.
            if (!isCurrent && !(heroReady && isNeighbor)) return null;
            return <Image key={p.slug} src={productImage(p)} alt={p.name} fill priority={i === 0} onLoad={i === 0 ? () => setHeroReady(true) : undefined} sizes="(max-width: 1024px) 100vw, 46vw" className={`object-contain p-16 transition-opacity duration-700 ${isCurrent ? "opacity-100" : "opacity-0"}`} />;
          })}
          {heroProducts.length > 1 && <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">{heroProducts.map((p, i) => <button key={p.slug} type="button" aria-label={`Show ${p.name}`} onClick={() => setHeroIndex(i)} className={`h-2 rounded-full transition-all ${i === heroIndex ? "w-6 bg-[#143C96]" : "w-2 bg-[#143C96]/25"}`} />)}</div>}
          <div className="absolute left-4 top-5 rounded-xl border border-[#D9E4EA] bg-white px-4 py-3 shadow-lg sm:left-6"><p className="text-xs font-bold text-[#143C96]">{t({ en: "Genuine Products", zh: "官方渠道正品", th: "สินค้าของแท้", vi: "Sản phẩm chính hãng" }, locale)}</p><p className="mt-1 text-[10px] text-[#667085]">{t({ en: "Authorized supply", zh: "授权经销", th: "จัดหาอย่างเป็นทางการ" , vi: "Nguồn cung được ủy quyền" }, locale)}</p></div>
          <div className="absolute right-4 top-1/3 rounded-xl border border-[#D9E4EA] bg-white px-4 py-3 shadow-lg sm:right-6"><p className="text-xs font-bold text-[#143C96]">{t({ en: "Application Support", zh: "应用支持", th: "การสนับสนุนด้านการใช้งาน" , vi: "Hỗ trợ ứng dụng" }, locale)}</p><p className="mt-1 text-[10px] text-[#667085]">{t({ en: "Engineer-led selection", zh: "工程师主导选型", th: "การเลือกโดยวิศวกร" , vi: "Kỹ sư tư vấn lựa chọn" }, locale)}</p></div>
          <div className="absolute bottom-5 left-8 rounded-xl border border-[#D9E4EA] bg-white px-4 py-3 shadow-lg"><p className="text-xs font-bold text-[#41A62A]">{t({ en: "In-House Repair", zh: "内部维修能力", th: "ศูนย์ซ่อมภายใน" , vi: "Sửa chữa nội bộ" }, locale)}</p><p className="mt-1 text-[10px] text-[#667085]">{t({ en: "Lifecycle support", zh: "全生命周期支持", th: "การสนับสนุนตลอดอายุการใช้งาน" , vi: "Hỗ trợ trọn vòng đời" }, locale)}</p></div>
        </div>
      </div>
    </section>

    <TrustStrip />
    <NewsTicker />

    <section className="px-4 pt-14 pb-4 sm:px-6 md:pt-20 md:pb-6 lg:px-8"><div className="mx-auto max-w-7xl"><h2 className="text-3xl font-bold text-[#143C96] md:text-4xl">{t({ en: "Why Manufacturers Choose ETIA", zh: "为什么制造企业选择 ETIA", th: "ทำไมผู้ผลิตจึงเลือก ETIA", vi: "Vì sao các nhà sản xuất chọn ETIA" }, locale)}</h2>
    {/* Mobile: a 2x2 tile grid. The body copy is dropped — at half the screen
        width it pushes the four tiles past one screen, which is the whole
        point of the compact layout. The titles carry the claim. */}
    <div className="mt-6 grid grid-cols-2 gap-3 md:hidden">{whyCards.map((item,i)=>{const Icon=item.icon;const accent=i%2===0?"#1A56DB":"#41A62A";const soft=i%2===0?"#EEF6FF":"#F0F9EA";return <div key={item.title.en} className="rounded-2xl border border-[#D9E4EA] bg-white p-4 shadow-[0_10px_35px_rgba(20,60,150,.06)]" style={{borderTopColor:accent,borderTopWidth:3}}><span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{background:soft,color:accent}}><Icon className="h-5 w-5" strokeWidth={1.8}/></span><h3 className="mt-3 text-sm font-bold leading-snug" style={{color:accent}}>{t(item.title, locale)}</h3></div>})}</div>
    <div className="mt-10 hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-4">{whyCards.map((item,i)=>{const Icon=item.icon;const accent=i%2===0?"#1A56DB":"#41A62A";const soft=i%2===0?"#EEF6FF":"#F0F9EA";return <article key={item.title.en} className="rounded-2xl border border-[#D9E4EA] bg-white p-6 shadow-[0_10px_35px_rgba(20,60,150,.06)]" style={{borderTopColor:accent,borderTopWidth:3}}><div className="flex items-center gap-3"><span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{background:soft,color:accent}}><Icon className="h-7 w-7" strokeWidth={1.7}/></span><h3 className="font-bold leading-snug" style={{color:accent}}>{t(item.title, locale)}</h3></div><p className="mt-4 text-sm leading-6 text-[#667085]">{t(item.body, locale)}</p></article>})}</div></div></section>

    {/* Three ways in, each a row you swipe rather than a grid you scroll
        past. ETIA sells other people's equipment, so a visitor is here to
        look at machines — the picture does the work the paragraph used to.
        Order follows how customers actually arrive: the technology they
        need, then their industry, then the brand they already run. */}

    {/* BY LIGHT SOURCE — the sources as the manufacturer's own selector guide
        classifies them: UV curing splits into broad spectrum (a lamp) and
        single wavelength (an LED), and infrared splits into the emitter and
        the system built around it. A customer looking for a water-cooled LED
        array does not want to land on a thirty-model page and hunt; the card
        takes them to that shelf. Where a source is a section of a larger page,
        the link carries its anchor. */}
    <section className="px-4 pt-14 pb-4 sm:px-6 md:pt-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">{t({ en: "By Light Source", zh: "按光源", th: "ตามแหล่งกำเนิดแสง", vi: "Theo nguồn sáng" }, locale)}</h2>
        <div className="mt-8">
          <HomeCarousel label={t({ en: "By Light Source", zh: "按光源", th: "ตามแหล่งกำเนิดแสง", vi: "Theo nguồn sáng" }, locale)}>
            {LIGHT_SOURCES.map((src) => {
              const stand = products.find((p) => p.slug === src.model);
              const img = src.photo ? cosResize(src.photo, 900) : stand ? productImage(stand) : "";
              const boxed = src.photo ? src.fit === "contain" : true;
              return (
                <Link key={src.name.en} href={localizeHref(src.href, locale)} className="group flex w-[62%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#D9E4EA] bg-white transition hover:border-[#1A56DB]/40 hover:shadow-lg sm:w-[38%] lg:w-[23%]">
                  <div className="relative h-32 bg-[#F7FAFC] sm:h-36">
                    {img && <Image src={img} alt={t(src.name, locale)} fill sizes="(max-width:640px) 62vw, (max-width:1024px) 38vw, 23vw" className={`transition duration-300 group-hover:scale-105 ${boxed ? "object-contain p-4" : "object-cover"}`} />}
                    <span className="absolute left-0 top-0 h-1.5 w-12 rounded-br" style={{ background: src.accent }} />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="text-[10px] font-bold uppercase tracking-[.12em]" style={{ color: src.accent }}>{t(src.family, locale)}</span>
                    <h3 className="mt-1 text-sm font-bold leading-snug text-[#143C96]">{t(src.name, locale)}</h3>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-bold" style={{ color: src.accent }}>{t({ en: "Explore", zh: "查看", th: "ดูเพิ่มเติม", vi: "Khám phá" }, locale)} <ArrowRight className="h-3.5 w-3.5" /></span>
                  </div>
                </Link>
              );
            })}
          </HomeCarousel>
        </div>
      </div>
    </section>


    {/* BY INDUSTRY */}
    <section className="px-4 pt-14 pb-4 sm:px-6 md:pt-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">{t({ en: "By Industry", zh: "按行业", th: "ตามอุตสาหกรรม", vi: "Theo ngành" }, locale)}</h2>
          <Link href={localizeHref("/applications", locale)} className="hidden shrink-0 items-center gap-2 text-sm font-bold text-[#143C96] sm:inline-flex">{t({ en: "All applications", zh: "全部应用", th: "การใช้งานทั้งหมด", vi: "Tất cả ứng dụng" }, locale)} <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8">
          <HomeCarousel label={t({ en: "By Industry", zh: "按行业", th: "ตามอุตสาหกรรม", vi: "Theo ngành" }, locale)}>
            {publishedIndustries.map((s) => (
              <Link key={s.slug} href={localizeHref(industryHref(s.slug), locale)} className="group flex w-[62%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#D9E4EA] bg-white transition hover:border-[#1A56DB]/40 hover:shadow-lg sm:w-[38%] lg:w-[23%]">
                {s.cardImage ? (
                  <div className="relative h-32 bg-[#F7FAFC] sm:h-36">
                    <Image src={cosResize(s.cardImage, 900)} alt={t(s.name, locale)} fill sizes="(max-width:640px) 62vw, (max-width:1024px) 38vw, 23vw" className="object-cover transition duration-300 group-hover:scale-105" />
                  </div>
                ) : (
                  <div className="h-2 w-full" style={{ background: s.accent }} />
                )}
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-sm font-bold text-[#143C96]">{t(s.name, locale)}</h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-xs leading-5 text-[#667085]">{t(s.tagline, locale)}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: s.accent }}>{t({ en: "View solutions", zh: "查看方案", th: "ดูโซลูชัน", vi: "Xem giải pháp" }, locale)} <ArrowRight className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            ))}
          </HomeCarousel>
        </div>
      </div>
    </section>

    {/* BY BRAND */}
    <section className="px-4 pt-14 pb-20 sm:px-6 md:pt-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-xs font-bold uppercase tracking-[.18em] text-[#41A62A]">{t({ en: "By Brand", zh: "按品牌", th: "ตามแบรนด์", vi: "Theo thương hiệu" }, locale)}</h2>
        <div className="mt-8">
          <HomeCarousel label={t({ en: "By Brand", zh: "按品牌", th: "ตามแบรนด์", vi: "Theo thương hiệu" }, locale)}>
            {HOME_BRAND_ORDER.map((slug) => {
              const b = brandLanding[slug];
              const hero = products.find((p) => p.brandId === b.catalogBrandId && productImage(p));
              const shot = b.cardImage ? cosResize(b.cardImage, 900) : hero ? productImage(hero) : "";
              const cats = categoriesForBrand(b.catalogBrandId);
              return (
                <Link key={slug} href={localizeHref(`/product/${slug}`, locale)} className="group flex w-[62%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[#D9E4EA] bg-white transition hover:border-[#1A56DB]/40 hover:shadow-lg sm:w-[38%] lg:w-[23%]">
                  <div className="relative h-32 bg-[#F7FAFC] sm:h-36">
                    {shot && <Image src={shot} alt={`${b.name} UV curing system`} fill sizes="(max-width:640px) 62vw, (max-width:1024px) 38vw, 23vw" className={`transition duration-300 group-hover:scale-105 ${b.cardImage ? "object-cover" : "object-contain p-4"}`} />}
                    <span className="absolute left-0 top-0 h-1.5 w-12 rounded-br" style={{ background: b.color }} />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-sm font-bold text-[#143C96]">{b.name}</h3>
                    {cats.length > 0 && <div className="mt-2 flex flex-wrap gap-1">{cats.map((c) => <span key={c.slug} className="rounded-full border px-2 py-0.5 text-[10px] font-semibold" style={{ borderColor: `${c.accent}55`, color: c.accent }}>{t(c.name, locale)}</span>)}</div>}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold" style={{ color: b.color }}>{t({ en: "Explore", zh: "查看", th: "ดูเพิ่มเติม", vi: "Khám phá" }, locale)} <ArrowRight className="h-3.5 w-3.5" /></span>
                  </div>
                </Link>
              );
            })}
          </HomeCarousel>
        </div>
      </div>
    </section>


    <CustomerLogos />

    <FinalCta heading={t({ en: "Need help choosing the right UV curing system?", zh: "需要帮助选择合适的 UV Curing 紫外线固化系统吗？", th: "ต้องการความช่วยเหลือในการเลือกระบบ UV curing ที่เหมาะสมหรือไม่?" , vi: "Bạn cần hỗ trợ chọn hệ thống UV curing phù hợp?" }, locale)} body={t({ en: "Tell us your application, adhesive, curing area, wavelength, and production requirements. ETIA engineers will help you find the right solution.", zh: "告诉我们您的应用、胶粘剂、固化面积、波长与生产要求。ETIA 工程师将帮助您找到合适方案。", th: "บอกเราเกี่ยวกับการใช้งาน กาว พื้นที่การบ่ม ความยาวคลื่น และความต้องการการผลิตของคุณ วิศวกรของ ETIA จะช่วยคุณหาโซลูชันที่เหมาะสม" , vi: "Cho chúng tôi biết ứng dụng, keo, diện tích đóng rắn, bước sóng và yêu cầu sản xuất của bạn. Kỹ sư ETIA sẽ giúp bạn tìm giải pháp phù hợp." }, locale)} primary={{ label: t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร" , vi: "Trao đổi với kỹ sư" }, locale), href: engineerMail }} secondary={{ label: t({ en: "Send Your Application", zh: "提交您的应用需求", th: "ส่งการใช้งานของคุณ" , vi: "Gửi thông tin ứng dụng của bạn" }, locale), href: inquiryMailto(locale, { subject: "UV Curing Application Review", context: "Application / adhesive / area / wavelength / production requirements" }) }} />
  </div>;
}
