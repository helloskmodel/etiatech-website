"use client";
import { useState } from "react";
import { useLocale, t, type Locale } from "@/components/LocaleContext";
import TrustStrip from "@/components/TrustStrip";
import SalesSupportContent from "@/components/SalesSupportContent";
import HeroBanner from "@/components/HeroBanner";
import { PAGE_BANNERS } from "@/components/caseStudies";
import { BadgeCheck, Mail, Wrench, Globe, Zap } from "lucide-react";

function ContactForm({ fields, locale }: { fields: string[]; locale: Locale }) {
  const [submitted, setSubmitted] = useState(false);
  if (submitted) {
    return (
      <div className="rounded-2xl p-8 text-center border border-gray-100 bg-white">
        <div className="text-4xl mb-3">✅</div>
        <p className="font-semibold" style={{ color: "#1A56DB" }}>{t({ en: "Message Sent!", zh: "信息已发送!", th: "ส่งข้อความแล้ว!", vi: "Đã gửi tin nhắn!" }, locale)}</p>
        <p className="text-gray-500 text-sm mt-1">{t({ en: "We'll get back to you within 1 business day.", zh: "我们将在1个工作日内回复您。", th: "เราจะติดต่อกลับภายใน 1 วันทำการ", vi: "Chúng tôi sẽ phản hồi trong vòng 1 ngày làm việc." }, locale)}</p>
      </div>
    );
  }
  const fieldLabel = (f: string) =>
    f === "Industry" ? t({ en: "Industry", zh: "行业", th: "อุตสาหกรรม", vi: "Ngành" }, locale)
    : f === "Request Type" ? t({ en: "Request Type", zh: "请求类型", th: "ประเภทคำขอ", vi: "Loại yêu cầu" }, locale)
    : f;
  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-500 block mb-1">{t({ en: "Name *", zh: "姓名 *", th: "ชื่อ *", vi: "Tên *" }, locale)}</label>
          <input type="text" required placeholder={t({ en: "Your name", zh: "您的姓名", th: "ชื่อของคุณ", vi: "Tên của bạn" }, locale)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#1A56DB] placeholder-gray-300" />
        </div>
        <div>
          <label className="text-xs text-gray-500 block mb-1">{t({ en: "Company", zh: "公司", th: "บริษัท", vi: "Công ty" }, locale)}</label>
          <input type="text" placeholder={t({ en: "Company name", zh: "公司名称", th: "ชื่อบริษัท", vi: "Tên công ty" }, locale)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#1A56DB] placeholder-gray-300" />
        </div>
      </div>
      <div>
        <label className="text-xs text-gray-500 block mb-1">{t({ en: "Email *", zh: "邮箱 *", th: "อีเมล *", vi: "Email *" }, locale)}</label>
        <input type="email" required placeholder="your@email.com"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#1A56DB] placeholder-gray-300" />
      </div>
      {fields.map((f) => (
        <div key={f}>
          <label className="text-xs text-gray-500 block mb-1">{fieldLabel(f)}</label>
          <select className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm focus:outline-none focus:border-[#1A56DB]">
            <option value="">{t({ en: "Select…", zh: "请选择…", th: "เลือก…", vi: "Chọn…" }, locale)}</option>
            {f === "Industry" && ([
              { en: "Medical Device Assembly", zh: "医疗器械装配", th: "การประกอบอุปกรณ์การแพทย์", vi: "Lắp ráp thiết bị y tế" },
              { en: "Automotive & ADAS", zh: "汽车与 ADAS", th: "ยานยนต์และ ADAS", vi: "Ô tô & ADAS" },
              { en: "Electronics & PCB Assembly", zh: "电子与 PCB 装配", th: "อิเล็กทรอนิกส์และ PCB", vi: "Điện tử & PCB" },
              { en: "Photonics & Advanced Packaging", zh: "光子学与先进封装", th: "โฟโตนิกส์และแพ็กเกจขั้นสูง", vi: "Quang tử & đóng gói tiên tiến" },
              { en: "Optical Fiber & Cable Manufacturing", zh: "光纤与线缆制造", th: "การผลิตไฟเบอร์ออปติกและสายเคเบิล", vi: "Sản xuất sợi quang & cáp" },
              { en: "Optics & Imaging Systems", zh: "光学与成像系统", th: "ระบบออปติกและการถ่ายภาพ", vi: "Hệ thống quang học & hình ảnh" },
              { en: "Printing & Graphic Arts", zh: "印刷与图文", th: "งานพิมพ์และกราฟิก", vi: "In ấn & đồ họa" },
              { en: "Wood & Furniture Coatings", zh: "木器与家具涂装", th: "การเคลือบไม้และเฟอร์นิเจอร์", vi: "Sơn phủ gỗ & nội thất" },
              { en: "Metal & Industrial Coatings", zh: "金属与工业涂装", th: "การเคลือบโลหะและอุตสาหกรรม", vi: "Sơn phủ kim loại & công nghiệp" },
              { en: "Aerospace & Defense", zh: "航空航天与国防", th: "การบินและอวกาศและการป้องกันประเทศ", vi: "Hàng không vũ trụ & quốc phòng" },
              { en: "Other", zh: "其他", th: "อื่น ๆ", vi: "Khác" },
            ] as const).map((o) => <option key={o.en} value={o.en}>{t(o, locale)}</option>)}
            {f === "Request Type" && ([
              { en: "Equipment Repair", zh: "设备维修", th: "การซ่อมอุปกรณ์", vi: "Sửa chữa thiết bị" },
              { en: "Radiometer Calibration", zh: "辐射计校准", th: "การสอบเทียบเรดิโอมิเตอร์", vi: "Hiệu chuẩn máy đo bức xạ" },
              { en: "Preventive Maintenance", zh: "预防性保养", th: "การบำรุงรักษาเชิงป้องกัน", vi: "Bảo trì phòng ngừa" },
              { en: "Spare Parts", zh: "备件", th: "อะไหล่", vi: "Phụ tùng" },
              { en: "Other", zh: "其他", th: "อื่น ๆ", vi: "Khác" },
            ] as const).map((o) => <option key={o.en} value={o.en}>{t(o, locale)}</option>)}
          </select>
        </div>
      ))}
      <div>
        <label className="text-xs text-gray-500 block mb-1">{t({ en: "Message *", zh: "留言 *", th: "ข้อความ *", vi: "Tin nhắn *" }, locale)}</label>
        <textarea required rows={4} placeholder={t({ en: "Describe your requirements…", zh: "请描述您的需求…", th: "อธิบายความต้องการของคุณ…", vi: "Mô tả yêu cầu của bạn…" }, locale)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-[#1A56DB] placeholder-gray-300 resize-none" />
      </div>
      <button type="submit" className="w-full py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-all" style={{ background: "#1A56DB" }}>
        {t({ en: "Submit →", zh: "提交 →", th: "ส่ง →", vi: "Gửi →" }, locale)}
      </button>
    </form>
  );
}

export default function ContactPage() {
  const { locale } = useLocale();
  const salesItems = [
    { icon: "🔬", title: { en: "Product Inquiry", zh: "产品咨询", th: "สอบถามผลิตภัณฑ์", vi: "Tư vấn sản phẩm" }, desc: { en: "Explore OmniCure, Phoseon, Fusion and NobleLight systems matched to your process.", zh: "探索匹配您工艺的OmniCure、Phoseon、Fusion与NobleLight系统。", th: "สำรวจระบบ OmniCure, Phoseon, Fusion และ NobleLight ที่เหมาะกับกระบวนการของคุณ", vi: "Khám phá các hệ thống OmniCure, Phoseon, Fusion và NobleLight phù hợp với quy trình của bạn." } },
    { icon: "⚗️", title: { en: "Application Consulting", zh: "应用咨询", th: "ที่ปรึกษาด้านการใช้งาน", vi: "Tư vấn ứng dụng" }, desc: { en: "Validate your UV curing process — from adhesive selection to dose and irradiance testing.", zh: "验证您的UV Curing 紫外线固化工艺——从胶粘剂选型到剂量与辐照度测试。", th: "ตรวจสอบกระบวนการ UV Curing ของคุณ ตั้งแต่การเลือกกาวไปจนถึงการทดสอบโดสและความเข้มแสง", vi: "Xác thực quy trình UV curing của bạn — từ chọn keo đến kiểm tra liều và cường độ chiếu." } },
    { icon: "🛠️", title: { en: "Custom Engineering", zh: "定制工程", th: "งานวิศวกรรมตามความต้องการ", vi: "Kỹ thuật tùy chỉnh" }, desc: { en: "Need a non-standard configuration? We engineer bespoke solutions for complex production lines.", zh: "需要非标配置? 我们为复杂产线打造定制化解决方案。", th: "ต้องการคอนฟิกแบบไม่มาตรฐาน? เราออกแบบโซลูชันเฉพาะสำหรับสายการผลิตที่ซับซ้อน", vi: "Cần cấu hình phi tiêu chuẩn? Chúng tôi thiết kế giải pháp riêng cho các dây chuyền phức tạp." } },
  ];
  const serviceItems = [
    { icon: "⚙️", title: { en: "Equipment Repair", zh: "设备维修", th: "การซ่อมอุปกรณ์", vi: "Sửa chữa thiết bị" }, desc: { en: "Fast diagnosis and repair of OmniCure, Phoseon, and all supported UV systems. Urgent production issues are prioritized.", zh: "快速诊断与维修OmniCure、Phoseon及所有支持的UV系统。紧急生产问题优先处理。", th: "วินิจฉัยและซ่อมระบบ OmniCure, Phoseon และระบบ UV ที่รองรับทั้งหมดอย่างรวดเร็ว ปัญหาการผลิตเร่งด่วนได้รับการจัดลำดับความสำคัญ", vi: "Chẩn đoán và sửa chữa nhanh OmniCure, Phoseon và mọi hệ thống UV được hỗ trợ. Ưu tiên sự cố sản xuất khẩn cấp." } },
    { icon: "📡", title: { en: "Radiometer Calibration", zh: "辐射计校准", th: "การสอบเทียบเรดิโอมิเตอร์", vi: "Hiệu chuẩn máy đo bức xạ" }, desc: { en: "NIST-traceable calibration for R2000, LS200 and third-party radiometers. Calibration certificate provided.", zh: "为R2000、LS200及第三方辐射计提供NIST溯源校准，并出具校准证书。", th: "การสอบเทียบที่สอบกลับได้ตาม NIST สำหรับ R2000, LS200 และเรดิโอมิเตอร์ยี่ห้ออื่น พร้อมใบรับรองการสอบเทียบ", vi: "Hiệu chuẩn truy xuất theo NIST cho R2000, LS200 và máy đo bức xạ bên thứ ba. Có cấp giấy chứng nhận hiệu chuẩn." } },
    { icon: "🔩", title: { en: "Preventive Maintenance", zh: "预防性保养", th: "การบำรุงรักษาเชิงป้องกัน", vi: "Bảo trì phòng ngừa" }, desc: { en: "Scheduled maintenance programs to extend equipment life and prevent unexpected failures on production lines.", zh: "定期保养计划，延长设备寿命，防止产线意外故障。", th: "โปรแกรมบำรุงรักษาตามกำหนดเพื่อยืดอายุอุปกรณ์และป้องกันความเสียหายที่ไม่คาดคิดในสายการผลิต", vi: "Chương trình bảo trì định kỳ giúp kéo dài tuổi thọ thiết bị và ngăn sự cố bất ngờ trên dây chuyền." } },
  ];
  const offices: {
    region: { en: string; zh: string; th?: string; vi?: string };
    contact?: string;
    title?: { en: string; zh: string; th?: string; vi?: string };
    phone?: string;
    email: string;
    local?: string;
    en?: string;
  }[] = [
    { region: { en: "China · Shanghai", zh: "中国 · 上海", th: "จีน · เซี่ยงไฮ้", vi: "Trung Quốc · Thượng Hải" }, contact: "Mark Tang", phone: "400 990 8448 · +86-21-6432-7144 转106", email: "mark_tang@etia-tech.com", local: "上海市普陀区中江路388弄国盛中心2号楼1903室", en: "Rm. 1903, 2# Building, Guoson Centre, No. 388 Zhongjiang Rd, Putuo District, Shanghai, China" },
    { region: { en: "Hong Kong", zh: "中国 · 香港", th: "จีน · ฮ่องกง", vi: "Trung Quốc · Hồng Kông" }, contact: "Mark Tang", phone: "+86 151 2119 7091", email: "mark_tang@etia-tech.com", en: "Room 1003, 10/F, Tower 1, Lippo Centre, 89 Queensway, Admiralty, Hong Kong" },
    { region: { en: "Thailand · Bangkok", zh: "泰国 · 曼谷", th: "ไทย · กรุงเทพฯ", vi: "Thái Lan · Bangkok" }, contact: "Mr. Sompoch Ratchakom (Job)", title: { en: "Sales Director", zh: "销售总监", th: "ผู้อำนวยการฝ่ายขาย", vi: "Giám đốc kinh doanh" }, phone: "+66 811 746 947", email: "sompoch@etia-tech.com", local: "22/41 เอช-เคป บิซ เซ็นเตอร์ ถนนสุขาภิบาล 2 แขวงประเวศ เขตประเวศ กรุงเทพฯ 10250", en: "22/41 H-Cape Biz Center, Sukhaphiban 2 Road, Prawet Subdistrict, Prawet District, Bangkok 10250, Thailand" },
    { region: { en: "Vietnam · Bac Ninh", zh: "越南 · 北宁", th: "เวียดนาม · บั๊กนิญ", vi: "Việt Nam · Bắc Ninh" }, contact: "Tien Nguyen", title: { en: "Technical Engineer", zh: "技术工程师", th: "วิศวกรเทคนิค", vi: "Kỹ sư kỹ thuật" }, phone: "+84 344 590 091", email: "ts_vn@etia-tech.com", local: "Số 10 đường Thanh Niên, Khu 5, Phường Võ Cường, Tỉnh Bắc Ninh, Việt Nam", en: "No. 10 Thanh Nien Street, Area 5, Vo Cuong Ward, Bac Ninh Province, Viet Nam" },
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
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-[#143C96] md:text-6xl">{t({ en: "Dedicated UV Curing Solution", zh: "专注紫外线固化解决方案", th: "โซลูชัน UV Curing โดยผู้เชี่ยวชาญ", vi: "Giải pháp UV Curing chuyên sâu" }, locale)}<span className="mt-2 block text-2xl font-bold text-[#41A62A] md:text-4xl">{t({ en: "We Support You Every Step of the Way.", zh: "全程支持，服务到底。", th: "สนับสนุนทุกขั้นตอน บริการระยะยาว", vi: "Hỗ trợ toàn trình, dịch vụ lâu dài" }, locale)}</span></h1>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#sales" className="inline-flex items-center justify-center rounded-xl bg-[#41A62A] px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#358B22]">{t({ en: "Talk to an ETIA Engineer", zh: "咨询 ETIA 工程师", th: "ปรึกษาวิศวกร ETIA", vi: "Trao đổi với kỹ sư ETIA" }, locale)}</a>
              <a href="#service" className="inline-flex items-center justify-center rounded-xl border border-[#D4DFEC] bg-white px-6 py-3.5 text-sm font-bold text-[#143C96] transition hover:-translate-y-0.5 hover:border-[#143C96] hover:text-[#1F63D6]">{t({ en: "Request Service Support", zh: "申请服务支持", th: "ขอรับการสนับสนุนด้านบริการ", vi: "Yêu cầu hỗ trợ dịch vụ" }, locale)}</a>
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
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Part 1", zh: "第一部分", th: "ส่วนที่ 1", vi: "Phần 1" }, locale)}</p>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A56DB" }}>{t({ en: "Sales Inquiry", zh: "销售咨询", th: "สอบถามฝ่ายขาย", vi: "Tư vấn bán hàng" }, locale)}</h2>
              <div className="w-10 h-1 rounded mb-6" style={{ background: "#44B549" }} />
              <p className="text-gray-500 mb-8 leading-relaxed">
                {t({ en: "Looking for the right UV curing system? Our engineers will evaluate your application, recommend the best solution, and support you through the entire selection process.", zh: "在寻找合适的UV Curing 紫外线固化系统? 我们的工程师将评估您的应用、推荐最佳方案，并在整个选型过程中为您提供支持。", th: "กำลังมองหาระบบ UV Curing ที่เหมาะสมอยู่ใช่ไหม? วิศวกรของเราจะประเมินการใช้งานของคุณ แนะนำโซลูชันที่ดีที่สุด และสนับสนุนคุณตลอดกระบวนการเลือก", vi: "Đang tìm hệ thống UV curing phù hợp? Kỹ sư của chúng tôi sẽ đánh giá ứng dụng của bạn, đề xuất giải pháp tốt nhất và hỗ trợ bạn trong suốt quá trình lựa chọn." }, locale)}
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
                <p className="text-xs text-gray-400 mb-1">{t({ en: "Direct Email", zh: "直接邮箱", th: "อีเมลโดยตรง", vi: "Email trực tiếp" }, locale)}</p>
                <a href="mailto:mark_tang@etia-tech.com" className="font-semibold hover:underline" style={{ color: "#44B549" }}>
                  mark_tang@etia-tech.com
                </a>
              </div>
            </div>
            <div className="rounded-2xl p-8 border border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-lg mb-6" style={{ color: "#1A56DB" }}>{t({ en: "Send a Sales Inquiry", zh: "发送销售咨询", th: "ส่งคำสอบถามฝ่ายขาย", vi: "Gửi yêu cầu tư vấn" }, locale)}</h3>
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
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Part 2", zh: "第二部分", th: "ส่วนที่ 2", vi: "Phần 2" }, locale)}</p>
              <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A56DB" }}>{t({ en: "Service & Repair", zh: "服务与维修", th: "บริการและการซ่อม", vi: "Dịch vụ & sửa chữa" }, locale)}</h2>
              <div className="w-10 h-1 rounded mb-6" style={{ background: "#44B549" }} />
              <p className="text-gray-500 mb-8 leading-relaxed">
                {t({ en: "Our in-house repair factory and certified technicians keep your UV curing equipment running at peak performance — minimizing downtime and maximizing production reliability.", zh: "我们的自有维修工厂与认证技术人员让您的UV Curing 紫外线固化设备保持最佳性能——最大限度减少停机，最大化生产可靠性。", th: "โรงซ่อมภายในและช่างเทคนิคที่ผ่านการรับรองของเราช่วยให้อุปกรณ์ UV Curing ของคุณทำงานเต็มประสิทธิภาพ ลดเวลาหยุดทำงานและเพิ่มความน่าเชื่อถือในการผลิตให้สูงสุด", vi: "Xưởng sửa chữa nội bộ và kỹ thuật viên được chứng nhận của chúng tôi giúp thiết bị UV curing của bạn luôn vận hành tối ưu — giảm thời gian ngừng máy và tối đa độ tin cậy sản xuất." }, locale)}
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
                <p className="text-xs text-gray-400 mb-1">{t({ en: "Service Email (Technical Manager)", zh: "服务邮箱(技术经理)", th: "อีเมลบริการ (ผู้จัดการฝ่ายเทคนิค)", vi: "Email dịch vụ (Quản lý kỹ thuật)" }, locale)}</p>
                <a href="mailto:guoren_wang@etia-tech.com" className="font-semibold hover:underline" style={{ color: "#44B549" }}>
                  guoren_wang@etia-tech.com
                </a>
              </div>
            </div>
            <div className="rounded-2xl p-8 border border-gray-100 bg-white">
              <h3 className="font-semibold text-lg mb-6" style={{ color: "#1A56DB" }}>{t({ en: "Submit a Service Request", zh: "提交服务请求", th: "ส่งคำขอรับบริการ", vi: "Gửi yêu cầu dịch vụ" }, locale)}</h3>
              <ContactForm fields={["Request Type"]} locale={locale} />
            </div>
          </div>
        </div>
      </section>

      {/* Part 3 — Global Contacts */}
      <section id="global" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: "#44B549" }}>{t({ en: "Part 3", zh: "第三部分", th: "ส่วนที่ 3", vi: "Phần 3" }, locale)}</p>
          <h2 className="text-3xl font-bold mb-4" style={{ color: "#1A56DB" }}>{t({ en: "Global Contacts", zh: "全球联系", th: "ติดต่อทั่วโลก", vi: "Liên hệ toàn cầu" }, locale)}</h2>
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
          <p className="text-xs text-gray-400 mt-6">{t({ en: "* Contact us by email for the fastest response — our team typically replies within one business day.", zh: "* 通过邮件联系我们可获得最快响应——我们的团队通常在1个工作日内回复。", th: "* ติดต่อเราทางอีเมลเพื่อการตอบกลับที่รวดเร็วที่สุด — ทีมงานของเรามักตอบกลับภายในหนึ่งวันทำการ", vi: "* Liên hệ qua email để được phản hồi nhanh nhất — đội ngũ của chúng tôi thường trả lời trong vòng một ngày làm việc." }, locale)}</p>
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
              <a href="#sales" className="inline-flex items-center justify-center rounded-xl bg-[#44B549] px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#3A9D3F]">{t({ en: "Talk to an ETIA Engineer", zh: "咨询 ETIA 工程师", th: "ปรึกษาวิศวกร ETIA", vi: "Trao đổi với kỹ sư ETIA" }, locale)}</a>
              <a href="#service" className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-white/10 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white/70">{t({ en: "Request Service Support", zh: "申请服务支持", th: "ขอรับการสนับสนุนด้านบริการ", vi: "Yêu cầu hỗ trợ dịch vụ" }, locale)}</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
