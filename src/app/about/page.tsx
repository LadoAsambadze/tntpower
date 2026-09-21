import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "ჩვენ შესახებ",
  description: `TNT POWER — სამშენებლო კომპანია ${site.cityIn}. ერთი პასუხისმგებელი მხარე თქვენი პროექტისთვის: ვაფასებთ, ვგეგმავთ, ვადგენთ ხარჯთაღრიცხვას, ვაწყობთ ჯგუფს, ვაკონტროლებთ ხარისხს და ვაბარებთ შედეგს.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ჩვენ შესახებ"
        title="TNT POWER = ერთი პასუხისმგებელი მხარე"
        description="TNT POWER არის სამშენებლო კომპანია, რომელიც იღებს პასუხისმგებლობას თქვენი პროექტის სრულ ან ნაწილობრივ განხორციელებაზე. თქვენ არ გჭირდებათ სხვადასხვა ხელოსნის, ელექტრიკოსის, სანტექნიკოსისა და მღებავის ცალ-ცალკე მოძებნა და მართვა — გყავთ ერთი პასუხისმგებელი კომპანია."
        crumbs={[{ href: "/about", label: "ჩვენ შესახებ" }]}
        image="/images/brand/worker-carrying-board.jpg"
        imagePosition="top"
      />

      <section className="bg-paper py-14 sm:py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="ჩვენი მიდგომა"
              title="ვიღებთ პასუხისმგებლობას შედეგზე"
            />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-700">
              <p>
                ჩვენ ვიღებთ პასუხისმგებლობას სამშენებლო პროექტის განხორციელებაზე და
                საჭიროების მიხედვით ვაერთიანებთ შესაბამის სპეციალისტებს — ელექტრიკოსს,
                სანტექნიკოსს, მღებავს, ფილების ოსტატს, მშენებელს.
              </p>
              <p>
                მომხმარებელს შეუძლია მოგვმართოს ერთი კონკრეტული პრობლემით ან სრული
                პროექტით: იდეა → დაგეგმვა → ხარჯთაღრიცხვა → მასალების შეძენა → სამუშაოების
                ორგანიზება → შესრულება → ჩაბარება.
              </p>
            </div>

            <blockquote className="mt-8 rounded-2xl border-l-4 border-brand-500 bg-ink-950 p-6 text-white">
              <Quote className="size-6 text-brand-500" aria-hidden="true" />
              <p className="font-display mt-3 text-xl leading-relaxed">
                ჩვენ არ ვყიდით მხოლოდ ელექტროობას, რემონტს, სანტექნიკას. ჩვენ ვყიდით
                სიმშვიდეს, ორგანიზებულ პროცესს და ერთ პასუხისმგებელ კომპანიას.
              </p>
            </blockquote>

            {/* თაღისებური ჩარჩო — ინტერიერის სტუდიების მოტივი, ბრენდის წრეებს ეხმიანება */}
            <div className="relative mx-auto mt-10 aspect-[4/5] w-full max-w-sm overflow-hidden rounded-t-full rounded-b-2xl">
              <Image
                src="/images/brand/post-everything-starts-with-idea.jpg"
                alt="ყველაფერი იდეიდან იწყება — TNT POWER"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top"
              />
              <span className="absolute inset-y-0 right-0 w-1.5 bg-brand-500" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-ink-200 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-ink-950">რისი აღება შეგვიძლია</h3>
              <ul className="mt-4 space-y-3">
                {scopeOptions.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink-700">
                    <BrandCheck className="mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-brand-500 p-6 text-ink-950 sm:p-8">
              <p className="font-brand text-[0.7rem] uppercase tracking-[0.22em] text-ink-900">
                Ready to renovate?
              </p>
              <h3 className="font-display mt-2 text-2xl font-semibold">მთავარი დაპირება</h3>
              <p className="mt-1 text-sm text-ink-900">მომხმარებელი გვიკავშირდება. ჩვენ:</p>
              <ol className="mt-4 space-y-3">
                {promise.map((item, i) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink-950 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="font-medium">{item}</span>
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
            eyebrow="ჩვენი სლოგანი"
            title={site.slogan}
            description={`${site.sloganAlt} From Idea to Completion. TNT POWER — პასუხისმგებლობას ვიღებთ შედეგზე.`}
          />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              დაგვიკავშირდით
            </Button>
            <Button href="/services" size="lg" variant="outline">
              სერვისები
            </Button>
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
