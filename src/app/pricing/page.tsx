import type { Metadata } from "next";
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
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "ფასები",
  description: `რემონტისა და მშენებლობის საორიენტაციო ფასები ${site.cityIn}: ბინის რემონტი 500–1,200 ₾/მ², კომერციული ფართი 450–1,500 ₾/მ², ელექტროობა 100 ₾-დან, ეზოს მოწყობა 500 ₾-დან. ${priceDisclaimer}`,
  alternates: { canonical: `${site.url}/pricing` },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "ფასები", path: "/pricing" }])} />
      <JsonLd data={faqPageJsonLd(faqPricing)} />
      <PageHero
        eyebrow="ფასები"
        title="რამდენი შეიძლება დაჯდეს?"
        description={`საორიენტაციო ფასები, რომ თავიდანვე იცოდეთ, რას უნდა ელოდოთ. ${priceDisclaimer}`}
        crumbs={[{ href: "/pricing", label: "ფასები" }]}
        image="/images/brand/post-planning-design-execution.jpg"
        imagePosition="top"
      />

      <PricingTable withHeading={false} />

      <section className="bg-ink-50 py-14 sm:py-16 lg:py-24">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
          <SectionHeading
            eyebrow="კალკულატორი"
            title="გამოთვალეთ სავარაუდო ბიუჯეტი"
            description="აირჩიეთ ობიექტის ტიპი და მიუთითეთ ფართობი — კალკულატორი აჩვენებს დიაპაზონს ჩვენი საორიენტაციო ფასების მიხედვით. ზუსტი ხარჯთაღრიცხვისთვის ობიექტის დათვალიერება გვჭირდება."
          />
          <PriceEstimator />
        </Container>
      </section>

      <Faq
        eyebrow="რამდენი ღირს?"
        title="ყველაზე ხშირი კითხვები ფასზე"
        description="მოკლე პასუხები კითხვებზე, რომლებსაც ყველაზე ხშირად გვისვამენ."
        items={faqPricing}
      />

      <CtaBanner />
    </>
  );
}
