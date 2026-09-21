"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/i18n/client";

interface VideoReelProps {
  src: string;
  poster: string;
  caption?: string;
  /** ჩარჩოს პროპორცია (Tailwind კლასი) — ნაგულისხმევად პორტრეტული 9:16 */
  aspect?: string;
  className?: string;
}

/**
 * პორტრეტული ვიდეო-ჩარჩო — ჩუმად, ავტომატურად, ციკლურად.
 * `muted` პროგრამულად ვაყენებთ, რადგან React SSR-ში ატრიბუტს არ წერს და autoplay იბლოკება.
 */
export function VideoReel({ src, poster, caption, aspect = "aspect-[9/16]", className }: VideoReelProps) {
  const { tr } = useI18n();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    video.play().catch(() => {
      /* ბრაუზერმა autoplay დაბლოკა — poster რჩება */
    });
  }, []);

  return (
    <figure
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-2xl shadow-black/50",
        aspect,
        className,
      )}
    >
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        poster={poster}
        loop
        playsInline
        preload="metadata"
        muted
        aria-label={caption ?? tr("TNT POWER — ვიდეო")}
      >
        <source src={src} type="video/mp4" />
      </video>
      <span className="absolute inset-y-0 right-0 w-1.5 bg-brand-500" aria-hidden="true" />
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/95 via-ink-950/60 to-transparent px-5 pt-16 pb-5">
          <p className="font-brand text-[0.7rem] uppercase tracking-[0.22em] text-brand-400">
            Renovate your house
          </p>
          <p className="mt-1 text-sm font-semibold text-white">{caption}</p>
        </figcaption>
      )}
    </figure>
  );
}
