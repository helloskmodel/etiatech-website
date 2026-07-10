import type { Locale } from "@/components/LocaleContext";

// Client-side routing between the cookie-based EN routes and the
// locale-locked SEO routes (/zh /vi /th). Keep these lists in sync with the
// pages that actually exist under app/{zh,vi,th}/ — linking to a locale URL
// that doesn't exist 404s.

// Sections localized for all three locales, including their sub-pages.
const LOCALIZED_PREFIXES = ["/applications", "/case-studies"];

// Individual pages localized for all three locales.
const LOCALIZED_EXACT = new Set([
  "/contact",
  "/product/omnicure",
  "/product/phoseon",
  "/product/omnicure/s2000",
  "/product/omnicure/s2000-lamp",
  "/product/systems/lx500",
]);

// Locale URLs that don't follow the /{locale}{path} pattern (legacy SEM URLs).
const SPECIAL: Record<string, Partial<Record<Locale, string>>> = {
  "/product/omnicure/s2000-lamp": { th: "/th/omnicure-s2000-lamp" },
};

// Best URL for `href` in `locale`: the locale-locked version when one exists,
// otherwise the shared EN route (which the etia-locale cookie renders in the
// visitor's language).
export function localizeHref(href: string, locale: Locale): string {
  if (locale === "en" || !href.startsWith("/")) return href;
  if (href === "/") return `/${locale}`;
  const special = SPECIAL[href]?.[locale];
  if (special) return special;
  if (LOCALIZED_EXACT.has(href)) return `/${locale}${href}`;
  if (LOCALIZED_PREFIXES.some((p) => href === p || href.startsWith(`${p}/`))) return `/${locale}${href}`;
  return href;
}

// Inverse: the EN route a locale-locked path mirrors.
export function delocalizeHref(path: string): string {
  for (const [en, byLocale] of Object.entries(SPECIAL)) {
    if (Object.values(byLocale).includes(path)) return en;
  }
  const m = path.match(/^\/(zh|vi|th)(\/.*)?$/);
  return m ? m[2] || "/" : path;
}
