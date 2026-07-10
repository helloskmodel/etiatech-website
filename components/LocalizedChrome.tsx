"use client";

import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { LocaleProvider, type Locale } from "@/components/LocaleContext";

// Page chrome for the locale-locked SEO routes (/zh, /vi, /th): the same
// Nav/Footer shell the (main) layout renders, but with the locale fixed by
// the URL instead of the etia-locale cookie, so every page under a locale
// prefix is crawlable in that language.
export default function LocalizedChrome({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <LocaleProvider initialLocale={locale}>
      <Analytics />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent />
    </LocaleProvider>
  );
}
