import type { Metadata } from "next";
import { cookies } from "next/headers";
import "../globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import { LocaleProvider, type Locale } from "@/components/LocaleContext";

const LOCALES: Locale[] = ["en", "zh", "vi", "th"];

const SITE = "https://www.etiatech.com";
// Site-wide default social-share image. Pages with a more specific image
// (product photos, article covers) set their own openGraph.images and override
// this. Using the brand logo keeps otherwise image-less pages from producing a
// blank social card.
const DEFAULT_OG_IMAGE = "https://etiatech-1303055923.cos.ap-singapore.myqcloud.com/IMAGE/logo/ETIALOGO.jpg";

export const metadata: Metadata = {
  // Resolves relative canonical/alternate/openGraph URLs used across pages and
  // silences the Next.js "metadataBase is not set" warning.
  metadataBase: new URL(SITE),
  title: "ETIA Technology — UV Curing Solutions",
  description: "Your UV Curing Partner — From Selection to Support. 20 years of expertise across 9 industries.",
  // Google Search Console verification (HTML-tag method for a URL-prefix property).
  // Renders <meta name="google-site-verification" content="…"> site-wide.
  verification: {
    google: "QKJZDJBYBrGyCIbghtQaFr9jf64cdGFpMYoPE6qUnhE",
  },
  // Site-wide social-share defaults. Next.js does NOT deep-merge openGraph /
  // twitter: any page that defines its own openGraph/twitter replaces these
  // entirely, so page-specific pages already set their own. These defaults only
  // apply to pages that don't — ensuring every route still gets a usable card.
  openGraph: {
    type: "website",
    siteName: "ETIA Technology",
    locale: "en_US",
    title: "ETIA Technology — UV Curing Solutions",
    description: "Your UV Curing Partner — From Selection to Support. 20 years of expertise across 9 industries.",
    images: [{ url: DEFAULT_OG_IMAGE, alt: "ETIA Technology — UV Curing Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ETIA Technology — UV Curing Solutions",
    description: "Your UV Curing Partner — From Selection to Support. 20 years of expertise across 9 industries.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Read the visitor's saved language server-side so the page is rendered in the
  // right language on the FIRST paint — otherwise the server renders English and
  // the client re-renders after reading the cookie, causing a visible flash.
  const cookieLocale = (await cookies()).get("etia-locale")?.value;
  const locale: Locale = LOCALES.includes(cookieLocale as Locale) ? (cookieLocale as Locale) : "en";
  const htmlLang = locale === "zh" ? "zh-CN" : locale;

  return (
    <html lang={htmlLang}>
      <body className="min-h-screen flex flex-col" style={{ background: "#ffffff", color: "#111827" }}>
        <Analytics />
        <LocaleProvider initialLocale={locale}>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </LocaleProvider>
      </body>
    </html>
  );
}
