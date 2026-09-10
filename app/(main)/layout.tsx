import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import "../globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import ChatFloatingButton from "@/components/ChatFloatingButton";
import Analytics from "@/components/Analytics";
import { LocaleProvider, type Locale } from "@/components/LocaleContext";
import { InquiryProvider } from "@/components/inquiry/InquiryContext";
import InquiryBar from "@/components/inquiry/InquiryBar";

const LOCALES: Locale[] = ["en", "zh", "vi", "th"];

export const metadata: Metadata = {
  title: "ETIA Technology — UV Curing Solutions",
  description: "Your UV Curing Partner — From Selection to Support. 20 years of expertise across 9 industries.",
  // Google Search Console verification (HTML-tag method for a URL-prefix property).
  // Renders <meta name="google-site-verification" content="…"> site-wide.
  verification: {
    google: "QKJZDJBYBrGyCIbghtQaFr9jf64cdGFpMYoPE6qUnhE",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // The bare homepage is always English. www.etiatech.com is the front door for
  // every market at once, and where a visitor happens to be browsing from says
  // little about the language they read — someone on a Bangkok connection may
  // be a Thai engineer, an American buyer posted there, or a Chinese customer
  // travelling. English is the common ground; /zh, /vi and /th are each a click
  // (or a direct URL) away. `proxy.ts` supplies the pathname, which a layout
  // cannot otherwise see.
  const isHome = (await headers()).get("x-etia-pathname") === "/";

  // Everywhere else, the visitor's saved language is applied server-side so the
  // page is rendered in the right language on the FIRST paint — otherwise the
  // server renders English and the client re-renders after reading the cookie,
  // causing a visible flash.
  //
  // `etia-lang` is only ever written by the language switcher, so this reflects
  // a deliberate choice. (Its predecessor `etia-locale` was also set by simply
  // visiting /zh, /vi or /th, which made this line serve the homepage in Thai
  // to anyone who had once opened the Thai page — see LocaleContext.)
  const cookieLocale = (await cookies()).get("etia-lang")?.value;
  const saved: Locale = LOCALES.includes(cookieLocale as Locale) ? (cookieLocale as Locale) : "en";
  const locale: Locale = isHome ? "en" : saved;
  const htmlLang = locale === "zh" ? "zh-CN" : locale;

  return (
    <html lang={htmlLang}>
      <body className="min-h-screen flex flex-col" style={{ background: "#ffffff", color: "#111827" }}>
        <Analytics />
        <LocaleProvider initialLocale={locale} cookieDriven={!isHome}>
          <InquiryProvider>
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieConsent />
            <ChatFloatingButton />
            <InquiryBar />
          </InquiryProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
