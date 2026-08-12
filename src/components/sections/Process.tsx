import { CalendarClock, Handshake, MoveRight, Send } from "lucide-react";
import { processSteps } from "../../data/content";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Section";

const icons = [Send, CalendarClock, PackagePickup, MoveRight];

function PackagePickup({ size, ariaHidden }: { size: number; ariaHidden?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={ariaHidden}
    >
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

export function Process() {
  return (
    <Section id="processo" className="bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Processo de Trabalho"
          title="Como funciona — simples e com hora marcada"
          description="Da primeira conversa à entrega final, um fluxo desenhado para agilizar o seu dia."
        />

        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={step.step} delay={i * 0.12}>
                <li className="group relative h-full rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 shadow-2xl transition-all hover:-translate-y-1.5 hover:border-neutral-600">
                  <div className="mb-4 inline-flex rounded-xl bg-neutral-800 p-3 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                    Passo {step.step}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="mt-12 text-center">
          <a
            href="#contato"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-red/20 transition-all hover:-translate-y-0.5 hover:bg-brand-darkred"
          >
            <Handshake size={18} aria-hidden="true" />
            Comece agora — agende uma coleta
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
