// Conteúdo institucional real, preservado de https://calibergestao.com.br/

export const CONTACT = {
  emailAddress: "contato@calibergestao.com.br",
  emailHref:
    "mailto:contato@calibergestao.com.br?subject=Informa%C3%A7%C3%B5es%20C%C3%81LIBER",
  phoneMT: "+55 (65) 2127-4718",
  phoneMTHref: "tel:+556521274718",
  phonePR: "(41) 2626-1294",
  phonePRHref: "tel:+554126261294",
  whatsapp:
    "http://api.whatsapp.com/send?1=pt_BR&phone=5565981598205&text=Ol%C3%A1!%20Gostaria%20de%20Saber%20mais%20sobre%20as%20solu%C3%A7%C3%B5es",
  facebook: "https://www.facebook.com/calibergestao",
  instagram: "https://www.instagram.com/calibergestao/",
  linkedin: "https://www.linkedin.com/company/15205395/admin/",
  areaDoCliente: "https://calibergestao.com.br/area-do-cliente/",
  cadastroIndicacao: "https://calibergestao.com.br/cadastro-de-indicacao/",
} as const;

export const OFFICES = [
  {
    city: "Cuiabá",
    state: "MT",
    lines: ["Av. Miguel Sutil, 8000", "Santa Rosa Tower"],
    map: "https://g.page/CaliberConsultoriaEmpresarial?share",
    phone: CONTACT.phoneMT,
    phoneHref: CONTACT.phoneMTHref,
  },
  {
    city: "Curitiba",
    state: "PR",
    lines: ["Av. Sete de Setembro, 4990", "Edifício New Orleans | Batel"],
    map: "https://goo.gl/maps/7XtuaCaK9eQTMYsf6",
    phone: CONTACT.phonePR,
    phoneHref: CONTACT.phonePRHref,
  },
] as const;

export const METRICS = [
  { value: 12, prefix: "+", suffix: "", label: "anos de experiência" },
  { value: 8, prefix: "", suffix: "", label: "estados com clientes atendidos" },
  {
    value: 12000,
    prefix: "+",
    suffix: "",
    label: "empresários e colaboradores transformados",
  },
  {
    value: 1.1,
    prefix: "R$ ",
    suffix: " bilhão",
    decimals: 1,
    label: "em faturamento dos clientes",
  },
] as const;

export const STEPS = [
  {
    number: "01",
    step: "IDENTIFIQUE OS PROBLEMAS",
    solution: "AUDITORIA ESTRATÉGICA",
    description: "Entenda o que está errado ou precisa melhorar nos seus processos, controles, equipes, ferramentas, gestão e estratégias",
    icon: "Search",
  },
  {
    number: "02",
    step: "SOLUCIONE",
    solution: "ESTRUTURAÇÃO 360° NA PRÁTICA",
    description: "Implemente todas as mudanças na prática e ganhe Eficiência em todos os departamentos e na sua Gestão",
    icon: "Settings2",
  },
  {
    number: "03",
    step: "GERENCIE E EVOLUA",
    solution: "ANÁLISE E GESTÃO",
    description: "Conheça os seus números, antecipe e evite problemas, alcance seu potencial e Tenha suporte, acompanhamento e orientação em toda a sua operação e Gestão",
    icon: "TrendingUp",
  },
] as const;

export const SERVICES = [
  {
    id: "auditoria-estrategica",
    number: "01",
    title: "Auditoria Estratégica",
    description:
      "Entenda o que está errado ou precisa melhorar nos seus processos, controles, equipes, ferramentas, gestão e estratégias.",
  },
  {
    id: "estruturacao-360",
    number: "02",
    title: "Estruturação 360° na Prática",
    description:
      "Implemente todas as mudanças na prática e ganhe eficiência em todos os departamentos e na sua gestão.",
  },
  {
    id: "analise-e-gestao",
    number: "03",
    title: "Análise e Gestão",
    description:
      "Conheça os seus números, antecipe e evite problemas, alcance seu potencial e tenha suporte, acompanhamento e orientação em toda a sua operação e gestão.",
  },
] as const;

export const DIFFERENTIATORS = [
  {
    title: "Resultado na Prática",
    text: "Somos a única empresa no Brasil que aplica mudanças na prática, resultado de experiência e conhecimento específico de todas as áreas, processos, pessoas e ferramentas. De empresário para empresário: o que importa não é a teoria, e sim os resultados.",
    icon: "target",
    span: "wide",
  },
  {
    title: "Exclusividade",
    text: "Exclusivo Método CBR de Estruturação de Negócios, com uma dinâmica e abordagem resolutiva e pragmática que você nunca viu.",
    icon: "gem",
    span: "tall",
  },
  {
    title: "Experiência",
    text: "Mais de 12 anos de experiência no mercado brasileiro, estruturando empresas na prática, sem teorias.",
    icon: "clock",
    span: "normal",
  },
  {
    title: "Autoridade em Gestão",
    text: "Clientes em 8 estados com faturamento de R$ 1,1 bilhão. Mais de 12.000 pessoas transformadas, entre empresários e colaboradores.",
    icon: "award",
    span: "wide",
  },
  {
    title: "Personalizado para Você",
    text: "Abordagem exata dos pontos que você precisa, de acordo com a sua realidade.",
    icon: "sliders",
    span: "normal",
  },
  {
    title: "Evolução",
    text: "Vasta experiência de mercado, aplicada para sua empresa evoluir muitos anos em poucos meses, sem que você e toda a sua empresa percam tempo (que não se recupera) e dinheiro com testes, tentativas e erros, mas indo direto ao ponto, com processos corretos e validados na prática milhares de vezes pelos nossos especialistas.",
    icon: "trending",
    span: "wide",
  },
  {
    title: "Especialidade no Assunto",
    text: "Especialistas para atender cada área e cada etapa do seu crescimento. Sem generalistas e soluções teóricas: na Cáliber, temos especialistas experientes para cada setor e necessidade.",
    icon: "users",
    span: "normal",
  },
  {
    title: "Transparência e Pontualidade",
    text: "Resultados reais e garantidos com prazos transparentes, cumpridos rigorosamente.",
    icon: "shield",
    span: "normal",
  },
  {
    title: "Suporte Exclusivo",
    text: "Suporte dedicado da nossa equipe de especialistas durante todo o projeto.",
    icon: "headset",
    span: "normal",
  },
  {
    title: "Garantia de Continuidade e Evolução",
    text: "Análises e estratégias contínuas de especialistas, para sua evolução durante e após as mudanças.",
    icon: "refresh",
    span: "normal",
  },
] as const;

