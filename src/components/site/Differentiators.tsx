import { cn } from "@/lib/utils";
import { DIFFERENTIATORS } from "@/lib/site-data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import * as LucideIcons from "lucide-react";
import { Logo } from "./Logo";

export function Differentiators() {
  return (
    <section className="py-20 lg:py-32 bg-white overflow-hidden">
      <div className="container-cal">
        <div className="flex flex-col items-center mb-16 lg:mb-20">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {DIFFERENTIATORS.map((item, idx) => {
            const number = (idx + 1).toString().padStart(2, '0');
            // @ts-ignore - Dynamic icon component lookup
            const IconComponent = LucideIcons[item.icon.charAt(0).toUpperCase() + item.icon.slice(1)] || LucideIcons.Zap;
            
            const isHighlighted = item.title === "Resultado na Prática";
            const isFullWidth = ["Evolução", "Especialidade no Assunto"].includes(item.title);

            if (isFullWidth) {
              return (
                <Reveal 
                  key={item.title} 
                  delay={idx * 50}
                  className={cn(
                    "group relative md:col-span-2 lg:col-span-4 rounded-[24px] border border-purple/10 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-purple/30 hover:shadow-[0_20px_40px_rgba(95,85,135,0.08)]",
                  )}
                >
                  <div className="p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center gap-8 h-full">
                    <div className="flex items-center gap-6 shrink-0">
                      <div className="flex size-16 items-center justify-center rounded-2xl bg-purple/[0.06] text-purple transition-all duration-300 group-hover:bg-purple group-hover:text-white group-hover:shadow-lg group-hover:shadow-purple/20">
                        <IconComponent className="size-8" strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-4xl font-black text-purple/10 group-hover:text-purple/20 transition-colors leading-none">{number}</span>
                        <h3 className="text-2xl font-black text-ink mt-1 group-hover:text-purple transition-colors">{item.title}</h3>
                      </div>
                    </div>

                    <p className="text-base leading-relaxed text-ink/60 flex-1 group-hover:text-ink/80 transition-colors max-w-2xl">
                      {item.text}
                    </p>

                    <div className="hidden lg:flex items-center justify-end w-48 opacity-20 group-hover:opacity-40 transition-all duration-500 group-hover:scale-110">
                      {item.title === "Evolução" ? (
                        <div className="flex flex-col gap-2">
                           <div className="w-24 h-2 bg-purple rounded-full translate-x-4" />
                           <div className="w-32 h-2 bg-purple rounded-full translate-x-2" />
                           <div className="w-40 h-2 bg-purple rounded-full" />
                           <div className="w-32 h-2 bg-purple rounded-full translate-x-2" />
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                          <div className="size-8 rounded-full border-2 border-purple" />
                          <div className="size-8 rounded-full border-2 border-purple bg-purple/20" />
                          <div className="size-8 rounded-full border-2 border-purple bg-purple/20" />
                          <div className="size-8 rounded-full border-2 border-purple" />
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              );
            }

            return (
              <Reveal 
                key={item.title} 
                delay={idx * 50}
                className={cn(
                  "group relative overflow-hidden rounded-[24px] border border-purple/10 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple/30 hover:shadow-[0_20px_40px_rgba(95,85,135,0.08)] flex flex-col h-full",
                  isHighlighted ? "bg-purple/[0.02] border-purple/20" : "bg-white"
                )}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={cn(
                    "flex size-12 items-center justify-center rounded-xl transition-all duration-300",
                    "bg-purple/[0.04] text-purple group-hover:bg-purple group-hover:text-white group-hover:shadow-lg group-hover:shadow-purple/20"
                  )}>
                    <IconComponent className="size-5.5" strokeWidth={1.5} />
                  </div>
                  <span className="text-3xl font-black text-purple/5 group-hover:text-purple/10 transition-colors leading-none tracking-tighter">
                    {number}
                  </span>
                </div>
                
                <h3 className="text-lg font-black text-ink group-hover:text-purple transition-colors mb-3">
                  {item.title}
                </h3>
                <p className="text-[0.92rem] leading-relaxed text-ink/60 transition-colors duration-300 group-hover:text-ink/80 flex-1">
                  {item.text}
                </p>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-20 flex items-center justify-center gap-6">
          <div className="h-[1px] flex-1 bg-purple/10 max-w-[100px] hidden md:block" />
          <p className="text-ink/60 text-sm md:text-base">
            Não entregamos teoria. <span className="text-purple font-bold">Entregamos resultado.</span>
          </p>
          <div className="h-[1px] flex-1 bg-purple/10 max-w-[100px] hidden md:block" />
        </div>
      </div>
    </section>
  );
}
