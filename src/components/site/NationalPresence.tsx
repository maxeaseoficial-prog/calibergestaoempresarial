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
                Atendemos<br />todo o Brasil.
              </h2>
            </Reveal>
            
            <Reveal delay={160}>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg">
                Será um enorme prazer recebê-lo ou visitá-lo para tomar um café e
                conversarmos sobre novas formas de gerar eficiência e rentabilidade para o
                seu negócio.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-12 flex flex-col gap-6">
                <div>
                  <h3 className="text-xs font-bold tracking-[0.2em] text-purple uppercase">
                    CLIENTES EM 10 ESTADOS
                  </h3>
                  
                  {/* Legend removed per user request */}
                </div>


                {/* Callout */}
                <div className="rounded-2xl bg-purple/[0.03] p-5 ring-1 ring-purple/5">
                  <div className="flex gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-purple/10 text-purple">
                      <Users className="size-5" />
                    </div>
                    <p className="text-sm leading-relaxed text-slate-600">
                      Soluções aplicadas na prática em diferentes regiões do país, sempre com o mesmo padrão de excelência Cáliber.
                    </p>
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

            {/* State Chips */}
            <Reveal delay={400}>
              <div className="mt-12">
                <div className="flex flex-wrap gap-2">
                  {ACTIVE_STATES.map((state) => (
                    <button
                      key={state.id}
                      onMouseEnter={() => setActiveStateId(state.id)}
                      onMouseLeave={() => setActiveStateId(null)}
                      className={cn(
                        "flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all duration-300",
                        activeStateId === state.id
                          ? "border-purple bg-purple text-white shadow-md shadow-purple/20"
                          : "border-slate-200 bg-white text-slate-500 hover:border-purple/30 hover:bg-slate-50"
                      )}
                    >
                      <span className={cn(
                        "text-[10px] opacity-70",
                        activeStateId === state.id ? "text-white" : "text-purple"
                      )}>
                        {state.id}
                      </span>
                      {state.name}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Closing Detail removed per user request */}
          </div>
        </div>
      </div>
    </section>
  );
}

