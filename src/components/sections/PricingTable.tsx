import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { pricingRows } from "@/data/services";
import { priceDisclaimer } from "@/data/site";
import { getI18n } from "@/i18n/server";

interface PricingTableProps {
  withHeading?: boolean;
  /** მთავარ გვერდზე — მხოლოდ რამდენიმე სერვისი, ბარათებად გადაფურცვლად ლენტაზე */
  limit?: number;
}

export async function PricingTable({ withHeading = true, limit }: PricingTableProps) {
  const { tr, href } = await getI18n();
  const rows = limit ? pricingRows.slice(0, limit) : pricingRows;

  return (
    <section className="bg-paper py-14 sm:py-16 lg:py-24">
      <Container>
        {withHeading && (
          <SectionHeading
            eyebrow={tr("ფასები")}
            title={tr("რამდენი შეიძლება დაჯდეს?")}
            description={tr("საორიენტაციო ფასები, რომ თავიდანვე იცოდეთ, რას უნდა ელოდოთ. ზუსტი თანხა — ობიექტის დათვალიერების შემდეგ.")}
          />
        )}

        {limit ? (
          <div className={withHeading ? "mt-10" : undefined}>
            <Carousel
              label={tr("საორიენტაციო ფასები")}
              perView="[--per-view:1.2] sm:[--per-view:2] lg:[--per-view:3]"
              gap="[--gap:1rem]"
            >
              {rows.map((row) => (
                <Link
                  key={row.slug}
                  href={href(`/services/${row.slug}`)}
                  className="group flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-5 transition-colors hover:border-ink-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <p className="font-semibold leading-snug text-ink-950">{tr(row.title)}</p>
                  <p className="font-display mt-4 text-2xl font-semibold text-ink-950">{tr(row.price)}</p>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">{row.note ? tr(row.note) : null}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink-950 underline decoration-brand-500 decoration-2 underline-offset-4">
                    {tr("დეტალურად")}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </Carousel>
          </div>
        ) : (
          <div className={withHeading ? "mt-10 overflow-hidden rounded-2xl border border-ink-200" : "overflow-hidden rounded-2xl border border-ink-200"}>
            <div className="hidden grid-cols-[1.2fr_1fr_1.4fr] gap-4 bg-ink-950 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-400 md:grid">
              <span>{tr("სერვისი")}</span>
              <span>{tr("საორიენტაციო ფასი")}</span>
              <span>{tr("შენიშვნა")}</span>
            </div>
            <ul className="divide-y divide-ink-200">
              {rows.map((row) => (
                <li
                  key={row.slug}
                  className="grid gap-1.5 px-5 py-4 sm:px-6 sm:py-5 md:grid-cols-[1.2fr_1fr_1.4fr] md:items-center md:gap-4"
                >
                  <Link
                    href={href(`/services/${row.slug}`)}
                    className="font-semibold text-ink-950 underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-brand-500"
                  >
                    {tr(row.title)}
                  </Link>
                  <span className="font-display text-lg font-semibold text-ink-950">{tr(row.price)}</span>
                  <span className="text-sm text-ink-600">{row.note ? tr(row.note) : null}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-4 rounded-xl border-l-4 border-brand-500 bg-ink-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3 text-sm text-ink-700">
            <Info className="mt-0.5 size-5 shrink-0 text-ink-900" aria-hidden="true" />
            {tr(priceDisclaimer)}
          </p>
          {limit ? (
            <Button href={href("/pricing")} variant="dark" size="sm" className="shrink-0">
              {tr("ყველა ფასის ნახვა")}
            </Button>
          ) : (
            <Button href={href("/contact")} size="sm" className="shrink-0">
              {tr("ხარჯთაღრიცხვის მოთხოვნა")}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
