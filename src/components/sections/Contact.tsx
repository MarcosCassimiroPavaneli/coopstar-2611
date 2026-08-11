import { useState, type FormEvent } from "react";
import { CheckCircle2, Clock, Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company } from "../../data/content";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Section";

const FORM_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-brand-blue focus:outline-none focus:ring-2 focus:ring-brand-blue/30";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!FORM_ENDPOINT) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
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
              {FORM_ENDPOINT ? (
                <>
                  <form onSubmit={handleSubmit} noValidate={false} className="space-y-5">
                    <div>
                      <label htmlFor="nome" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Nome
                      </label>
                      <input id="nome" name="nome" type="text" required placeholder="Seu nome" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                        E-mail
                      </label>
                      <input id="email" name="email" type="email" required placeholder="voce@exemplo.com" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="assunto" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Assunto
                      </label>
                      <input id="assunto" name="assunto" type="text" required placeholder="Solicitação de orçamento" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="mensagem" className="mb-1.5 block text-sm font-medium text-slate-700">
                        Mensagem
                      </label>
                      <textarea id="mensagem" name="mensagem" required rows={5} placeholder="Descreva sua necessidade..." className={`${inputClass} resize-y`} />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white shadow-card transition-all hover:-translate-y-0.5 hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                          Enviando...
                        </>
                      ) : (
                        "Enviar mensagem"
                      )}
                    </button>

                    {status === "success" && (
                      <p className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700" role="status">
                        <CheckCircle2 size={18} aria-hidden="true" />
                        Mensagem enviada com sucesso! Agradecemos seu contato.
                      </p>
                    )}
                    {status === "error" && (
                      <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
                        Não foi possível enviar. Tente novamente ou chame pelo WhatsApp.
                      </p>
                    )}
                  </form>
                  <p className="mt-4 text-xs text-slate-400">
                    * Endpoint do Formspree não configurado. Adicione{" "}
                    <code className="rounded bg-slate-100 px-1.5 py-0.5">VITE_FORMSPREE_ENDPOINT</code> no arquivo{" "}
                    <code className="rounded bg-slate-100 px-1.5 py-0.5">.env</code>.
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <Mail size={40} className="text-brand-sky" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-slate-900">Preferimos ouvir você por aqui</h3>
                  <p className="max-w-md text-sm text-slate-600">
                    O formulário está aguardando a configuração do serviço de envio (Formspree).
                    Enquanto isso, chame a gente pelo telefone ou WhatsApp.
                  </p>
                  <a href={company.phoneLink} className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-6 py-3 text-sm font-semibold text-white">
                    <Phone size={16} aria-hidden="true" />
                    {company.phones[0]}
                  </a>
                </div>
              )}
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
