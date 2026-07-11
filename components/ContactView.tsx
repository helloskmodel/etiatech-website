"use client";
import { useState } from "react";
import { useLocale, t, type Locale, type LangText } from "@/components/LocaleContext";
import TrustStrip from "@/components/TrustStrip";
import SalesSupportContent from "@/components/SalesSupportContent";
import HeroBanner from "@/components/HeroBanner";
import { PAGE_BANNERS } from "@/components/caseStudies";
import { inquiryMailto, localeSalesEmail } from "@/components/contact";
import { BadgeCheck, Zap, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

// The three lifecycle stages, used as the single inquiry-type selector. The
// recipient follows the visitor's country (localeSalesEmail); the stage only
// sets the email subject/context.
const INQUIRY_STAGES: { label: LangText; subject: string; context: string }[] = [
  {
    label: { en: "Before Purchase · Selection & Application", zh: "购买前 · 选型与应用", th: "ก่อนการซื้อ · การเลือกและการใช้งาน", vi: "Trước khi mua · Lựa chọn & ứng dụng" },
    subject: "Sales Inquiry — Selection & Application",
    context: "Before Purchase — Selection & Application",
  },
  {
    label: { en: "During Implementation · Setup & Training", zh: "实施中 · 安装与培训", th: "ระหว่างการติดตั้งใช้งาน · การติดตั้งและการฝึกอบรม", vi: "Trong triển khai · Lắp đặt & đào tạo" },
    subject: "Implementation Support — Setup & Training",
    context: "During Implementation — Setup & Training",
  },
  {
    label: { en: "After Sales · Service & Repair", zh: "售后 · 服务与维修", th: "หลังการขาย · บริการและการซ่อม", vi: "Sau bán hàng · Dịch vụ & sửa chữa" },
    subject: "After-Sales Service & Repair Request",
    context: "After Sales — Service & Repair",
  },
];

export default function ContactView() {
  const { locale } = useLocale();
  const [stage, setStage] = useState(0);
  const selected = INQUIRY_STAGES[stage];
  const inquiryEmail = localeSalesEmail(locale);
  const inquiryHref = inquiryMailto(locale, { subject: selected.subject, context: selected.context });

  const offices: {
    region: { en: string; zh: string; th?: string; vi?: string };
    contact?: string;
    title?: { en: string; zh: string; th?: string; vi?: string };
    phone?: string;
    email: string;
    local?: string;
    en?: string;
  }[] = [
    { region: { en: "China · Shanghai", zh: "中国 · 上海", th: "จีน · เซี่ยงไฮ้", vi: "Trung Quốc · Thượng Hải" }, contact: "Mark Tang", phone: "400 990 8448 · +86-21-6432-7144 转106", email: "Omnicure@etia-tech.com", local: "上海市普陀区中江路388弄国盛中心2号楼1903室", en: "Rm. 1903, 2# Building, Guoson Centre, No. 388 Zhongjiang Rd, Putuo District, Shanghai, China" },
    { region: { en: "Hong Kong", zh: "中国 · 香港", th: "จีน · ฮ่องกง", vi: "Trung Quốc · Hồng Kông" }, contact: "Mark Tang", phone: "+86 151 2119 7091", email: "Omnicure@etia-tech.com", en: "Room 1003, 10/F, Tower 1, Lippo Centre, 89 Queensway, Admiralty, Hong Kong" },
    { region: { en: "Thailand · Bangkok", zh: "泰国 · 曼谷", th: "ไทย · กรุงเทพฯ", vi: "Thái Lan · Bangkok" }, contact: "Mr. Sompoch Ratchakom (Job)", title: { en: "Sales Director", zh: "销售总监", th: "ผู้อำนวยการฝ่ายขาย", vi: "Giám đốc kinh doanh" }, phone: "+66 811 746 947", email: "omnicure.th@gmail.com", local: "22/41 เอช-เคป บิซ เซ็นเตอร์ ถนนสุขาภิบาล 2 แขวงประเวศ เขตประเวศ กรุงเทพฯ 10250", en: "22/41 H-Cape Biz Center, Sukhaphiban 2 Road, Prawet Subdistrict, Prawet District, Bangkok 10250, Thailand" },
    { region: { en: "Vietnam · Bac Ninh", zh: "越南 · 北宁", th: "เวียดนาม · บั๊กนิญ", vi: "Việt Nam · Bắc Ninh" }, contact: "Tien Nguyen", title: { en: "Technical Engineer", zh: "技术工程师", th: "วิศวกรเทคนิค", vi: "Kỹ sư kỹ thuật" }, phone: "+84 344 590 091", email: "omnicure.vn@gmail.com", local: "Số 10 đường Thanh Niên, Khu 5, Phường Võ Cường, Tỉnh Bắc Ninh, Việt Nam", en: "No. 10 Thanh Nien Street, Area 5, Vo Cuong Ward, Bac Ninh Province, Viet Nam" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
        <HeroBanner src={PAGE_BANNERS.support} />
        <div className="absolute -right-36 -top-36 h-[34rem] w-[34rem] rounded-full bg-[#1F63D6]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#63C94A]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm"><BadgeCheck className="h-4 w-4" /> {t({ en: "Sales & Support", zh: "销售与支持", th: "ฝ่ายขายและบริการ", vi: "Kinh doanh & hỗ trợ" }, locale)}</div>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-6xl">{t({ en: "Dedicated UV Curing Solution", zh: "量身定制紫外线固化解决方案", th: "โซลูชัน UV Curing โดยผู้เชี่ยวชาญ", vi: "Giải pháp UV Curing chuyên sâu" }, locale)}<span className="mt-2 block text-2xl font-bold text-[#41A62A] md:text-4xl">{t({ en: "We Support You Every Step of the Way.", zh: "全程支持 服务到底", th: "สนับสนุนทุกขั้นตอน บริการระยะยาว", vi: "Hỗ trợ toàn trình, dịch vụ lâu dài" }, locale)}</span></h1>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#inquiries" className="inline-flex items-center justify-center rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]">{t({ en: "Talk to an ETIA Engineer", zh: "咨询 ETIA 工程师", th: "ปรึกษาวิศวกร ETIA", vi: "Trao đổi với kỹ sư ETIA" }, locale)}</a>
              <a href="#offices" className="inline-flex items-center justify-center rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:-translate-y-0.5 hover:border-[#143C96] hover:text-[#1F63D6]">{t({ en: "Find a Local Contact", zh: "查找本地联系人", th: "หาผู้ติดต่อในพื้นที่", vi: "Tìm liên hệ địa phương" }, locale)}</a>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <SalesSupportContent />
      {/* Inquiries — one section, three stages, email routed by country */}
      <section id="inquiries" className="scroll-mt-20 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-[#44B549]">{t({ en: "Inquiries", zh: "咨询", th: "การสอบถาม", vi: "Yêu cầu" }, locale)}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">{t({ en: "How can we help?", zh: "我们能帮您什么？", th: "เราช่วยอะไรคุณได้บ้าง?", vi: "Chúng tôi có thể giúp gì?" }, locale)}</h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-[#5F6C7B]">{t({ en: "Choose what you need and send us an email. Your message reaches the ETIA team for your country — we typically reply within one business day.", zh: "选择您的需求并给我们发邮件。您的信息会发送到所在国家的 ETIA 团队——我们通常在 1 个工作日内回复。", th: "เลือกสิ่งที่คุณต้องการแล้วส่งอีเมลถึงเรา ข้อความจะไปถึงทีม ETIA ในประเทศของคุณ โดยปกติเราตอบกลับภายในหนึ่งวันทำการ", vi: "Chọn nội dung bạn cần và gửi email cho chúng tôi. Tin nhắn sẽ đến đội ngũ ETIA tại quốc gia của bạn — chúng tôi thường trả lời trong vòng một ngày làm việc." }, locale)}</p>
          </div>

          <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-[#E6EAF0] bg-[#F6F8FB] p-6 sm:p-8">
            <label htmlFor="inquiry-stage" className="block text-xs font-bold uppercase tracking-wide text-[#1A56DB]">{t({ en: "Inquiry type", zh: "咨询类型", th: "ประเภทการสอบถาม", vi: "Loại yêu cầu" }, locale)}</label>
            <select
              id="inquiry-stage"
              value={stage}
              onChange={(e) => setStage(Number(e.target.value))}
              className="mt-2 w-full rounded-xl border border-[#D4DFEC] bg-white px-4 py-3 text-sm font-semibold text-[#102A43] outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/15"
            >
              {INQUIRY_STAGES.map((s, i) => (
                <option key={s.subject} value={i}>{t(s.label, locale)}</option>
              ))}
            </select>

            <a href={inquiryHref} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]">
              <Mail className="h-4 w-4" /> {t({ en: "Send Email", zh: "发送邮件", th: "ส่งอีเมล", vi: "Gửi email" }, locale)} <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-center text-xs text-[#7B8794]">
              {t({ en: "Goes to", zh: "发送至", th: "ส่งถึง", vi: "Gửi đến" }, locale)}{" "}
              <a href={`mailto:${inquiryEmail}`} className="font-semibold text-[#44B549] hover:underline">{inquiryEmail}</a>
            </p>
          </div>
        </div>
      </section>

      {/* Global Contacts — by country */}
      <section id="offices" className="scroll-mt-20 bg-[#F6F8FB] py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#44B549]">{t({ en: "Global Contacts", zh: "全球联系", th: "ติดต่อทั่วโลก", vi: "Liên hệ toàn cầu" }, locale)}</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#102A43] md:text-4xl">{t({ en: "Talk to Your Local ETIA Team", zh: "联系您所在地区的 ETIA 团队", th: "ติดต่อทีม ETIA ในพื้นที่ของคุณ", vi: "Liên hệ đội ngũ ETIA địa phương" }, locale)}</h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {offices.map((c) => (
              <div key={c.en ?? c.email} className="rounded-2xl border border-[#E6EAF0] bg-white p-6 transition-all hover:shadow-md">
                <span className="font-bold text-[#1A56DB]">{t(c.region, locale)}</span>
                {c.contact && (
                  <p className="mt-2 text-xs text-gray-600">
                    <span className="font-semibold">{c.contact}</span>
                    {c.title && <span className="text-gray-400"> · {t(c.title, locale)}</span>}
                  </p>
                )}
                {c.local && (
                  <p className="mt-2 flex items-start gap-1.5 text-xs leading-relaxed text-gray-500"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400" /> {c.local}</p>
                )}
                {c.en && (
                  <p className="mt-1 text-xs leading-relaxed text-gray-400">{c.en}</p>
                )}
                {c.phone && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-600"><Phone className="h-3.5 w-3.5 text-gray-400" /> <a href={`tel:${c.phone.split("·")[0].replace(/[^\d+]/g, "")}`} className="hover:underline">{c.phone}</a></p>
                )}
                <p className="mt-2 flex items-center gap-1.5 text-xs"><Mail className="h-3.5 w-3.5 text-[#44B549]" /> <a href={`mailto:${c.email}`} className="font-semibold text-[#44B549] hover:underline">{c.email}</a></p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-gray-400">{t({ en: "* Contact us by email for the fastest response — our team typically replies within one business day.", zh: "* 通过邮件联系我们可获得快速响应——我们的团队通常在1个工作日内回复。", th: "* ติดต่อเราทางอีเมลเพื่อการตอบกลับที่รวดเร็ว — ทีมงานของเรามักตอบกลับภายในหนึ่งวันทำการ", vi: "* Liên hệ qua email để được phản hồi nhanh chóng — đội ngũ của chúng tôi thường trả lời trong vòng một ngày làm việc." }, locale)}</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#143C96] to-[#1F63D6] px-6 py-14 text-center text-white sm:px-10">
            <Zap className="mx-auto h-9 w-9 text-[#8BE172]" />
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold md:text-4xl">{t({ en: "Ready to build a reliable UV curing process?", zh: "准备好构建可靠的 UV Curing 紫外线固化工艺了吗？", th: "พร้อมสร้างกระบวนการ UV Curing ที่เชื่อถือได้แล้วหรือยัง?", vi: "Sẵn sàng xây dựng quy trình UV curing đáng tin cậy?" }, locale)}</h2>
            <p className="mx-auto mt-5 max-w-3xl leading-7 text-blue-100">{t({ en: "Tell us your application, adhesive, curing area, wavelength, and production requirements. ETIA engineers help you select, implement, and maintain the right UV curing system — with local support across China and Southeast Asia.", zh: "告诉我们您的应用、胶粘剂、固化面积、波长与生产需求。ETIA 工程师协助您选型、导入并维护合适的 UV Curing 紫外线固化系统——并在中国与东南亚提供本地支持。", th: "บอกเราเกี่ยวกับการใช้งาน กาว พื้นที่คิวริ่ง ความยาวคลื่น และความต้องการด้านการผลิตของคุณ วิศวกร ETIA ช่วยคุณเลือก ติดตั้ง และดูแลระบบ UV Curing ที่เหมาะสม พร้อมการสนับสนุนในพื้นที่ทั่วจีนและเอเชียตะวันออกเฉียงใต้", vi: "Cho chúng tôi biết ứng dụng, keo, diện tích đóng rắn, bước sóng và yêu cầu sản xuất của bạn. Kỹ sư ETIA giúp bạn chọn, triển khai và bảo trì hệ thống UV curing phù hợp — với hỗ trợ tại chỗ trên khắp Trung Quốc và Đông Nam Á." }, locale)}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#inquiries" className="inline-flex items-center justify-center rounded-xl bg-[#44B549] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#3A9D3F]">{t({ en: "Send an Inquiry", zh: "发送咨询", th: "ส่งคำสอบถาม", vi: "Gửi yêu cầu" }, locale)}</a>
              <a href="#offices" className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/70">{t({ en: "Find a Local Contact", zh: "查找本地联系人", th: "หาผู้ติดต่อในพื้นที่", vi: "Tìm liên hệ địa phương" }, locale)}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
