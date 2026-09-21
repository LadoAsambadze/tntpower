import { Calculator, MapPin, ShieldCheck, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Carousel } from "@/components/ui/Carousel";
import { Reveal } from "@/components/brand/Reveal";
import { site } from "@/data/site";

const items = [
  {
    icon: ShieldCheck,
    title: "ერთი პასუხისმგებელი მხარე",
    text: "შედეგზე ერთი კომპანია აგებს პასუხს — არა ათი სხვადასხვა ხელოსანი.",
  },
  {
    icon: Calculator,
    title: "გამჭვირვალე ხარჯთაღრიცხვა",
    text: "ფასი ცნობილია დაწყებამდე. ცვლილებები — მხოლოდ თქვენთან შეთანხმებით.",
  },
  {
    icon: Users,
    title: "ერთიანი სამუშაო ჯგუფი",
    text: "საჭიროების მიხედვით ვაერთიანებთ სპეციალისტებს ერთი მართვის ქვეშ.",
  },
  {
    icon: MapPin,
    title: site.serviceArea,
    text: "ვმუშაობთ ადგილზე — ობიექტის დათვალიერება და შეფასება სწრაფად.",
  },
];

/** მოკლე „რატომ ჩვენ" ზოლი — სვეტები თხელი ხაზებით, მობილურზე გადაფურცვლადი */
export function TrustStrip() {
  return (
    <section className="border-b border-ink-200 bg-paper">
      <Container className="py-8 lg:py-10">
        <Reveal>
          <Carousel
            label="რატომ TNT POWER"
            controls={false}
            perView="[--per-view:1.35] sm:[--per-view:2] lg:[--per-view:4]"
            gap="[--gap:0px]"
            itemClassName="border-l border-ink-200 px-5 first:border-l-0 first:pl-0 last:pr-0"
          >
            {items.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex h-full gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-brand-500 text-ink-950">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold leading-snug text-ink-950">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">{text}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </Reveal>
      </Container>
    </section>
  );
}
