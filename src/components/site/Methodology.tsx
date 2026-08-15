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

export function Methodology() {
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
    <section id="metodologia" className="py-20 lg:py-32 overflow-hidden bg-white">
      <div className="container-cal">
        <div className="flex flex-col items-center mb-12 lg:mb-16">
          <SectionHeading
            title={<>Como tornamos sua empresa <br className="hidden lg:block" /> mais eficiente?</>}
            align="center"
            className="mb-6 max-w-4xl"
            titleClassName="text-purple"
          />
          <div className="flex items-center gap-4 w-full max-w-xs md:max-w-md">
            <div className="h-[1px] flex-1 bg-purple/20" />
            <Logo className="size-6 text-purple/40" />
            <div className="h-[1px] flex-1 bg-purple/20" />
          </div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-12">
          <div className="flex justify-center items-center h-[400px] md:h-[650px] relative perspective-3d">
            <AnimatePresence mode="popLayout">
              {CARDS.map((card, index) => {
                const relativeIndex = (index - activeIndex + CARDS.length) % CARDS.length;
                
                // Map indices to symmetric positions: 0, 1, 2, -2, -1
                // We want 0 (active), 1 (right), 2 (far right), 3 (far left), 4 (left) if we had 5 cards.
                // With 4 cards: 0 (active), 1 (right), 2 (far/hidden), 3 (left)
                
                let position = relativeIndex;
                if (position > CARDS.length / 2) position -= CARDS.length;

                let x: string | number = 0;
                let z = 0;
                let scale = 1;
                let zIndex = 0;
                let opacity = 0;
                let blur = 0;
                let brightness = 1;
                let rotateY = 0;

                if (position === 0) {
                  x = 0;
                  z = 0;
                  scale = 1;
                  zIndex = 40;
                  opacity = 1;
                  blur = 0;
                  brightness = 1;
                  rotateY = 0;
                } else if (position === 1) { // Right
                  x = "70%";
                  z = -220;
                  scale = 0.85;
                  zIndex = 30;
                  opacity = 0.82;
                  blur = 4;
                  brightness = 0.77;
                  rotateY = -5;
                } else if (position === -1) { // Left
                  x = "-70%";
                  z = -220;
                  scale = 0.85;
                  zIndex = 30;
                  opacity = 0.82;
                  blur = 4;
                  brightness = 0.77;
                  rotateY = 5;
                } else { // Far cards
                  x = position > 0 ? "120%" : "-120%";
                  z = -400;
                  scale = 0.72;
                  zIndex = 20;
                  opacity = 0.55;
                  blur = 8;
                  brightness = 0.6;
                  rotateY = position > 0 ? -10 : 10;
                }

                return (
                  <motion.div
                    key={card.id}
                    className="absolute w-[300px] sm:w-[400px] md:w-[550px] lg:w-[650px] aspect-[16/10] rounded-[32px] overflow-hidden cursor-pointer shadow-none"
                    style={{
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                    }}
                    animate={{
                      x,
                      z,
                      scale,
                      zIndex,
                      opacity,
                      filter: `blur(${blur}px) brightness(${brightness})`,
                      rotateY,
                    }}
                    transition={{
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => {
                      if (position !== 0) {
                        setIsAutoPlaying(false);
                        setActiveIndex(index);
                      }
                    }}
                    whileHover={position === 0 ? { 
                      scale: 1.02, 
                      z: 20,
                      transition: { duration: 0.4 }
                    } : {}}
                  >
                    <div className={cn(
                      "w-full h-full relative transition-shadow duration-500 rounded-[32px] overflow-hidden",
                      position === 0 
                        ? "shadow-[0_30px_70px_rgba(25,15,50,0.24),0_12px_35px_rgba(90,50,160,0.18)]" 
                        : "shadow-[0_15px_35px_rgba(0,0,0,0.1)]"
                    )}>
                      <img
                        src={card.img}
                        alt={card.title}
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />
                      
                      {position !== 0 && (
                        <div className="absolute inset-0 bg-purple/5 pointer-events-none" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>


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
          <p className="text-ink/60 text-sm md:text-base text-center">
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
