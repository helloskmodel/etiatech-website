"use client";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, MessageCircle, PackageCheck, Wrench, GraduationCap, Gauge, ArrowRight } from "lucide-react";
import { useLocale, t, type LangText } from "@/components/LocaleContext";
import { localizeHref } from "@/components/localeHref";
import { products, productHref, productImage, localizeProduct } from "@/components/productCatalog";
import { consumablesHref } from "@/components/consumables";
import { CONTACT } from "@/components/omnicure/copy";
import { localeSalesEmail, inquiryMailto } from "@/components/contact";
import TrustStrip from "@/components/TrustStrip";
import FinalCta from "@/components/FinalCta";
import { TH_FAQ } from "@/components/omnicureThailandFaq";

// The Thailand page. See app/(main)/omnicure-thailand/page.tsx for why this
// URL exists and why it is not a copy of the ad landing page.
//
// Everything factual here — the company name, the Bangkok address, the phone,
// the LINE account — comes from components/omnicure/copy.ts and offices.ts,
// which carry the rule that nothing may be invented: an address on a
// distributor's site is an instruction to drive somewhere.

/** The models a Thai enquiry actually opens with, in the order they are asked for. */
const FEATURED = ["s2000-elite", "s1500-pro", "lx500", "ac9225-f"];

const LOCAL_POINTS: { icon: typeof PackageCheck; title: LangText; body: LangText }[] = [
  {
    icon: PackageCheck,
    title: { en: "Bangkok stock", zh: "曼谷现货", th: "สต็อกในกรุงเทพฯ", vi: "Hàng sẵn tại Bangkok" },
    body: {
      en: "Lamps, filter cartridges and light guides on the shelf, not on a boat.",
      zh: "灯管、滤片与导光管在本地货架上，而不是在船上。",
      th: "หลอด ฟิลเตอร์ และท่อนำแสงอยู่บนชั้นวางในประเทศ ไม่ใช่บนเรือ",
      vi: "Đèn, kính lọc và ống dẫn sáng có sẵn trong kho, không phải đang trên tàu.",
    },
  },
  {
    icon: Wrench,
    title: { en: "On-site service", zh: "现场服务", th: "บริการหน้างาน", vi: "Dịch vụ tại hiện trường" },
    body: {
      en: "Installation, fault finding and repair coordination from the Bangkok team.",
      zh: "由曼谷团队提供安装、故障排查与维修协调。",
      th: "การติดตั้ง การหาสาเหตุขัดข้อง และการประสานงานซ่อมโดยทีมกรุงเทพฯ",
      vi: "Lắp đặt, tìm lỗi và điều phối sửa chữa từ đội ngũ Bangkok.",
    },
  },
  {
    icon: Gauge,
    title: { en: "Radiometer calibration", zh: "辐射计校准", th: "สอบเทียบเครื่องวัดรังสี", vi: "Hiệu chuẩn thiết bị đo" },
    body: {
      en: "Keep dose traceable across lines, and prove it during an audit.",
      zh: "让各产线的剂量可追溯，审核时拿得出依据。",
      th: "รักษาปริมาณรังสีให้ตรวจสอบย้อนกลับได้ทุกสายการผลิต และพิสูจน์ได้เมื่อมีการตรวจสอบ",
      vi: "Giữ liều lượng truy xuất được trên mọi dây chuyền, và chứng minh được khi bị kiểm tra.",
    },
  },
  {
    icon: GraduationCap,
    title: { en: "Thai-language support", zh: "泰语支持", th: "สนับสนุนเป็นภาษาไทย", vi: "Hỗ trợ tiếng Thái" },
    body: {
      en: "Operator training and day-to-day support in Thai as well as English.",
      zh: "操作培训与日常支持可用泰语，也可用英语。",
      th: "อบรมผู้ใช้งานและสนับสนุนประจำวันทั้งภาษาไทยและอังกฤษ",
      vi: "Đào tạo vận hành và hỗ trợ hằng ngày bằng tiếng Thái lẫn tiếng Anh.",
    },
  },
];

