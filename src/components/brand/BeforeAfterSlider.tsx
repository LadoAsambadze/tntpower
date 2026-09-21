"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/cn";

// კონტეინერის მაქსიმალური სიგანე 1216px — მეტს ბრაუზერ არ უნდა ითხოვდეს
const SIZES = "(min-width: 1280px) 1216px, 100vw";

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  alt: string;
  className?: string;
  /** საწყისი პოზიცია პროცენტებში */
  initial?: number;
}

/**
 * Before / After შედარება გასაწევი ხაზით.
 * მთელ ზედაპირზე გამჭვირვალე <input type="range"> დევს — ამიტომ მაუსით, თითით და კლავიატურით ერთნაირად მუშაობს.
 */
export function BeforeAfterSlider({
  before,
  after,
  alt,
  className,
  initial = 55,
}: BeforeAfterSliderProps) {
  const [pos, setPos] = useState(initial);
  const id = useId();

  return (
    <div
      className={cn(
        "group relative w-full select-none overflow-hidden rounded-2xl bg-ink-900",
        className,
      )}
    >
      {/* „შემდეგ" — სრულად */}
      <Image src={after} alt={`${alt} — შემდეგ`} fill sizes={SIZES} className="object-cover" />

      {/* „მანამდე" — მარცხნიდან ხაზამდე */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        aria-hidden="true"
      >
        <Image src={before} alt="" fill sizes={SIZES} className="object-cover" />
      </div>

      {/* გამყოფი ხაზი და სახელური */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
        style={{ left: `calc(${pos}% - 1px)` }}
        aria-hidden="true"
      >
        <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-500 text-ink-950 shadow-lg shadow-black/30 transition-transform group-hover:scale-105">
          <ChevronsLeftRight className="size-5" />
        </span>
      </div>

      {/* ლეიბლები */}
      <span className="pointer-events-none absolute top-3 left-3 rounded bg-ink-950/80 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white sm:top-4 sm:left-4">
        მანამდე
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded bg-brand-500 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-ink-950 sm:top-4 sm:right-4">
        შემდეგ
      </span>

      <label htmlFor={id} className="sr-only">
        {alt}: მანამდე / შემდეგ — გადაწიეთ ხაზი
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        step={0.5}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        aria-valuetext={`მანამდე ${Math.round(pos)}%`}
      />
    </div>
  );
}
