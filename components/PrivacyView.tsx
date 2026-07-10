"use client";
import Link from "next/link";
import { useLocale, t, type LangText } from "@/components/LocaleContext";
import { localeSalesEmail } from "@/components/contact";

const LAST_UPDATED: LangText = { en: "29 June 2026", zh: "2026年6月29日" };

export default function PrivacyView() {
  const { locale } = useLocale();
  return (
    <>
      {/* Hero */}
      <section className="py-12 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1241a3 0%, #1A56DB 100%)" }}>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#44B549" }}>{t({ en: "Legal", zh: "法律条款" }, locale)}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">{t({ en: "Privacy Policy", zh: "隐私政策" }, locale)}</h1>
          <p className="text-sm text-gray-300">{t({ en: "Last updated:", zh: "最后更新:" }, locale)} {t(LAST_UPDATED, locale)}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600 text-sm leading-relaxed space-y-8">
          <div>
            <p>
              {t({
                en: 'This Privacy Policy explains how ETIA-TECH (ASIA) Co., Limited ("ETIA", "we", "us", or "our") collects, uses, discloses, and safeguards your information when you visit this website. ETIA-TECH (ASIA) Co., Limited is a company incorporated in Hong Kong under the Companies Ordinance (Cap. 622).',
                zh: "本隐私政策说明 ETIA-TECH (ASIA) Co., Limited（「ETIA」「我们」）在您访问本网站时如何收集、使用、披露及保护您的信息。ETIA-TECH (ASIA) Co., Limited 是一家根据香港《公司条例》（第 622 章）注册成立的公司。",
              }, locale)}
            </p>
          </div>

          <Section title={{ en: "1. Information We Collect", zh: "1. 我们收集的信息" }} locale={locale}>
            <p>{t({ en: "We collect information you provide directly to us and information collected automatically:", zh: "我们收集您直接提供给我们的信息，以及自动收集的信息:" }, locale)}</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>{t({ en: "Information you provide — such as your name, company, email address, phone number, and the content of any enquiry when you contact us or request a quote.", zh: "您提供的信息——例如您在联系我们或索取报价时提供的姓名、公司、电子邮箱、电话号码及咨询内容。" }, locale)}</li>
              <li>{t({ en: "Information collected automatically — such as your IP address, browser type, device information, pages visited, and referring URLs, collected through cookies and similar technologies.", zh: "自动收集的信息——例如通过 Cookie 及类似技术收集的 IP 地址、浏览器类型、设备信息、访问页面及来源网址。" }, locale)}</li>
            </ul>
          </Section>

          <Section title={{ en: "2. How We Use Your Information", zh: "2. 我们如何使用您的信息" }} locale={locale}>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t({ en: "To respond to your enquiries and provide sales, technical, and after-sales support.", zh: "回应您的咨询，并提供销售、技术及售后支持。" }, locale)}</li>
              <li>{t({ en: "To process and fulfil quote requests and orders.", zh: "处理并履行报价请求与订单。" }, locale)}</li>
              <li>{t({ en: "To operate, maintain, and improve our website and services.", zh: "运营、维护及改进我们的网站与服务。" }, locale)}</li>
              <li>{t({ en: "To send you information you have requested and, where permitted, relevant product updates.", zh: "向您发送所请求的信息，并在获准的情况下发送相关产品更新。" }, locale)}</li>
              <li>{t({ en: "To comply with legal obligations and protect our rights.", zh: "履行法律义务并保护我们的权利。" }, locale)}</li>
            </ul>
          </Section>

          <Section title={{ en: "3. Cookies", zh: "3. Cookie" }} locale={locale}>
            <p>
              {t({ en: "We use cookies and similar technologies to operate the site and understand how it is used. You can manage your preferences at any time. For details, see our", zh: "我们使用 Cookie 及类似技术来运营网站并了解其使用情况。您可随时管理您的偏好设置。详情请参阅我们的" }, locale)}{" "}
              <Link href="/cookies" className="font-medium hover:underline" style={{ color: "#1A56DB" }}>{t({ en: "Cookie Policy", zh: "Cookie 政策" }, locale)}</Link>{locale === "zh" ? "。" : "."}
            </p>
          </Section>

          <Section title={{ en: "4. How We Share Information", zh: "4. 我们如何共享信息" }} locale={locale}>
            <p>{t({ en: "We do not sell your personal data. We may share information with trusted service providers who help us operate the website and our business (for example, hosting and analytics providers), with our principal manufacturers where necessary to fulfil your request, and where required by law or to protect our legal rights.", zh: "我们不会出售您的个人数据。我们可能与协助我们运营网站及业务的可信服务提供商（例如托管与分析服务商）共享信息，在必要时与我们的原厂制造商共享以履行您的请求，以及在法律要求或为保护我们的合法权利时共享信息。" }, locale)}</p>
          </Section>

          <Section title={{ en: "5. Data Retention", zh: "5. 数据保留" }} locale={locale}>
            <p>{t({ en: "We retain personal data only for as long as necessary to fulfil the purposes described in this policy, including to satisfy any legal, accounting, or reporting requirements.", zh: "我们仅在为实现本政策所述目的所必需的期间内保留个人数据，包括满足任何法律、会计或报告要求。" }, locale)}</p>
          </Section>

          <Section title={{ en: "6. Your Rights", zh: "6. 您的权利" }} locale={locale}>
            <p>{t({ en: "Subject to applicable law, you may request access to, correction of, or deletion of your personal data, and you may object to or restrict certain processing. To exercise these rights, contact us using the details below.", zh: "在适用法律的范围内，您可请求访问、更正或删除您的个人数据，并可反对或限制某些处理活动。如需行使这些权利，请通过下方联系方式与我们联系。" }, locale)}</p>
          </Section>

          <Section title={{ en: "7. Data Security", zh: "7. 数据安全" }} locale={locale}>
            <p>{t({ en: "We implement reasonable technical and organisational measures designed to protect your information against unauthorised access, loss, or misuse. No method of transmission over the internet is completely secure, however, and we cannot guarantee absolute security.", zh: "我们采取合理的技术与组织措施，以保护您的信息免遭未经授权的访问、丢失或滥用。然而，互联网上没有任何传输方式是完全安全的，我们无法保证绝对的安全性。" }, locale)}</p>
          </Section>

          <Section title={{ en: "8. International Transfers", zh: "8. 跨境传输" }} locale={locale}>
            <p>{t({ en: "ETIA operates across Asia. Your information may be processed in countries other than your own, where data protection laws may differ. We take steps to ensure your information receives an appropriate level of protection.", zh: "ETIA 在亚洲各地开展业务。您的信息可能在您所在国家/地区以外的国家/地区处理，当地的数据保护法律可能有所不同。我们将采取措施确保您的信息获得适当程度的保护。" }, locale)}</p>
          </Section>

          <Section title={{ en: "9. Changes to This Policy", zh: "9. 本政策的变更" }} locale={locale}>
            <p>{t({ en: 'We may update this Privacy Policy from time to time. The "Last updated" date above indicates when it was last revised. Material changes will be posted on this page.', zh: "我们可能会不时更新本隐私政策。上方的「最后更新」日期表明其最近一次修订的时间。重大变更将在本页面公布。" }, locale)}</p>
          </Section>

          <Section title={{ en: "10. Contact Us", zh: "10. 联系我们" }} locale={locale}>
            <p>{t({ en: "If you have questions about this Privacy Policy or how we handle your data, please contact:", zh: "如您对本隐私政策或我们处理数据的方式有任何疑问，请联系:" }, locale)}</p>
            <p className="mt-2">
              <strong>ETIA-TECH (ASIA) Co., Limited</strong><br />
              {t({ en: "Hong Kong", zh: "中国香港" }, locale)}<br />
              {t({ en: "Email:", zh: "邮箱:" }, locale)}{" "}
              <a href={`mailto:${localeSalesEmail(locale)}`} className="font-medium hover:underline" style={{ color: "#44B549" }}>{localeSalesEmail(locale)}</a>
            </p>
          </Section>

          <div className="pt-4 border-t border-gray-100">
            <Link href="/" className="text-sm font-medium hover:underline" style={{ color: "#1A56DB" }}>← {t({ en: "Back to Home", zh: "返回首页" }, locale)}</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ title, locale, children }: { title: LangText; locale: "en" | "zh" | "vi" | "th"; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-bold mb-2" style={{ color: "#1A56DB" }}>{t(title, locale)}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
