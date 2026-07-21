"use client";
import { useLocale } from "@/components/LocaleContext";
import { CONTACT } from "@/components/omnicure/copy";

// Floating LINE chat button (standard practice on Thai sites): fixed to the
// bottom-right on every Thai-language page, linking to the Omnicure Thailand
// LINE Official Account. Renders nothing for other languages — pass `always`
// on Thai-only route trees that don't mount a LocaleProvider.
export default function LineFloatingButton({ always = false }: { always?: boolean }) {
  const { locale } = useLocale();
  if (!CONTACT.lineUrl || (!always && locale !== "th")) return null;
  return (
    <a
      href={CONTACT.lineUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="แชทกับเราทาง LINE"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5"
      style={{ background: "#06C755" }}
    >
      {/* LINE speech-bubble glyph */}
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 5.64 2 10.13c0 4.03 3.55 7.4 8.34 8.04.33.07.77.22.88.5.1.26.07.66.03.92l-.14.86c-.04.26-.2 1.01.88.55 1.08-.46 5.84-3.44 7.97-5.89C21.42 13.41 22 11.85 22 10.13 22 5.64 17.52 2 12 2z" />
      </svg>
      LINE
    </a>
  );
}
