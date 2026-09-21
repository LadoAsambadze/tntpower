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
import { faqPageJsonLd } from "@/lib/jsonld";

// ლოკალური ბიზნესის სტრუქტურირებული მონაცემები Google-ისთვის
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  description: site.description,
  url: site.url,
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
    name: "სერვისები",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.excerpt,
        url: `${site.url}/services/${s.slug}`,
      },
    })),
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={businessJsonLd} />
      <JsonLd data={faqPageJsonLd(faqGeneral)} />
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
        title="ხშირად დასმული კითხვები"
        description="პასუხები კითხვებზე, რომლებსაც ყველაზე ხშირად გვისვამენ სამუშაოს დაწყებამდე."
        items={faqGeneral}
      />
      <CtaBanner />
    </>
  );
}
