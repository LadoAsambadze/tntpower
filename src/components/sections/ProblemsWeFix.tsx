import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BrandCheck } from "@/components/ui/BrandCheck";
import { Carousel } from "@/components/ui/Carousel";
import { ServiceIcon } from "@/components/ServiceIcon";
import { problems, type Problem } from "@/data/problems";
import { getService } from "@/data/services";
import { site } from "@/data/site";

function ProblemCard({ problem: p }: { problem: Problem }) {
  const service = getService(p.service);
  return (
    <Link
      href={`/services/${p.service}`}
      className="group flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-5 transition-colors hover:border-ink-950 hover:bg-ink-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <span className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-ink-950 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-ink-950">
          <ServiceIcon name={p.icon} className="size-5" />
        </span>
        <span className="min-w-0">
          <span className="block font-semibold leading-snug text-ink-950">{p.problem}</span>
          <span className="mt-0.5 block text-sm text-ink-600">{p.symptom}</span>
        </span>
      </span>
      <span className="mt-3 flex flex-1 items-start gap-2 text-sm text-ink-800">
        <BrandCheck size="sm" className="mt-0.5" />
        {p.solution}
      </span>
      <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-ink-950 underline decoration-brand-500 decoration-2 underline-offset-4">
        {service?.shortTitle ?? "სერვისი"}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

/**
 * „იცნობთ ამ სიტუაციას?" — კონკრეტული პრობლემები, რომლითაც გვიკავშირდებიან.
 * გაყოფილი განლაგება: მარცხნივ სათაური და მოწოდება, მარჯვნივ პატარა კარუსელი — თითო ბარათი სერვისამდე მიდის.
 */
export function ProblemsWeFix() {
  return (
    <section className="bg-paper py-14 sm:py-16 lg:py-24">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
        <div>
          <SectionHeading
            eyebrow="იცნობთ ამ სიტუაციას?"
            title="პრობლემა, რომელიც დღეს გაწუხებთ — ჩვენი საქმეა"
            description="არ არის აუცილებელი, იცოდეთ, რომელი სპეციალისტი გჭირდებათ. აღწერეთ სიტუაცია — შესაბამის ჯგუფს ჩვენ ავარჩევთ."
          />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button href="/contact">აღწერეთ თქვენი სიტუაცია</Button>
            <Button href={site.whatsappHref} variant="outline" target="_blank">
              გამოგზავნეთ ფოტო WhatsApp-ით
            </Button>
          </div>
        </div>

        <Carousel
          label="ხშირი პრობლემები, რომლებსაც ვხსნით"
          perView="[--per-view:1.1] sm:[--per-view:2]"
          gap="[--gap:0.75rem]"
        >
          {problems.map((p) => (
            <ProblemCard key={p.service} problem={p} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
