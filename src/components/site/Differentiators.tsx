import { cn } from "@/lib/utils";
import { DIFFERENTIATORS } from "@/lib/site-data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import * as LucideIcons from "lucide-react";

export function Differentiators() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container-cal">
        <SectionHeading
          eyebrow="Diferenciais Exclusivos"
          title="O que só a Cáliber faz por você"
          align="center"
          className="mb-16 lg:mb-20"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-auto">
          {DIFFERENTIATORS.map((item, idx) => {
            // @ts-ignore - Dynamic icon component lookup
            const IconComponent = LucideIcons[item.icon.charAt(0).toUpperCase() + item.icon.slice(1)] || LucideIcons.Zap;
            
            // Definição de span baseada na importância e tamanho do texto
            // Resultado na Prática, Autoridade em Gestão, Evolução ocupam 2 colunas
            const isWide = ["Resultado na Prática", "Autoridade em Gestão", "Evolução"].includes(item.title);
            
            return (
              <Reveal 
                key={item.title} 
                delay={idx * 50}
                className={cn(
                  "group relative overflow-hidden rounded-[24px] border border-purple/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple/30 hover:shadow-[0_20px_40px_rgba(95,85,135,0.08)]",
                  isWide && "lg:col-span-2"
                )}
              >
                <div className="relative z-10 flex h-full flex-col items-start text-left">
                  <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-purple/[0.04] text-purple transition-all duration-300 group-hover:bg-purple group-hover:text-white group-hover:shadow-lg group-hover:shadow-purple/20">
                    <IconComponent className="size-5.5" />
                  </div>
                  <h3 className="text-lg font-black text-ink group-hover:text-purple transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-ink/60 transition-colors duration-300 group-hover:text-ink/80">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

