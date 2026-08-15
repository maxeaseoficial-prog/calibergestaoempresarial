import { cn } from "@/lib/utils";
import { DIFFERENTIATORS } from "@/lib/site-data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import * as LucideIcons from "lucide-react";

export function Differentiators() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container-cal">
        <SectionHeading
          eyebrow="Diferenciais Exclusivos"
          title="O que só a Cáliber faz por você"
          align="center"
          className="mb-16 lg:mb-24"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3">
          {DIFFERENTIATORS.map((item, idx) => {
            // @ts-ignore - Dynamic icon component lookup
            const IconComponent = LucideIcons[item.icon.charAt(0).toUpperCase() + item.icon.slice(1)] || LucideIcons.Zap;
            
            return (
              <Reveal 
                key={item.title} 
                delay={idx * 50}
                className={cn(
                  "group relative overflow-hidden rounded-[28px] border border-purple/10 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-purple hover:shadow-lift",
                  item.span === "wide" && "lg:col-span-2",
                  item.span === "tall" && "lg:row-span-2"
                )}
              >
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-lavender text-purple transition-colors duration-500 group-hover:bg-purple group-hover:text-white">
                    <IconComponent className="size-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-ink group-hover:text-purple transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
                
                {/* Subtle graphic element on hover */}
                <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] size-32 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.03]">
                  <IconComponent className="size-full text-purple" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
