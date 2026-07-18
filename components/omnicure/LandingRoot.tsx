import type { ReactNode } from "react";
import Image from "next/image";
import Analytics from "@/components/Analytics";
import GtmConsent from "@/components/GtmConsent";
import CookieConsent from "@/components/CookieConsent";
import { LocaleProvider, type Locale } from "@/components/LocaleContext";

// Minimal standalone root for the OmniCure SEM landing pages: its own <html>,
// a logo-only header (no site nav — fewer exits, more conversions), GA + GTM.
// Both trackers are consent-gated: nothing loads until the visitor accepts
// cookies in the banner (same policy as the main site).
const LOGO =
  "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo/ETIALOGO.jpg";

export default function LandingRoot({
  lang,
  children,
}: {
  lang: string;
  children: ReactNode;
}) {
  return (
    <html lang={lang}>
      <body className="min-h-screen bg-white" style={{ color: "#111827" }}>
        <LocaleProvider initialLocale={lang as Locale}>
          <Analytics />
          <GtmConsent />
          {/* Logo-only header */}
          <header className="border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center">
              <Image src={LOGO} alt="ETIA Technology" width={110} height={36} className="object-contain" unoptimized />
            </div>
          </header>
          {children}
          <CookieConsent />
        </LocaleProvider>
      </body>
    </html>
  );
}
