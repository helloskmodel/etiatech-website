"use client";
import { useState } from "react";
import { useLocale, t, type Locale } from "@/components/LocaleContext";
import TrustStrip from "@/components/TrustStrip";
import SalesSupportContent from "@/components/SalesSupportContent";
import { BadgeCheck, Mail, Wrench, Globe, Zap } from "lucide-react";

function ContactForm({ fields, locale }: { fields: string[]; locale: Locale }) {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) {
    return (
      <div className="rounded-2xl p-8 text-center border border-gray-100 bg-white">
        <div className="text-4xl mb-3">✅</div>
        <p className="font-semibold" style={{ color: "#1A56DB" }}>{t({ en: "Message Sent!", zh: "信息已发送!" }, locale)}</p>
        <p className="text-gray-500 text-sm mt-1">{t({ en: "We'll get back to you within 1 business day.", zh: "我们将在1个工作日内回复您。" }, locale)}</p>
      </div>
    );
  }
  const fieldLabel = (f: string) =>
    f === "Industry" ? t({ en: "Industry", zh: "行业" }, locale)
    : f === "Request Type" ? t({ en: "Request Type", zh: "请求类型" }, locale)
    : f;
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500 block mb-1">{t({ en: "Name *", zh: "姓名 *" }, locale)}</label>
          <input type="text" required placeholder={t({ en: "Your name", zh: "您的姓名" }, locale)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#1A56DB] placeholder-gray-300" />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">{t({ en: "Company", zh: "公司" }, locale)}</label>
          <input type="text" placeholder={t({ en: "Company name", zh: "公司名称" }, locale)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#1A56DB] placeholder-gray-300" />
        </div>
      </div>
      <div>
        <label className="text-xs text-gray-500 block mb-1">{t({ en: "Email *", zh: "邮箱 *" }, locale)}</label>
        <input type="email" required placeholder="your@email.com"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#1A56DB] placeholder-gray-300" />
      </div>
      {fields.map((f) => (
        <div key={f}>
          <label className="text-xs text-gray-500 block mb-1">{fieldLabel(f)}</label>
          <select className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm focus:outline-none focus:border-[#1A56DB]">
            <option value="">{t({ en: "Select…", zh: "请选择…" }, locale)}</option>
            {f === "Industry" && ["Medical Device Assembly", "Automotive & ADAS", "Electronics & PCB Assembly", "Photonics & Advanced Packaging", "Optical Fiber & Cable Manufacturing", "Optics & Imaging Systems", "Printing & Graphic Arts", "Wood & Furniture Coatings", "Metal & Industrial Coatings", "Aerospace & Defense", "Other"].map((o) => <option key={o}>{o}</option>)}
            {f === "Request Type" && ["Equipment Repair", "Radiometer Calibration", "Preventive Maintenance", "Spare Parts", "Other"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
      ))}
      <div>
        <label className="text-xs text-gray-500 block mb-1">{t({ en: "Message *", zh: "留言 *" }, locale)}</label>
        <textarea required rows={4} placeholder={t({ en: "Describe your requirements…", zh: "请描述您的需求…" }, locale)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#1A56DB] placeholder-gray-300 resize-none" />
      </div>
      <button type="submit" className="w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#1A56DB" }}>
        {t({ en: "Submit →", zh: "提交 →" }, locale)}
      </button>
    </form>
  );
}

export default function ContactPage() {
  const { locale } = useLocale();
  const salesItems = [
    { icon: "🔬", title: { en: "Product Inquiry", zh: "产品咨询" }, desc: { en: "Explore OmniCure, Phoseon, Fusion and NobleLight systems matched to your process.", zh: "探索匹配您工艺的OmniCure、Phoseon、Fusion与NobleLight系统。" } },
    { icon: "⚗️", title: { en: "Application Consulting", zh: "应用咨询" }, desc: { en: "Validate your UV curing process — from adhesive selection to dose and irradiance testing.", zh: "验证您的UV光固化工艺——从胶粘剂选型到剂量与辐照度测试。" } },
    { icon: "🛠️", title: { en: "Custom Engineering", zh: "定制工程" }, desc: { en: "Need a non-standard configuration? We engineer bespoke solutions for complex production lines.", zh: "需要非标配置? 我们为复杂产线打造定制化解决方案。" } },
  ];
  const serviceItems = [
    { icon: "⚙️", title: { en: "Equipment Repair", zh: "设备维修" }, desc: { en: "Fast diagnosis and repair of OmniCure, Phoseon, and all supported UV systems. Urgent production issues are prioritized.", zh: "快速诊断与维修OmniCure、Phoseon及所有支持的UV系统。紧急生产问题优先处理。" } },
    { icon: "📡", title: { en: "Radiometer Calibration", zh: "辐射计校准" }, desc: { en: "NIST-traceable calibration for R2000, LS200 and third-party radiometers. Calibration certificate provided.", zh: "为R2000、LS200及第三方辐射计提供NIST溯源校准，并出具校准证书。" } },
    { icon: "🔩", title: { en: "Preventive Maintenance", zh: "预防性保养" }, desc: { en: "Scheduled maintenance programs to extend equipment life and prevent unexpected failures on production lines.", zh: "定期保养计划，延长设备寿命，防止产线意外故障。" } },
  ];
  const offices: {
    region: { en: string; zh: string };
    contact?: string;
    title?: { en: string; zh: string };
    phone?: string;
    email: string;
    local?: string;
    en?: string;
  }[] = [
    { region: { en: "China · Shanghai", zh: "中国 · 上海" }, contact: "Mark Tang", phone: "400 990 8448 · +86-21-6432-7144 转106", email: "mark_tang@etia-tech.com", local: "上海市普陀区中江路388弄国盛中心2号楼1903室", en: "Rm. 1903, 2# Building, Guoson Centre, No. 388 Zhongjiang Rd, Putuo District, Shanghai, China" },
    { region: { en: "Hong Kong", zh: "中国 · 香港" }, contact: "Mark Tang", phone: "+86 151 2119 7091", email: "mark_tang@etia-tech.com", en: "Room 1003, 10/F, Tower 1, Lippo Centre, 89 Queensway, Admiralty, Hong Kong" },
    { region: { en: "Thailand · Bangkok", zh: "泰国 · 曼谷" }, contact: "Mr. Sompoch Ratchakom (Job)", title: { en: "Sales Director", zh: "销售总监" }, phone: "+66 811 746 947", email: "sompoch@etia-tech.com", local: "22/41 เอช-เคป บิซ เซ็นเตอร์ ถนนสุขาภิบาล 2 แขวงประเวศ เขตประเวศ กรุงเทพฯ 10250", en: "22/41 H-Cape Biz Center, Sukhaphiban 2 Road, Prawet Subdistrict, Prawet District, Bangkok 10250, Thailand" },
    { region: { en: "Vietnam · Bac Ninh", zh: "越南 · 北宁" }, contact: "Tien Nguyen", title: { en: "Technical Engineer", zh: "技术工程师" }, phone: "+84 344 590 091", email: "ts_vn@etia-tech.com", local: "Số 10 đường Thanh Niên, Khu 5, Phường Võ Cường, Tỉnh Bắc Ninh, Việt Nam", en: "No. 10 Thanh Nien Street, Area 5, Vo Cuong Ward, Bac Ninh Province, Viet Nam" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#D9E4EA] bg-gradient-to-br from-white via-[#EEF6FF] to-[#F1FAEF]">
        <div className="absolute -right-36 -top-36 h-[34rem] w-[34rem] rounded-full bg-[#1F63D6]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-[#63C94A]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#41A62A]/20 bg-white px-3 py-1.5 text-xs font-bold text-[#41A62A] shadow-sm"><BadgeCheck className="h-4 w-4" /> {t({ en: "Sales & Support", zh: "销售与支持" }, locale)}</div>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-6xl">{t({ en: "Dedicated UV Curing Solution", zh: "专属UV光固化方案", th: "โซลูชัน UV Curing เฉพาะทาง", vi: "Giải pháp UV Curing chuyên biệt" }, locale)}<span className="mt-2 block text-2xl font-bold text-[#41A62A] md:text-4xl">{t({ en: "We Support You Every Step of the Way.", zh: "全程为您提供支持", th: "เราสนับสนุนคุณในทุกขั้นตอน", vi: "Chúng tôi hỗ trợ bạn trong từng bước." }, locale)}</span></h1>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#sales" className="inline-flex items-center justify-center rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]">{t({ en: "Talk to an ETIA Engineer", zh: "咨询 ETIA 工程师" }, locale)}</a>
              <a href="#service" className="inline-flex items-center justify-center rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:-translate-y-0.5 hover:border-[#143C96] hover:text-[#1F63D6]">{t({ en: "Request Service Support", zh: "申请服务支持" }, locale)}</a>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      <SalesSupportContent />

      {/* Part 1 — Sales Inquiry */}
      <section id="sales" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Part 1", zh: "第一部分" }, locale)}</p>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A56DB" }}>{t({ en: "Sales Inquiry", zh: "销售咨询" }, locale)}</h2>
              <div className="w-10 h-1 rounded mb-6" style={{ background: "#44B549" }} />
              <p className="text-gray-500 mb-8 leading-relaxed">
                {t({ en: "Looking for the right UV curing system? Our engineers will evaluate your application, recommend the best solution, and support you through the entire selection process.", zh: "在寻找合适的UV光固化系统? 我们的工程师将评估您的应用、推荐最佳方案，并在整个选型过程中为您提供支持。" }, locale)}
              </p>
              <div className="flex flex-col gap-4">
                {salesItems.map((item) => (
                  <div key={item.title.en} className="flex gap-4">
                    <div className="text-2xl mt-0.5">{item.icon}</div>
                    <div>
                      <p className="font-semibold text-sm mb-1" style={{ color: "#1A56DB" }}>{t(item.title, locale)}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{t(item.desc, locale)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 rounded-xl border border-gray-100 bg-gray-50">
                <p className="text-xs text-gray-400 mb-1">{t({ en: "Direct Email", zh: "直接邮箱" }, locale)}</p>
                <a href="mailto:mark_tang@etia-tech.com" className="font-semibold hover:underline" style={{ color: "#44B549" }}>
                  mark_tang@etia-tech.com
                </a>
              </div>
            </div>
            <div className="rounded-2xl p-8 border border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-lg mb-6" style={{ color: "#1A56DB" }}>{t({ en: "Send a Sales Inquiry", zh: "发送销售咨询" }, locale)}</h3>
              <ContactForm fields={["Industry"]} locale={locale} />
            </div>
          </div>
        </div>
      </section>

      {/* Part 2 — Service & Repair */}
      <section id="service" className="py-20" style={{ background: "#f0f4f8" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Part 2", zh: "第二部分" }, locale)}</p>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A56DB" }}>{t({ en: "Service & Repair", zh: "服务与维修" }, locale)}</h2>
              <div className="w-10 h-1 rounded mb-6" style={{ background: "#44B549" }} />
              <p className="text-gray-500 mb-8 leading-relaxed">
                {t({ en: "Our in-house repair factory and certified technicians keep your UV curing equipment running at peak performance — minimizing downtime and maximizing production reliability.", zh: "我们的自有维修工厂与认证技术人员让您的UV光固化设备保持最佳性能——最大限度减少停机，最大化生产可靠性。" }, locale)}
              </p>
              <div className="flex flex-col gap-4">
                {serviceItems.map((item) => (
                  <div key={item.title.en} className="flex gap-4">
                    <div className="text-2xl mt-0.5">{item.icon}</div>
                    <div>
                      <p className="font-semibold text-sm mb-1" style={{ color: "#1A56DB" }}>{t(item.title, locale)}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{t(item.desc, locale)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 rounded-xl border border-gray-100 bg-white">
                <p className="text-xs text-gray-400 mb-1">{t({ en: "Service Email (Technical Manager)", zh: "服务邮箱(技术经理)" }, locale)}</p>
                <a href="mailto:guoren_wang@etia-tech.com" className="font-semibold hover:underline" style={{ color: "#44B549" }}>
                  guoren_wang@etia-tech.com
                </a>
              </div>
            </div>
            <div className="rounded-2xl p-8 border border-gray-100 bg-white">
              <h3 className="font-semibold text-lg mb-6" style={{ color: "#1A56DB" }}>{t({ en: "Submit a Service Request", zh: "提交服务请求" }, locale)}</h3>
              <ContactForm fields={["Request Type"]} locale={locale} />
            </div>
          </div>
        </div>
      </section>

      {/* Part 3 — Global Contacts */}
      <section id="global" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Part 3", zh: "第三部分" }, locale)}</p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A56DB" }}>{t({ en: "Global Contacts", zh: "全球联系" }, locale)}</h2>
          <div className="w-10 h-1 rounded mb-10" style={{ background: "#44B549" }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {offices.map((c) => (
              <div key={c.email} className="rounded-xl border border-gray-100 bg-gray-50 p-5 hover:shadow-md transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold" style={{ color: "#1A56DB" }}>{t(c.region, locale)}</span>
                </div>
                {c.contact && (
                  <p className="text-xs text-gray-600 mb-1">
                    <span className="font-semibold">{c.contact}</span>
                    {c.title && <span className="text-gray-400"> · {t(c.title, locale)}</span>}
                  </p>
                )}
                {c.local && (
                  <p className="text-xs text-gray-500 leading-relaxed mb-1">📍 {c.local}</p>
                )}
                {c.en && (
                  <p className="text-xs text-gray-400 leading-relaxed mb-2">{c.en}</p>
                )}
                {c.phone && (
                  <p className="text-xs text-gray-600 mb-1">📞 <a href={`tel:${c.phone.split("·")[0].replace(/[^\d+]/g, "")}`} className="hover:underline">{c.phone}</a></p>
                )}
                <a href={`mailto:${c.email}`} className="text-xs hover:underline" style={{ color: "#44B549" }}>{c.email}</a>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-6">{t({ en: "* Contact us by email for the fastest response — our team typically replies within one business day.", zh: "* 通过邮件联系我们可获得最快响应——我们的团队通常在1个工作日内回复。" }, locale)}</p>
        </div>
      </section>

      {/* Authorized Distributor Certificates */}
      <section id="certificates" className="py-20" style={{ background: "#f5f7fa" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Authorized Distributor", zh: "授权代理" }, locale)}</p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A56DB" }}>{t({ en: "Officially Authorized Across Asia-Pacific", zh: "亚太地区官方授权" }, locale)}</h2>
          <div className="w-10 h-1 rounded mb-6" style={{ background: "#44B549" }} />
          <p className="text-gray-500 max-w-3xl">{t({ en: "ETIA is an officially authorized distributor — your guarantee of genuine products, valid warranty, and factory-backed technical support. Authorization certificates are available on request during the sales and qualification process.", zh: "ETIA 为官方授权代理商——正品保证、质保有效、并享原厂技术支持。授权证书可在销售与资质审核过程中应要求提供。" }, locale)}</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#143C96] to-[#1F63D6] px-6 py-14 text-center text-white sm:px-10">
            <Zap className="mx-auto h-9 w-9 text-[#8BE172]" />
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-bold md:text-4xl">{t({ en: "Ready to build a reliable UV curing process?", zh: "准备好构建可靠的 UV 光固化工艺了吗？" }, locale)}</h2>
            <p className="mx-auto mt-5 max-w-3xl leading-7 text-blue-100">{t({ en: "Tell us your application, adhesive, curing area, wavelength, and production requirements. ETIA engineers help you select, implement, and maintain the right UV curing system — with local support across China and Southeast Asia.", zh: "告诉我们您的应用、胶粘剂、固化面积、波长与生产需求。ETIA 工程师协助您选型、导入并维护合适的 UV 光固化系统——并在中国与东南亚提供本地支持。" }, locale)}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a href="#sales" className="inline-flex items-center justify-center rounded-xl bg-[#44B549] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#3A9D3F]">{t({ en: "Talk to an ETIA Engineer", zh: "咨询 ETIA 工程师" }, locale)}</a>
              <a href="#service" className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/70">{t({ en: "Request Service Support", zh: "申请服务支持" }, locale)}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
