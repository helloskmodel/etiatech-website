"use client";
import Link from "next/link";
import { useLocale, t, type LangText } from "@/components/LocaleContext";
import { localeSalesEmail } from "@/components/contact";

const LAST_UPDATED: LangText = { en: "29 June 2026", zh: "2026年6月29日", th: "29 มิถุนายน 2026", vi: "29 tháng 6 năm 2026" };

const cookieTypes: { name: LangText; purpose: LangText; color: string }[] = [
  {
    name: { en: "Strictly Necessary", zh: "严格必要", th: "จำเป็นอย่างยิ่ง", vi: "Thực sự cần thiết" },
    purpose: {
      en: "Required for the website to function — page navigation, security, and remembering your cookie choice. These cannot be switched off.",
      zh: "网站正常运行所必需——用于页面导航、安全以及记住您的 Cookie 选择。此类 Cookie 无法关闭。",
      th: "จำเป็นสำหรับการทำงานของเว็บไซต์ — การนำทางในหน้าเว็บ ความปลอดภัย และการจดจำการเลือกคุกกี้ของคุณ คุกกี้เหล่านี้ไม่สามารถปิดใช้งานได้",
      vi: "Cần thiết để trang web hoạt động — điều hướng trang, bảo mật và ghi nhớ lựa chọn cookie của bạn. Những cookie này không thể tắt được.",
    },
    color: "#1A56DB",
  },
  {
    name: { en: "Preferences", zh: "偏好设置", th: "การตั้งค่าที่ต้องการ", vi: "Tùy chọn ưu tiên" },
    purpose: {
      en: "Remember choices you make (such as language) to provide a more personalised experience.",
      zh: "记住您的选择（例如语言），以提供更个性化的体验。",
      th: "จดจำการเลือกที่คุณตั้งไว้ (เช่น ภาษา) เพื่อมอบประสบการณ์ที่เป็นส่วนตัวมากยิ่งขึ้น",
      vi: "Ghi nhớ các lựa chọn của bạn (chẳng hạn như ngôn ngữ) để mang lại trải nghiệm được cá nhân hóa hơn.",
    },
    color: "#44B549",
  },
  {
    name: { en: "Analytics", zh: "分析统计", th: "การวิเคราะห์", vi: "Phân tích" },
    purpose: {
      en: "Help us understand how visitors use the site so we can improve it. These collect aggregated, anonymised information.",
      zh: "帮助我们了解访客如何使用网站以便加以改进。此类 Cookie 收集的是聚合的匿名信息。",
      th: "ช่วยให้เราเข้าใจว่าผู้เยี่ยมชมใช้งานเว็บไซต์อย่างไร เพื่อให้เราสามารถปรับปรุงให้ดียิ่งขึ้น คุกกี้เหล่านี้เก็บรวบรวมข้อมูลแบบรวมที่ไม่ระบุตัวตน",
      vi: "Giúp chúng tôi hiểu cách khách truy cập sử dụng trang web để chúng tôi có thể cải thiện. Những cookie này thu thập thông tin tổng hợp, ẩn danh.",
    },
    color: "#0d9488",
  },
];

