import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogoProps {
  light?: boolean;
  className?: string;
  size?: "sm" | "md";
  /** localised home link and translator, passed by the caller (Logo renders on server and client) */
  href?: string;
  tr?: (source: string) => string;
}

/** ბრენდის ვორდმარკი: TNT POWER (bold italic) + RENOVATE YOUR HOUSE (თხელი სერიფი) */
export function Logo({
  light = false,
  className,
  size = "md",
  href = "/",
  tr = (source) => source,
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("inline-flex flex-col leading-none", className)}
      aria-label={tr("TNT POWER — მთავარი გვერდი")}
    >
      <span
        className={cn(
          "font-black italic tracking-tight",
          size === "md" ? "text-[1.4rem]" : "text-lg",
          light ? "text-white" : "text-ink-950",
        )}
      >
        TNT POWER
      </span>
      <span
        className={cn(
          "font-brand mt-0.5 uppercase",
          size === "md" ? "text-[0.72rem] tracking-[0.22em]" : "text-[0.6rem] tracking-[0.2em]",
          light ? "text-white/80" : "text-ink-600",
        )}
      >
        Renovate your house
      </span>
    </Link>
  );
}
