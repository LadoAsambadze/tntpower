import { lang } from "next/root-params";
import { defaultLocale, isLocale, localizePath, type Locale } from "@/i18n/config";
import { makeTranslate, type Messages } from "@/i18n/translate";
import en from "@/i18n/messages/en.json";

const messages: Record<Locale, Messages> = { ka: {}, en };

/** Translator for a known locale (metadata, server actions, sitemap). */
export function getTranslate(locale: Locale) {
  return makeTranslate(locale, messages[locale]);
}

/** For `generateMetadata`, which receives the raw `lang` route param. */
export function getI18nFor(langParam: string) {
  const locale: Locale = isLocale(langParam) ? langParam : defaultLocale;
  return { locale, tr: getTranslate(locale) };
}

/** Current locale from the `app/[lang]` root parameter, no prop drilling. */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  return isLocale(value) ? value : defaultLocale;
}

/** Everything a Server Component needs to localise itself. */
export async function getI18n() {
  const locale = await getLocale();
  return {
    locale,
    tr: getTranslate(locale),
    /** internal link in the current language */
    href: (path: string) => localizePath(locale, path),
  };
}