import leoLogo from "@/assets/leo-madeiras.png.asset.json";
import maxvinilLogo from "@/assets/tintas-maxvinil.png.asset.json";
import tabladoLogo from "@/assets/tablado-madeireira.png.asset.json";

export const TESTIMONIALS = [
  {
    name: "Paulo Willemann",
    role: "Proprietário",
    quote:
      "A Cáliber tem nos ajudado a organizar e otimizar nossa gestão de estoque, com definições e aprimoramentos de processos internos ajustando de maneira eficiente nosso MRP, melhorando nosso controle de estoque e automaticamente melhorando o atendimento aos nossos clientes que é o que realmente importa no final.",
    logo: leoLogo.url,
    logoAlt: "Leo Madeiras",
  },
  {
    name: "Michelli Freire",
    role: "Gestora Contábil",
    quote:
      "Conhecia o trabalho da Cáliber maneira superficial, então fiquei muito surpresa com o resultado do projeto. Achei tudo de uma competência muito grande, desde o início da negociação à entrega. Todos os colaboradores foram muito organizados, competentes e eficazes.",
    logo: maxvinilLogo.url,
    logoAlt: "Tintas Maxvinil",
  },
  {
    name: "Adriano Ghilardi",
    role: "Proprietário",
    quote:
      "A parceria com a Cáliber foi muito promissora para a empresa, pois com as ferramentas e treinamentos que recebemos conseguimos padronizar muitos processos na empresa além de ter maior controle dos custos, fluxo de caixa, estoque, entre outros relatórios. A empresa ficou mais aprimorada para poder crescer sem perder o foco no que realmente faz.",
    logo: tabladoLogo.url,
    logoAlt: "Tablado Madeireira",
  },
] as const;

const U = "https://i0.wp.com/calibergestao.com.br/wp-content/uploads";

export const CLIENTS = [
  { name: "Claro", src: `${U}/2022/02/CLARO.webp?fit=83%2C81&ssl=1` },
  { name: "NET", src: `${U}/2025/02/net-1.png?fit=200%2C125&ssl=1` },
  {
    name: "Megasom",
    src: `${U}/2022/05/Logo-Megasom-sem-fundo.png?fit=200%2C125&ssl=1`,
  },
  { name: "Leo Madeiras", src: `${U}/2022/02/LEO-MADEIRAS.webp?fit=128%2C68&ssl=1` },
  { name: "Procria", src: `${U}/2025/02/procria.png?fit=200%2C125&ssl=1` },
  { name: "LEGO", src: `${U}/2022/02/LEGO.webp?fit=71%2C68&ssl=1` },
  { name: "Maxvinil", src: `${U}/2022/02/MAXVINIL.webp?fit=104%2C68&ssl=1` },
  { name: "Tupperware", src: `${U}/2022/02/TUPPERWARE.webp?fit=191%2C55&ssl=1` },
  {
    name: "Águas de Sorriso",
    src: `${U}/2022/02/AGUAS-DE-SORRISO.webp?fit=117%2C74&ssl=1`,
  },
  { name: "Aliança", src: `${U}/2022/02/ALIANCA.webp?fit=133%2C94&ssl=1` },
  { name: "Campo Solar", src: `${U}/2022/02/CAMPO-SOLAR.webp?fit=199%2C61&ssl=1` },
  {
    name: "Cobertura Imasa",
    src: `${U}/2022/02/COBERTURA-IMASA.webp?fit=135%2C61&ssl=1`,
  },
  {
    name: "Eletricidade Paraense",
    src: `${U}/2022/02/ELETRICIDADE-PARAENSE.webp?fit=137%2C101&ssl=1`,
  },
  { name: "Fatex", src: `${U}/2022/02/FATEX.webp?fit=108%2C68&ssl=1` },
  { name: "Frota", src: `${U}/2022/02/FROTA.webp?fit=81%2C95&ssl=1` },
  { name: "Octech", src: `${U}/2022/02/OCTECH.webp?fit=132%2C48&ssl=1` },
  { name: "Pantanal", src: `${U}/2022/02/PANTANAL.webp?fit=114%2C76&ssl=1` },
  { name: "Tempermat", src: `${U}/2022/02/TEMPERMAT.webp?fit=176%2C57&ssl=1` },
  {
    name: "Prime Lente | Gradual",
    src: `${U}/2025/02/prime-lente-logo-gradual-1.png?fit=200%2C125&ssl=1`,
  },
  { name: "Trevo", src: `${U}/2025/02/trevo.png?fit=200%2C125&ssl=1` },
] as const;
