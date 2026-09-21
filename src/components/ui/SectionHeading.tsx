import { Reveal } from "@/components/brand/Reveal";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto flex flex-col items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]",
            light ? "text-brand-400" : "text-ink-600",
          )}
        >
          <span className="h-0.5 w-8 bg-brand-500" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "font-display mt-4 text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]",
          light ? "text-white" : "text-ink-950",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            light ? "text-ink-300" : "text-ink-600",
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
