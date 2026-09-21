import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

/**
 * Locale routing. All pages live under `app/[lang]`:
 *   /services     -> rewritten to /ka/services (Georgian is the default and keeps clean URLs)
 *   /en/services  -> served as is
 *   /ka/services  -> redirected to /services, so each page has one canonical URL
 * No Accept-Language redirect on purpose: many Georgian visitors browse with an English UI.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (isLocale(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // skip Next internals and anything with a file extension (fonts, images, video, sitemap.xml, robots.txt)
  matcher: ["/((?!_next|.*\\..*).*)"],
};
