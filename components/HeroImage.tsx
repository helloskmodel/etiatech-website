"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Hero right-panel image. One image → fixed; multiple → auto-rotating carousel
 * with clickable dots. Uses object-contain so the WHOLE image is always shown
 * (never cropped), inside a compact glass panel.
 */
export default function HeroImage({ images, alt, className = "" }: { images: readonly string[]; alt: string; className?: string }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className={`relative mx-auto w-full min-h-[260px] max-w-md overflow-hidden rounded-[28px] border border-[#DCE7F5] bg-gradient-to-br from-[#F5F8FF] via-white to-[#F2FBF8] p-4 shadow-[0_24px_80px_rgba(15,36,68,.10)] sm:p-6 lg:min-h-[340px] ${className}`}>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          priority={i === 0}
          sizes="(max-width: 1024px) 100vw, 38vw"
          className={`object-contain transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-[#143C96]" : "w-2 bg-[#143C96]/25"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
