import { useState, type FormEvent } from "react";
import { CheckCircle2, Clock, Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company } from "../../data/content";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Section";

const DEFAULT_WEB3FORMS_KEY = "860ca439-0072-48c1-a81e-f7a57b807050";
const WEB3FORMS_KEY = (import.meta.env.VITE_WEB3FORMS_KEY as string | undefined) || DEFAULT_WEB3FORMS_KEY;
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

type Status = "idle" | "sending" | "success" | "error" | "no-key";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const apiKey = WEB3FORMS_KEY || FORMSPREE_ENDPOINT;

    if (!apiKey) {
      setStatus("no-key");
      return;
    }

    setStatus("sending");

    try {
      let response: Response;

      if (apiKey.startsWith("http://") || apiKey.startsWith("https://")) {
        // Formspree ou URL personalizada
        response = await fetch(apiKey, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
      } else {
        // Web3Forms (via Access Key)
        data.append("access_key", apiKey);
        data.append("from_name", "Coopstar Express Site");
        response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
      }

      const result = await response.json().catch(() => ({}));

      if (response.ok && (result.success === undefined || result.success === true)) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const contactItems = [
    { icon: Phone, label: "Telefone", value: `${company.phones[0]} / ${company.phones[1]}`, href: company.phoneLink },
    { icon: Mail, label: "E-mail", value: company.email, href: company.emailLink },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: company.phones[0],
      href: company.whatsappLink,
      external: true,
    },
    { icon: Clock, label: "Atendimento", value: company.hours },
    {
      icon: MapPin,
      label: "Endereço",
      value: `${company.address.street} — ${company.address.city}`,
    },
  ];

  return (
    <Section id="contato" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contato / Localização"
          title="Fale com a gente e agende sua coleta"
          description="Preencha o formulário ou chame no WhatsApp. Respondemos rapidamente, 24 horas por dia."
        />

        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <form onSubmit={handleSubmit} noValidate={false} className="space-y-5">
                {/* Anti-spam honeypot */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nome" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Nome completo *
                    </label>
                    <input id="nome" name="name" type="text" required placeholder="Seu nome" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="telefone" className="mb-1.5 block text-sm font-medium text-slate-700">
                      Telefone / WhatsApp *
                    </label>
                    <input id="telefone" name="phone" type="tel" required placeholder="(11) 99999-9999" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                    E-mail *
                  </label>
                  <input id="email" name="email" type="email" required placeholder="voce@exemplo.com" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="assunto" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Assunto *
                  </label>
                  <input id="assunto" name="subject" type="text" required placeholder="Ex.: Orçamento de moto frete" className={inputClass} />
                </div>

                <div>
                  <label htmlFor="mensagem" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Mensagem *
                  </label>
                  <textarea id="mensagem" name="message" required rows={4} placeholder="Descreva os detalhes da entrega ou serviço desejado..." className={`${inputClass} resize-y`} />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                      Enviando mensagem...
                    </>
                  ) : (
                    "Enviar mensagem"
                  )}
                </button>

                {status === "success" && (
                  <p className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700" role="status">
                    <CheckCircle2 size={18} aria-hidden="true" />
                    Mensagem enviada com sucesso! Entraremos em contato em breve.
                  </p>
                )}
                {status === "error" && (
                  <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
                    Ocorreu um erro ao enviar. Por favor, tente novamente ou entre em contato pelo WhatsApp.
                  </p>
                )}
                {status === "no-key" && (
                  <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800" role="alert">
                    ⚠️ <strong>Chave do Web3Forms não configurada:</strong> Adicione a variável <code className="rounded bg-amber-100 px-1 py-0.5 font-mono text-xs">VITE_WEB3FORMS_KEY</code> nas configurações da Vercel para receber as mensagens no seu e-mail.
                  </p>
                )}
              </form>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={0.15}>
            <div className="flex h-full flex-col gap-6">
              <ul className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                {contactItems.map((item) => (
                  <li key={item.label} className="flex items-start gap-4">
                    <span className="rounded-lg bg-brand-blue/10 p-2.5 text-brand-blue">
                      <item.icon size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="text-sm font-semibold text-slate-900 transition-colors hover:text-brand-blue"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-slate-900">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex-1 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <iframe
                  title="Mapa de localização da Coopstar Express"
                  src={company.mapEmbed}
                  className="h-full min-h-[300px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
