"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Megaphone } from "lucide-react";
import { useLocale, t } from "@/components/LocaleContext";
import { activeNews, resolveNewsHref, type NewsKind } from "@/data/newsTicker";

const KIND_LABEL: Record<NewsKind, string> = {
  product: "NEW PRODUCT",
  event: "NEW EVENT",
  promotion: "NEW PROMOTION",
};

// Badge colors stay within the site palette: blue for products, deep blue for
// events, green for promotions.
const KIND_STYLE: Record<NewsKind, { color: string; background: string }> = {
  product: { color: "#1A56DB", background: "#EEF6FF" },
  event: { color: "#143C96", background: "#E4ECFB" },
  promotion: { color: "#2F7D20", background: "#F0F9EA" },
};

const ROTATE_MS = 5000;

// Homepage announcement bar: auto-rotates through data/newsTicker.ts items,
// pauses on hover, and renders every item in the DOM (only one visible) so
// all messages stay crawlable.
export default function NewsTicker() {
  const { locale } = useLocale();
  const [items] = useState(() => activeNews());
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (items.length <= 1 || paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), ROTATE_MS);
    return () => clearInterval(timer);
  }, [items.length, paused]);

  if (items.length === 0) return null;

  return (
    <div
      className="border-b border-[#D9E4EA] bg-[#F7FAFF]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto flex h-11 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Megaphone className="h-4 w-4 shrink-0 text-[#41A62A]" strokeWidth={2} />
        <div className="relative h-full flex-1 overflow-hidden">
          {items.map((item, i) => {
            const href = resolveNewsHref(item.href, locale);
            const style = KIND_STYLE[item.kind];
            const active = i === index;
            const body = (
              <>
                <span
                  className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold tracking-[.08em]"
                  style={{ color: style.color, background: style.background }}
                >
                  {KIND_LABEL[item.kind]}
                </span>
                <span className="truncate text-sm text-[#102038]">{t(item.text, locale)}</span>
                {href && <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#667085]" />}
              </>
            );
            const itemClass = `absolute inset-0 flex items-center gap-2.5 transition-all duration-500 ${
              active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"
            }`;
            return href ? (
              <Link key={item.id} href={href} aria-hidden={!active} tabIndex={active ? 0 : -1} className={`${itemClass} hover:opacity-80`}>
                {body}
              </Link>
            ) : (
              <div key={item.id} aria-hidden={!active} className={itemClass}>
                {body}
              </div>
            );
          })}
        </div>
        {items.length > 1 && (
          <div className="flex shrink-0 items-center gap-1.5">
            {items.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Show announcement ${i + 1}`}
                onClick={() => setIndex(i)}
                className="h-1.5 rounded-full transition-all"
                style={{ width: i === index ? 16 : 6, background: i === index ? "#1A56DB" : "#C6D4E2" }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
