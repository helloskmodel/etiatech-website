import type { Locale } from "@/components/LocaleContext";

// Sales / general inquiries route by country: English & Chinese to the main
// OmniCure inbox, Thai and Vietnamese to their local OmniCure inboxes.
export function localeSalesEmail(locale: Locale): string {
  return locale === "th"
    ? "omnicure.th@gmail.com"
    : locale === "vi"
    ? "omnicure.vn@gmail.com"
    : "Omnicure@etia-tech.com";
}

// Static default (English / Chinese). Prefer localeSalesEmail(locale) where a
// locale is available so the address follows the visitor's country.
export const SALES_EMAIL = "Omnicure@etia-tech.com";
export const SERVICE_EMAIL = "guoren_wang@etia-tech.com";

// Builds a mailto link with a helpful pre-filled subject AND body, so the
// email doesn't open blank. Pass `context` (e.g. a product or technology name)
// to reference it in the message. Bilingual.
export function inquiryMailto(
  locale: Locale,
  opts: { subject?: string; context?: string; email?: string } = {}
): string {
  const email = opts.email ?? localeSalesEmail(locale);
  const zh = locale === "zh";
  const ctx = opts.context;

  const body = (zh
    ? [
        ctx ? `咨询产品 / 技术：${ctx}` : "咨询主题：",
        "",
        "您好，我想咨询以下内容：",
        "· 我的应用 / 工艺：",
        "· 需求（选型 / 报价 / 技术支持）：",
        "· 公司 / 联系人 / 电话：",
        "",
        "谢谢！",
      ]
    : [
        ctx ? `Product / Technology: ${ctx}` : "Topic:",
        "",
        "Hello, I'd like to inquire about the following:",
        "· My application / process: ",
        "· What I need (product selection / quote / technical support): ",
        "· Company / contact / phone: ",
        "",
        "Thank you!",
      ]
  ).join("\n");

  const subject = opts.subject
    ? (ctx ? `${opts.subject} — ${ctx}` : opts.subject)
    : ctx ?? (zh ? "咨询" : "Inquiry");

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
