import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { Logo } from "./Logo";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ChevronLeft, ChevronRight, TrendingUp, BarChart3, Users, LayoutGrid, ArrowRight, Briefcase } from "lucide-react";
import { ServiceDetailsModal } from "./ServiceDetailsModal";
import { useServices } from "@/hooks/use-site-content";


const CARDS = [
  {
    id: 1,
    number: "01",
    title: ["CONTROLADORIA", "ESTRATÉGICA", "COMERCIAL"],
    description: "Estratégias comerciais inteligentes para aumentar performance, gerar valor e impulsionar resultados consistentes.",
    icon: TrendingUp,
  },
  {
    id: 2,
    number: "02",
    title: ["CONTROLADORIA", "ESTRATÉGICA", "FINANCEIRA"],
    description: "Gestão financeira estratégica para otimizar recursos, reduzir riscos e garantir saúde financeira sólida.",
    icon: BarChart3,
  },
  {
    id: 3,
    number: "03",
    title: ["CONSELHO", "DE GESTÃO", "ESTRATÉGICA"],
    description: "Decisões estratégicas com visão de longo prazo, alinhamento de lideranças e foco em crescimento sustentável.",
    icon: Users,
  },
  {
    id: 4,
    number: "",
    title: ["CÁLIBER CORE"],
    subtitle: "FERRAMENTAS CORPORATIVAS ESPECIAIS",
    description: "Soluções exclusivas que integram tecnologia, pessoas e processos para elevar o nível da sua gestão.",
    icon: LayoutGrid,
  },
];

