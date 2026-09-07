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

// Records an EXPLICIT language choice — i.e. the visitor clicked the language
// switcher. Nothing else writes it.
//
// The name changed from `etia-locale` on purpose: the old cookie was also
// written by merely VISITING /zh, /vi or /th, which left the shared routes —
// the homepage included — stuck in that language for a year. Renaming makes
// every stale copy already sitting in visitors' browsers inert immediately,
// instead of waiting a year for it to expire.
const COOKIE = "etia-lang";
const LEGACY_COOKIE = "etia-locale";

type Ctx = { locale: Locale; setLocale: (l: Locale) => void };
const LocaleCtx = createContext<Ctx>({ locale: "en", setLocale: () => {} });

function readCookie(): Locale | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|;\s*)etia-lang=(en|zh|vi|th)/);
  return (m?.[1] as Locale) ?? null;
}

// The cookie only changes through setLocale below (which re-renders via state),
// so no change subscription is needed — the store hook exists to read the
// cookie hydration-safely: the server snapshot is null, and React re-reads on
// the client right after hydration.
const noSubscribe = () => () => {};

// `cookieDriven` says whether the saved language may override `initialLocale`.
// It is an explicit flag rather than "initialLocale === en" (what this used to
// infer) because those are two different things: the homepage is English AND
// locale-locked, and conflating them meant the server could render it in
// English while the client swapped it back to the cookie's language on hydration.
export function LocaleProvider({
  children,
  initialLocale = "en",
  cookieDriven = false,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
  cookieDriven?: boolean;
}) {
  const cookieLocale = useSyncExternalStore(noSubscribe, readCookie, () => null);
  const [override, setOverride] = useState<Locale | null>(null);
  // An explicit switcher click (override) always wins. Otherwise the saved
  // language applies only on the shared, cookie-driven routes.
  const locale = override ?? ((cookieDriven && cookieLocale) || initialLocale);

  useEffect(() => {
    // Landing on a locale-locked route (/zh, /vi, /th) deliberately does NOT
    // persist that language. It used to, and the result was that anyone who
    // opened the Thai page once — a Thai search result, or the team checking
    // their own site — got the Thai homepage at www.etiatech.com for the next
    // year, with the language switcher the only way back. Arriving on a
    // translated page is not the same as asking for that language everywhere,
    // so only the switcher (setLocale) writes the cookie now. Each language
    // has its own home URL anyway (/zh, /vi, /th), and every nav destination
    // has a localized version, so navigation within a language still works.
    //
    // Clear any leftover copy of the old cookie so it can't keep overriding
    // the homepage for visitors who already have one.
    if (document.cookie.includes(`${LEGACY_COOKIE}=`)) {
      document.cookie = `${LEGACY_COOKIE}=; path=/; max-age=0`;
    }
    // Keep <html lang> in sync with the EFFECTIVE locale so language-specific
    // CSS (e.g. CJK/Thai heading sizes) applies.
    document.documentElement.lang = locale === "zh" ? "zh-CN" : locale;
  }, [locale]);

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
