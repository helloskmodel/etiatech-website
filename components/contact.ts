import type { Locale } from "@/components/LocaleContext";

// Sales / general inquiries for every country route to one unified OmniCure
// inbox. `locale` is kept for call-site compatibility.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function localeSalesEmail(locale: Locale): string {
  return "Omnicure@etia-tech.com";
}

// Static default (English / Chinese). Prefer localeSalesEmail(locale) where a
// locale is available so the address follows the visitor's country.
export const SALES_EMAIL = "Omnicure@etia-tech.com";
export const SERVICE_EMAIL = "guoren_wang@etia-tech.com";

// Destination for the site's inquiry CTAs ("Talk to an Engineer" and friends).
//
// This used to build a mailto: link. That silently loses the visitor whenever
// the browser has no mail client wired up — the common case for anyone on
// webmail — so the button does nothing and neither side ever learns an inquiry
// was lost. Sending them to the contact form keeps them on the site; the form
// itself falls back to mailto only when server delivery is unavailable.
//
// `context` (a product or technology name) rides along as ?topic= so the form
// can tell sales which page the visitor was reading when they decided to get in
// touch. `subject` stands in when there is no context, but only when it says
// something specific — the generic ones below identify no page and would just
// be noise in the inbox.
const GENERIC_SUBJECTS = new Set(["Engineering Inquiry", "Sales Inquiry", "UV Curing Inquiry"]);

export function inquiryHref(
  locale: Locale,
  opts: { subject?: string; context?: string } = {}
): string {
  const subject = opts.subject && !GENERIC_SUBJECTS.has(opts.subject) ? opts.subject : undefined;
  return contactHref(locale, opts.context ?? subject);
}

// The contact form itself, on the locale's own contact page, scrolled to the
// inquiry section.
export function contactHref(locale: Locale, context?: string): string {
  const base = locale === "en" ? "/contact" : `/${locale}/contact`;
  const topic = context ? `?topic=${encodeURIComponent(context)}` : "";
  return `${base}${topic}#inquiries`;
}

// Direct mailto for after-sales support, which reaches a named service
// engineer rather than the sales inbox.
//
// This one stays a mailto on purpose. The inquiry CTAs were moved to the
// contact form because they address strangers who may have no mail client
// configured; a support request comes from an existing customer with a machine
// down, who already corresponds with us by email, and routing it through the
// sales form would land it in the wrong inbox.
export function supportMailto(opts: { subject: string; context?: string } = { subject: "Technical Support" }): string {
  const body = [
    opts.context ? `Product: ${opts.context}` : "",
    "",
    "Serial number:",
    "Symptom / error code:",
    "Company / contact / phone:",
  ]
    .filter((l) => l !== undefined)
    .join("\n");
  return `mailto:${SERVICE_EMAIL}?subject=${encodeURIComponent(opts.subject)}&body=${encodeURIComponent(body)}`;
}
