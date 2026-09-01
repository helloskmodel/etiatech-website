"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useLocale, type Locale } from "@/components/LocaleContext";
import { CONTACT } from "@/components/omnicure/copy";
import { useConsentBannerVisible } from "@/components/consentBanner";

// Floating chat button, fixed bottom-right, per-market messengers.
//
// Single-market pages keep one channel and stay one tap: /th → LINE,
// /vi → Zalo. Those two messengers are near-universal in their own markets,
// so a second icon there is clutter.
//
// The EN and ZH pages carry several, because neither serves one country:
// EN covers everything outside TH/VN/CN (Malaysia, Singapore, Indonesia,
// the Philippines), and ZH is read by Chinese-speaking factory staff *inside*
// Southeast Asia — Bac Ninh, Haiphong, eastern Thailand — who use WeChat with
// head office and a local messenger with everyone around them. Those pages
// render a tap-to-expand stack, primary channel first. Three is the cap: more
// reads as a link farm and visitors pick none.
//
// Renders nothing when the visitor's language has no channel configured. Pass
// `force` on locale-locked route trees (/th, /vi, /zh) that don't mount a
// LocaleProvider of their own.
const WECHAT_QR = "/images/etia-wechat-qr.jpg";

type LinkChannel = { kind: "link"; label: string; href: string; bg: string; aria: string };
// A personal WeChat account can only be added by scanning, so this variant
// opens a QR card instead of navigating. Currently unused — the WeCom
// customer-service link works as a plain URL — but kept for when the WeCom
// QR image lands, so that button can show the code inline.
type WeChatChannel = { kind: "wechat"; label: string; bg: string; aria: string };
type Channel = LinkChannel | WeChatChannel;

const whatsapp = (aria: string): Channel => ({ kind: "link", label: "WhatsApp", href: CONTACT.whatsappUrl, bg: "#25D366", aria });
const line = (aria: string): Channel => ({ kind: "link", label: "LINE", href: CONTACT.lineUrl, bg: "#06C755", aria });
const zalo = (aria: string): Channel => ({ kind: "link", label: "Zalo", href: CONTACT.zaloUrl, bg: "#0068FF", aria });
const wechat = (aria: string): Channel => ({ kind: "link", label: "微信", href: CONTACT.wecomUrl, bg: "#07C160", aria });

const CHANNELS: Partial<Record<Locale, Channel[]>> = {
  th: [line("แชทกับเราทาง LINE")],
  vi: [zalo("Nhắn tin cho chúng tôi qua Zalo")],
  en: [
    whatsapp("Chat with us on WhatsApp"),
    line("Chat with us on LINE"),
    wechat("Chat with us on WeChat"),
  ],
  zh: [
    wechat("通过企业微信客服咨询"),
    whatsapp("通过 WhatsApp 咨询"),
    line("通过 LINE 咨询"),
  ],
};

// Label on the collapsed button when several channels are offered. Naming the
// primary channel there would be a trap — the tap opens the menu, not that app.
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
  const channels = CHANNELS[active];
  const [qrOpen, setQrOpen] = useState(false);
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

  if (!channels?.length) return null;

  const qrCard = qrOpen ? (
    <div role="dialog" aria-modal="true" aria-label="微信二维码" className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={() => setQrOpen(false)}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative w-full max-w-xs rounded-2xl bg-white p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={() => setQrOpen(false)} aria-label="关闭" className="absolute right-3 top-3 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
          <X className="h-5 w-5" />
        </button>
        <p className="text-sm font-bold text-gray-900">微信扫码咨询</p>
        <p className="mt-1 text-xs text-gray-500">扫一扫添加客服,工程师在线解答 UV 固化选型与工艺问题。</p>
        <div className="relative mx-auto mt-4 aspect-[640/922] w-full overflow-hidden rounded-lg border border-gray-100">
          <Image src={WECHAT_QR} alt="ETIA 微信客服二维码" fill sizes="320px" className="object-contain" />
        </div>
      </div>
    </div>
  ) : null;

  const renderChannel = (c: Channel, key: string) =>
    c.kind === "link" ? (
      c.href ? (
        <a key={key} href={c.href} target="_blank" rel="noopener noreferrer" aria-label={c.aria} className={PILL} style={{ background: c.bg }}>
          <Bubble />
          {c.label}
        </a>
      ) : null
    ) : (
      <button key={key} type="button" onClick={() => { setQrOpen(true); setMenuOpen(false); }} aria-label={c.aria} aria-haspopup="dialog" className={PILL} style={{ background: c.bg }}>
        <Bubble />
        {c.label}
      </button>
    );

  // One channel — no menu, the button IS the channel.
  if (channels.length === 1) {
    const only = renderChannel(channels[0], "only");
    if (!only) return null;
    return (
      <>
        <div className={anchor}>{only}</div>
        {qrCard}
      </>
    );
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
      {qrCard}
    </>
  );
}
