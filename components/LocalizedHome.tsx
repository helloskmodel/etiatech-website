"use client";

import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/Footer";
import HomeView from "@/components/HomeView";
import { LocaleProvider, type Locale } from "@/components/LocaleContext";
import Nav from "@/components/Nav";

export default function LocalizedHome({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider initialLocale={locale}>
      <Analytics />
      <Nav />
      <main className="flex-1"><HomeView /></main>
      <Footer />
      <CookieConsent />
    </LocaleProvider>
  );
}
