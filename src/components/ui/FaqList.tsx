import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/data/faq";
import { cn } from "@/lib/cn";

interface FaqListProps {
  items: FaqItem[];
  className?: string;
}

/** კითხვა-პასუხის აკორდეონი — ნატიური <details>, JavaScript-ის გარეშე */
export function FaqList({ items, className }: FaqListProps) {
  return (
    <div className={cn("divide-y divide-ink-200 rounded-2xl border border-ink-200 bg-white", className)}>
      {items.map((item) => (
        <details key={item.question} className="group px-5 py-4 sm:px-6 sm:py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink-950 [&::-webkit-details-marker]:hidden">
            {item.question}
            <ChevronDown
              className="size-5 shrink-0 text-ink-400 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 border-l-2 border-brand-500 pl-4 text-sm leading-relaxed text-ink-600">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
