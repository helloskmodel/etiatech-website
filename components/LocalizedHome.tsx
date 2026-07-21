"use client";

import HomeView from "@/components/HomeView";
import LocalizedChrome from "@/components/LocalizedChrome";
import type { Locale } from "@/components/LocaleContext";

export default function LocalizedHome({ locale }: { locale: Locale }) {
  return (
    <LocalizedChrome locale={locale}>
      <HomeView />
    </LocalizedChrome>
  );
}
