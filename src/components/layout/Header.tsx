"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { navLinks, site } from "@/data/site";
import { useI18n } from "@/i18n/client";
import { localizePath, stripLocale } from "@/i18n/config";
import { cn } from "@/lib/cn";

export function Header() {
  const { tr, href, locale } = useI18n();
  // Same value on the server (`/ka/services`, rewritten) and in the browser (`/services`)
  const pathname = stripLocale(usePathname());
  const [open, setOpen] = useState(false);

  // language switch keeps the visitor on the same page
  const other = locale === "ka" ? "en" : "ka";
  const switcher = {
    href: localizePath(other, pathname),
    label: other === "en" ? "ENG" : "GEO",
    aria: other === "en" ? "Switch to English" : "Switch to Georgian",
  };

  // მობილური მენიუს გახსნისას გვერდის სქროლი ვბლოკავთ
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-ink-950 text-white">
      {/* ბრენდის ყვითელი ზოლი */}
      <div className="h-1.5 bg-brand-500" aria-hidden="true" />

      <Container className="flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Logo light tr={tr} href={href("/")} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label={tr("მთავარი ნავიგაცია")}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={href(link.href)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:bg-brand-500 after:transition-transform",
                isActive(link.href)
                  ? "text-white after:scale-x-100"
                  : "text-ink-300 after:scale-x-0 hover:text-white hover:after:scale-x-100",
              )}
            >
              {tr(link.label)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <Link
            href={switcher.href}
            hrefLang={other}
            aria-label={switcher.aria}
            className="rounded border border-white/25 px-2 py-1 text-xs font-semibold tracking-wider text-ink-200 transition-colors hover:border-brand-500 hover:text-brand-400"
          >
            {switcher.label}
          </Link>
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-400"
          >
            <Phone className="size-4 text-brand-500" aria-hidden="true" />
            {site.phone}
          </a>
          <Button href={href("/contact")} size="sm">
            {tr("კონსულტაცია")}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? tr("მენიუს დახურვა") : tr("მენიუს გახსნა")}
          className="flex size-10 items-center justify-center rounded-md text-white hover:bg-white/10 lg:hidden"
        >
          {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </Container>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-white/10 bg-ink-950 lg:hidden"
      >
        <Container className="flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={href(link.href)}
              onClick={close}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-3 text-base font-medium",
                isActive(link.href)
                  ? "bg-white/10 text-brand-400"
                  : "text-ink-200 hover:bg-white/5 hover:text-white",
              )}
            >
              {tr(link.label)}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <Button href={switcher.href} variant="ghost" onClick={close} aria-label={switcher.aria}>
              {switcher.label}
            </Button>
            <Button href={site.phoneHref} variant="ghost" onClick={close}>
              <Phone className="size-4" aria-hidden="true" />
              {site.phone}
            </Button>
            <Button href={href("/contact")} onClick={close}>
              {tr("კონსულტაცია და შეფასება")}
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
