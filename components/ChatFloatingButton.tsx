"use client";
import { useLocale, type Locale } from "@/components/LocaleContext";
import { CONTACT } from "@/components/omnicure/copy";

// Floating chat button, fixed bottom-right, per-market messenger:
// Thai pages get LINE (Omnicure Thailand OA), Vietnamese pages get Zalo.
// Renders nothing when the visitor's language has no channel configured.
// Pass `force` on locale-locked route trees (/th, /vi) that don't mount a
// LocaleProvider of their own.
const CHANNELS: Partial<Record<Locale, { label: string; href: string; bg: string; aria: string }>> = {
  th: {
    label: "LINE",
    href: CONTACT.lineUrl,
    bg: "#06C755",
    aria: "แชทกับเราทาง LINE",
  },
  vi: {
    label: "Zalo",
    href: CONTACT.zaloUrl,
    bg: "#0068FF",
    aria: "Nhắn tin cho chúng tôi qua Zalo",
  },
};

export default function ChatFloatingButton({ force }: { force?: Locale }) {
  const { locale } = useLocale();
  const channel = CHANNELS[force ?? locale];
  if (!channel?.href) return null;
  return (
    <a
      href={channel.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={channel.aria}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5"
      style={{ background: channel.bg }}
    >
      {/* speech-bubble glyph */}
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 5.64 2 10.13c0 4.03 3.55 7.4 8.34 8.04.33.07.77.22.88.5.1.26.07.66.03.92l-.14.86c-.04.26-.2 1.01.88.55 1.08-.46 5.84-3.44 7.97-5.89C21.42 13.41 22 11.85 22 10.13 22 5.64 17.52 2 12 2z" />
      </svg>
      {channel.label}
    </a>
  );
}
