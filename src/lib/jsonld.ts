import type { FaqItem } from "@/data/faq";
import type { Service } from "@/data/services";
import { site } from "@/data/site";
import { localizePath, type Locale } from "@/i18n/config";
import type { Translate } from "@/i18n/translate";

interface I18n {
  locale: Locale;
  tr: Translate;
}

/** absolute URL of an unprefixed path in the given language */
const abs = (locale: Locale, path: string) => {
  const localized = localizePath(locale, path);
  return `${site.url}${localized === "/" ? "" : localized}`;
};

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

export function breadcrumbJsonLd(
  { locale, tr }: I18n,
  crumbs: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: tr("მთავარი"), path: "" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(locale, c.path || "/"),
    })),
  };
}

/** `service` must already be localised (see `getService` in data/localized) */
export function serviceJsonLd({ locale, tr }: I18n, service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription,
    url: abs(locale, `/services/${service.slug}`),
    areaServed: tr(site.serviceArea),
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: site.name,
      url: site.url,
      telephone: site.phone,
    },
  };
}
