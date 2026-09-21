import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProblemsWeFix } from "@/components/sections/ProblemsWeFix";
import { Projects } from "@/components/sections/Projects";
import { PricingPreview } from "@/components/sections/PricingPreview";
import { SocialPosts } from "@/components/sections/SocialPosts";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqGeneral } from "@/data/faq";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { localizePath } from "@/i18n/config";
import { getI18n } from "@/i18n/server";
import { translateDeep, type Translate } from "@/i18n/translate";
import { faqPageJsonLd } from "@/lib/jsonld";

// ლოკალური ბიზნესის სტრუქტურირებული მონაცემები Google-ისთვის
const businessJsonLd = (abs: (path: string) => string, tr: Translate) => ({
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  description: site.description,
  url: abs("/"),
  telephone: site.phone,
  email: site.email,
  image: `${site.url}/images/brand/post-how-we-build.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: "GE",
  },
  areaServed: site.serviceArea,
  slogan: site.slogan,
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: tr("სერვისები"),
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.excerpt,
        url: abs(`/services/${s.slug}`),
      },
    })),
  },
});

export default async function HomePage() {
  const { tr, locale } = await getI18n();
  const abs = (path: string) => {
    const localized = localizePath(locale, path);
    return `${site.url}${localized === "/" ? "" : localized}`;
  };
  const faq = translateDeep(faqGeneral, tr);
  return (
    <>
      {/* the schema is written once in Georgian; every text value is translated here */}
      <JsonLd data={translateDeep(businessJsonLd(abs, tr), tr)} />
      <JsonLd data={faqPageJsonLd(faq)} />
      <Hero />
      <Statement />
      <TrustStrip />
      <ProblemSolution />
      <ServicesGrid />
      <ProcessSteps />
      <ProblemsWeFix />
      <Projects />
      <PricingPreview />
      <SocialPosts />
      <Faq
        title={tr("ხშირად დასმული კითხვები")}
        description={tr("პასუხები კითხვებზე, რომლებსაც ყველაზე ხშირად გვისვამენ სამუშაოს დაწყებამდე.")}
        items={faq}
      />
      <CtaBanner />
    </>
  );
}
