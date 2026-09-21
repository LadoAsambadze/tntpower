import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Info, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandCheck } from "@/components/ui/BrandCheck";
import { Carousel } from "@/components/ui/Carousel";
import { FaqList } from "@/components/ui/FaqList";
import { ServiceIcon } from "@/components/ServiceIcon";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getService,
  services,
  serviceCategories,
  type ImagePosition,
} from "@/data/services";
import { serviceFaq } from "@/data/serviceFaq";
import { priceDisclaimer, site } from "@/data/site";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/cn";

const positionClass: Record<ImagePosition, string> = {
  top: "object-top",
  center: "object-center",
  bottom: "object-bottom",
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: `${site.url}/services/${slug}` },
    openGraph: {
      title: `${service.seoTitle} | ${site.name}`,
      description: service.seoDescription,
      url: `${site.url}/services/${slug}`,
      images: [{ url: service.image.src }],
    },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const faq = serviceFaq[service.slug] ?? [];
  // მონათესავე სერვისები: ჯერ იმავე კატეგორიიდან, შემდეგ დანარჩენი
  const related = [
    ...services.filter((s) => s.slug !== service.slug && s.category === service.category),
    ...services.filter((s) => s.slug !== service.slug && s.category !== service.category),
  ].slice(0, 3);
  const serviceOptions = services.map((s) => ({ slug: s.slug, title: s.title }));

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "სერვისები", path: "/services" },
          { name: service.shortTitle, path: `/services/${service.slug}` },
        ])}
      />
      {faq.length > 0 && <JsonLd data={faqPageJsonLd(faq)} />}

      <PageHero
        eyebrow={serviceCategories[service.category].title}
        title={service.title}
        description={service.excerpt}
        crumbs={[
          { href: "/services", label: "სერვისები" },
          { href: `/services/${service.slug}`, label: service.shortTitle },
        ]}
        image={service.image.src}
        imagePosition={service.image.position}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="#request" size="lg">
            შეფასების მოთხოვნა
          </Button>
          <Button href={site.phoneHref} size="lg" variant="ghost">
            <Phone className="size-5" aria-hidden="true" />
            {site.phone}
          </Button>
        </div>
      </PageHero>

      <section className="bg-paper py-14 sm:py-16 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
          <div className="min-w-0">
            <div className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-brand-500 text-ink-950 sm:size-14">
                <ServiceIcon name={service.icon} className="size-6 sm:size-7" />
              </span>
              <h2 className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
                რას ვაკეთებთ
              </h2>
            </div>
            <p className="mt-5 text-base leading-relaxed text-ink-700 sm:text-lg">
              {service.description}
            </p>

            <div className="relative mt-8 aspect-[21/9] overflow-hidden rounded-2xl bg-ink-900">
              <Image
                src={service.image.src}
                alt={service.title}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className={cn("object-cover", positionClass[service.image.position])}
              />
              <span className="absolute inset-y-0 right-0 w-1.5 bg-brand-500" aria-hidden="true" />
            </div>

            <h3 className="mt-10 text-xl font-bold text-ink-950">რას მოიცავს სერვისი</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-md border border-ink-200 bg-ink-50 px-4 py-3 text-ink-800"
                >
                  <BrandCheck className="mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            {faq.length > 0 && (
              <>
                <h3 className="mt-10 text-xl font-bold text-ink-950">
                  ხშირი კითხვები — {service.shortTitle}
                </h3>
                <FaqList items={faq} className="mt-5" />
              </>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border-l-4 border-brand-500 bg-ink-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
                საორიენტაციო ფასი
              </p>
              <p className="font-display mt-2 text-2xl font-semibold text-ink-950">{service.price.label}</p>
              {service.price.note && (
                <p className="mt-2 text-sm text-ink-600">{service.price.note}</p>
              )}
              <p className="mt-4 flex items-start gap-2 text-xs text-ink-500">
                <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {priceDisclaimer}
              </p>
            </div>

            <div className="rounded-2xl bg-ink-950 p-6 text-white">
              <p className="font-brand text-[0.7rem] uppercase tracking-[0.22em] text-brand-400">
                Renovate your house
              </p>
              <p className="mt-2 font-bold">სწრაფი პასუხისთვის</p>
              <p className="mt-1 text-sm text-ink-300">
                გამოგზავნეთ ფოტო ან მოკლე აღწერა WhatsApp-ით — საორიენტაციო ფასს
                სწრაფად გეტყვით.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Button href={site.whatsappHref} target="_blank" variant="primary" size="sm">
                  <MessageCircle className="size-4" aria-hidden="true" />
                  WhatsApp
                </Button>
                <Button href={site.phoneHref} variant="ghost" size="sm">
                  <Phone className="size-4" aria-hidden="true" />
                  დარეკვა
                </Button>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <ProcessSteps />

      <section id="request" className="scroll-mt-24 bg-ink-50 py-14 sm:py-16 lg:py-20">
        <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-ink-600">
              <span className="h-0.5 w-8 bg-brand-500" aria-hidden="true" />
              განაცხადი
            </p>
            <h2 className="font-display mt-4 text-3xl font-semibold text-ink-950">
              მოითხოვეთ შეფასება — {service.shortTitle}
            </h2>
            <p className="mt-4 text-ink-600">
              შეავსეთ ფორმა და ჩვენი წარმომადგენელი დაგიკავშირდებათ ობიექტის დათვალიერების
              დროის შესათანხმებლად.
            </p>
          </div>
          <div className="rounded-2xl border border-ink-200 bg-white p-5 sm:p-8">
            <ContactForm services={serviceOptions} defaultService={service.slug} />
          </div>
        </Container>
      </section>

      <section className="bg-paper py-14 sm:py-16 lg:py-20">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
              სხვა სერვისები
            </h2>
            <Link
              href="/services"
              className="flex shrink-0 items-center gap-1 text-sm font-semibold text-ink-950 underline decoration-brand-500 decoration-2 underline-offset-4"
            >
              ყველა სერვისი
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-8">
            <Carousel label="სხვა სერვისები" perView="[--per-view:1.15] sm:[--per-view:2] lg:[--per-view:3]">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </Carousel>
          </div>
        </Container>
      </section>
    </>
  );
}
