import { useState, type FormEvent } from "react";
import { CheckCircle2, Clock, Loader2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company } from "../../data/content";
import { Section } from "../ui/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Section";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT as string | undefined;

type Status = "idle" | "sending" | "success" | "error" | "no-key";

const inputClass =
  "w-full rounded-lg border border-neutral-800 bg-black/90 px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition-colors focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600/30";

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
        // Web3Forms (via Access Key com JSON)
        const payload = {
          access_key: apiKey,
          from_name: "Coopstar Express Site",
          subject: data.get("subject") || "Novo contato do site",
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
        };
        response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
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
    <Section id="contato" className="bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contato / Localização"
          title="Fale com a gente e agende sua coleta"
          description="Preencha o formulário ou chame no WhatsApp. Respondemos rapidamente, 24 horas por dia."
        />

        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 shadow-2xl sm:p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 rounded-full bg-emerald-950/80 border border-emerald-800 p-4 text-emerald-400">
                    <CheckCircle2 size={48} aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">Mensagem enviada com sucesso!</h3>
                  <p className="mb-6 max-w-md text-sm text-zinc-300">
                    Agradecemos seu contato. Recebemos sua mensagem e nossa equipe retornará em breve.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-red px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-darkred"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate={false} className="space-y-5">
                  {/* Anti-spam honeypot */}
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="nome" className="mb-1.5 block text-sm font-medium text-zinc-200">
                        Nome completo *
                      </label>
                      <input id="nome" name="name" type="text" required placeholder="Seu nome" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="telefone" className="mb-1.5 block text-sm font-medium text-zinc-200">
                        Telefone / WhatsApp *
                      </label>
                      <input id="telefone" name="phone" type="tel" required placeholder="(11) 99999-9999" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-zinc-200">
                      E-mail *
                    </label>
                    <input id="email" name="email" type="email" required placeholder="voce@exemplo.com" className={inputClass} />
                  </div>

                  <div>
                    <label htmlFor="assunto" className="mb-1.5 block text-sm font-medium text-zinc-200">
                      Assunto *
                    </label>
                    <input id="assunto" name="subject" type="text" required placeholder="Ex.: Orçamento de moto frete" className={inputClass} />
                  </div>

                  <div>
                    <label htmlFor="mensagem" className="mb-1.5 block text-sm font-medium text-zinc-200">
                      Mensagem *
                    </label>
                    <textarea id="mensagem" name="message" required rows={4} placeholder="Descreva os detalhes da entrega ou serviço desejado..." className={`${inputClass} resize-y`} />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-red px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-red/20 transition-all hover:-translate-y-0.5 hover:bg-brand-darkred disabled:cursor-not-allowed disabled:opacity-60"
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

                  {status === "error" && (
                    <p className="rounded-lg bg-red-950/80 border border-red-800 px-4 py-3 text-sm font-medium text-red-300" role="alert">
                      Ocorreu um erro ao enviar. Por favor, tente novamente ou entre em contato pelo WhatsApp.
                    </p>
                  )}
                  {status === "no-key" && (
                    <p className="rounded-lg bg-amber-950/80 border border-amber-800 px-4 py-3 text-sm text-amber-300" role="alert">
                      ⚠️ <strong>Chave do Web3Forms não configurada:</strong> Adicione a variável <code className="rounded bg-amber-900/60 px-1 py-0.5 font-mono text-xs text-amber-200">VITE_WEB3FORMS_KEY</code> nas configurações da Vercel para receber as mensagens no seu e-mail.
                    </p>
                  )}
                </form>
              )}
            </div>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={0.15}>
            <div className="flex h-full flex-col gap-6">
              <ul className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 shadow-2xl">
                {contactItems.map((item) => (
                  <li key={item.label} className="flex items-start gap-4">
                    <span className="rounded-lg bg-neutral-800 p-2.5 text-brand-red">
                      <item.icon size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="text-sm font-semibold text-white transition-colors hover:text-brand-red"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-white">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex-1 overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl">
                <iframe
                  title="Mapa de localização da Coopstar Express"
                  src={company.mapEmbed}
                  className="h-full min-h-[300px] w-full grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
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
