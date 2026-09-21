import type { Locale } from "@/i18n/config";

/**
 * gettext-style translation: the Georgian source string is the key.
 * Georgian copy stays in the components and data files exactly as written;
 * other languages are looked up in a generated map (see `.claude/i18n-extract.mjs`).
 */
export type Messages = Record<string, string>;
export type Translate = (source: string) => string;

export function makeTranslate(locale: Locale, messages: Messages): Translate {
  if (locale === "ka") return (source) => source;
  // hasOwn: strings such as "constructor" must not resolve to Object.prototype members
  return (source) => (Object.hasOwn(messages, source) ? messages[source] : source);
}

/** Translate every string inside plain data (objects / arrays). Non-text values pass through. */
export function translateDeep<T>(value: T, tr: Translate): T {
  if (typeof value === "string") return tr(value) as T;
  if (Array.isArray(value)) return value.map((item) => translateDeep(item, tr)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, translateDeep(item, tr)]),
    ) as T;
  }
  return value;
}
