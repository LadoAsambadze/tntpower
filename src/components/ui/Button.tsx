import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "dark" | "outline" | "light" | "ghost";
type Size = "sm" | "md" | "lg";

// ტექსტი შეიძლება გადავიდეს მეორე ხაზზე — გრძელი ქართული წარწერები მობილურზე არ უნდა გადავსებდნენ ეკრანს
const base =
  "inline-flex items-center justify-center gap-2 rounded-md text-center font-semibold leading-snug transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  // ბრენდის ყვითელი — ტექსტი ყოველთვის მუქი
  primary: "bg-brand-500 text-ink-950 hover:bg-brand-400",
  dark: "bg-ink-950 text-white hover:bg-ink-800",
  outline: "border border-ink-300 bg-white text-ink-900 hover:border-ink-900",
  light: "bg-white text-ink-950 hover:bg-ink-100",
  ghost: "border border-white/30 text-white hover:border-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-12 px-6 py-2.5 text-base",
  lg: "min-h-14 px-7 py-3 text-base",
};

interface ButtonProps {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

const EXTERNAL = /^(https?:|tel:|mailto:)/;

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  disabled,
  onClick,
  target,
  rel,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    if (EXTERNAL.test(href)) {
      return (
        <a
          href={href}
          className={classes}
          target={target}
          rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
