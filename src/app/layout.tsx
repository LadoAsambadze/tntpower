import type { Metadata, Viewport } from "next";
import "./globals.css";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — სამშენებლო კომპანია ${site.cityIn}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "რემონტი ბათუმში",
    "სამშენებლო კომპანია ბათუმი",
    "ბინის რემონტი",
    "ელექტრიკოსი ბათუმი",
    "სანტექნიკოსი ბათუმი",
    "ნაგვის გატანა ბათუმი",
    "ავეჯის გადაზიდვა ბათუმი",
    "TNT POWER",
  ],
  openGraph: {
    type: "website",
    locale: "ka_GE",
    siteName: site.name,
    title: `${site.name} — ${site.slogan}`,
    description: site.description,
    url: site.url,
    images: [{ url: "/images/brand/post-how-we-build.jpg", width: 1280, height: 1600 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.slogan}`,
    description: site.description,
    images: ["/images/brand/post-how-we-build.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f2c524",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ka" data-scroll-behavior="smooth" className="h-full antialiased">
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
          გადასვლა კონტენტზე
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
