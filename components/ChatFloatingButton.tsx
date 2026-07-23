"use client";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useLocale, type Locale } from "@/components/LocaleContext";
import { CONTACT } from "@/components/omnicure/copy";

// Floating chat button, fixed bottom-right, per-market messenger:
// Thai and English pages get LINE (Omnicure Thailand OA), Vietnamese pages
// get Zalo, and Chinese pages get a WeChat QR modal (WeChat has no direct
// chat link, so the button opens a scan-to-add card instead). Renders
// nothing when the visitor's language has no channel configured. Pass
// `force` on locale-locked route trees (/th, /vi, /zh) that don't mount a
// LocaleProvider of their own.
const WECHAT_QR = "/images/etia-wechat-qr.jpg";

type LinkChannel = { kind: "link"; label: string; href: string; bg: string; aria: string };
type WeChatChannel = { kind: "wechat"; label: string; bg: string; aria: string };
type Channel = LinkChannel | WeChatChannel;

const CHANNELS: Partial<Record<Locale, Channel>> = {
  th: { kind: "link", label: "LINE", href: CONTACT.lineUrl, bg: "#06C755", aria: "แชทกับเราทาง LINE" },
  en: { kind: "link", label: "LINE", href: CONTACT.lineUrl, bg: "#06C755", aria: "Chat with us on LINE" },
  vi: { kind: "link", label: "Zalo", href: CONTACT.zaloUrl, bg: "#0068FF", aria: "Nhắn tin cho chúng tôi qua Zalo" },
  zh: { kind: "wechat", label: "微信", bg: "#07C160", aria: "扫码添加微信咨询" },
};

function Bubble() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 5.64 2 10.13c0 4.03 3.55 7.4 8.34 8.04.33.07.77.22.88.5.1.26.07.66.03.92l-.14.86c-.04.26-.2 1.01.88.55 1.08-.46 5.84-3.44 7.97-5.89C21.42 13.41 22 11.85 22 10.13 22 5.64 17.52 2 12 2z" />
    </svg>
  );
}

export default function ChatFloatingButton({ force }: { force?: Locale }) {
  const { locale } = useLocale();
  const [qrOpen, setQrOpen] = useState(false);
  const channel = CHANNELS[force ?? locale];
  if (!channel) return null;

  const buttonClass =
    "fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5";

  if (channel.kind === "link") {
    if (!channel.href) return null;
    return (
      <a href={channel.href} target="_blank" rel="noopener noreferrer" aria-label={channel.aria} className={buttonClass} style={{ background: channel.bg }}>
        <Bubble />
        {channel.label}
      </a>
    );
  }

  // WeChat: open a scan-to-add QR card.
  return (
    <>
      <button type="button" onClick={() => setQrOpen(true)} aria-label={channel.aria} aria-haspopup="dialog" className={buttonClass} style={{ background: channel.bg }}>
        <Bubble />
        {channel.label}
      </button>
      {qrOpen && (
        <div role="dialog" aria-modal="true" aria-label="微信二维码" className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={() => setQrOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative w-full max-w-xs rounded-2xl bg-white p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => setQrOpen(false)} aria-label="关闭" className="absolute right-3 top-3 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
            <p className="text-sm font-bold text-gray-900">微信扫码咨询</p>
            <p className="mt-1 text-xs text-gray-500">扫一扫添加「上海怡天科技」,工程师在线解答 UV 固化选型与工艺问题。</p>
            <div className="relative mx-auto mt-4 aspect-[640/922] w-full overflow-hidden rounded-lg border border-gray-100">
              <Image src={WECHAT_QR} alt="上海怡天科技 微信二维码" fill sizes="320px" className="object-contain" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
