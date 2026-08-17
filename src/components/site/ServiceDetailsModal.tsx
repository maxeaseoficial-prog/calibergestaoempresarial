import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { X, TrendingUp, BarChart3, Users, LayoutGrid, CheckCircle2, ArrowRight, Settings, Users2, Workflow, Target, UserCheck, Calendar, Wallet, ArrowUpRight } from "lucide-react";
import { useEffect } from "react";

interface ServiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: number | null;
}

const MODAL_DATA = {
  1: {
    number: "01",
    icon: TrendingUp,
    title: "Controladoria Estratégica Comercial",
    intro: "Estruturamos toda a máquina de vendas da sua empresa para que ela não dependa de você: processos, pessoas e ferramentas, por especialistas que já estruturaram mais de 450 empresas e geraram mais de R$ 100 milhões em lucro. Assumimos a gestão estratégica e a condução comercial ao lado da diretoria, integrando os setores para escala e margem. Sua empresa vende por sistema e atinge todo o seu potencial.",
    shortIntro: "Estruturamos toda a máquina de vendas da sua empresa para que ela não dependa de você.",
    pillars: [
      { label: "PROCESSOS", icon: Workflow },
      { label: "PESSOAS", icon: Users2 },
      { label: "FERRAMENTAS", icon: Settings },
    ],
    steps: [
      { id: "01", title: "ESTRUTURAÇÃO", description: "Processos, pessoas e ferramentas." },
      { id: "02", title: "GESTÃO ESTRATÉGICA", description: "Condução comercial ao lado da diretoria." },
      { id: "03", title: "INTEGRAÇÃO", description: "Integração dos setores para escala e margem." },
      { id: "04", title: "RESULTADO", description: "Uma operação comercial que vende por sistema e atinge seu potencial." },
    ],
    authority: [
      { value: "+450", label: "empresas estruturadas" },
      { value: "+R$ 100 milhões", label: "em lucro gerado" },
    ]
  },
  2: {
    number: "02",
    icon: BarChart3,
    title: "Controladoria Estratégica Financeira",
    intro: "Estruturamos todo o seu negócio na área financeira: processos, pessoas e ferramentas, com todos os indicadores implantados. Depois assumimos a gestão estratégica financeira, econômica e patrimonial, conduzindo ao lado do dono para ampliar margem, proteger o caixa e gerar crescimento. Sua empresa passa a atingir o potencial de resultado que já existe nela.",
    shortIntro: "Estruturamos todo o seu negócio na área financeira.",
    pillars: [
      { label: "PROCESSOS", icon: Workflow },
      { label: "PESSOAS", icon: Users2 },
      { label: "FERRAMENTAS", icon: Settings },
      { label: "INDICADORES", icon: BarChart3 },
    ],
    steps: [
      { id: "01", title: "ESTRUTURAÇÃO", description: "Organização dos processos, pessoas e ferramentas da área financeira." },
      { id: "02", title: "INDICADORES", description: "Implantação dos indicadores necessários para gestão e acompanhamento." },
      { id: "03", title: "GESTÃO ESTRATÉGICA", description: "Gestão financeira, econômica e patrimonial conduzida ao lado do dono." },
      { id: "04", title: "RESULTADO", description: "Ampliar margem, proteger o caixa e gerar crescimento." },
    ],
    highlights: [
      { label: "AMPLIAR MARGEM", icon: TrendingUp },
      { label: "PROTEGER O CAIXA", icon: Wallet },
      { label: "GERAR CRESCIMENTO", icon: ArrowUpRight },
    ]
  },
  3: {
    number: "03",
    icon: Users,
    title: "Conselho de Gestão Estratégica Mensal",
    intro: "Uma vez por mês ou por trimestre, você decide com quem já esteve dentro de mais de 450 empresas e ajudou a gerar mais de R$ 100 milhões em lucro. Trazemos visão de fora, leitura de mercado e as oportunidades que ninguém enxerga de dentro da operação. Você sai da mesa com prioridade definida, responsável e prazo.",
    shortIntro: "Decisões estratégicas com visão de quem já esteve dentro de mais de 450 empresas.",
    frequency: "MENSAL OU TRIMESTRAL",
    steps: [
      { id: "01", title: "VISÃO DE FORA", description: "Uma leitura externa sobre o negócio." },
      { id: "02", title: "LEITURA DE MERCADO", description: "Análise do cenário e das oportunidades." },
      { id: "03", title: "DECISÃO", description: "Definição clara do que precisa ser priorizado." },
      { id: "04", title: "EXECUÇÃO", description: "Cada decisão sai da mesa com prioridade, responsável e prazo." },
    ],
    authority: [
      { value: "+450", label: "empresas" },
      { value: "+R$ 100 milhões", label: "em lucro gerado" },
    ],
    finalFocus: [
      { label: "PRIORIDADE", icon: Target },
      { label: "RESPONSÁVEL", icon: UserCheck },
      { label: "PRAZO", icon: Calendar },
    ]
  }
};

