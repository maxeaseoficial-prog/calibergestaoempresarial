import { useState } from "react";
import { MapPin, Users, Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { ACTIVE_STATES } from "@/lib/map-data";
import { BrazilMap } from "./BrazilMap";
import { cn } from "@/lib/utils";

export function NationalPresence() {
  const [activeStateId, setActiveStateId] = useState<string | null>(null);

  return (
    <section id="atuacao" className="relative overflow-hidden bg-slate-50/50 py-24 lg:py-32">
      {/* Subtle radial gradient background */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(95,85,135,0.03)_0%,transparent_70%)]" />

      <div className="container-cal relative">
        <div className="grid gap-16 lg:grid-cols-[40%_60%] lg:items-center lg:gap-12 xl:gap-20">
          
          {/* Left Column: Content */}
          <div className="flex flex-col">
            <Reveal>
              <span className="eyebrow">
                ATUAÇÃO NACIONAL
              </span>
            </Reveal>
            
            <Reveal delay={80}>
              <h2 className="mt-5 text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-[1.05] text-ink">
                A Cáliber já chegou a empresas em 10 estados. A próxima pode ser a sua.
              </h2>
            </Reveal>
            
            <Reveal delay={160}>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
                Nossa experiência atravessa diferentes regiões e realidades do Brasil, levando estratégia, gestão e execução para empresas que querem alcançar um novo nível de resultado.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-12 flex flex-col gap-6">
                <div>
                  <h3 className="text-xs font-bold tracking-[0.2em] text-purple uppercase">
                    PRESENÇA EM 10 ESTADOS
                  </h3>
                </div>

                <div className="flex flex-col gap-6">
                  <p className="text-lg font-medium text-slate-700">
                    Onde houver uma empresa pronta para evoluir, queremos estar presentes.
                  </p>
                  
                  <div className="flex">
                    <a 
                      href="/contato" 
                      className="group flex items-center gap-2 text-purple font-bold hover:gap-3 transition-all underline underline-offset-8 decoration-purple/30 hover:decoration-purple"
                    >
                      Vamos falar sobre a sua empresa?
                      <MapPin className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Map */}
          <div className="relative">
            <Reveal delay={300}>
              <BrazilMap 
                onHoverState={setActiveStateId} 
                activeId={activeStateId}
              />
            </Reveal>

            {/* State Chips removed per user request */}

            {/* Closing Detail removed per user request */}
          </div>
        </div>
      </div>
    </section>
  );
}

