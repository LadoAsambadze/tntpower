import type { Metadata } from "next";
import { alternatesFor } from "@/i18n/seo";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/sections/PageHero";
import { PricingTable } from "@/components/sections/PricingTable";
import { PriceEstimator } from "@/components/sections/PriceEstimator";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPricing } from "@/data/faq";
import { priceDisclaimer, site } from "@/data/site";
import { translateDeep } from "@/i18n/translate";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/jsonld";

import { getI18n, getI18nFor } from "@/i18n/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { tr, locale } = getI18nFor((await params).lang);
  return {
    title: tr("ფასები"),
    description: `${tr("რემონტისა და მშენებლობის საორიენტაციო ფასები ")}${tr(site.cityIn)}${tr(": ბინის რემონტი 500–1,200 ₾/მ², კომერციული ფართი 450–1,500 ₾/მ², ელექტროობა 100 ₾-დან, ეზოს მოწყობა 500 ₾-დან. ")}${tr(priceDisclaimer)}`,
    alternates: alternatesFor(locale, "/pricing"),
  };
}

export default async function PricingPage() {
  const { tr, locale } = await getI18n();
  const faq = translateDeep(faqPricing, tr);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd({ locale, tr }, [{ name: tr("ფასები"), path: "/pricing" }])} />
      <JsonLd data={faqPageJsonLd(faq)} />
      <PageHero
        eyebrow={tr("ფასები")}
        title={tr("რამდენი შეიძლება დაჯდეს?")}
        description={`${tr("საორიენტაციო ფასები, რომ თავიდანვე იცოდეთ, რას უნდა ელოდოთ. ")}${tr(priceDisclaimer)}`}
        crumbs={[{ href: "/pricing", label: tr("ფასები") }]}
        image="/images/brand/post-planning-design-execution.jpg"
        imagePosition="top"
      />

      <PricingTable withHeading={false} />

      <section className="bg-ink-50 py-14 sm:py-16 lg:py-24">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
          <SectionHeading
            eyebrow={tr("კალკულატორი")}
            title={tr("გამოთვალეთ სავარაუდო ბიუჯეტი")}
            description={tr("აირჩიეთ ობიექტის ტიპი და მიუთითეთ ფართობი — კალკულატორი აჩვენებს დიაპაზონს ჩვენი საორიენტაციო ფასების მიხედვით. ზუსტი ხარჯთაღრიცხვისთვის ობიექტის დათვალიერება გვჭირდება.")}
          />
          <PriceEstimator />
        </Container>
      </section>

      <Faq
        eyebrow={tr("რამდენი ღირს?")}
        title={tr("ყველაზე ხშირი კითხვები ფასზე")}
        description={tr("მოკლე პასუხები კითხვებზე, რომლებსაც ყველაზე ხშირად გვისვამენ.")}
        items={faq}
      />

      <CtaBanner />
    </>
  );
}
