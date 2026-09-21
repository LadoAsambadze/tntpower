import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Carousel } from "@/components/ui/Carousel";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { services, serviceCategories, getServicesByCategory } from "@/data/services";

import { getI18n } from "@/i18n/server";

interface ServicesGridProps {
  /** true — სერვისები კატეგორიებად დაყოფილი ბადე (სერვისების გვერდი) */
  grouped?: boolean;
  /** სათაურის ჩვენება (მთავარ გვერდზე) */
  withHeading?: boolean;
}

export async function ServicesGrid({ grouped = false, withHeading = true }: ServicesGridProps) {
  const { tr, href } = await getI18n();
  return (
    <section id="services" className="bg-paper py-14 sm:py-16 lg:py-24">
      <Container>
        {withHeading && (
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow={tr("სერვისები")}
              title={tr("რას ვაკეთებთ")}
              description={tr("ბინები, კერძო სახლები, კომერციული ფართები, ელექტროობა, სანტექნიკა, ეზო — და დამხმარე სერვისები.")}
            />
            <Button href={href("/services")} variant="outline" className="shrink-0 self-start md:self-auto">
              {tr("ყველა სერვისი")}
            </Button>
          </div>
        )}

        {grouped ? (
          <div className="space-y-14 lg:space-y-16">
            {(Object.keys(serviceCategories) as Array<keyof typeof serviceCategories>).map((key) => (
              <div key={key}>
                <h2 className="font-display text-2xl font-semibold text-ink-950 sm:text-3xl">
                  {tr(serviceCategories[key].title)}
                </h2>
                <p className="mt-2 max-w-2xl text-ink-600">{tr(serviceCategories[key].description)}</p>
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {getServicesByCategory(key).map((s) => (
                    <ServiceCard key={s.slug} service={s} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <Carousel
              label={tr("სერვისები")}
              perView="[--per-view:1.15] sm:[--per-view:2] lg:[--per-view:3] xl:[--per-view:4]"
            >
              {services.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </Carousel>
          </div>
        )}
      </Container>
    </section>
  );
}
