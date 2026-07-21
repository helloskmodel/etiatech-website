import type { Metadata } from "next";
import { cookies } from "next/headers";
import "../globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import ChatFloatingButton from "@/components/ChatFloatingButton";
import Analytics from "@/components/Analytics";
import { LocaleProvider, type Locale } from "@/components/LocaleContext";

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
          <ChatFloatingButton />
        </LocaleProvider>
      </body>
    </html>
  );
}
