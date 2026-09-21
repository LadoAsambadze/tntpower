/**
 * Site languages. Georgian is the default and has no URL prefix (`/services`);
 * English lives under `/en` (`/en/services`).
 */
export const locales = ["ka", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ka";

export const isLocale = (value: string | undefined): value is Locale =>
  value !== undefined && (locales as readonly string[]).includes(value);

/** Open Graph locale codes */
export const ogLocale: Record<Locale, string> = { ka: "ka_GE", en: "en_US" };

const EXTERNAL = /^(https?:|tel:|mailto:|#)/;

/** Localise an internal path: the default locale gets no prefix. */
export function localizePath(locale: Locale, path: string): string {
  if (EXTERNAL.test(path)) return path;
  const clean = path === "/" ? "" : path;
  if (locale === defaultLocale) return clean || "/";
  return `/${locale}${clean}`;
}

/** Strip the locale prefix from a browser pathname: `/en/services` -> `/services`, `/ka` -> `/`. */
export function stripLocale(pathname: string): string {
  const [, first, ...rest] = pathname.split("/");
  if (isLocale(first)) return `/${rest.join("/")}`.replace(/\/$/, "") || "/";
  return pathname || "/";
}
