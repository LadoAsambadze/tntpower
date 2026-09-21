"use client";

import { useEffect, useState } from "react";

interface HeroVideoProps {
  src: string;
  poster: string;
  className?: string;
}

/**
 * ფონური ვიდეო hero-სთვის.
 * იტვირთება მხოლოდ ≥768px ეკრანზე და როცა მომხმარებელს ანიმაცია არ აქვს შეზღუდული —
 * მობილურზე მხოლოდ poster-ფოტო რჩება (ტრაფიკის დაზოგვა).
 */
export function HeroVideo({ src, poster, className }: HeroVideoProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(wide.matches && !reduce.matches);
    update();
    wide.addEventListener("change", update);
    reduce.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      reduce.removeEventListener("change", update);
    };
  }, []);

  if (!enabled) return null;

  return (
    <video
      className={className}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      ref={(el) => {
        // React SSR-ში `muted` ატრიბუტი არ იწერება — პროგრამულად ვაყენებთ, რომ autoplay არ დაიბლოკოს
        if (el) {
          el.muted = true;
          el.defaultMuted = true;
        }
      }}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
