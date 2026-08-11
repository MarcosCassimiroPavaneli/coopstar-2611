import { CheckCircle2 } from "lucide-react";
import { about } from "../../data/content";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Section";

export function About() {
  return (
    <Section id="sobre" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={about.title} title={about.heading} />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <a
                href="#contato"
                className="inline-flex items-center gap-2 font-semibold text-brand-blue transition-colors hover:text-brand-navy"
              >
                <CheckCircle2 size={18} aria-hidden="true" />
                {about.cta}
              </a>
            </div>
          </Reveal>

          <div className="grid grid-cols-3 gap-4">
            {about.highlights.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.1}>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center transition-all hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-card">
                  <p className="text-3xl font-extrabold text-brand-blue">{item.value}</p>
                  <p className="mt-2 text-sm font-medium text-slate-500">{item.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
