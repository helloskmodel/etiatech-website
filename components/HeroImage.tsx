"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Hero right-panel image. One image → fixed; multiple → auto-rotating carousel
 * with clickable dots. Styled as the site-standard rounded glass panel.
 */
export default function HeroImage({ images, alt, className = "" }: { images: readonly string[]; alt: string; className?: string }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className={`relative min-h-[320px] overflow-hidden rounded-[32px] border border-white/80 bg-white shadow-[0_25px_80px_rgba(20,60,150,.12)] lg:min-h-[440px] ${className}`}>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          priority={i === 0}
          sizes="(max-width: 1024px) 100vw, 46vw"
          className={`object-cover transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/60"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
