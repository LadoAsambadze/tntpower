import type { Metadata } from "next";
import { alternatesFor } from "@/i18n/seo";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BrandCheck } from "@/components/ui/BrandCheck";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { promise, scopeOptions, site } from "@/data/site";
import { getI18n, getI18nFor } from "@/i18n/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { tr, locale } = getI18nFor((await params).lang);
  return {
    title: tr("ჩვენ შესახებ"),
    description: `${tr("TNT POWER — სამშენებლო კომპანია ")}${tr(site.cityIn)}${tr(". ერთი პასუხისმგებელი მხარე თქვენი პროექტისთვის: ვაფასებთ, ვგეგმავთ, ვადგენთ ხარჯთაღრიცხვას, ვაწყობთ ჯგუფს, ვაკონტროლებთ ხარისხს და ვაბარებთ შედეგს.")}`,
    alternates: alternatesFor(locale, "/about"),
  };
}

export default async function AboutPage() {
  const { tr, href } = await getI18n();
  return (
    <>
      <PageHero
        eyebrow={tr("ჩვენ შესახებ")}
        title={tr("TNT POWER = ერთი პასუხისმგებელი მხარე")}
        description={tr("TNT POWER არის სამშენებლო კომპანია, რომელიც იღებს პასუხისმგებლობას თქვენი პროექტის სრულ ან ნაწილობრივ განხორციელებაზე. თქვენ არ გჭირდებათ სხვადასხვა ხელოსნის, ელექტრიკოსის, სანტექნიკოსისა და მღებავის ცალ-ცალკე მოძებნა და მართვა — გყავთ ერთი პასუხისმგებელი კომპანია.")}
        crumbs={[{ href: "/about", label: tr("ჩვენ შესახებ") }]}
        image="/images/brand/worker-carrying-board.jpg"
        imagePosition="top"
      />

      <section className="bg-paper py-14 sm:py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow={tr("ჩვენი მიდგომა")}
              title={tr("ვიღებთ პასუხისმგებლობას შედეგზე")}
            />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-700">
              <p>
                {tr("ჩვენ ვიღებთ პასუხისმგებლობას სამშენებლო პროექტის განხორციელებაზე და საჭიროების მიხედვით ვაერთიანებთ შესაბამის სპეციალისტებს — ელექტრიკოსს, სანტექნიკოსს, მღებავს, ფილების ოსტატს, მშენებელს.")}
              </p>
              <p>
                {tr("მომხმარებელს შეუძლია მოგვმართოს ერთი კონკრეტული პრობლემით ან სრული პროექტით: იდეა → დაგეგმვა → ხარჯთაღრიცხვა → მასალების შეძენა → სამუშაოების ორგანიზება → შესრულება → ჩაბარება.")}
              </p>
            </div>

            <blockquote className="mt-8 rounded-2xl border-l-4 border-brand-500 bg-ink-950 p-6 text-white">
              <Quote className="size-6 text-brand-500" aria-hidden="true" />
              <p className="font-display mt-3 text-xl leading-relaxed">
                {tr("ჩვენ არ ვყიდით მხოლოდ ელექტროობას, რემონტს, სანტექნიკას. ჩვენ ვყიდით სიმშვიდეს, ორგანიზებულ პროცესს და ერთ პასუხისმგებელ კომპანიას.")}
              </p>
            </blockquote>

            {/* თაღისებური ჩარჩო — ინტერიერის სტუდიების მოტივი, ბრენდის წრეებს ეხმიანება */}
            <div className="relative mx-auto mt-10 aspect-[4/5] w-full max-w-sm overflow-hidden rounded-t-full rounded-b-2xl">
              <Image
                src="/images/brand/post-everything-starts-with-idea.jpg"
                alt={tr("ყველაფერი იდეიდან იწყება — TNT POWER")}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top"
              />
              <span className="absolute inset-y-0 right-0 w-1.5 bg-brand-500" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-ink-200 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-ink-950">{tr("რისი აღება შეგვიძლია")}</h3>
              <ul className="mt-4 space-y-3">
                {scopeOptions.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink-700">
                    <BrandCheck className="mt-0.5" />
                    {tr(item)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-brand-500 p-6 text-ink-950 sm:p-8">
              <p className="font-brand text-[0.7rem] uppercase tracking-[0.22em] text-ink-900">
                Ready to renovate?
              </p>
              <h3 className="font-display mt-2 text-2xl font-semibold">{tr("მთავარი დაპირება")}</h3>
              <p className="mt-1 text-sm text-ink-900">{tr("მომხმარებელი გვიკავშირდება. ჩვენ:")}</p>
              <ol className="mt-4 space-y-3">
                {promise.map((item, i) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink-950 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="font-medium">{tr(item)}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <ProcessSteps />

      <section className="bg-paper py-14 sm:py-16 lg:py-24">
        <Container className="text-center">
          <SectionHeading
            align="center"
            eyebrow={tr("ჩვენი სლოგანი")}
            title={tr(site.slogan)}
            description={`${tr(site.sloganAlt)}${tr(" From Idea to Completion. TNT POWER — პასუხისმგებლობას ვიღებთ შედეგზე.")}`}
          />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={href("/contact")} size="lg">
              {tr("დაგვიკავშირდით")}
            </Button>
            <Button href={href("/services")} size="lg" variant="outline">
              {tr("სერვისები")}
            </Button>
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
