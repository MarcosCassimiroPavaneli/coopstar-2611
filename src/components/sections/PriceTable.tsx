import { Info } from "lucide-react";
import { priceTable } from "../../data/content";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Section";

export function PriceTable() {
  return (
    <Section id="tabela" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={priceTable.title}
          title={priceTable.heading}
          description="Valores de referência para entregas na Capital, Grande São Paulo e fora da capital."
        />

        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <caption className="sr-only">Tabela de preços de entregas</caption>
                <thead>
                  <tr className="bg-brand-blue text-white">
                    {priceTable.columns.map((column) => (
                      <th key={column} scope="col" className="px-6 py-4 font-semibold">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceTable.rows.map((row, i) => (
                    <tr
                      key={row.region}
                      className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50"} transition-colors hover:bg-brand-blue/5`}
                    >
                      <th scope="row" className="px-6 py-4 font-semibold text-slate-900">
                        {row.region}
                      </th>
                      <td className="px-6 py-4 font-bold text-brand-darkred">{row.price}</td>
                      <td className="px-6 py-4 text-slate-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="flex items-start gap-2 border-t border-slate-200 bg-slate-50 px-6 py-4 text-xs leading-relaxed text-slate-500">
              <Info size={16} className="mt-0.5 shrink-0 text-brand-sky" aria-hidden="true" />
              {priceTable.disclaimer}
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
