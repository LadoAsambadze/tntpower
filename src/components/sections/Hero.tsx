import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandCircles } from "@/components/brand/BrandCircles";
import { HeroVideo } from "@/components/brand/HeroVideo";
import { site } from "@/data/site";

import { getI18n } from "@/i18n/server";

/**
 * მთავარი Hero — მინიმალური: ტაგლაინი, სათაური, ერთი წინადადება, ორი მოქმედება.
 * დეტალები (რას ვიღებთ ჩვენზე, პროცესი, უპირატესობები) ქვემოთ, საკუთარ სექციებშია.
 */
export async function Hero() {
  const { tr, href } = await getI18n();
  return (
    <section className="relative flex min-h-[72svh] items-center overflow-hidden bg-ink-950 text-white lg:min-h-[min(calc(100svh-4.875rem),52rem)]">
      {/* ფონი: poster-ფოტო ყველგან, ვიდეო — დესკტოპზე */}
      <Image
        src="/video/hero-poster.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover object-center opacity-60"
      />
      <HeroVideo
        src="/video/hero-renovation.mp4"
        poster="/video/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-60"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/70 to-ink-950/20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent"
        aria-hidden="true"
      />
      <BrandCircles className="absolute -top-24 right-[-6%] hidden w-[44rem] text-white/15 lg:block" />

      <Container className="relative py-16 lg:py-24">
        <div className="max-w-3xl">
          <p className="font-brand text-sm uppercase tracking-[0.28em] text-brand-400">
            TNT POWER · Renovate your house
          </p>
          <h1 className="font-display mt-5 text-4xl font-semibold leading-[1.06] tracking-tight sm:text-5xl lg:text-[4rem]">
            {tr("ერთი კომპანია —")}
            <br />
            <span className="text-brand-500">{tr("სრული პასუხისმგებლობა.")}</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-200 sm:text-lg">
            {tr("რემონტი, მშენებლობა, ელექტროობა და სანტექნიკა — ერთი ჯგუფი და ერთი პასუხისმგებელი პირი")} {tr(site.cityIn)}.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={href("/contact")} size="lg">
              {tr("მოითხოვეთ შეფასება")}
              <ArrowRight className="size-5 shrink-0" aria-hidden="true" />
            </Button>
            <Button href={site.phoneHref} size="lg" variant="ghost">
              <Phone className="size-5 shrink-0" aria-hidden="true" />
              {site.phone}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
