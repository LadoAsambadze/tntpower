import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { locales, localizePath } from "@/i18n/config";

const abs = (locale: (typeof locales)[number], path: string) => {
  const localized = localizePath(locale, path);
  return `${site.url}${localized === "/" ? "" : localized}`;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/pricing", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8 })),
  ];

  // one entry per page per language, each listing its hreflang alternates
  return pages.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: abs(locale, path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, abs(l, path)])),
      },
    })),
  );
}
