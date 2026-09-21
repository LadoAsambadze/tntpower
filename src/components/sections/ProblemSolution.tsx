import { X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrandCheck } from "@/components/ui/BrandCheck";
import { Reveal } from "@/components/brand/Reveal";
import { comparisonColumns, comparisonRows } from "@/data/process";
import { getI18n } from "@/i18n/server";

/** „TNT POWER-თან / ცალ-ცალკე ხელოსნებთან" — შედარების ცხრილი თხელი ხაზებით */
export async function ProblemSolution() {
  const { tr } = await getI18n();
  return (
    <section className="bg-ink-50 py-14 sm:py-16 lg:py-24">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
        <SectionHeading
          eyebrow={tr("რატომ TNT POWER")}
          title={tr("გაქვთ ბინა და არ იცით, საიდან დაიწყოთ რემონტი?")}
          description={tr("ხუთი ხელოსნის ნაცვლად — ერთი პასუხისმგებელი კომპანია. აი, რა იცვლება, როცა პროექტს TNT POWER-ს ანდობთ.")}
        />

        <Reveal delay={100}>
          <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-ink-200">
                  <th
                    scope="col"
                    className="p-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink-500 sm:p-5"
                  >
                    {tr("რას იღებთ")}
                  </th>
                  <th
                    scope="col"
                    className="w-24 bg-brand-500 p-3 text-center text-xs font-black italic tracking-tight text-ink-950 sm:w-32 sm:p-4 sm:text-sm"
                  >
                    {tr(comparisonColumns.us)}
                  </th>
                  <th
                    scope="col"
                    className="w-24 p-3 text-center text-[0.65rem] font-semibold uppercase leading-tight tracking-wider text-ink-500 sm:w-32 sm:p-4"
                  >
                    {tr(comparisonColumns.them)}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-200">
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <td className="p-4 sm:p-5">
                      <span className="block font-medium leading-snug text-ink-950">{tr(row.label)}</span>
                      {row.hint && (
                        <span className="mt-0.5 block text-sm text-ink-600">{tr(row.hint)}</span>
                      )}
                    </td>
                    <td className="bg-brand-50 text-center">
                      <BrandCheck className="mx-auto" />
                      <span className="sr-only">{tr("დიახ")}</span>
                    </td>
                    <td className="text-center">
                      <X className="mx-auto size-5 text-ink-300" aria-hidden="true" />
                      <span className="sr-only">{tr("არა")}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
