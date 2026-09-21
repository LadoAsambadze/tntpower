import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProblemsWeFix } from "@/components/sections/ProblemsWeFix";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "სერვისები",
  description: `TNT POWER-ის სერვისები ${site.cityIn}: ბინებისა და კომერციული ფართების რემონტი, კერძო სახლების მშენებლობა, ელექტროობა, სანტექნიკა, ეზოს მოწყობა, ნაგვის გატანა, ავეჯის გადაზიდვა და მცირე დამხმარე სამუშაოები.`,
  alternates: { canonical: `${site.url}/services` },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "სერვისები", path: "/services" }])} />
      <PageHero
        eyebrow="სერვისები"
        title="ერთი სამუშაო ან სრული პროექტი"
        description="ჩვენ ვიღებთ პასუხისმგებლობას სამშენებლო პროექტის განხორციელებაზე და საჭიროების მიხედვით ვაერთიანებთ შესაბამის სპეციალისტებს. აირჩიეთ სერვისი — დანარჩენს ჩვენ ვიღებთ ჩვენზე."
        crumbs={[{ href: "/services", label: "სერვისები" }]}
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
