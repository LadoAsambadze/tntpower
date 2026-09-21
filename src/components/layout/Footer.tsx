import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { navLinks, site } from "@/data/site";
import { services } from "@/data/services";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-8 border-brand-500 bg-ink-950 text-ink-300">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            {site.slogan} სამშენებლო კომპანია {site.cityIn} — ვიღებთ პასუხისმგებლობას
            პროექტის სრულ ან ნაწილობრივ განხორციელებაზე და საჭიროების მიხედვით
            ვაერთიანებთ შესაბამის სპეციალისტებს.
          </p>
          <ul className="mt-5 flex gap-4 text-sm">
            {site.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-400"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
            ნავიგაცია
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
            სერვისები
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-white">
                  {s.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
            კონტაქტი
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={site.phoneHref} className="flex items-start gap-3 hover:text-white">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden="true" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-start gap-3 hover:text-white">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden="true" />
              {site.address}
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden="true" />
              {site.hours}
            </li>
          </ul>
        </div>
      </Container>

      {/* დიდი ვორდმარკი ფონად — პრემიუმ სტუდიების ხელწერა */}
      <div className="overflow-hidden" aria-hidden="true">
        <Container>
          <p className="-mb-[0.22em] select-none whitespace-nowrap text-[19vw] font-black italic leading-none tracking-tight text-white/[0.045] lg:text-[13.5rem]">
            TNT POWER
          </p>
        </Container>
      </div>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. ყველა უფლება დაცულია.
          </p>
          <p className="font-brand text-sm uppercase tracking-[0.2em] text-ink-400">
            Renovate your house
          </p>
        </Container>
      </div>
    </footer>
  );
}
