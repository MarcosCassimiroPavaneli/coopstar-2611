export const company = {
  name: "Coopstar Express",
  tagline: "Serviços de Moto Frete",
  phones: ["(11) 5052-3563", "(11) 5051-4442"],
  phoneLink: "tel:+551150523563",
  whatsappLink: "https://wa.me/551150523563",
  email: "coopstar_express@hotmail.com",
  emailLink: "mailto:coopstar_express@hotmail.com",
  address: {
    street: "Av. Jurucê, 898 — Moema",
    city: "São Paulo — SP",
    postalCode: "04080-013",
  },
  hours: "Atendimento 24 horas, de segunda a segunda",
  mapEmbed:
    "https://www.google.com/maps?q=Av.+Juruc%C3%AA,+898+-+Moema,+S%C3%A3o+Paulo,+04080-013&output=embed",
};

export const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Quem Somos", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Tabela", href: "#tabela" },
  { label: "Processo", href: "#processo" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export const heroSlides = [
  {
    image: "/images/hero-1-v3",
    eyebrow: "Moto Frete em São Paulo",
    title: "Entregas rápidas, 24 horas por dia",
    subtitle:
      "Documentos, pequenos volumes e serviços bancários entregues no menor tempo, de segunda a segunda, com hora marcada.",
    cta: "Solicitar orçamento",
  },
  {
    image: "/images/hero-2-v3",
    eyebrow: "Agilidade para sua empresa",
    title: "Seu time logístico em duas rodas",
    subtitle:
      "Delivery empresarial com o melhor custo-benefício para farmácias, pizzarias, restaurantes e auto peças.",
    cta: "Conhecer serviços",
  },
  {
    image: "/images/hero-3-v3",
    eyebrow: "Fora da capital",
    title: "Atendimento em toda Grande São Paulo",
    subtitle:
      "Coletas e entregas também fora da capital. Confira nossa tabela de preços e tenha hora marcada.",
    cta: "Ver tabela de preços",
  },
  {
    image: "/images/hero-4-v3",
    eyebrow: "9+ anos de experiência",
    title: "A confiança de mais de nove anos no mercado",
    subtitle:
      "Uma equipe especializada pronta para garantir o sucesso da sua empresa todos os dias, a qualquer hora.",
    cta: "Fale com a gente",
  },
];

export const about = {
  title: "Quem Somos",
  heading: "Especialistas em entregas e coletas ágeis",
  paragraphs: [
    "A Coopstar Express é uma empresa especializada em serviços de entregas e coletas, atuando há mais de nove anos no mercado. Oferecemos ótimos serviços e desempenhamos uma função importante para nossos clientes: agilizar os mais diversos atendimentos, tornando-nos uma empresa de destaque no segmento de moto frete.",
    "Atendemos em São Paulo (Capital) e Grande São Paulo, com uma equipe especializada para suprir a necessidade e garantir o sucesso da sua empresa. Funcionamos 24 horas, de segunda a segunda-feira, com agendamento em hora marcada.",
  ],
  highlights: [
    { value: "9+", label: "anos de mercado" },
    { value: "24h", label: "por dia, todos os dias" },
    { value: "100%", label: "SP Capital e Grande SP" },
  ],
  cta: "Solicite um orçamento",
};

export type Service = {
  id: string;
  icon: "motorcycle" | "package" | "map";
  title: string;
  description: string;
  bullets: string[];
  image: string;
};

export const services: Service[] = [
  {
    id: "moto-frete",
    icon: "motorcycle",
    title: "Serviços Moto Frete",
    description:
      "Entregas rápidas de documentos e pequenos volumes de um ponto a outro da cidade, com agilidade e segurança.",
    bullets: [
      "Serviços bancários",
      "Cartórios e despachos",
      "Retiradas em aeroportos",
    ],
    image: "service-motorfrete-v3",
  },
  {
    id: "delivery",
    icon: "package",
    title: "Delivery Empresarial",
    description:
      "Para grandes volumes de documentos ou encomendas leves, implantamos em sua empresa um serviço de delivery com o melhor custo-benefício.",
    bullets: ["Farmácias", "Pizzarias e restaurantes", "Auto peças e mais"],
    image: "service-delivery-v3",
  },
  {
    id: "fora-da-capital",
    icon: "map",
    title: "Fora da Capital",
    description:
      "Atendimento para serviços fora da capital com valores especiais e agendamento com hora marcada.",
    bullets: [
      "Grande São Paulo",
      "Tabela de preços dedicada",
      "Agendamento com hora marcada",
    ],
    image: "service-foradacapital-v3",
  },
];

export type PriceRow = {
  region: string;
  price: string;
  note: string;
};

export const priceTable = {
  title: "Tabela de Preços",
  heading: "Preços transparentes, sem surpresas",
  columns: ["Região", "Valor base", "Observações"],
  rows: [
    { region: "Região Central (zona sul)", price: "R$ 24,90", note: "Consultar valores por volume" },
    { region: "Demais regiões da Capital", price: "R$ 34,90", note: "Valor sujeito à distância" },
    { region: "Grande São Paulo", price: "R$ 54,90", note: "Sob consulta de prazo e distância" },
    { region: "Fora da Capital", price: "Sob consulta", note: "Tabela específica por rota" },
  ],
  disclaimer:
    "* Valores ilustrativos para referência. Confirme o preço final com um representante, pois podem variar conforme volume, peso e distância. Faça seu cadastro e solicite uma proposta.",
};

export const processSteps = [
  {
    step: "01",
    title: "Contato",
    description:
      "Você fala com a gente por telefone, WhatsApp ou pelo formulário. Informamos valores e prazos na hora.",
  },
  {
    step: "02",
    title: "Agendamento",
    description:
      "Agende a coleta com hora marcada — funcionamos 24 horas, de segunda a segunda-feira.",
  },
  {
    step: "03",
    title: "Coleta",
    description:
      "Nosso motofretista chega no horário combinado e coleta seu documento ou volume no local indicado.",
  },
  {
    step: "04",
    title: "Entrega",
    description:
      "Entrega rápida e segura no destino, com acompanhamento do status até a confirmação final.",
  },
];

export const faqs = [
  {
    question: "Quais áreas vocês atendem?",
    answer:
      "Atendemos São Paulo (Capital) e toda a Grande São Paulo, incluindo serviços fora da capital sob consulta.",
  },
  {
    question: "Quanto tempo leva uma entrega?",
    answer:
      "Na Capital, a maioria das entregas é concluída em até 2 horas após a coleta. O prazo exato depende da distância e do trânsito.",
  },
  {
    question: "Como funciona o agendamento com hora marcada?",
    answer:
      "Você define o horário ideal para a coleta e o entregamos no destino conforme o combinado, garantindo previsibilidade para o seu negócio.",
  },
  {
    question: "Vocês funcionam à noite, finais de semana e feriados?",
    answer:
      "Sim. Trabalhamos 24 horas por dia, de segunda a segunda-feira, incluindo noites, finais de semana e feriados.",
  },
  {
    question: "Quais tipos de volume vocês transportam?",
    answer:
      "Documentos e pequenos volumes, como malotes, encomendas leves, materiais para serviços bancários, cartórios e despachos, além de retiradas em aeroportos.",
  },
  {
    question: "Como faço para me cadastrar ou solicitar uma proposta?",
    answer:
      "Entre em contato pelo telefone (11) 5052-3563, WhatsApp ou pelo formulário de contato. Um representante responde rapidamente com a proposta.",
  },
];
