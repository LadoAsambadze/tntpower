import type { Metadata } from "next";
import { alternatesFor } from "@/i18n/seo";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { services } from "@/data/services";
import { site } from "@/data/site";

import { getI18n, getI18nFor } from "@/i18n/server";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { tr, locale } = getI18nFor((await params).lang);
  return {
    title: tr("კონტაქტი"),
    description: `${tr("დაუკავშირდით TNT POWER-ს ")}${tr(site.cityIn)}${tr(" კონსულტაციისა და ობიექტის შეფასებისთვის. ტელეფონი: ")}${site.phone}${tr(". WhatsApp, ელფოსტა და საკონტაქტო ფორმა.")}`,
    alternates: alternatesFor(locale, "/contact"),
  };
}

const contacts = [
  {
    icon: Phone,
    label: "ტელეფონი",
    value: site.phone,
    href: site.phoneHref,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "მოგვწერეთ ფოტოთი და აღწერით",
    href: site.whatsappHref,
    external: true,
  },
  {
    icon: Mail,
    label: "ელფოსტა",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: MapPin,
    label: "სამუშაო არეალი",
    value: site.serviceArea,
  },
  {
    icon: Clock,
    label: "სამუშაო საათები",
    value: site.hours,
  },
];

export default async function ContactPage({ searchParams }: PageProps<"/[lang]/contact">) {
  const { tr } = await getI18n();
  const { service } = await searchParams;
  const defaultService = typeof service === "string" ? service : undefined;
  const serviceOptions = services.map((s) => ({ slug: s.slug, title: tr(s.title) }));

  return (
    <>
      <PageHero
        eyebrow={tr("კონტაქტი")}
        title={tr("დაგვიკავშირდით კონსულტაციისა და ობიექტის შეფასებისთვის")}
        description={tr("აღწერეთ სამუშაო რამდენიმე წინადადებით — ჩვენ დაგიკავშირდებით, შევათანხმებთ ობიექტის დათვალიერების დროს და მოვამზადებთ ხარჯთაღრიცხვას.")}
        crumbs={[{ href: "/contact", label: tr("კონტაქტი") }]}
        image="/images/brand/post-ready-to-renovate.jpg"
        imagePosition="center"
      />

      <section className="bg-paper py-14 sm:py-16 lg:py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-display text-3xl font-semibold text-ink-950">{tr("საკონტაქტო ინფორმაცია")}</h2>
            <ul className="mt-6 space-y-5">
              {contacts.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-brand-500 text-ink-950">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
                      {tr(label)}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="mt-0.5 block font-semibold text-ink-950 underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-brand-500"
                      >
                        {tr(value)}
                      </a>
                    ) : (
                      <p className="mt-0.5 font-semibold text-ink-950">{tr(value)}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border-l-4 border-brand-500 bg-ink-950 p-6 text-white">
              <p className="font-brand text-[0.7rem] uppercase tracking-[0.22em] text-brand-400">
                Ready to renovate?
              </p>
              <p className="mt-2 font-bold">{tr("რა ხდება განაცხადის შემდეგ?")}</p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-ink-300">
                <li>{tr("დაგიკავშირდებით სამუშაო დღეს რამდენიმე საათში.")}</li>
                <li>{tr("შევათანხმებთ ობიექტის დათვალიერების დროს.")}</li>
                <li>{tr("მოვამზადებთ ხარჯთაღრიცხვას და სამუშაოების გეგმას.")}</li>
                <li>{tr("ვიწყებთ სამუშაოს შეთანხმებულ ვადაში.")}</li>
              </ol>
            </div>
          </div>

          <div className="rounded-2xl border border-ink-200 bg-ink-50 p-6 sm:p-8">
            <h2 className="font-display text-3xl font-semibold text-ink-950">{tr("გამოგზავნეთ განაცხადი")}</h2>
            <p className="mt-2 text-sm text-ink-600">
              {tr("ველები ვარსკვლავით (*) სავალდებულოა.")}
            </p>
            <div className="mt-6">
              <ContactForm services={serviceOptions} defaultService={defaultService} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
