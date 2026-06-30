"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

// Rotating hero background. To stay fast on mobile, it only loads the
// CURRENT image (priority) and defers preloading the next one until the
// current image has loaded AND the browser is idle — so the second
// download never competes with the LCP image on first paint.
// The image sits under a heavy blue gradient, so a low quality is
// visually indistinguishable but much lighter.

const HERO_QUALITY = 50;

function Fader({
  src,
  priority,
  onReady,
}: {
  src: string;
  priority?: boolean;
  onReady?: () => void;
}) {
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
      quality={HERO_QUALITY}
      sizes="100vw"
      onLoad={onReady}
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
  // Only start preloading upcoming images once the first image is on screen
  // and the main thread is idle — keeps the critical path clear for LCP.
  const [canPreload, setCanPreload] = useState(false);
  const n = images.length;

  useEffect(() => {
    if (n <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), interval);
    return () => clearInterval(t);
  }, [n, interval]);

  const armPreload = () => {
    if (canPreload) return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      w.requestIdleCallback(() => setCanPreload(true));
    } else {
      setTimeout(() => setCanPreload(true), 1200);
    }
  };

  const next = n > 1 ? (i + 1) % n : i;

  return (
    <>
      {/* Current image (fades in). Preloading of the next image is armed
          only after this one finishes loading. */}
      {images[i] && <Fader key={i} src={images[i]} priority onReady={armPreload} />}

      {/* Preload the next image off-screen so the swap is instant — but
          never before the LCP image has loaded, and never more than one
          extra download in flight. */}
      {n > 1 && canPreload && (
        <Image
          key={`pre-${next}`}
          src={images[next]}
          alt=""
          fill
          quality={HERO_QUALITY}
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
