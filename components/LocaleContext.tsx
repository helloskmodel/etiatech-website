"use client";
import { createContext, useContext, useEffect, useState } from "react";

// Supported locales. EN + ZH are live; VI/TH are reserved for later.
export type Locale = "en" | "zh" | "vi" | "th";
export const ACTIVE_LOCALES: Locale[] = ["en", "zh", "vi", "th"];

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

export function LocaleProvider({ children, initialLocale = "en" }: { children: React.ReactNode; initialLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // Restore saved choice on mount (client-only to avoid hydration mismatch).
  useEffect(() => {
    const saved = readCookie();
    if (initialLocale === "en" && saved) setLocaleState(saved);
    document.documentElement.lang = initialLocale === "zh" ? "zh-CN" : initialLocale;
  }, [initialLocale]);

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

// A string localized into any supported locale. `en` is required and used
// as the fallback; add zh/vi/th as translations become available.
export type LangText = { en: string; zh?: string; vi?: string; th?: string };

// Tiny helper for inline UI strings: t({ en: "...", zh: "..." }, locale).
// Returns the active locale's text, falling back to English.
export function t(s: LangText, locale: Locale): string {
  return s[locale] ?? s.en;
}
