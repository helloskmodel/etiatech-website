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
      <Image src={src} alt="" fill priority sizes="100vw" className="scale-105 object-cover blur-[2px]" />
      {/* Left stays opaque-white so hero text is readable; the right fades out
          so the high-tech photo shows through crisply. */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/35" />
    </div>
  );
}
