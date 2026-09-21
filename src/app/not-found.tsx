import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-ink-50 py-24">
      <Container className="text-center">
        <p className="font-brand text-sm uppercase tracking-[0.28em] text-ink-600">404</p>
        <h1 className="font-display mt-3 text-4xl font-semibold text-ink-950 sm:text-5xl">
          გვერდი ვერ მოიძებნა
        </h1>
        <p className="mx-auto mt-4 max-w-md text-ink-600">
          ბმული შესაძლოა შეიცვალა ან წაიშალა. დაბრუნდით მთავარ გვერდზე ან ნახეთ ჩვენი
          სერვისები.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">მთავარი გვერდი</Button>
          <Button href="/services" variant="outline">
            სერვისები
          </Button>
        </div>
      </Container>
    </section>
  );
}
