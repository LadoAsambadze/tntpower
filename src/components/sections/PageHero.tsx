import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { BrandCircles } from "@/components/brand/BrandCircles";
import type { ImagePosition } from "@/data/services";
import { cn } from "@/lib/cn";

import { getI18n } from "@/i18n/server";

interface Crumb {
  href: string;
  label: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  image?: string;
  imagePosition?: ImagePosition;
  children?: ReactNode;
}

const positionClass: Record<ImagePosition, string> = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
};

/** შიდა გვერდების მუქი სათაურის ზოლი — ბრენდის ფოტოთი და წრეების მოტივით */
export async function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  image,
  imagePosition = "center",
  children,
}: PageHeroProps) {
  const { tr, href } = await getI18n();
  return (
    <section className="relative overflow-hidden bg-ink-950 text-white">
      {image && (
        <Image
          src={image}
          alt=""
          fill
          preload
          sizes="100vw"
          className={cn("object-cover opacity-30", positionClass[imagePosition])}
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/40"
        aria-hidden="true"
      />
      <BrandCircles className="absolute -top-40 right-[-6%] hidden w-[36rem] text-white/15 lg:block" />

      <Container className="relative py-12 sm:py-14 lg:py-20">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-400">
              <li>
                <Link href={href("/")} className="hover:text-white">
                  {tr("მთავარი")}
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1">
                  <ChevronRight className="size-4" aria-hidden="true" />
                  {i === crumbs.length - 1 ? (
                    <span className="text-ink-200" aria-current="page">
                      {c.label}
                    </span>
                  ) : (
                    <Link href={href(c.href)} className="hover:text-white">
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
            <span className="h-0.5 w-8 bg-brand-500" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-300">{description}</p>
        )}
        {children}
      </Container>
    </section>
  );
}
