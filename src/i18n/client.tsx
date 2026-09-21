"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { localizePath, type Locale } from "@/i18n/config";
import { makeTranslate, type Messages } from "@/i18n/translate";

interface I18nValue {
  locale: Locale;
  /** only the strings used inside Client Components (generated subset) */
  messages: Messages;
}

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ locale, messages, children }: I18nValue & { children: ReactNode }) {
  const value = useMemo(() => ({ locale, messages }), [locale, messages]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");
  const { locale, messages } = value;
  return {
    locale,
    tr: makeTranslate(locale, messages),
    href: (path: string) => localizePath(locale, path),
  };
}