export function Methodology() {
  const { data: dbServices } = useServices();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

  const services = useMemo(() => {
    if (dbServices && dbServices.length > 0) {
      return dbServices.map(s => ({
        id: parseInt(s.id) || Math.random(),
        number: s.sort_order ? s.sort_order.toString().padStart(2, '0') : '',
        title: [s.title],
        description: s.short_description || '',
        icon: s.icon_name === 'TrendingUp' ? TrendingUp : 
              s.icon_name === 'BarChart3' ? BarChart3 :
              s.icon_name === 'Users' ? Users : Briefcase,
        subtitle: s.subtitle || undefined
      }));
    }
    return CARDS;
  }, [dbServices]);


  const next = useCallback(() => {
    setActiveIndex((current) => (current + 1) % services.length);
  }, [services.length]);

  const prev = useCallback(() => {
    setActiveIndex((current) => (current - 1 + services.length) % services.length);
  }, [services.length]);


  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(next, 7000); // Increased from 5000 to 7000 for slower transition
    return () => clearInterval(timer);
  }, [isAutoPlaying, next]);

  const handleManualNext = () => {
    setIsAutoPlaying(false);
    next();
  };

  const handleManualPrev = () => {
    setIsAutoPlaying(false);
    prev();
  };

  const handleIndicatorClick = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
  };

  return (
    <section id="metodologia" className="py-10 lg:py-16 overflow-hidden bg-white min-h-[80vh] flex flex-col justify-center">
      <div className="container-cal">
        <div className="flex flex-col items-center mb-6 lg:mb-8">
          <SectionHeading
            title={<>Como tornamos sua empresa <br className="hidden lg:block" /> mais eficiente?</>}
            align="center"
            className="max-w-4xl"
            titleClassName="text-purple"
          />
          <div className="flex items-center gap-4 w-full max-w-xs md:max-w-md">
            <div className="h-[1px] flex-1 bg-purple/20" />
            <Logo className="size-6 text-purple/40" />
            <div className="h-[1px] flex-1 bg-purple/20" />
          </div>
        </div>

        <div className="relative max-w-[1400px] mx-auto group/carousel">
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-50 hidden lg:block opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleManualPrev}
              className="group p-4 rounded-full bg-white border border-purple/10 text-purple shadow-lift hover:scale-110 transition-all duration-300"
              aria-label="Serviço anterior"
            >
              <ChevronLeft className="size-6 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-50 hidden lg:block opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleManualNext}
              className="group p-4 rounded-full bg-white border border-purple/10 text-purple shadow-lift hover:scale-110 transition-all duration-300"
              aria-label="Próximo serviço"
            >
              <ChevronRight className="size-6 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>


          {/* Cards Stage */}
          <div className="flex justify-center items-center h-[340px] sm:h-[380px] md:h-[420px] lg:h-[460px] relative perspective-3d touch-pan-y">
            <AnimatePresence mode="wait">
              {services.map((card, index) => {
                const relativeIndex = (index - activeIndex + services.length) % services.length;
                let position = relativeIndex;
                if (position > services.length / 2) position -= services.length;


                const isActive = position === 0;
                
                let xPos: string | number = 0;
                let zPos = 0;
                let scaleVal = 1;
                let zIdx = 0;
                let opac = 0;
                let blurVal = 0;
                let bright = 1;

                if (isActive) {
                  xPos = 0;
                  zPos = 0;
                  scaleVal = 1;
                  zIdx = 40;
                  opac = 1;
                  blurVal = 0;
                  bright = 1;
                } else if (position === 1) { // Right
                  xPos = "75%";
                  zPos = -220;
                  scaleVal = 0.84;
                  zIdx = 30;
                  opac = 0.82;
                  blurVal = 4;
                  bright = 0.75;
                } else if (position === -1) { // Left
                  xPos = "-75%";
                  zPos = -220;
                  scaleVal = 0.84;
                  zIdx = 30;
                  opac = 0.82;
                  blurVal = 4;
                  bright = 0.75;
                } else { // Far cards
                  xPos = position > 0 ? "125%" : "-125%";
                  zPos = -400;
                  scaleVal = 0.70;
                  zIdx = 20;
                  opac = 0.50;
                  blurVal = 8;
                  bright = 0.60;
                }


                return (
                  <motion.div
                    key={card.id}
                    className="absolute w-[280px] sm:w-[350px] md:w-[450px] lg:w-[540px] aspect-[16/10] cursor-pointer"
                    style={{
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      zIndex: zIdx,
                    }}
                    animate={{
                      translateX: xPos,
                      translateZ: zPos,
                      scale: scaleVal,
                      opacity: opac,
                      filter: `blur(${blurVal}px) brightness(${bright})`,
                    }}



                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1], // Custom quint-out for smoother deceleration
                      opacity: { duration: 0.4 },
                      filter: { duration: 0.4 },
                    }}
                    onClick={() => {
                      if (!isActive) {
                        handleIndicatorClick(index);
                      } else if (card.id !== 4) {
                        setSelectedServiceId(card.id);
                      }
                    }}
                  >
                    <motion.div 
                      className={cn(
                        "w-full h-full p-6 md:p-10 rounded-[28px] relative overflow-hidden flex flex-col items-center justify-center text-center border transition-all duration-500",
                        isActive 
                          ? "bg-purple border-purple-light/20 shadow-[0_30px_80px_rgba(95,85,135,0.4)]" 
                          : "bg-purple-deep border-purple/10 shadow-soft"
                      )}
                      whileHover={isActive && card.id !== 4 ? { 
                        scale: 1.01,
                        boxShadow: "0 40px 90px rgba(95,85,135,0.5)",
                      } : {}}
                    >
                      {/* Abstract Background Texture */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32" />
                        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <pattern id={`grid-${card.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#grid-${card.id})`} />
                        </svg>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center w-full">
                        {card.number && (
                          <span className="text-purple-light font-bold text-sm md:text-base tracking-widest mb-6 md:mb-8 tabular">
                            {card.number}
                          </span>
                        )}

                        <div className="mb-6 md:mb-8 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:bg-white/10 transition-colors">
                          <card.icon className="size-8 md:size-12 text-white" />
                        </div>

                        <div className="mb-4 md:mb-6 flex flex-col gap-1">
                          {card.title.map((line, i) => (
                            <h3 
                              key={i} 
                              className={cn(
                                "text-white font-bold leading-tight",
                                card.title.length > 1 ? "text-xl md:text-3xl" : "text-2xl md:text-4xl"
                              )}
                            >
                              {line}
                            </h3>
                          ))}
                          {card.subtitle && (
                            <span className="mt-2 text-white text-[10px] md:text-xs font-bold tracking-[0.2em]">
                              {card.subtitle.charAt(0).toUpperCase() + card.subtitle.slice(1).toLowerCase()}
                            </span>
                          )}
                        </div>

                        <div className="w-12 h-[1px] bg-purple-light/30 mb-4 md:mb-6" />

                        <p className="text-white/70 text-sm md:text-base max-w-sm leading-relaxed">
                          {card.description}
                        </p>

                        {isActive && card.id !== 4 && (
                          <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedServiceId(card.id);
                            }}
                            className="mt-8 flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-purple hover:bg-purple hover:text-white border border-purple transition-all text-sm font-bold tracking-widest group/btn shadow-soft"
                          >
                            <span>Ver detalhes</span>
                            <ArrowRight className="size-4 group-hover/btn:translate-x-1 transition-transform" />
                          </motion.button>
                        )}
                      </div>

                      {/* Subtle Inner Glow */}
                      {isActive && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial from-white/10 to-transparent pointer-events-none" />
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex items-center justify-center gap-3 mt-8 md:mt-10">
            {services.map((_, i) => (
              <button
                key={i}
                onClick={() => handleIndicatorClick(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-500",
                  i === activeIndex 
                    ? "bg-purple w-10 md:w-12" 
                    : "bg-purple/20 w-2 hover:bg-purple/40"
                )}
                aria-label={`Ir para serviço ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 lg:mt-16 flex items-center justify-center gap-6">
          <div className="h-[1px] flex-1 bg-purple/10 max-w-[100px] hidden md:block" />
          <p className="text-ink/60 text-sm md:text-base text-center">
            Não entregamos teoria. <span className="text-purple font-bold">Entregamos resultado.</span>
          </p>
          <div className="h-[1px] flex-1 bg-purple/10 max-w-[100px] hidden md:block" />
        </div>
      </div>

      <ServiceDetailsModal 
        isOpen={selectedServiceId !== null} 
        onClose={() => setSelectedServiceId(null)} 
        serviceId={selectedServiceId}
      />

      <style>{`
        .perspective-3d {
          perspective: 1400px;
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
}