export function ServiceDetailsModal({ isOpen, onClose, serviceId }: ServiceDetailsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const data = serviceId ? (MODAL_DATA as any)[serviceId] : null;

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-caliber-night/60 backdrop-blur-md"
          />
          
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-lavender/50 text-purple hover:bg-lavender hover:scale-110 transition-all z-20"
              aria-label="Fechar detalhes"
            >
              <X className="size-6" />
            </button>

            <div className="flex-1 overflow-y-auto p-8 md:p-12">
              {/* Header */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-start gap-6 mb-12"
              >
                <div className="flex items-center gap-4">
                  <span className="text-purple/40 font-bold text-xl tracking-widest">{data.number}</span>
                  <div className="p-3 rounded-xl bg-purple/5 border border-purple/10">
                    <data.icon className="size-8 text-purple" />
                  </div>
                  <div className="h-px w-12 bg-purple/20" />
                </div>
                
                <div>
                  <h2 id="modal-title" className="text-3xl md:text-4xl font-bold text-ink mb-4 leading-tight">
                    {data.title}
                  </h2>
                  <p className="text-lg text-ink/70 leading-relaxed max-w-3xl mb-2">
                    {data.shortIntro}
                  </p>
                  <p className="text-sm text-ink/50 leading-relaxed max-w-3xl italic">
                    {data.intro}
                  </p>
                </div>
              </motion.div>

              {/* Pillars */}
              {data.pillars && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
                >
                  {data.pillars.map((pillar: any, idx: number) => (
                    <div key={idx} className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-lavender/30 border border-purple/5 text-center group hover:bg-lavender/50 transition-colors">
                      <pillar.icon className="size-6 text-purple/60 group-hover:text-purple transition-colors" />
                      <span className="text-[10px] font-bold tracking-widest text-purple/80">{pillar.label}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Frequency for Conseil */}
              {data.frequency && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/5 text-purple text-xs font-bold tracking-widest border border-purple/10">
                    <Calendar className="size-4" />
                    {data.frequency}
                  </span>
                </motion.div>
              )}

              <div className="h-px w-full bg-purple/10 mb-16" />

              {/* Steps */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-20"
              >
                <h3 className="text-xs font-bold tracking-[0.2em] text-purple mb-10 text-center md:text-left">Como funciona</h3>
                <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Connection Line (Desktop) */}
                  <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-purple/10 -z-10" />
                  
                  {data.steps.map((step: any, idx: number) => (
                    <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left">
                      <div className="size-12 rounded-full bg-white border-2 border-purple flex items-center justify-center text-purple font-bold text-sm mb-6 shadow-sm">
                        {step.id}
                      </div>
                      <h4 className="font-bold text-ink mb-2 text-sm">{step.title}</h4>
                      <p className="text-ink/60 text-xs leading-relaxed">{step.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="h-px w-full bg-purple/10 mb-16" />

              {/* Authority / Highlights */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col md:flex-row items-center justify-between gap-12"
              >
                {data.authority && (
                  <div className="flex flex-wrap justify-center md:justify-start gap-12">
                    {data.authority.map((item: any, idx: number) => (
                      <div key={idx} className="flex flex-col items-center md:items-start">
                        <span className="text-4xl font-bold text-purple mb-1 tabular">{item.value}</span>
                        <span className="text-xs font-bold tracking-widest text-ink/40">{item.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {data.highlights && (
                  <div className="flex flex-wrap justify-center gap-6">
                    {data.highlights.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 px-5 py-3 rounded-xl bg-purple/5 text-purple border border-purple/10">
                        <item.icon className="size-5" />
                        <span className="text-[10px] font-bold tracking-widest">{item.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {data.finalFocus && (
                  <div className="flex items-center gap-6">
                    {data.finalFocus.map((item: any, idx: number) => (
                      <div key={idx} className="flex flex-col items-center gap-2 group">
                        <div className="p-3 rounded-full bg-purple/5 text-purple/40 group-hover:text-purple group-hover:bg-purple/10 transition-all">
                          <item.icon className="size-6" />
                        </div>
                        <span className="text-[9px] font-bold tracking-widest text-ink/40">{item.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
