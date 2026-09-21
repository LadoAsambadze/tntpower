import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/brand/Reveal";

/**
 * ბრენდის „მანიფესტი" — ერთი დიდი სერიფული წინადადება თხელ ხაზებს შორის.
 * ჰერო-ს შემდეგ, სანამ სერვისებზე გადავიდოდეთ.
 */
export function Statement() {
  return (
    <section className="border-b border-ink-200 bg-paper">
      <Container className="py-14 sm:py-16 lg:py-20">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="font-brand text-sm uppercase tracking-[0.28em] text-ink-500">
            Renovate your house
          </p>
          <p className="font-display mt-5 text-2xl leading-[1.3] text-ink-950 sm:text-3xl lg:text-[2.5rem]">
            ჩვენ არ ვყიდით მხოლოდ ელექტროობას, რემონტს ან სანტექნიკას. ვყიდით{" "}
            <mark className="bg-brand-300 px-1.5 text-ink-950">სიმშვიდეს</mark>, ორგანიზებულ
            პროცესს და ერთ პასუხისმგებელ კომპანიას.
          </p>
          <span className="mx-auto mt-7 block h-0.5 w-12 bg-brand-500" aria-hidden="true" />
        </Reveal>
      </Container>
    </section>
  );
}
