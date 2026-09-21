import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Carousel } from "@/components/ui/Carousel";
import { ServiceIcon } from "@/components/ServiceIcon";
import { BrandCircles } from "@/components/brand/BrandCircles";
import { processSteps } from "@/data/process";

import { getI18n } from "@/i18n/server";

interface ProcessStepsProps {
  /** სათაურის გარეშე — როცა სექცია სხვა სათაურის ქვეშ ჯდება */
  compact?: boolean;
}

/** როგორ ვმუშაობთ — ექვსი ნაბიჯი გადაფურცვლად ლენტაზე */
export async function ProcessSteps({ compact = false }: ProcessStepsProps) {
  const { tr } = await getI18n();
  return (
    <section className="relative overflow-hidden bg-ink-950 py-14 text-white sm:py-16 lg:py-24">
      <Image
        src="/images/brand/workshop-dark-wide.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-25"
      />
      <div className="absolute inset-0 bg-ink-950/60" aria-hidden="true" />
      <BrandCircles className="absolute -bottom-40 -left-32 w-[36rem] text-white/10" />

      <Container className="relative">
        {!compact && (
          <SectionHeading
            light
            eyebrow={tr("როგორ ვმუშაობთ")}
            title={tr("პრობლემა → TNT POWER → შედეგი")}
            description={tr("მომხმარებელი გვიკავშირდება — დანარჩენს ჩვენ ვიღებთ ჩვენზე. ექვსი ნაბიჯი, ერთი პასუხისმგებელი.")}
          />
        )}

        <div className={compact ? undefined : "mt-10"}>
          <Carousel
            light
            label={tr("როგორ ვმუშაობთ — ნაბიჯები")}
            perView="[--per-view:1.15] sm:[--per-view:2] lg:[--per-view:3]"
            gap="[--gap:1rem]"
          >
            {processSteps.map((step, i) => (
              <div
                key={step.title}
                className="flex h-full flex-col rounded-2xl border border-white/10 bg-ink-950/60 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-md bg-brand-500 text-ink-950">
                    <ServiceIcon name={step.icon} className="size-5" />
                  </span>
                  <span className="font-display text-4xl leading-none text-white/15" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold">
                  <span className="sr-only">{tr("ნაბიჯი")} {i + 1}: </span>
                  {tr(step.title)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{tr(step.text)}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </Container>
    </section>
  );
}
