import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { LogoWatermark } from "./Logo";

export function CorporateSection() {
  return (
    <section className="relative py-24 lg:py-40">
      <div className="container-cal relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal variant="image">
            <div className="relative overflow-hidden rounded-[40px]">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop"
                alt="Escritório corporativo moderno"
                className="aspect-[4/5] w-full object-cover lg:aspect-[3/4]"
              />
              <div className="absolute inset-0 bg-purple/10 mix-blend-multiply" />
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Da Operação à Gestão"
              title="Leve a transformação para a sua empresa"
              description="Conte com muito mais do que uma consultoria, e sim uma plataforma completa e prática, da Operação à Gestão, com uma equipe dedicada a tornar sua empresa melhor todos os dias."
            />
            
            <Reveal delay={250} className="mt-12">
              <div className="rounded-3xl border border-purple/10 bg-lavender/30 p-8 lg:p-12">
                <span className="text-xs font-black tracking-[0.3em] text-purple opacity-40">
                  Conceito recorrente
                </span>
                <p className="mt-4 text-2xl font-black text-purple-deep leading-tight lg:text-3xl">
                  Da operação <br className="hidden md:block" /> à gestão
                </p>
                <div className="mt-8 h-px w-full bg-purple/10" />
                <p className="mt-8 text-sm font-medium text-muted-foreground italic">
                  "Um trabalho único e completamente prático, focado em resultados reais."
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      
      <LogoWatermark className="bottom-0 left-[-10%] h-[60%] w-[60%] opacity-[0.03] text-purple-deep -rotate-12" />
    </section>
  );
}
