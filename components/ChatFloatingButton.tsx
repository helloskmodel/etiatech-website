"use client";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useLocale, type Locale } from "@/components/LocaleContext";
import { liveChatChannels, type ChatChannel } from "@/components/chatChannels";
import { useConsentBannerVisible } from "@/components/consentBanner";

// Floating chat button, fixed bottom-right.
//
// Every visitor sees all three messengers, whatever the page language: the
// channel list and the reasoning for it live in components/chatChannels.ts.
// With more than one channel the button is a tap-to-expand stack.
//
// Renders nothing when no channel is configured. Pass `force` on locale-locked
// route trees (/th, /vi, /zh) that don't mount a LocaleProvider of their own.

const TOGGLE_LABEL: Record<Locale, string> = { en: "Chat", zh: "在线咨询", th: "แชท", vi: "Chat" };
const TOGGLE_ARIA: Record<Locale, string> = {
  en: "Open chat options",
  zh: "展开在线咨询方式",
  th: "เปิดช่องทางแชท",
  vi: "Mở các kênh chat",
};
const CLOSE_ARIA: Record<Locale, string> = { en: "Close chat options", zh: "收起", th: "ปิด", vi: "Đóng" };

function Bubble() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 5.64 2 10.13c0 4.03 3.55 7.4 8.34 8.04.33.07.77.22.88.5.1.26.07.66.03.92l-.14.86c-.04.26-.2 1.01.88.55 1.08-.46 5.84-3.44 7.97-5.89C21.42 13.41 22 11.85 22 10.13 22 5.64 17.52 2 12 2z" />
    </svg>
  );
}

const PILL = "flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5";
const ANCHOR = "fixed right-5 z-50 transition-[bottom] duration-300";
// The cookie banner is fixed to the bottom of the viewport and sits above this
// button (z-60 vs z-50), so on a first visit it covers the button and swallows
// the tap. Lift the button clear while the banner is up. The offsets clear the
// banner's measured height at each layout — 183px stacked (below md), 133px as
// a row (md), 113px once it is wider (lg) — plus a small gap.
const ANCHOR_ABOVE_BANNER = "bottom-52 md:bottom-36 lg:bottom-32";
const ANCHOR_DEFAULT = "bottom-5";

export default function ChatFloatingButton({ force }: { force?: Locale }) {
  const { locale } = useLocale();
  const active = force ?? locale;
  const channels = liveChatChannels();
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const bannerUp = useConsentBannerVisible();
  const anchor = `${ANCHOR} ${bannerUp ? ANCHOR_ABOVE_BANNER : ANCHOR_DEFAULT}`;

  // Dismiss the expanded stack on Escape or a click outside it.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [menuOpen]);

  if (!channels.length) return null;

  const renderChannel = (c: ChatChannel, key: string) => (
    <a key={key} href={c.href} target="_blank" rel="noopener noreferrer" aria-label={c.aria[active]} className={PILL} style={{ background: c.bg }}>
      <Bubble />
      {c.label}
    </a>
  );

  // One channel — no menu, the button IS the channel.
  if (channels.length === 1) {
    return <div className={anchor}>{renderChannel(channels[0], "only")}</div>;
  }

  return (
    <>
      <div ref={wrapRef} className={`${anchor} flex flex-col items-end gap-2`}>
        {menuOpen && (
          <div className="flex flex-col items-end gap-2">
            {/* The stack opens upward, so render it reversed: the primary
                channel ends up nearest the toggle, within easy thumb reach,
                instead of furthest away at the top. */}
            {channels
              .map((c, i) => renderChannel(c, `${c.label}-${i}`))
              .reverse()}
          </div>
        )}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? CLOSE_ARIA[active] : TOGGLE_ARIA[active]}
          className={PILL}
          style={{ background: menuOpen ? "#5F6C7B" : "#1A56DB" }}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Bubble />}
          {TOGGLE_LABEL[active]}
        </button>
      </div>
    </>
  );
}
