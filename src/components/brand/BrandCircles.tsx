import { cn } from "@/lib/cn";

/** ბრენდის დეკორატიული მოტივი — თხელი, გადამკვეთი წრეები (როგორც სოციალურ პოსტებში) */
export function BrandCircles({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden="true"
    >
      <circle cx="300" cy="300" r="270" />
      <circle cx="240" cy="330" r="225" />
      <circle cx="370" cy="270" r="205" />
    </svg>
  );
}
