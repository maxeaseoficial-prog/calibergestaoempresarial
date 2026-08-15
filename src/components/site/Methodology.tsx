import { cn } from "@/lib/utils";
import { STEPS } from "@/lib/site-data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import * as LucideIcons from "lucide-react";

export function Methodology() {
  return (
    <section className="py-20 lg:py-32 overflow-hidden bg-white">
      <div className="container-cal">
        <SectionHeading
          title={<>Como tornamos sua empresa <br className="hidden lg:block" /> mais eficiente?</>}
          align="center"
          className="mb-16 lg:mb-24 max-w-4xl"
          titleClassName="text-purple"
        />

        <div className="relative group/section">
          {/* Desktop Connecting Line */}
          <div 
            className="absolute top-[4.5rem] left-[15%] right-[15%] hidden h-[2px] bg-purple/5 md:block overflow-hidden" 
            aria-hidden="true" 
          >
            <div className="h-full w-full bg-purple origin-left scale-x-0 transition-transform duration-700 ease-out group-hover/section:scale-x-100 opacity-20" />
          </div>
          
          <div className="grid gap-16 md:grid-cols-3 md:gap-8">
            {STEPS.map((step, idx) => {
              const Icon = (LucideIcons as any)[step.icon];
              
              return (
                <Reveal key={step.number} delay={idx * 150} className="relative group">
                  <div className="flex flex-col items-center text-center px-4 transition-all duration-300 rounded-3xl py-6 hover:bg-purple/[0.02]">
                    {/* Number and Icon Header */}
                    <div className="relative mb-8 flex flex-col items-center">
                      <span className="mb-4 text-sm font-black tracking-[0.25em] text-purple/30 transition-colors duration-300 group-hover:text-purple/60">
                        {step.number}
                      </span>
                      
                      <div className="relative z-10 flex size-20 items-center justify-center rounded-[1.5rem] bg-white text-purple shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple/5 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_15px_35px_rgba(95,85,135,0.12)] group-hover:border-purple/20 group-hover:bg-purple/[0.01]">
                        {Icon && (
                          <Icon className="size-8 stroke-[1.5] transition-transform duration-500 group-hover:scale-110" />
                        )}
                      </div>
                      
                      {/* Mobile vertical line connector */}
                      {idx !== STEPS.length - 1 && (
                        <div className="absolute top-full left-1/2 h-16 w-[2px] bg-purple/5 md:hidden" />
                      )}
                    </div>

                    {/* Step Name */}
                    <span className="text-[0.7rem] font-black uppercase tracking-[0.25em] text-purple/50 mb-4 transition-colors duration-300 group-hover:text-purple">
                      {step.step}
                    </span>

                    {/* Solution Title */}
                    <h3 className="text-xl font-extrabold text-ink mb-5 md:text-2xl max-w-[240px] mx-auto transition-colors duration-300 group-hover:text-purple-deep">
                      {step.solution}
                    </h3>

                    {/* Description */}
                    <p className="text-[1.05rem] leading-relaxed text-ink/60 max-w-[280px] mx-auto transition-colors duration-300 group-hover:text-ink/80">
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

