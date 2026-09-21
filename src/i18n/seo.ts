import type { Metadata } from "next";
import { locales, localizePath, type Locale } from "@/i18n/config";
import { site } from "@/data/site";

/** Canonical URL plus hreflang alternates for one page, given its unprefixed path. */
export function alternatesFor(locale: Locale, path: string): NonNullable<Metadata["alternates"]> {
  const abs = (l: Locale) => `${site.url}${localizePath(l, path) === "/" ? "" : localizePath(l, path)}`;
  return {
    canonical: abs(locale),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, abs(l)])),
      "x-default": abs("ka"),
    },
  };
}
