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
            
            // Lógica de grid baseada no pedido do usuário:
            // 1. Resultado na Prática (idx 0)
            // 2. Exclusividade (idx 1)
            // 3. Experiência (idx 2)
            // 4. Autoridade em Gestão (idx 3)
            // 5. Personalizado para Você (idx 4)
            // 6. Transparência e Pontualidade (idx 5) -> "do lado direito de Personalizado para Você"
            // 7. Especialidade no Assunto (idx 6)
            // 8. Suporte Exclusivo (idx 7) -> "do lado direito de Especialidade no Assunto"
            // 9. Garantia de Continuidade e Evolução (idx 8) -> "no lugar de Evolução"
            // 10. Evolução (idx 9) -> "em baixo de todos, ocupando todo o espaço"

            let gridClasses = "lg:col-span-1";
            if (item.title === "Evolução") {
              gridClasses = "md:col-span-2 lg:col-span-3 xl:col-span-4";
            } else if (["Resultado na Prática", "Autoridade em Gestão"].includes(item.title)) {
              gridClasses = "lg:col-span-1"; // Voltando ao normal para acomodar os vizinhos
            }
            
            return (
              <Reveal 
                key={item.title} 
                delay={idx * 50}
                className={cn(
                  "group relative overflow-hidden rounded-[24px] border border-purple/10 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple/30 hover:shadow-[0_20px_40px_rgba(95,85,135,0.08)]",
                  gridClasses
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

