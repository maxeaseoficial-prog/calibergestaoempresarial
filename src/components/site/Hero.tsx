import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { CalAnchor, CalLink } from "./CalButton";
import { CONTACT } from "@/lib/site-data";
import { LogoWatermark } from "./Logo";
import { cn } from "@/lib/utils";

const heroMessages = [
  {
    eyebrow: "EVOLUA",
    title: (
      <>
        Leve a <span className="text-purple">transformação</span> para a sua empresa
      </>
    ),
    description:
      "Conte com muito mais do que uma consultoria, e sim uma plataforma completa e prática, da Operação à Gestão, com uma equipe dedicada a tornar sua empresa melhor todos os dias.",
  },
  {
    eyebrow: "TRANSFORME-SE",
    title: (
      <>
        É hora de levar sua <br />
        <span className="text-purple">empresa ao próximo nível</span>
      </>
    ),
    description:
      "Um trabalho único e completamente prático, com sistema que combina técnicas de gestão, processos, finanças, estoques, produção, compras, logística, comercial, estratégias, pessoas, sistemas e mais de uma década de experiência, para evoluir sua empresa.",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIndex((current) => (current + 1) % heroMessages.length);
        setIsTransitioning(false);
      }, 600); // Duração do fade-out
    }, 8000); // 8 segundos por estado

    return () => clearInterval(interval);
  }, []);

  const active = heroMessages[index]!;

  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,var(--caliber-purple-light)_0%,transparent_50%)] opacity-[0.03]" />
      <LogoWatermark className="top-[-10%] right-[-5%] h-[80%] w-[80%] opacity-[0.02] text-purple rotate-12" />

      <div className="container-cal">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10">
            {/* Texto com área de conteúdo para evitar layout shift */}
            <div className="relative grid items-start">
              {heroMessages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "col-start-1 row-start-1 transition-all duration-700 ease-in-out motion-safe:translate-y-0",
                    index === i && !isTransitioning 
                      ? "opacity-100 motion-safe:translate-y-0 pointer-events-auto" 
                      : "opacity-0 motion-safe:translate-y-2 pointer-events-none"
                  )}
                  aria-hidden={index !== i}
                >
                  <span className="eyebrow block">
                    {msg.eyebrow}
                  </span>

                  <h1 className="mt-8 text-[clamp(2.8rem,5.5vw,5.2rem)] leading-[0.95] font-extrabold tracking-tight text-ink">
                    {msg.title}
                  </h1>

                  <p className="mt-8 text-lg leading-relaxed text-muted-foreground md:text-xl max-w-xl">
                    {msg.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Botões fixos */}
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <CalAnchor href={CONTACT.whatsapp} target="_blank" rel="noreferrer">
                Evolua Conosco
              </CalAnchor>
              <CalLink to="/sobre" variant="outline" arrow={false}>
                Conheça a Cáliber
              </CalLink>
            </div>
          </div>

          <Reveal variant="image" delay={200} className="relative aspect-[4/5] w-full lg:aspect-square">
            <div className="absolute inset-0 rounded-[40px] bg-purple-deep/5" />
            <img
              src="https://images.unsplash.com/photo-1600880212340-02d956ea3b85?q=80&w=2070&auto=format&fit=crop"
              alt="Consultoria estratégica e gestão empresarial"
              className="h-full w-full rounded-[40px] object-cover shadow-lift"
              loading="eager"
            />
            
          </Reveal>
        </div>
      </div>
    </section>
  );
}
