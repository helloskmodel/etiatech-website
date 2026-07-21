"use client";
import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { useLocale, t, type LangText } from "@/components/LocaleContext";
import TrustStrip from "@/components/TrustStrip";
import FinalCta from "@/components/FinalCta";
import { inquiryMailto } from "@/components/contact";

const BRANDS: Array<{ name: string; href: string; blurb: LangText }> = [
  {
    name: "OmniCure®",
    href: "/product/omnicure",
    blurb: {
      en: "UV spot & LED spot curing systems — S2000 Elite, S1500 Pro, LX500, AC series.",
      zh: "UV 点光源与 LED 点光源固化系统 — S2000 Elite、S1500 Pro、LX500、AC 系列。",
      th: "ระบบบ่มยูวีแบบจุดและ LED — S2000 Elite, S1500 Pro, LX500, ซีรีส์ AC",
      vi: "Hệ thống UV spot & LED spot curing — S2000 Elite, S1500 Pro, LX500, dòng AC.",
    },
  },
  {
    name: "Phoseon",
    href: "/product/phoseon",
    blurb: {
      en: "Industrial UV LED area curing — air-cooled and water-cooled systems.",
      zh: "工业 UV LED 面固化 — 风冷与水冷系统。",
      th: "ระบบบ่ม UV LED แบบพื้นที่สำหรับอุตสาหกรรม — ระบายความร้อนด้วยอากาศและน้ำ",
      vi: "UV LED area curing công nghiệp — làm mát bằng khí và nước.",
    },
  },
  {
    name: "Fusion UV",
    href: "/product/fusion-uv",
    blurb: {
      en: "Microwave-powered UV lamp systems for high-speed production lines.",
      zh: "微波无极 UV 灯系统,适用于高速生产线。",
      th: "ระบบหลอด UV แบบไมโครเวฟ สำหรับไลน์ผลิตความเร็วสูง",
      vi: "Hệ thống đèn UV vi sóng cho dây chuyền tốc độ cao.",
    },
  },
  {
    name: "Noblelight",
    href: "/product/noblelight",
    blurb: {
      en: "Specialty UV lamps and infrared heating solutions.",
      zh: "特种 UV 灯与红外加热解决方案。",
      th: "หลอด UV เฉพาะทางและโซลูชันความร้อนอินฟราเรด",
      vi: "Đèn UV chuyên dụng và giải pháp gia nhiệt hồng ngoại.",
    },
  },
];

const OFFICES: Array<{ city: LangText; country: LangText; note?: LangText; highlight?: boolean }> = [
  {
    city: { en: "Shanghai", zh: "上海", th: "เซี่ยงไฮ้", vi: "Thượng Hải" },
    country: { en: "China", zh: "中国", th: "จีน", vi: "Trung Quốc" },
  },
  {
    city: { en: "Hong Kong", zh: "香港", th: "ฮ่องกง", vi: "Hồng Kông" },
    country: { en: "China", zh: "中国", th: "จีน", vi: "Trung Quốc" },
  },
  {
    city: { en: "Bangkok", zh: "曼谷", th: "กรุงเทพฯ", vi: "Bangkok" },
    country: { en: "Thailand", zh: "泰国", th: "ประเทศไทย", vi: "Thái Lan" },
    highlight: true,
    note: {
      en: "Etiatec (Thailand) Co., Ltd. — appointed by Excelitas Canada Inc. as authorized OmniCure distributor in Thailand.",
      zh: "Etiatec (Thailand) Co., Ltd. — 获 Excelitas Canada Inc. 授权的 OmniCure 泰国代理。",
      th: "Etiatec (Thailand) Co., Ltd. — ได้รับการแต่งตั้งจาก Excelitas Canada Inc. เป็นตัวแทนจำหน่าย OmniCure ที่ได้รับอนุญาตในประเทศไทย",
      vi: "Etiatec (Thailand) Co., Ltd. — được Excelitas Canada Inc. bổ nhiệm làm nhà phân phối OmniCure ủy quyền tại Thái Lan.",
    },
  },
  {
    city: { en: "Bac Ninh", zh: "北宁", th: "บั๊กนิญ", vi: "Bắc Ninh" },
    country: { en: "Vietnam", zh: "越南", th: "เวียดนาม", vi: "Việt Nam" },
  },
];

