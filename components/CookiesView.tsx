"use client";
import Link from "next/link";
import { useLocale, t, type LangText } from "@/components/LocaleContext";
import { localeSalesEmail } from "@/components/contact";

const LAST_UPDATED: LangText = { en: "29 June 2026", zh: "2026年6月29日" };

const cookieTypes: { name: LangText; purpose: LangText; color: string }[] = [
  {
    name: { en: "Strictly Necessary", zh: "严格必要" },
    purpose: {
      en: "Required for the website to function — page navigation, security, and remembering your cookie choice. These cannot be switched off.",
      zh: "网站正常运行所必需——用于页面导航、安全以及记住您的 Cookie 选择。此类 Cookie 无法关闭。",
    },
    color: "#1A56DB",
  },
  {
    name: { en: "Preferences", zh: "偏好设置" },
    purpose: {
      en: "Remember choices you make (such as language) to provide a more personalised experience.",
      zh: "记住您的选择（例如语言），以提供更个性化的体验。",
    },
    color: "#44B549",
  },
  {
    name: { en: "Analytics", zh: "分析统计" },
    purpose: {
      en: "Help us understand how visitors use the site so we can improve it. These collect aggregated, anonymised information.",
      zh: "帮助我们了解访客如何使用网站以便加以改进。此类 Cookie 收集的是聚合的匿名信息。",
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
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>{t({ en: "Legal", zh: "法律条款" }, locale)}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">{t({ en: "Cookie Policy", zh: "Cookie 政策" }, locale)}</h1>
          <p className="text-sm text-gray-300">{t({ en: "Last updated:", zh: "最后更新:" }, locale)} {t(LAST_UPDATED, locale)}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600 text-sm leading-relaxed space-y-8">
          <p>
            {t({ en: "This Cookie Policy explains how ETIA-TECH (ASIA) Co., Limited (Hong Kong) uses cookies and similar technologies on this website. It should be read together with our", zh: "本 Cookie 政策说明 ETIA-TECH (ASIA) Co., Limited（中国香港）在本网站上如何使用 Cookie 及类似技术。本政策应与我们的" }, locale)}{" "}
            <Link href="/privacy" className="font-medium hover:underline" style={{ color: "#1A56DB" }}>{t({ en: "Privacy Policy", zh: "隐私政策" }, locale)}</Link>{t({ en: ".", zh: "一并阅读。" }, locale)}
          </p>

          <div>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "What are cookies?", zh: "什么是 Cookie?" }, locale)}</h2>
            <p>{t({ en: "Cookies are small text files stored on your device when you visit a website. They are widely used to make websites work, to work more efficiently, and to provide information to the site owners.", zh: "Cookie 是您访问网站时存储在您设备上的小型文本文件。它们被广泛用于使网站正常运行、更高效地运行，并向网站所有者提供信息。" }, locale)}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-4" style={{ color: "#1A56DB" }}>{t({ en: "Types of cookies we use", zh: "我们使用的 Cookie 类型" }, locale)}</h2>
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
            <h2 className="text-lg font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "Managing your cookies", zh: "管理您的 Cookie" }, locale)}</h2>
            <p>{t({ en: "When you first visit, we ask for your consent through a banner where you can accept all cookies or choose necessary-only. You can also control cookies through your browser settings — most browsers let you refuse or delete cookies. Please note that blocking some cookies may affect how the site works.", zh: "当您首次访问时，我们会通过横幅征求您的同意，您可以选择接受全部 Cookie 或仅接受必要 Cookie。您也可以通过浏览器设置控制 Cookie——大多数浏览器允许您拒绝或删除 Cookie。请注意，屏蔽某些 Cookie 可能会影响网站的运行。" }, locale)}</p>
            <p className="mt-2">{t({ en: "To reset your choice on this site, clear this site's data in your browser and the consent banner will appear again on your next visit.", zh: "如需重置您在本网站上的选择，请在浏览器中清除本网站的数据，下次访问时同意横幅将再次出现。" }, locale)}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2" style={{ color: "#1A56DB" }}>{t({ en: "Contact", zh: "联系方式" }, locale)}</h2>
            <p>
              {t({ en: "Questions about this Cookie Policy? Email", zh: "对本 Cookie 政策有疑问?请发送邮件至" }, locale)}{" "}
              <a href={`mailto:${localeSalesEmail(locale)}`} className="font-medium hover:underline" style={{ color: "#44B549" }}>{localeSalesEmail(locale)}</a>{t({ en: ".", zh: "。" }, locale)}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <Link href="/" className="text-sm font-medium hover:underline" style={{ color: "#1A56DB" }}>← {t({ en: "Back to Home", zh: "返回首页" }, locale)}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
