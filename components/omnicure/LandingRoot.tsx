import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Analytics from "@/components/Analytics";
import GtmConsent from "@/components/GtmConsent";
import CookieConsent from "@/components/CookieConsent";
import { LocaleProvider, type Locale } from "@/components/LocaleContext";

// Minimal standalone root for the OmniCure SEM landing pages: its own <html>,
// a logo-only header (no site nav — fewer exits, more conversions), GA + GTM.
// Both trackers are consent-gated: nothing loads until the visitor accepts
// cookies in the banner (same policy as the main site).
const LOGO = "/logo/etia-tech.png";

export default function LandingRoot({
  lang,
  children,
}: {
  lang: string;
  children: ReactNode;
}) {
  // Explore destination: the OmniCure catalogue page in this landing's language
  // (/product/omnicure, /th/product/omnicure, /vi/product/omnicure — all exist).
  const omnicureHref = lang === "en" ? "/product/omnicure" : `/${lang}/product/omnicure`;
  return (
    <html lang={lang}>
      <body className="min-h-screen bg-white" style={{ color: "#111827" }}>
        <LocaleProvider initialLocale={lang as Locale}>
          <Analytics />
          <GtmConsent />
          {/* Logo-only header. Both the logo and the text link lead to the
              OmniCure catalogue page (in this landing page's language) so organic
              search visitors can explore all OmniCure systems instead of being
              dead-ended on the standalone landing page — but no full nav, to keep
              the page focused on the quote form. */}
          <header className="border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
              <Link href={omnicureHref} aria-label="ETIA Technology" className="inline-flex">
                <Image src={LOGO} alt="ETIA Technology" width={110} height={36} className="object-contain" unoptimized />
              </Link>
              <Link href={omnicureHref} className="text-xs font-semibold text-gray-500 hover:text-[#143C96] transition-colors">
                {lang === "th" ? "ดูระบบ OmniCure ทั้งหมด →" : lang === "vi" ? "Xem tất cả hệ thống OmniCure →" : lang === "zh" ? "查看全部 OmniCure 产品 →" : "See all OmniCure systems →"}
              </Link>
            </div>
          </header>
          {children}
          <CookieConsent />
        </LocaleProvider>
      </body>
    </html>
  );
}
