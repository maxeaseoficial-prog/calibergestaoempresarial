import { cn } from "@/lib/utils";
import { STEPS } from "@/lib/site-data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import * as LucideIcons from "lucide-react";

export function Methodology() {
  return (
    <section className="py-20 lg:py-24 overflow-hidden bg-white">
      <div className="container-cal">
        <SectionHeading
          title={<>Como tornamos sua empresa <br className="hidden lg:block" /> mais eficiente?</>}
          align="center"
          className="mb-12 lg:mb-16 max-w-4xl"
          titleClassName="text-purple"
        />

        <div className="relative">
          {/* Desktop Connecting Line */}
          <div 
            className="absolute top-[4.5rem] left-[15%] right-[15%] hidden h-px bg-purple/10 md:block" 
            aria-hidden="true" 
          />
          
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, idx) => {
              const Icon = (LucideIcons as any)[step.icon];
              
              return (
                <Reveal key={step.number} delay={idx * 200} className="relative">
                  <div className="flex flex-col items-center text-center">
                    {/* Number and Icon Header */}
                    <div className="relative mb-6 flex flex-col items-center">
                      <span className="mb-4 text-sm font-bold tracking-widest text-purple/40">
                        {step.number}
                      </span>
                      
                      <div className="relative z-10 flex size-20 items-center justify-center rounded-2xl bg-white text-purple shadow-soft border border-purple/5 transition-all duration-500 group-hover:scale-105">
                        {Icon && <Icon className="size-8 stroke-[1.5]" />}
                      </div>
                      
                      {/* Mobile vertical line connector */}
                      {idx !== STEPS.length - 1 && (
                        <div className="absolute top-full left-1/2 h-12 w-px bg-purple/10 md:hidden" />
                      )}
                    </div>

                    {/* Step Name */}
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-purple mb-3">
                      {step.step}
                    </span>

                    {/* Solution Title */}
                    <h3 className="text-xl font-bold text-ink mb-4 md:text-2xl max-w-[240px] mx-auto">
                      {step.solution}
                    </h3>

                    {/* Description */}
                    <p className="text-base leading-relaxed text-ink/60 max-w-[280px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