export default function OmniCureThailandView() {
  const { locale } = useLocale();
  const featured = FEATURED.map((slug) => products.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );
  const quoteMail = inquiryMailto(locale, {
    subject: "OmniCure Thailand — Quote Request",
    context: "OmniCure system / part for a site in Thailand",
  });

  return (
    <div className="bg-white text-[#102038]">
      {/* Hero */}
      <section className="relative border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-[#1A56DB]/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm">
            <MapPin className="h-4 w-4" />
            {t({ en: "Bangkok · Thailand", zh: "曼谷 · 泰国", th: "กรุงเทพฯ · ประเทศไทย", vi: "Bangkok · Thái Lan" }, locale)}
          </span>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-[#143C96] md:text-5xl">
            {t(
              {
                en: "OmniCure UV Curing Systems in Thailand",
                zh: "OmniCure 紫外线固化系统 · 泰国",
                th: "ระบบ UV Curing OmniCure ในประเทศไทย",
                vi: "Hệ thống UV Curing OmniCure tại Thái Lan",
              },
              locale
            )}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#475467] md:text-lg">
            {t(
              {
                en: "ETIATECH (THAILAND) Co., Ltd. supplies genuine OmniCure spot and area curing systems through authorized channels, with stock held in Bangkok and engineers who install, train and service on site.",
                zh: "ETIATECH (THAILAND) Co., Ltd. 通过授权渠道供应 OmniCure 点光源与面光源固化系统原厂正品，曼谷备有现货，工程师提供现场安装、培训与维护。",
                th: "บริษัท อีเทียเทค (ไทยแลนด์) จำกัด จัดจำหน่ายระบบบ่มแบบจุดและแบบพื้นที่ของ OmniCure ของแท้ผ่านช่องทางที่ได้รับอนุญาต มีสต็อกในกรุงเทพฯ และวิศวกรที่ติดตั้ง อบรม และบริการหน้างาน",
                vi: "ETIATECH (THAILAND) Co., Ltd. cung cấp hệ thống đóng rắn điểm và diện tích OmniCure chính hãng qua kênh được ủy quyền, có sẵn hàng tại Bangkok cùng kỹ sư lắp đặt, đào tạo và bảo trì tại chỗ.",
              },
              locale
            )}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={quoteMail}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]"
            >
              {t({ en: "Request a Quote", zh: "索取报价", th: "ขอใบเสนอราคา", vi: "Yêu cầu báo giá" }, locale)}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={CONTACT.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D9E4EA] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:border-[#06C755] hover:text-[#06C755]"
            >
              <MessageCircle className="h-4 w-4" />
              {t({ en: "Chat on LINE", zh: "通过 LINE 咨询", th: "แชททาง LINE", vi: "Nhắn tin qua LINE" }, locale)}
            </a>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* What "local" actually means */}
      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-[#143C96] md:text-3xl">
            {t(
              {
                en: "What local support means here",
                zh: "本地支持具体指什么",
                th: "การสนับสนุนในพื้นที่หมายถึงอะไร",
                vi: "Hỗ trợ tại chỗ nghĩa là gì",
              },
              locale
            )}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {LOCAL_POINTS.map((p) => (
              <div key={p.title.en} className="rounded-2xl border border-[#D9E4EA] bg-white p-5">
                <p.icon className="h-6 w-6 text-[#1A56DB]" strokeWidth={1.8} />
                <h3 className="mt-3 text-sm font-bold text-[#102A43]">{t(p.title, locale)}</h3>
                <p className="mt-1.5 text-xs leading-6 text-[#667085]">{t(p.body, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The models most often asked for. The catalogue itself stays on
          /product/omnicure — this is a shortlist that links into it. */}
      <section className="border-t border-[#D9E4EA] bg-[#F7FAFC] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-[#143C96] md:text-3xl">
            {t(
              { en: "Most asked for in Thailand", zh: "泰国最常询的机型", th: "รุ่นที่ถูกถามถึงมากที่สุดในไทย", vi: "Được hỏi nhiều nhất tại Thái Lan" },
              locale
            )}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => {
              const lp = localizeProduct(p, locale);
              const img = productImage(p);
              return (
                <Link
                  key={p.slug}
                  href={localizeHref(productHref(p), locale)}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#D9E4EA] bg-white transition hover:border-[#1A56DB]/40 hover:shadow-lg"
                >
                  <div className="relative aspect-video bg-[#F7FAFC]">
                    {img && (
                      <Image
                        src={img}
                        alt={lp.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-contain p-4 transition duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-sm font-bold leading-snug text-[#102A43] group-hover:text-[#1A56DB]">{lp.name}</h3>
                    <span className="mt-auto pt-3 text-xs font-bold text-[#1A56DB]">
                      {t({ en: "View", zh: "查看", th: "ดูรายละเอียด", vi: "Xem" }, locale)} →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={localizeHref("/product/omnicure", locale)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#D9E4EA] bg-white px-4 py-2.5 text-sm font-bold text-[#143C96] transition hover:border-[#1A56DB]/40"
            >
              {t({ en: "Full OmniCure catalogue", zh: "OmniCure 全系列", th: "แคตตาล็อก OmniCure ทั้งหมด", vi: "Toàn bộ danh mục OmniCure" }, locale)}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={localizeHref(consumablesHref(), locale)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#D9E4EA] bg-white px-4 py-2.5 text-sm font-bold text-[#087F6B] transition hover:border-[#087F6B]/40"
            >
              {t(
                { en: "Lamps & spare parts by model", zh: "按机型查灯管与备件", th: "หลอดและอะไหล่ตามรุ่น", vi: "Đèn & phụ tùng theo model" },
                locale
              )}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bangkok office — only details ETIA has confirmed. */}
      <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold text-[#143C96] md:text-3xl">
              {t({ en: "Talk to the Bangkok team", zh: "联系曼谷团队", th: "ติดต่อทีมกรุงเทพฯ", vi: "Liên hệ đội ngũ Bangkok" }, locale)}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#475467]">
              {t(
                {
                  en: "Tell us the adhesive, the cure area and the wavelength — or just send the part number off the label and we will confirm what it is and whether it is on the shelf.",
                  zh: "告诉我们胶粘剂、固化面积与波长——或者直接把标签上的料号发来，我们确认是什么、有没有现货。",
                  th: "แจ้งกาว พื้นที่บ่ม และความยาวคลื่น — หรือส่งรหัสอะไหล่จากฉลากมา แล้วเราจะยืนยันว่าคืออะไรและมีสต็อกหรือไม่",
                  vi: "Cho chúng tôi biết loại keo, diện tích đóng rắn và bước sóng — hoặc chỉ cần gửi mã phụ tùng trên nhãn, chúng tôi sẽ xác nhận đó là gì và còn hàng hay không.",
                },
                locale
              )}
            </p>
          </div>
          <div className="rounded-2xl border border-[#D9E4EA] bg-white p-6">
            <p className="text-sm font-bold text-[#102A43]">{t({ en: "ETIATECH (THAILAND) Co., Ltd.", zh: "ETIATECH (THAILAND) Co., Ltd.", th: "บริษัท อีเทียเทค (ไทยแลนด์) จำกัด", vi: "ETIATECH (THAILAND) Co., Ltd." }, locale)}</p>
            <ul className="mt-4 space-y-3 text-sm text-[#475467]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#98A2B3]" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#98A2B3]" />
                <a href={`tel:${CONTACT.phoneHref}`} className="font-semibold text-[#1A56DB] hover:underline">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#98A2B3]" />
                <a href={`mailto:${localeSalesEmail(locale)}`} className="font-semibold text-[#1A56DB] hover:underline">
                  {localeSalesEmail(locale)}
                </a>
              </li>
              <li className="flex gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#98A2B3]" />
                <a href={CONTACT.lineUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#06C755] hover:underline">
                  LINE {CONTACT.lineId}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ — same copy the page's FAQPage structured data uses. */}
      <section className="border-t border-[#D9E4EA] bg-[#F7FAFC] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-[#143C96] md:text-3xl">
            {t({ en: "Frequently asked", zh: "常见问题", th: "คำถามที่พบบ่อย", vi: "Câu hỏi thường gặp" }, locale)}
          </h2>
          <dl className="mt-8 space-y-6">
            {TH_FAQ.map((f) => (
              <div key={f.q.en} className="rounded-2xl border border-[#D9E4EA] bg-white p-5">
                <dt className="text-sm font-bold text-[#102A43]">{t(f.q, locale)}</dt>
                <dd className="mt-2 text-sm leading-7 text-[#667085]">{t(f.a, locale)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FinalCta
        heading={t(
          {
            en: "Need an OmniCure system or part in Thailand?",
            zh: "在泰国需要 OmniCure 设备或备件？",
            th: "ต้องการระบบหรืออะไหล่ OmniCure ในประเทศไทย?",
            vi: "Cần hệ thống hoặc phụ tùng OmniCure tại Thái Lan?",
          },
          locale
        )}
        body={t(
          {
            en: "Send us your process or your part number. The Bangkok team will confirm the configuration, the stock position and the lead time.",
            zh: "把您的工艺或料号发给我们。曼谷团队会确认配置、库存与交期。",
            th: "ส่งกระบวนการหรือรหัสอะไหล่ของคุณมา ทีมกรุงเทพฯ จะยืนยันการกำหนดค่า สถานะสต็อก และระยะเวลาส่งมอบ",
            vi: "Gửi cho chúng tôi quy trình hoặc mã phụ tùng của bạn. Đội ngũ Bangkok sẽ xác nhận cấu hình, tình trạng hàng và thời gian giao.",
          },
          locale
        )}
        primary={{
          label: t({ en: "Request a Quote", zh: "索取报价", th: "ขอใบเสนอราคา", vi: "Yêu cầu báo giá" }, locale),
          href: quoteMail,
        }}
        secondary={{
          label: t({ en: "Send an inquiry", zh: "发送询单", th: "ส่งคำขอ", vi: "Gửi yêu cầu" }, locale),
          href: localizeHref("/inquiry", locale),
        }}
      />
    </div>
  );
}
