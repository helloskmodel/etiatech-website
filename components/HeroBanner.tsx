import Image from "next/image";

/**
 * Light, blurred case-study photo used as a hero background banner. Sits behind
 * the hero content (absolute, fills the section — the parent must be
 * `relative overflow-hidden`). A soft white overlay keeps foreground text fully
 * readable. Pass a case-study image URL via `src`.
 */
export default function HeroBanner({ src }: { src: string }) {
  if (!src) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Decorative background sitting behind a heavy white overlay, so it is
          loaded lazily at reduced quality — it must not block the hero text
          (the real LCP) or re-download at full weight on every navigation. */}
      <Image src={src} alt="" fill loading="lazy" quality={55} sizes="100vw" className="object-cover object-center" />
      {/* Left stays opaque-white so hero text is readable; the right fades out
          so the high-tech photo shows through crisply. */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/35" />
    </div>
  );
}
