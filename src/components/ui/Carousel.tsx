"use client";

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { useI18n } from "@/i18n/client";

interface CarouselProps {
  children: ReactNode;
  /** სქრინრიდერისთვის — რა არის ამ ლენტაში */
  label: string;
  /**
   * რამდენი ელემენტი ჩანს ერთდროულად, ბრეიკპოინტების მიხედვით — CSS ცვლადით.
   * წილადი მნიშვნელობა (1.15) მობილურზე შემდეგი ბარათის „კიდეს" აჩენს — ნიშანი, რომ გადაფურცვლა შეიძლება.
   */
  perView?: string;
  /** ელემენტებს შორის მანძილი — CSS ცვლადით, მაგ. "[--gap:1rem]" */
  gap?: string;
  /** მუქ ფონზე — ღია ისრები და წერტილები */
  light?: boolean;
  /** ისრებისა და წერტილების ჩვენება */
  controls?: boolean;
  className?: string;
  itemClassName?: string;
}

/* ელემენტის სიგანე: (ხილული სიგანე − დაშორებები) ÷ ხილული ელემენტების რაოდენობა */
const itemStyle: CSSProperties = {
  flex: "0 0 calc((100% - (var(--per-view) - 1) * var(--gap)) / var(--per-view))",
};

/** მოცემულ scrollLeft-თან ყველაზე ახლო გაჩერების ინდექსი */
function nearest(stops: number[], x: number): number {
  let best = 0;
  let bestDist = Infinity;
  stops.forEach((s, i) => {
    const d = Math.abs(s - x);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  });
  return best;
}

/**
 * ჰორიზონტალური ლენტა CSS scroll-snap-ზე — მობილურზე თითით, დესკტოპზე ისრებით.
 * ბავშვები სერვერზე რენდერდება; კლიენტზე მხოლოდ სქროლის მდგომარეობა იზომება.
 */
export function Carousel({
  children,
  label,
  perView = "[--per-view:1.15] sm:[--per-view:2] lg:[--per-view:3]",
  gap = "[--gap:1.25rem]",
  light = false,
  controls = true,
  className,
  itemClassName,
}: CarouselProps) {
  const { tr } = useI18n();
  const trackRef = useRef<HTMLDivElement>(null);
  const stopsRef = useRef<number[]>([]);
  // null — ჯერ არ გაზომილა (SSR); [] — არ სქროლდება; [..] — გაჩერების წერტილები
  const [stops, setStops] = useState<number[] | null>(null);
  const [index, setIndex] = useState(0);
  const items = Children.toArray(children);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const padLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const next = Array.from(track.children, (el) => (el as HTMLElement).offsetLeft - padLeft).filter(
      (p) => p < maxScroll - 1,
    );
    // ბოლო ელემენტები სრულად ვერ „გაჩერდებიან" თავიდან — ბოლო გაჩერება სქროლის ბოლოა
    if (maxScroll > 1) next.push(maxScroll);
    stopsRef.current = next;
    setStops(next);
    setIndex(nearest(next, track.scrollLeft));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setIndex(nearest(stopsRef.current, track.scrollLeft)));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [measure]);

  const scrollToStop = (i: number) => {
    const track = trackRef.current;
    const s = stopsRef.current;
    if (!track || s.length === 0) return;
    const target = s[Math.max(0, Math.min(s.length - 1, i))];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" });
  };

  const showControls = controls && (stops === null || stops.length > 1);
  const atStart = index === 0;
  const atEnd = stops !== null && index >= stops.length - 1;

  const arrow = cn(
    "flex size-11 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-30",
    light
      ? "border-white/30 text-white hover:border-white hover:bg-white hover:text-ink-950"
      : "border-ink-300 text-ink-900 hover:border-ink-950 hover:bg-ink-950 hover:text-white",
  );

  return (
    <div className={cn("min-w-0", className)}>
      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
        className={cn(
          "relative flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain scrollbar-none motion-safe:scroll-smooth",
          "gap-[var(--gap)] -mx-4 px-4 scroll-px-4 sm:-mx-6 sm:px-6 sm:scroll-px-6 lg:mx-0 lg:px-0 lg:scroll-px-0",
          // ვერტიკალური „ჰაერი", რომ ბარათების ჩრდილი და ფოკუსის რგოლი არ ჩამოიჭრას
          "-mt-2 -mb-4 pt-2 pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
          perView,
          gap,
        )}
      >
        {items.map((child, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${items.length}`}
            className={cn("min-w-0 snap-start", itemClassName)}
            style={itemStyle}
          >
            {child}
          </div>
        ))}
      </div>

      {showControls && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1" aria-hidden={stops === null ? true : undefined}>
            {stops?.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToStop(i)}
                aria-label={`${tr("სლაიდი ")}${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className="flex h-8 items-center px-0.5"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-300",
                    i === index
                      ? "w-7 bg-brand-500"
                      : light
                        ? "w-1.5 bg-white/30 hover:bg-white/60"
                        : "w-1.5 bg-ink-300 hover:bg-ink-500",
                  )}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollToStop(index - 1)}
              disabled={atStart}
              aria-label={tr("წინა")}
              className={arrow}
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollToStop(index + 1)}
              disabled={atEnd}
              aria-label={tr("შემდეგი")}
              className={arrow}
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
