import { MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandCircles } from "@/components/brand/BrandCircles";
import { site } from "@/data/site";

/** ბოლო მოწოდება — ერთი კითხვა, ერთი წინადადება, სამი გზა დასაკავშირებლად */
export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-brand-500 py-14 text-ink-950 sm:py-16 lg:py-24">
      <BrandCircles className="absolute -top-32 -right-24 w-[34rem] text-ink-950/10" />
      <Container className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="font-brand text-sm uppercase tracking-[0.28em] text-ink-900">
            Ready to renovate?
          </p>
          <h2 className="font-display mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
            გეგმავთ მშენებლობას ან რემონტს?
          </h2>
          <p className="mt-4 max-w-xl text-base text-ink-900 sm:text-lg">
            ერთი სამუშაო ან სრული პროექტი — დაგვიკავშირდით, ვნახავთ ობიექტს და მოვამზადებთ
            ხარჯთაღრიცხვას.
          </p>
        </div>

        <div className="rounded-2xl bg-ink-950 p-5 text-white shadow-2xl shadow-ink-950/30 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
            დაგვიკავშირდით
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Button href={site.phoneHref} variant="primary" size="lg">
              <Phone className="size-5" aria-hidden="true" />
              {site.phone}
            </Button>
            <Button href={site.whatsappHref} variant="ghost" size="lg" target="_blank">
              <MessageCircle className="size-5 text-[#25D366]" aria-hidden="true" />
              WhatsApp
            </Button>
            <Button href="/contact" variant="light" size="lg" className="sm:col-span-2">
              ფორმის შევსება
            </Button>
          </div>
          <p className="mt-4 text-center text-xs text-ink-400">{site.hours}</p>
        </div>
      </Container>
    </section>
  );
}