export default function CookiesView() {
  const { locale } = useLocale();
  return (
    <>
      {/* Hero */}
      <section className="py-12 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1241a3 0%, #1A56DB 100%)" }}>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>{t({ en: "Legal", zh: "法律条款", th: "ข้อกฎหมาย", vi: "Pháp lý" }, locale)}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">{t({ en: "Cookie Policy", zh: "Cookie 政策", th: "นโยบายคุกกี้", vi: "Chính sách Cookie" }, locale)}</h1>
          <p className="text-sm text-gray-300">{t({ en: "Last updated:", zh: "最后更新:", th: "อัปเดตล่าสุด:", vi: "Cập nhật lần cuối:" }, locale)} {t(LAST_UPDATED, locale)}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600 text-sm leading-relaxed space-y-8">
          <p>
            {t({ en: "This Cookie Policy explains how ETIA-TECH (ASIA) Co., Limited (Hong Kong) uses cookies and similar technologies on this website. It should be read together with our", zh: "本 Cookie 政策说明 ETIA-TECH (ASIA) Co., Limited（中国香港）在本网站上如何使用 Cookie 及类似技术。本政策应与我们的", th: "นโยบายคุกกี้ฉบับนี้อธิบายว่า ETIA-TECH (ASIA) Co., Limited (ฮ่องกง) ใช้คุกกี้และเทคโนโลยีที่คล้ายคลึงกันบนเว็บไซต์นี้อย่างไร ควรอ่านประกอบกับ", vi: "Chính sách Cookie này giải thích cách ETIA-TECH (ASIA) Co., Limited (Hồng Kông) sử dụng cookie và các công nghệ tương tự trên trang web này. Chính sách này nên được đọc cùng với" }, locale)}{" "}
            <Link href="/privacy" className="font-medium hover:underline" style={{ color: "#1A56DB" }}>{t({ en: "Privacy Policy", zh: "隐私政策", th: "นโยบายความเป็นส่วนตัว", vi: "Chính sách Quyền riêng tư" }, locale)}</Link>{t({ en: ".", zh: "一并阅读。", th: "ของเรา", vi: "của chúng tôi." }, locale)}
          </p>

          <div>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "What are cookies?", zh: "什么是 Cookie?", th: "คุกกี้คืออะไร?", vi: "Cookie là gì?" }, locale)}</h2>
            <p>{t({ en: "Cookies are small text files stored on your device when you visit a website. They are widely used to make websites work, to work more efficiently, and to provide information to the site owners.", zh: "Cookie 是您访问网站时存储在您设备上的小型文本文件。它们被广泛用于使网站正常运行、更高效地运行，并向网站所有者提供信息。", th: "คุกกี้คือไฟล์ข้อความขนาดเล็กที่จัดเก็บไว้บนอุปกรณ์ของคุณเมื่อคุณเยี่ยมชมเว็บไซต์ คุกกี้ถูกใช้อย่างแพร่หลายเพื่อให้เว็บไซต์ทำงานได้ ทำงานได้อย่างมีประสิทธิภาพมากขึ้น และเพื่อให้ข้อมูลแก่เจ้าของเว็บไซต์", vi: "Cookie là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn khi bạn truy cập một trang web. Chúng được sử dụng rộng rãi để giúp các trang web hoạt động, hoạt động hiệu quả hơn và cung cấp thông tin cho chủ sở hữu trang web." }, locale)}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#1A56DB" }}>{t({ en: "Types of cookies we use", zh: "我们使用的 Cookie 类型", th: "ประเภทของคุกกี้ที่เราใช้", vi: "Các loại cookie chúng tôi sử dụng" }, locale)}</h2>
            <div className="space-y-3">
              {cookieTypes.map((c, i) => (
                <div key={i} className="rounded-xl border border-gray-100 p-4 bg-gray-50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.color }} />
                    <h3 className="font-semibold" style={{ color: c.color }}>{t(c.name, locale)}</h3>
                  </div>
                  <p className="text-gray-500">{t(c.purpose, locale)}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "Managing your cookies", zh: "管理您的 Cookie", th: "การจัดการคุกกี้ของคุณ", vi: "Quản lý cookie của bạn" }, locale)}</h2>
            <p>{t({ en: "When you first visit, we ask for your consent through a banner where you can accept all cookies or choose necessary-only. You can also control cookies through your browser settings — most browsers let you refuse or delete cookies. Please note that blocking some cookies may affect how the site works.", zh: "当您首次访问时，我们会通过横幅征求您的同意，您可以选择接受全部 Cookie 或仅接受必要 Cookie。您也可以通过浏览器设置控制 Cookie——大多数浏览器允许您拒绝或删除 Cookie。请注意，屏蔽某些 Cookie 可能会影响网站的运行。", th: "เมื่อคุณเยี่ยมชมเป็นครั้งแรก เราจะขอความยินยอมจากคุณผ่านแบนเนอร์ ซึ่งคุณสามารถยอมรับคุกกี้ทั้งหมดหรือเลือกเฉพาะคุกกี้ที่จำเป็นได้ คุณยังสามารถควบคุมคุกกี้ผ่านการตั้งค่าเบราว์เซอร์ของคุณ — เบราว์เซอร์ส่วนใหญ่อนุญาตให้คุณปฏิเสธหรือลบคุกกี้ได้ โปรดทราบว่าการบล็อกคุกกี้บางรายการอาจส่งผลต่อการทำงานของเว็บไซต์", vi: "Khi bạn truy cập lần đầu, chúng tôi yêu cầu sự đồng ý của bạn thông qua một biểu ngữ, nơi bạn có thể chấp nhận tất cả cookie hoặc chỉ chọn cookie cần thiết. Bạn cũng có thể kiểm soát cookie thông qua cài đặt trình duyệt của mình — hầu hết các trình duyệt cho phép bạn từ chối hoặc xóa cookie. Xin lưu ý rằng việc chặn một số cookie có thể ảnh hưởng đến cách trang web hoạt động." }, locale)}</p>
            <p className="mt-2">{t({ en: "To reset your choice on this site, clear this site's data in your browser and the consent banner will appear again on your next visit.", zh: "如需重置您在本网站上的选择，请在浏览器中清除本网站的数据，下次访问时同意横幅将再次出现。", th: "หากต้องการรีเซ็ตการเลือกของคุณบนเว็บไซต์นี้ ให้ล้างข้อมูลของเว็บไซต์นี้ในเบราว์เซอร์ของคุณ แล้วแบนเนอร์ขอความยินยอมจะปรากฏขึ้นอีกครั้งในการเยี่ยมชมครั้งถัดไป", vi: "Để đặt lại lựa chọn của bạn trên trang web này, hãy xóa dữ liệu của trang web này trong trình duyệt của bạn và biểu ngữ đồng ý sẽ xuất hiện lại trong lần truy cập tiếp theo." }, locale)}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "Contact", zh: "联系方式", th: "ติดต่อ", vi: "Liên hệ" }, locale)}</h2>
            <p>
              {t({ en: "Questions about this Cookie Policy? Email", zh: "对本 Cookie 政策有疑问?请发送邮件至", th: "มีคำถามเกี่ยวกับนโยบายคุกกี้ฉบับนี้? ส่งอีเมลถึง", vi: "Có câu hỏi về Chính sách Cookie này? Gửi email đến" }, locale)}{" "}
              <a href={`mailto:${localeSalesEmail(locale)}`} className="font-medium hover:underline" style={{ color: "#44B549" }}>{localeSalesEmail(locale)}</a>{t({ en: ".", zh: "。", th: ".", vi: "." }, locale)}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <Link href="/" className="text-sm font-medium hover:underline" style={{ color: "#1A56DB" }}>← {t({ en: "Back to Home", zh: "返回首页", th: "กลับสู่หน้าแรก", vi: "Quay lại Trang chủ" }, locale)}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
