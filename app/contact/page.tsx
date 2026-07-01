"use client";
import { useState } from "react";
import Image from "next/image";
import { heroBannerImage } from "@/components/caseStudies";
import { useLocale, t, type Locale } from "@/components/LocaleContext";

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
    { icon: "⚗️", title: { en: "Application Consulting", zh: "应用咨询" }, desc: { en: "Validate your UV curing process — from adhesive selection to dose and irradiance testing.", zh: "验证您的UV固化工艺——从胶粘剂选型到剂量与辐照度测试。" } },
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
    { region: { en: "China · Shanghai", zh: "中国 · 上海" }, email: "13579@etia-tech.com", local: "上海市普陀区中江路388弄国盛中心2号楼1903室", en: "Rm. 1903, 2# Building, Guoson Centre, No. 388 Zhongjiang Rd, Putuo District, Shanghai, China" },
    { region: { en: "Hong Kong", zh: "中国 · 香港" }, email: "mark_tang@etia-tech.com", en: "Room 1003, 10/F, Tower 1, Lippo Centre, 89 Queensway, Admiralty, Hong Kong" },
    { region: { en: "Thailand · Bangkok", zh: "泰国 · 曼谷" }, contact: "Mr. Sompoch Ratchakom (Job)", title: { en: "Sales Director", zh: "销售总监" }, phone: "+66 811 746 947", email: "sompoch@etia-tech.com", local: "22/41 เอช-เคป บิซ เซ็นเตอร์ ถนนสุขาภิบาล 2 แขวงประเวศ เขตประเวศ กรุงเทพฯ 10250", en: "22/41 H-Cape Biz Center, Sukhaphiban 2 Road, Prawet Subdistrict, Prawet District, Bangkok 10250, Thailand" },
    { region: { en: "Vietnam · Bac Ninh", zh: "越南 · 北宁" }, contact: "Tien Nguyen", title: { en: "Technical Engineer", zh: "技术工程师" }, phone: "+84 344 590 091", email: "ts_vn@etia-tech.com", local: "Số 10 đường Thanh Niên, Khu 5, Phường Võ Cường, Tỉnh Bắc Ninh, Việt Nam", en: "No. 10 Thanh Nien Street, Area 5, Vo Cuong Ward, Bac Ninh Province, Viet Nam" },
  ];
  const bottomStrip = [
    { icon: "⚡", title: { en: "Fast Response", zh: "快速响应" }, desc: { en: "Within 1 business day", zh: "1个工作日内" } },
    { icon: "🔧", title: { en: "Expert Engineers", zh: "专业工程师" }, desc: { en: "20 years of UV curing expertise", zh: "20年UV固化经验" } },
    { icon: "📦", title: { en: "Local Stock", zh: "本地备货" }, desc: { en: "Ready for immediate delivery", zh: "随时即刻发货" } },
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-20 relative overflow-hidden" style={{ background: "#0f2444" }}>
        {heroBannerImage && <Image src={heroBannerImage} alt="" fill priority sizes="100vw" className="object-cover" />}
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(13,30,58,0.94) 0%, rgba(18,65,163,0.82) 50%, rgba(26,86,219,0.45) 100%)" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>{t({ en: "Sales & Support", zh: "销售与支持" }, locale)}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
            {t({ en: "Expert Guidance.", zh: "专业指导。" }, locale)}<br />
            <span style={{ color: "#44B549" }}>{t({ en: "We're Here to Help.", zh: "我们随时为您服务。" }, locale)}</span>
          </h1>
          <p className="text-base text-gray-200 mb-6">
            {t({ en: "From product selection and process advice to custom solutions and equipment service, ETIA's team helps customers get the right answer and keep production moving.", zh: "从产品选型、工艺建议到定制方案与设备服务，ETIA团队帮助客户找到正确答案，让生产持续运转。" }, locale)}
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: { en: "Sales Inquiry", zh: "销售咨询" }, href: "#sales" },
              { label: { en: "Service & Repair", zh: "服务与维修" }, href: "#service" },
              { label: { en: "Global Contacts", zh: "全球联系" }, href: "#global" },
            ].map((chip) => (
              <a key={chip.href} href={chip.href}
                className="text-xs px-4 py-2 rounded-full border border-white/30 text-gray-300 hover:border-white/60 hover:text-white transition-all">
                {t(chip.label, locale)}
              </a>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Part 1 — Sales Inquiry */}
      <section id="sales" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Part 1", zh: "第一部分" }, locale)}</p>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A56DB" }}>{t({ en: "Sales Inquiry", zh: "销售咨询" }, locale)}</h2>
              <div className="w-10 h-1 rounded mb-6" style={{ background: "#44B549" }} />
              <p className="text-gray-500 mb-8 leading-relaxed">
                {t({ en: "Looking for the right UV curing system? Our engineers will evaluate your application, recommend the best solution, and support you through the entire selection process.", zh: "在寻找合适的UV固化系统? 我们的工程师将评估您的应用、推荐最佳方案，并在整个选型过程中为您提供支持。" }, locale)}
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
                <a href="mailto:support@etiatech.com" className="font-semibold hover:underline" style={{ color: "#44B549" }}>
                  support@etiatech.com
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
                {t({ en: "Our in-house repair factory and certified technicians keep your UV curing equipment running at peak performance — minimizing downtime and maximizing production reliability.", zh: "我们的自有维修工厂与认证技术人员让您的UV固化设备保持最佳性能——最大限度减少停机，最大化生产可靠性。" }, locale)}
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
                  <p className="text-xs text-gray-600 mb-1">📞 <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="hover:underline">{c.phone}</a></p>
                )}
                <a href={`mailto:${c.email}`} className="text-xs hover:underline" style={{ color: "#44B549" }}>{c.email}</a>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-6">{t({ en: "* Contact us by email for the fastest response — our team typically replies within one business day.", zh: "* 通过邮件联系我们可获得最快响应——我们的团队通常在1个工作日内回复。" }, locale)}</p>
        </div>
      </section>

      {/* Bottom strip */}
      <section className="py-16" style={{ background: "#1A56DB" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {bottomStrip.map((item) => (
            <div key={item.title.en}>
              <div className="text-3xl mb-2">{item.icon}</div>
              <p className="font-semibold text-white">{t(item.title, locale)}</p>
              <p className="text-gray-400 text-sm">{t(item.desc, locale)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
