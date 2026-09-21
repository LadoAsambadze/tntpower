"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { navLinks, site } from "@/data/site";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
        <Logo light />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="მთავარი ნავიგაცია">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:bg-brand-500 after:transition-transform",
                isActive(link.href)
                  ? "text-white after:scale-x-100"
                  : "text-ink-300 after:scale-x-0 hover:text-white hover:after:scale-x-100",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={site.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-400"
          >
            <Phone className="size-4 text-brand-500" aria-hidden="true" />
            {site.phone}
          </a>
          <Button href="/contact" size="sm">
            კონსულტაცია
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "მენიუს დახურვა" : "მენიუს გახსნა"}
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
              href={link.href}
              onClick={close}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-3 text-base font-medium",
                isActive(link.href)
                  ? "bg-white/10 text-brand-400"
                  : "text-ink-200 hover:bg-white/5 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <Button href={site.phoneHref} variant="ghost" onClick={close}>
              <Phone className="size-4" aria-hidden="true" />
              {site.phone}
            </Button>
            <Button href="/contact" onClick={close}>
              კონსულტაცია და შეფასება
            </Button>
          </div>
        </Container>
      </div>
    </header>
  );
}
