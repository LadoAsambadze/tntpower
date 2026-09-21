import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface BrandCheckProps {
  className?: string;
  size?: "sm" | "md";
}

/** ყვითელი წრე მუქი „✓"-ით — სიებისთვის ღია და მუქ ფონზე */
export function BrandCheck({ className, size = "md" }: BrandCheckProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-brand-500 text-ink-950",
        size === "md" ? "size-5" : "size-4",
        className,
      )}
      aria-hidden="true"
    >
      <Check className={size === "md" ? "size-3.5" : "size-3"} strokeWidth={3} />
    </span>
  );
}
