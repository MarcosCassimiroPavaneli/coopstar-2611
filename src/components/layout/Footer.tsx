import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { company, navLinks } from "../../data/content";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto grid max-w-container gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <img
            src="/images/logo.png"
            alt={`Logo ${company.name}`}
            className="h-14 w-auto invert"
            width={280}
            height={56}
            loading="lazy"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Especialistas em serviços de moto frete, entregas e coletas em São
            Paulo Capital e Grande São Paulo, 24 horas por dia.
          </p>
        </div>

        <nav aria-label="Links do rodapé">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
            Navegação
          </h3>
          <ul className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm transition-colors hover:text-brand-sky"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
            Contato
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-sky" aria-hidden="true" />
              <span>
                {company.address.street}
                <br />
                {company.address.city}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-brand-sky" aria-hidden="true" />
              <a href={company.phoneLink} className="transition-colors hover:text-brand-sky">
                {company.phones[0]} / {company.phones[1]}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-brand-sky" aria-hidden="true" />
              <a href={company.emailLink} className="transition-colors hover:text-brand-sky">
                {company.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Clock size={16} className="shrink-0 text-brand-sky" aria-hidden="true" />
              <span>{company.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-3 px-4 py-6 text-center text-xs text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {company.name}. Todos os direitos reservados.</p>
          <p>
            Desenvolvimento{" "}
            <a
              href="https://www.estudiocriarte.com.br/promohotsite"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-brand-sky"
            >
              Estúdio Criarte
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
