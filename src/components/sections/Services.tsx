import { Map, Package, type LucideIcon } from "lucide-react";
import { services } from "../../data/content";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Picture } from "../ui/Image";
import { Reveal } from "../ui/Section";

function MotorcycleIcon({ size, ariaHidden }: { size: number; ariaHidden?: boolean }) {
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
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M9 17.5h6" />
      <path d="M15 17.5 12 9H9m0 0 1.5-3H13" />
      <path d="M3 13.5h4l1-2" />
    </svg>
  );
}

const iconMap: Record<string, LucideIcon | typeof MotorcycleIcon> = {
  motorcycle: MotorcycleIcon,
  package: Package,
  map: Map,
};

export function Services() {
  return (
    <Section id="servicos" className="bg-slate-950 py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Nossos Serviços"
          title="Soluções de moto frete para cada necessidade"
          description="Selecione um serviço e conheça como podemos agilizar as entregas do seu dia a dia."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <Reveal key={service.id} delay={i * 0.12}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-brand-sky/50 hover:shadow-2xl hover:shadow-brand-blue/10">
                  <div className="relative h-52 overflow-hidden">
                    <Picture
                      base={`/images/${service.image}`}
                      alt={service.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    <div className="absolute top-3 right-3 rounded-lg border border-slate-700/80 bg-slate-950/80 px-2 py-1 shadow-sm backdrop-blur-sm">
                      <img src="/images/logo.png" alt="Coopstar Express" className="h-4 w-auto object-contain" />
                    </div>
                    <div className="absolute bottom-4 left-4 rounded-full border border-slate-700 bg-slate-900/90 p-2.5 text-brand-sky shadow-card backdrop-blur-sm">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                      {service.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2 text-sm text-slate-300">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-sky" aria-hidden="true" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contato"
                      className="mt-6 inline-flex items-center font-semibold text-brand-sky transition-colors hover:text-white"
                    >
                      Solicitar orçamento
                      <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
