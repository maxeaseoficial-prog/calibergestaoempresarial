import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { Logo } from "./Logo";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import service1 from "@/assets/service-1.png.asset.json";
import service2 from "@/assets/service-2.png.asset.json";
import service3 from "@/assets/service-3.png.asset.json";
import service4 from "@/assets/service-4.png.asset.json";

const CARDS = [
  { id: 1, img: service1.url, title: "Controladoria Estratégica Comercial" },
  { id: 2, img: service2.url, title: "Controladoria Estratégica Financeira" },
  { id: 3, img: service3.url, title: "Conselho de Gestão Estratégica" },
  { id: 4, img: service4.url, title: "Cáliber COR" },
];

export function Differentiators() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % CARDS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const next = () => {
    setIsAutoPlaying(false);
    setActiveIndex((current) => (current + 1) % CARDS.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((current) => (current - 1 + CARDS.length) % CARDS.length);
  };

  return (
    <section id="diferenciais" className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container-cal">
        <div className="flex flex-col items-center mb-12 lg:mb-16">
          <SectionHeading
            eyebrow="Diferenciais Exclusivos"
            title="O que só a Cáliber faz por você"
            align="center"
            className="mb-6"
          />
          <div className="flex items-center gap-4 w-full max-w-xs md:max-w-md">
            <div className="h-[1px] flex-1 bg-purple/20" />
            <Logo className="size-6 text-purple/40" />
            <div className="h-[1px] flex-1 bg-purple/20" />
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-12">
          <div className="flex justify-center items-center h-[400px] md:h-[550px] relative perspective-1000">
            <AnimatePresence mode="popLayout">
              {CARDS.map((card, index) => {
                const position = (index - activeIndex + CARDS.length) % CARDS.length;
                
                // Deterministic positions for 4 cards
                // 0: Center, 1: Right, 2: Back/Hidden, 3: Left
                let x: string | number = 0;
                let scale = 1;
                let zIndex = 0;
                let opacity = 0;
                let rotateY = 0;

                if (position === 0) {
                  x = 0;
                  scale = 1;
                  zIndex = 30;
                  opacity = 1;
                  rotateY = 0;
                } else if (position === 1) {
                  x = "40%";
                  scale = 0.85;
                  zIndex = 20;
                  opacity = 0.6;
                  rotateY = -15;
                } else if (position === CARDS.length - 1) {
                  x = "-40%";
                  scale = 0.85;
                  zIndex = 20;
                  opacity = 0.6;
                  rotateY = 15;
                } else {
                  x = 0;
                  scale = 0.7;
                  zIndex = 10;
                  opacity = 0;
                  rotateY = 0;
                }

                return (
                  <motion.div
                    key={card.id}
                    className="absolute w-[280px] sm:w-[350px] md:w-[450px] lg:w-[500px] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl cursor-pointer ring-1 ring-white/10"
                    animate={{
                      x: typeof x === 'string' ? x : x,
                      scale,
                      zIndex,
                      opacity,
                      rotateY,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                    }}
                    onClick={() => {
                      if (position !== 0) {
                        setIsAutoPlaying(false);
                        setActiveIndex(index);
                      }
                    }}
                    whileHover={position === 0 ? { scale: 1.02, y: -5 } : {}}
                  >
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />
                    
                    {/* Glossy Overlay for non-active cards */}
                    {position !== 0 && (
                      <div className="absolute inset-0 bg-purple/10 backdrop-blur-[1px] transition-opacity duration-500" />
                    )}
                    
                    {/* Shadow effect */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-black/20 blur-2xl rounded-[100%] pointer-events-none opacity-50" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-purple/20 text-purple hover:bg-purple hover:text-white transition-all duration-300"
              aria-label="Anterior"
            >
              <ChevronLeft className="size-6" />
            </button>
            
            <div className="flex gap-2">
              {CARDS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveIndex(i);
                  }}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all duration-300",
                    i === activeIndex ? "bg-purple w-8" : "bg-purple/20 hover:bg-purple/40"
                  )}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 rounded-full border border-purple/20 text-purple hover:bg-purple hover:text-white transition-all duration-300"
              aria-label="Próximo"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
        </div>

        <div className="mt-20 flex items-center justify-center gap-6">
          <div className="h-[1px] flex-1 bg-purple/10 max-w-[100px] hidden md:block" />
          <p className="text-ink/60 text-sm md:text-base">
            Não entregamos teoria. <span className="text-purple font-bold">Entregamos resultado.</span>
          </p>
          <div className="h-[1px] flex-1 bg-purple/10 max-w-[100px] hidden md:block" />
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1200px;
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
}