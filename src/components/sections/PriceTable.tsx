import { Info } from "lucide-react";
import { priceTable } from "../../data/content";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Section";

export function PriceTable() {
  return (
    <Section id="tabela" className="bg-neutral-950 border-y border-neutral-800 py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={priceTable.title}
          title={priceTable.heading}
          description="Valores de referência para entregas na Capital, Grande São Paulo e fora da capital."
        />

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/90 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <caption className="sr-only">Tabela de preços de entregas</caption>
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-800/80 text-zinc-300">
                    {priceTable.columns.map((column) => (
                      <th key={column} scope="col" className="px-6 py-4 font-bold uppercase tracking-wider text-xs">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceTable.rows.map((row, i) => (
                    <tr
                      key={row.region}
                      className={`${i % 2 === 0 ? "bg-neutral-900/90" : "bg-black/60"} transition-colors hover:bg-neutral-800/70`}
                    >
                      <th scope="row" className="px-6 py-4 font-semibold text-white">
                        {row.region}
                      </th>
                      <td className="px-6 py-4 font-extrabold text-red-400">{row.price}</td>
                      <td className="px-6 py-4 text-zinc-300">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="flex items-start gap-2 border-t border-neutral-800 bg-black/80 px-6 py-4 text-xs leading-relaxed text-zinc-400">
              <Info size={16} className="mt-0.5 shrink-0 text-brand-red" aria-hidden="true" />
              {priceTable.disclaimer}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