const SERVICES: LangText[] = [
  { en: "System selection & application review", zh: "设备选型与应用评估", th: "การเลือกระบบและทบทวนการใช้งาน", vi: "Lựa chọn hệ thống & đánh giá ứng dụng" },
  { en: "Process validation & testing", zh: "工艺验证与测试", th: "การตรวจสอบและทดสอบกระบวนการ", vi: "Xác nhận & thử nghiệm quy trình" },
  { en: "Genuine supply & local stock", zh: "原厂供货与本地库存", th: "สินค้าของแท้และสต็อกในประเทศ", vi: "Hàng chính hãng & tồn kho địa phương" },
  { en: "Installation & operator training", zh: "安装调试与操作培训", th: "การติดตั้งและฝึกอบรมผู้ปฏิบัติงาน", vi: "Lắp đặt & đào tạo vận hành" },
  { en: "Radiometer calibration", zh: "辐照计校准", th: "การสอบเทียบเรดิโอมิเตอร์", vi: "Hiệu chuẩn radiometer" },
  { en: "Maintenance & in-house repair", zh: "维护保养与自有维修", th: "การบำรุงรักษาและซ่อมภายใน", vi: "Bảo trì & sửa chữa nội bộ" },
];

export default function AboutPage() {
  const { locale } = useLocale();
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: "#0f2444" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(13,30,58,0.94) 0%, rgba(18,65,163,0.82) 50%, rgba(26,86,219,0.45) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-white">
            <BadgeCheck className="h-4 w-4 text-[#44B549]" />
            {t({ en: "Authorized Distributor · 20 Years of Application Expertise", zh: "授权代理 · 20 年应用经验", th: "ตัวแทนจำหน่ายที่ได้รับอนุญาต · ประสบการณ์ 20 ปี", vi: "Nhà phân phối ủy quyền · 20 năm kinh nghiệm" }, locale)}
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl md:text-5xl font-bold leading-tight text-white">
            {t({ en: "About ETIA Technology", zh: "关于 ETIA Technology", th: "เกี่ยวกับ ETIA Technology", vi: "Về ETIA Technology" }, locale)}
          </h1>
          <p className="mt-5 max-w-3xl text-base md:text-lg leading-relaxed text-white/80">
            {t({
              en: "ETIA Technology is an authorized distributor of UV curing systems, helping manufacturers across China and Southeast Asia select, validate, install and maintain the right curing solution for their process.",
              zh: "ETIA Technology 是 UV Curing 紫外线固化系统授权代理商,帮助中国及东南亚制造企业完成设备选型、工艺验证、安装与长期维护。",
              th: "ETIA Technology เป็นตัวแทนจำหน่ายระบบบ่มยูวีที่ได้รับอนุญาต ช่วยผู้ผลิตในจีนและเอเชียตะวันออกเฉียงใต้เลือก ตรวจสอบ ติดตั้ง และดูแลโซลูชันการบ่มที่เหมาะกับกระบวนการ",
              vi: "ETIA Technology là nhà phân phối ủy quyền hệ thống UV curing, giúp nhà sản xuất tại Trung Quốc và Đông Nam Á lựa chọn, xác nhận, lắp đặt và bảo trì giải pháp phù hợp.",
            }, locale)}
          </p>
        </div>
      </section>

      <TrustStrip />

      {/* Authorized brands */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#44B549] mb-2">{t({ en: "Authorized Brands", zh: "授权品牌", th: "แบรนด์ที่ได้รับอนุญาต", vi: "Thương hiệu ủy quyền" }, locale)}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#143C96] mb-8">{t({ en: "Four UV curing brands, one local partner", zh: "四大 UV 固化品牌,一个本地伙伴", th: "สี่แบรนด์ UV curing พันธมิตรท้องถิ่นเดียว", vi: "Bốn thương hiệu UV curing, một đối tác địa phương" }, locale)}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BRANDS.map((b) => (
              <Link key={b.name} href={b.href} className="group rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-[#1A56DB]/40 hover:shadow-md">
                <p className="font-bold text-[#1A56DB]">{b.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{t(b.blurb, locale)}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#44B549]">
                  {t({ en: "Explore", zh: "了解更多", th: "ดูเพิ่มเติม", vi: "Tìm hiểu" }, locale)} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Regional presence */}
      <section className="py-14" style={{ background: "#f6f8fb" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#44B549] mb-2">{t({ en: "Regional Presence", zh: "区域布局", th: "สาขาในภูมิภาค", vi: "Hiện diện khu vực" }, locale)}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#143C96] mb-8">{t({ en: "Local teams in four cities", zh: "四地本地团队", th: "ทีมงานท้องถิ่นในสี่เมือง", vi: "Đội ngũ địa phương tại bốn thành phố" }, locale)}</h2>
          <figure className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="relative aspect-[16/7]">
              <Image src="/images/etiatec-thailand-office.jpg" alt="ETIATEC (Thailand) Co., Ltd. office in Bangkok" fill sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
            </div>
            <figcaption className="px-5 py-3 text-xs text-gray-500">
              {t({
                en: "The ETIATEC (Thailand) Co., Ltd. office in Bangkok.",
                zh: "ETIATEC (Thailand) Co., Ltd. 曼谷办公楼。",
                th: "สำนักงาน ETIATEC (Thailand) Co., Ltd. ในกรุงเทพฯ",
                vi: "Văn phòng ETIATEC (Thailand) Co., Ltd. tại Bangkok.",
              }, locale)}
            </figcaption>
          </figure>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {OFFICES.map((o) => (
              <div key={t(o.city, "en")} className={`rounded-xl border bg-white p-5 ${o.highlight ? "border-[#44B549] shadow-md" : "border-gray-200"}`}>
                <p className="flex items-center gap-1.5 font-bold text-gray-900"><MapPin className="h-4 w-4 text-[#1A56DB]" />{t(o.city, locale)}</p>
                <p className="mt-1 text-xs font-semibold text-gray-500">{t(o.country, locale)}</p>
                {o.note && <p className="mt-3 text-xs leading-relaxed text-gray-600">{t(o.note, locale)}</p>}
                {o.highlight && (
                  <div className="mt-3 space-y-1 border-t border-gray-100 pt-3 text-xs text-gray-600">
                    <p className="flex items-center gap-1.5"><Phone className="h-3 w-3 text-[#44B549]" />+66 811 746 947</p>
                    <p className="flex items-center gap-1.5"><Mail className="h-3 w-3 text-[#44B549]" />sompoch@etia-tech.com</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full lifecycle services */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#44B549] mb-2">{t({ en: "What We Do", zh: "我们的服务", th: "สิ่งที่เราทำ", vi: "Chúng tôi làm gì" }, locale)}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#143C96] mb-8">{t({ en: "Full equipment lifecycle, one team", zh: "设备全生命周期,一个团队负责到底", th: "ดูแลตลอดวงจรอุปกรณ์ โดยทีมเดียว", vi: "Trọn vòng đời thiết bị, một đội ngũ" }, locale)}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={t(s, "en")} className="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm font-medium text-gray-700">
                <BadgeCheck className="h-5 w-5 shrink-0 text-[#44B549]" />
                {t(s, locale)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        heading={t({ en: "Work with ETIA", zh: "与 ETIA 合作", th: "ร่วมงานกับ ETIA", vi: "Hợp tác với ETIA" }, locale)}
        body={t({
          en: "Tell us your application, adhesive, curing area and production requirements — our engineers will help you find the right UV curing solution.",
          zh: "告诉我们您的应用、胶粘剂、固化面积与生产要求,ETIA 工程师将帮助您找到合适的紫外线固化方案。",
          th: "บอกเราเกี่ยวกับการใช้งาน กาว พื้นที่การบ่ม และความต้องการการผลิต — วิศวกรของเราจะช่วยหาโซลูชันที่เหมาะสม",
          vi: "Cho chúng tôi biết ứng dụng, keo, vùng curing và yêu cầu sản xuất — kỹ sư ETIA sẽ giúp bạn tìm giải pháp phù hợp.",
        }, locale)}
        primary={{ label: t({ en: "Talk to an Engineer", zh: "咨询工程师", th: "ปรึกษาวิศวกร", vi: "Trao đổi với kỹ sư" }, locale), href: inquiryMailto(locale, { subject: "Engineering Inquiry" }) }}
        secondary={{ label: t({ en: "Sales & Support", zh: "销售与支持", th: "ฝ่ายขายและบริการ", vi: "Bán hàng & hỗ trợ" }, locale), href: "/contact" }}
      />
    </>
  );
}
