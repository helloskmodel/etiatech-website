"use client";
import { createContext, useContext, useEffect, useState } from "react";

// Supported locales. EN + ZH are live; VI/TH are reserved for later.
export type Locale = "en" | "zh" | "vi" | "th";
export const ACTIVE_LOCALES: Locale[] = ["en", "zh"];

// Maps the Nav button labels to locale codes.
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  zh: "CN",
  vi: "VN",
  th: "TH",
};

const COOKIE = "etia-locale";

type Ctx = { locale: Locale; setLocale: (l: Locale) => void };
const LocaleCtx = createContext<Ctx>({ locale: "en", setLocale: () => {} });

function readCookie(): Locale | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|;\s*)etia-locale=(en|zh|vi|th)/);
  return (m?.[1] as Locale) ?? null;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Restore saved choice on mount (client-only to avoid hydration mismatch).
  useEffect(() => {
    const saved = readCookie();
    if (saved) setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      document.cookie = `${COOKIE}=${l}; path=/; max-age=${60 * 60 * 24 * 365}`;
      document.documentElement.lang = l === "zh" ? "zh-CN" : l;
    } catch {
      /* ignore */
    }
  };

  return <LocaleCtx.Provider value={{ locale, setLocale }}>{children}</LocaleCtx.Provider>;
}

export function useLocale() {
  return useContext(LocaleCtx);
}

// Tiny helper for inline UI strings: t({ en: "...", zh: "..." }, locale).
export function t(s: { en: string; zh?: string }, locale: Locale): string {
  if (locale === "zh" && s.zh) return s.zh;
  return s.en;
}
