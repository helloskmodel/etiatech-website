"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

// Rotating hero background. To stay fast on mobile, it only loads the
// CURRENT image (priority) plus PRELOADS the next one — instead of
// downloading the whole set up front. Each new image fades in, with a
// blue gradient overlay on top so hero text stays readable.

function Fader({ src, priority }: { src: string; priority?: boolean }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(r);
  }, []);
  return (
    <Image
      src={src}
      alt=""
      fill
      priority={priority}
      quality={68}
      sizes="100vw"
      className="object-cover transition-opacity duration-700 ease-in-out"
      style={{ opacity: on ? 1 : 0 }}
    />
  );
}

export default function HeroBackdrop({
  images,
  interval = 6000,
}: {
  images: string[];
  interval?: number;
}) {
  const [i, setI] = useState(0);
  const n = images.length;

  useEffect(() => {
    if (n <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), interval);
    return () => clearInterval(t);
  }, [n, interval]);

  const next = n > 1 ? (i + 1) % n : i;

  return (
    <>
      {/* Current image (fades in) */}
      {images[i] && <Fader key={i} src={images[i]} priority />}

      {/* Preload the next image off-screen so the swap is instant —
          but never more than one extra download in flight. */}
      {n > 1 && (
        <Image
          key={`pre-${next}`}
          src={images[next]}
          alt=""
          fill
          quality={68}
          sizes="100vw"
          aria-hidden
          className="object-cover opacity-0 pointer-events-none"
        />
      )}

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(13,30,58,0.94) 0%, rgba(18,65,163,0.82) 50%, rgba(26,86,219,0.45) 100%)",
        }}
      />
    </>
  );
}
