"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

// Cross-fading rotating background for a page hero. Renders the images
// (next/image) with a blue gradient overlay on top so hero text stays
// readable. Sits behind the hero content (which should be relative).
export default function HeroBackdrop({
  images,
  interval = 5000,
}: {
  images: string[];
  interval?: number;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, interval]);

  return (
    <>
      {images.map((src, idx) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={idx === 0}
          sizes="100vw"
          className="object-cover transition-opacity duration-1000 ease-in-out"
          style={{ opacity: idx === i ? 1 : 0 }}
        />
      ))}
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
