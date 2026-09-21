"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { priceDisclaimer } from "@/data/site";
import { cn } from "@/lib/cn";
import { useI18n } from "@/i18n/client";

type Kind = "apartment" | "commercial";

const rates: Record<Kind, { label: string; min: number; max: number }> = {
  apartment: { label: "ბინის რემონტი", min: 500, max: 1200 },
  commercial: { label: "კომერციული ფართი", min: 450, max: 1500 },
};

// ათასების გამყოფი ხელით — Intl.NumberFormat("ka-GE") სერვერზე (Node) და ბრაუზერში სხვადასხვანაირად აფორმატებს და hydration-ს არღვევს
const formatGel = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ₾`;

interface PriceEstimatorProps {
  /** სათაურისა და შენიშვნის გარეშე — როცა სექცია თავად ხსნის, რა არის ეს */
  compact?: boolean;
  className?: string;
}

/** საორიენტაციო ფასის კალკულატორი — მ² × ფასის დიაპაზონი */
export function PriceEstimator({ compact = false, className }: PriceEstimatorProps) {
  const { tr, href, locale } = useI18n();
  // formatGel ends with the lari sign; English readers get the currency code instead
  const money = (n: number) => (locale === "en" ? `${formatGel(n).slice(0, -1)}GEL` : formatGel(n));
  const [kind, setKind] = useState<Kind>("apartment");
  const [area, setArea] = useState(50);

  const rate = rates[kind];
  const valid = area >= 10 && area <= 2000;

  return (
    <div
      className={cn(
        "rounded-2xl border border-ink-200 bg-white p-5 text-ink-950 shadow-sm sm:p-7",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-brand-500 text-ink-950">
          <Calculator className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-lg font-bold leading-tight text-ink-950">{tr("საორიენტაციო კალკულატორი")}</h3>
          {!compact && (
            <p className="text-sm text-ink-600">{tr("მიუთითეთ ფართობი და ნახეთ სავარაუდო დიაპაზონი.")}</p>
          )}
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-semibold text-ink-800">{tr("ობიექტის ტიპი")}</legend>
        <div className="grid grid-cols-2 gap-2">
          {(Object.keys(rates) as Kind[]).map((k) => (
            <label
              key={k}
              className={
                kind === k
                  ? "cursor-pointer rounded-md border-2 border-ink-950 bg-ink-950 px-3 py-2.5 text-center text-sm font-semibold text-white"
                  : "cursor-pointer rounded-md border-2 border-ink-200 px-3 py-2.5 text-center text-sm font-semibold text-ink-700 hover:border-ink-400"
              }
            >
              <input
                type="radio"
                name="kind"
                value={k}
                checked={kind === k}
                onChange={() => setKind(k)}
                className="sr-only"
              />
              {tr(rates[k].label)}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <label htmlFor="area" className="mb-2 block text-sm font-semibold text-ink-800">
          {tr("ფართობი (მ²)")}
        </label>
        <div className="flex items-center gap-4">
          <input
            id="area"
            type="range"
            min={10}
            max={500}
            step={5}
            value={Math.min(area, 500)}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full accent-brand-500"
            aria-label={tr("ფართობი მ²")}
          />
          <input
            type="number"
            min={10}
            max={2000}
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-24 rounded-md border border-ink-300 px-3 py-2 text-center font-semibold text-ink-950 focus:border-ink-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
            aria-label={tr("ფართობი მ² (რიცხვი)")}
          />
        </div>
      </div>

      <div
        className="mt-5 rounded-xl border-l-4 border-brand-500 bg-ink-950 p-5 text-white"
        role="status"
        aria-live="polite"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
          {tr("სავარაუდო დიაპაზონი")}
        </p>
        {valid ? (
          <p className="font-display mt-2 text-2xl font-semibold sm:text-3xl">
            {money(area * rate.min)} – {money(area * rate.max)}
          </p>
        ) : (
          <p className="mt-2 text-lg font-semibold text-ink-300">{tr("მიუთითეთ 10–2000 მ²")}</p>
        )}
        <p className="mt-1 text-sm text-ink-400">
          {rate.min}–{rate.max} {tr("₾/მ² ×")} {valid ? area : "—"} {tr("მ²")}
        </p>
      </div>

      {!compact && <p className="mt-4 text-xs leading-relaxed text-ink-500">{tr(priceDisclaimer)}</p>}

      <Button href={href("/contact")} className="mt-5 w-full">
        {tr("ზუსტი ხარჯთაღრიცხვის მოთხოვნა")}
      </Button>
    </div>
  );
}
