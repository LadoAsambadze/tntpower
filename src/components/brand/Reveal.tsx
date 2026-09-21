"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** დაყოვნება მილიწამებში — მეზობელი ელემენტების თანმიმდევრული გამოჩენისთვის */
  delay?: number;
}

/**
 * ეკრანზე შემოსვლისას რბილად გამოჩენა (ფეიდი + მცირე აწევა).
 * სერვერზე ჩვეულებრივად რენდერდება; კლიენტზე მხოლოდ ეკრანს ქვემოთ მყოფ ბლოკებს ვმალავთ,
 * ამიტომ არც hydration ირღვევა და არც JS-ის გარეშე იკარგება კონტენტი.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // რაც უკვე ეკრანზეა, ისე დარჩეს — ანიმაცია მხოლოდ სქროლით შემოსულ ბლოკებს
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.classList.add("reveal-pending");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <div ref={ref} className={cn("reveal", className)} style={style}>
      {children}
    </div>
  );
}
