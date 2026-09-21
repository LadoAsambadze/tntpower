import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { I18nProvider } from "@/i18n/client";
import { isLocale, localizePath, locales, ogLocale } from "@/i18n/config";
import enClient from "@/i18n/messages/en.client.json";
import { alternatesFor } from "@/i18n/seo";
import { getI18nFor } from "@/i18n/server";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { site } from "@/data/site";

/*
  შრიფტები ლოკალურადაა ჩაშენებული (`public/fonts/`, @font-face — `globals.css`):
  Noto Sans Georgian (ტექსტი), Noto Serif Georgian (სათაურები), Italiana (ტაგლაინი).
  ქართული სუბსეტები წინასწარ იტვირთება, რომ სათაურები „ხტომის" გარეშე გამოჩნდეს.
*/
const preloadFonts = [
  "/fonts/noto-sans-georgian-georgian.woff2",
  "/fonts/noto-serif-georgian-georgian.woff2",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { tr, locale } = getI18nFor((await params).lang);
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name}${tr(" — სამშენებლო კომპანია ")}${tr(site.cityIn)}`,
      template: `%s | ${site.name}`,
    },
    description: tr(site.description),
    keywords: [
      tr("რემონტი ბათუმში"),
      tr("სამშენებლო კომპანია ბათუმი"),
      tr("ბინის რემონტი"),
      tr("ელექტრიკოსი ბათუმი"),
      tr("სანტექნიკოსი ბათუმი"),
      tr("ნაგვის გატანა ბათუმი"),
      tr("ავეჯის გადაზიდვა ბათუმი"),
      "TNT POWER",
    ],
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      siteName: site.name,
      title: `${site.name} — ${tr(site.slogan)}`,
      description: tr(site.description),
      url: `${site.url}${localizePath(locale, "/") === "/" ? "" : localizePath(locale, "/")}`,
      images: [{ url: "/images/brand/post-how-we-build.jpg", width: 1280, height: 1600 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${tr(site.slogan)}`,
      description: tr(site.description),
      images: ["/images/brand/post-how-we-build.jpg"],
    },
    robots: { index: true, follow: true },
    alternates: alternatesFor(locale, "/"),
  };
}

export const viewport: Viewport = {
  themeColor: "#f2c524",
  width: "device-width",
  initialScale: 1,
};

/** both languages are prerendered */
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { tr, locale } = getI18nFor(lang);

  return (
    <html lang={locale} data-scroll-behavior="smooth" className="h-full antialiased">
      <head>
        {preloadFonts.map((href) => (
          <link
            key={href}
            rel="preload"
            href={href}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body className="flex min-h-full flex-col">
        {/* კლავიატურით მოსარგებლეთათვის — ნავიგაციის გამოტოვება */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-brand-500 focus:px-4 focus:py-2 focus:font-semibold focus:text-ink-950"
        >
          {tr("გადასვლა კონტენტზე")}
        </a>
        {/* Client Components read their language and strings from this provider */}
        <I18nProvider locale={locale} messages={locale === "en" ? enClient : {}}>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <FloatingContact />
        </I18nProvider>
      </body>
    </html>
  );
}
