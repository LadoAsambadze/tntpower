import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PriceEstimator } from "@/components/sections/PriceEstimator";
import { BrandCircles } from "@/components/brand/BrandCircles";
import { getService } from "@/data/services";
import { priceDisclaimer } from "@/data/site";

/** მთავარ გვერდზე მოკლედ საჩვენებელი ფასები — სამი ყველაზე ხშირი კითხვა */
const quickPrices = ["apartments", "commercial", "electrical"]
  .map(getService)
  .filter((s) => s !== undefined);

/** „რამდენი შეიძლება დაჯდეს?" — მოკლე ფასები + კალკულატორი, მუქ ფონზე */
export function PricingPreview() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-14 text-white sm:py-16 lg:py-24">
      <BrandCircles className="absolute -top-40 -right-32 w-[36rem] text-white/10" />

      <Container className="relative grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-14">
        <div>
          <SectionHeading
            light
            eyebrow="ფასები"
            title="რამდენი შეიძლება დაჯდეს?"
            description="საორიენტაციო დიაპაზონები, რომ თავიდანვე იცოდეთ, რას უნდა ელოდოთ. ზუსტი თანხა — ობიექტის დათვალიერების შემდეგ."
          />

          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {quickPrices.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-brand-400"
                >
                  <span className="font-medium">{s.shortTitle}</span>
                  <span className="flex items-center gap-2 text-right">
                    <span className="font-display text-lg font-semibold text-white group-hover:text-brand-400">
                      {s.price.label}
                    </span>
                    <ArrowRight
                      className="size-4 shrink-0 text-ink-500 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-400"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-sm leading-relaxed text-ink-400">{priceDisclaimer}</p>

          <Link
            href="/pricing"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-white underline decoration-brand-500 decoration-2 underline-offset-4 hover:text-brand-400"
          >
            ყველა ფასი და კითხვა-პასუხი
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <PriceEstimator compact />
      </Container>
    </section>
  );
}
