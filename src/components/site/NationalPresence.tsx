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
        <div className="grid gap-12 lg:grid-cols-[45%_55%] lg:items-center xl:gap-20">
          
          {/* Left Column: Content */}
          <div className="flex flex-col">
            <Reveal>
              <span className="text-[11px] font-bold tracking-[0.2em] text-purple uppercase">
                ATUAÇÃO NACIONAL
              </span>
            </Reveal>
            
            <Reveal delay={80}>
              <h2 className="mt-6 max-w-[540px] text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.02] tracking-tight text-ink md:mt-8">
                A Cáliber já chegou a empresas em 10 estados. A próxima pode ser a sua.
              </h2>
            </Reveal>
            
            <Reveal delay={160}>
              <p className="mt-6 max-w-[480px] text-[17px] leading-relaxed text-slate-500 md:mt-8 md:text-lg">
                Nossa experiência atravessa diferentes regiões e realidades do Brasil, levando estratégia, gestão e execução para empresas que querem alcançar um novo nível de resultado.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-col gap-5 md:mt-12">
                <div>
                  <h3 className="text-[11px] font-bold tracking-[0.2em] text-purple uppercase opacity-80">
                    PRESENÇA EM 10 ESTADOS
                  </h3>
                </div>

                <div className="flex flex-col gap-6 md:gap-8">
                  <p className="text-base font-medium text-slate-700 md:text-lg">
                    Onde houver uma empresa pronta para evoluir, queremos estar presentes.
                  </p>
                  
                  <div className="flex">
                    <a 
                      href="/contato" 
                      className="group flex items-center gap-2 text-base font-bold text-purple transition-all hover:gap-3 underline underline-offset-8 decoration-purple/30 hover:decoration-purple md:text-lg"
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

