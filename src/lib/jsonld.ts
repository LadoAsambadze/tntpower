import type { FaqItem } from "@/data/faq";
import type { Service } from "@/data/services";
import { site } from "@/data/site";

/** schema.org სტრუქტურირებული მონაცემები — Google-ის მდიდარი შედეგებისთვის */

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(crumbs: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "მთავარი", path: "" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.url}${c.path}`,
    })),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription,
    url: `${site.url}/services/${service.slug}`,
    areaServed: site.serviceArea,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: site.name,
      url: site.url,
      telephone: site.phone,
    },
  };
}
