import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import Analytics from "@/components/Analytics";

// Minimal standalone root for the OmniCure SEM landing pages: its own <html>,
// a logo-only header (no site nav — fewer exits, more conversions), GA + GTM.
const LOGO =
  "/logo/etia-tech.png";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

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
        <Analytics />
        {GTM_ID && (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>
          </>
        )}
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
      </body>
    </html>
  );
}
