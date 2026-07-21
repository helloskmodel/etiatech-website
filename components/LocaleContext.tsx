"use client";
import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";

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

// The cookie only changes through setLocale below (which re-renders via state),
// so no change subscription is needed — the store hook exists to read the
// cookie hydration-safely: the server snapshot is null, and React re-reads on
// the client right after hydration.
const noSubscribe = () => () => {};

export function LocaleProvider({ children, initialLocale = "en" }: { children: React.ReactNode; initialLocale?: Locale }) {
  const cookieLocale = useSyncExternalStore(noSubscribe, readCookie, () => null);
  const [override, setOverride] = useState<Locale | null>(null);
  // On the default (en) routes, a saved cookie restores the chosen locale.
  const locale = override ?? (initialLocale === "en" && cookieLocale ? cookieLocale : initialLocale);

  useEffect(() => {
    // On a locale-locked route (/zh, /vi, /th) persist the language into the
    // cookie, so the cookie-based (main) routes the visitor navigates to next
    // (Applications, Insights, Contact…) render in the SAME language instead
    // of bouncing back to English.
    if (initialLocale !== "en" && readCookie() !== initialLocale) {
      document.cookie = `${COOKIE}=${initialLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    }
    // Keep <html lang> in sync with the EFFECTIVE locale so language-specific
    // CSS (e.g. CJK/Thai heading sizes) applies.
    document.documentElement.lang = locale === "zh" ? "zh-CN" : locale;
  }, [locale, initialLocale]);

  const setLocale = (l: Locale) => {
    setOverride(l);
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
