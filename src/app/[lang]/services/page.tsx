import type { Metadata } from "next";
import { alternatesFor } from "@/i18n/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProblemsWeFix } from "@/components/sections/ProblemsWeFix";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { getI18n, getI18nFor } from "@/i18n/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { tr, locale } = getI18nFor((await params).lang);
  return {
    title: tr("სერვისები"),
    description: `${tr("TNT POWER-ის სერვისები ")}${tr(site.cityIn)}${tr(": ბინებისა და კომერციული ფართების რემონტი, კერძო სახლების მშენებლობა, ელექტროობა, სანტექნიკა, ეზოს მოწყობა, ნაგვის გატანა, ავეჯის გადაზიდვა და მცირე დამხმარე სამუშაოები.")}`,
    alternates: alternatesFor(locale, "/services"),
  };
}

export default async function ServicesPage() {
  const { tr, locale } = await getI18n();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd({ locale, tr }, [{ name: tr("სერვისები"), path: "/services" }])} />
      <PageHero
        eyebrow={tr("სერვისები")}
        title={tr("ერთი სამუშაო ან სრული პროექტი")}
        description={tr("ჩვენ ვიღებთ პასუხისმგებლობას სამშენებლო პროექტის განხორციელებაზე და საჭიროების მიხედვით ვაერთიანებთ შესაბამის სპეციალისტებს. აირჩიეთ სერვისი — დანარჩენს ჩვენ ვიღებთ ჩვენზე.")}
        crumbs={[{ href: "/services", label: tr("სერვისები") }]}
        image="/images/brand/office-corridor.jpg"
        imagePosition="top"
      />
      <ServicesGrid grouped withHeading={false} />
      <ProblemsWeFix />
      <ProcessSteps />
      <CtaBanner />
    </>
  );
}
