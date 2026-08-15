import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { CalAnchor, CalLink } from "./CalButton";
import { CONTACT } from "@/lib/site-data";
import { LogoWatermark } from "./Logo";
import { cn } from "@/lib/utils";
import heroVideoAsset from "@/assets/hero-video.mp4.asset.json";

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
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32 min-h-[90vh] flex items-center">
      {/* Background Video */}
      <div className="absolute inset-0 -z-20 overflow-hidden bg-black">
        <video
          key={heroVideoAsset.url}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-50"
        >
          <source src={heroVideoAsset.url} type="video/mp4" />
        </video>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,rgba(95,85,135,0.15)_0%,transparent_50%)]" />

      <div className="container-cal">
        <div className="max-w-4xl relative z-10">
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
                <span className="eyebrow block text-purple-light">
                  {msg.eyebrow}
                </span>

                <h1 className="mt-8 text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.9] font-extrabold tracking-tight text-white">
                  {msg.title}
                </h1>

                <p className="mt-8 text-lg leading-relaxed text-white/70 md:text-xl max-w-2xl">
                  {msg.description}
                </p>
              </div>
            ))}
          </div>

          {/* Botões fixos */}
          <div className="mt-12 flex flex-wrap items-center gap-5">
            <CalAnchor href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="px-10 py-5 text-lg">
              Evolua Conosco
            </CalAnchor>
            <CalLink to="/sobre" variant="outline" arrow={false} className="px-10 py-5 text-lg border-white text-white hover:bg-white hover:text-black">
              Conheça a Cáliber
            </CalLink>
          </div>
        </div>
      </div>
    </section>
  );
}
