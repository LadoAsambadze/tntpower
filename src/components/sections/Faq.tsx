import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/ui/FaqList";
import type { FaqItem } from "@/data/faq";
import { getI18n } from "@/i18n/server";

interface FaqProps {
  items: FaqItem[];
  eyebrow?: string;
  title: string;
  description?: string;
}

export async function Faq({ items, eyebrow, title, description }: FaqProps) {
  const { tr } = await getI18n();
  return (
    <section className="bg-ink-50 py-14 sm:py-16 lg:py-24">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <SectionHeading eyebrow={eyebrow ?? tr("კითხვა–პასუხი")} title={title} description={description} />
        <FaqList items={items} />
      </Container>
    </section>
  );
}
