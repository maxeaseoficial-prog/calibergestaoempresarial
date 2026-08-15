import { Reveal } from "./Reveal";
import { CalAnchor, CalLink } from "./CalButton";
import { CONTACT } from "@/lib/site-data";
import { LogoWatermark } from "./Logo";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,var(--caliber-purple-light)_0%,transparent_50%)] opacity-[0.03]" />
      <LogoWatermark className="top-[-10%] right-[-5%] h-[80%] w-[80%] opacity-[0.02] text-purple rotate-12" />

      <div className="container-cal">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10 max-w-2xl">
            <Reveal>
              <span className="eyebrow">
                
                Transforme-se
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-8 text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.95] font-extrabold tracking-tight text-ink">
                É hora de levar sua <br />
                <span className="text-purple">empresa ao próximo nível</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
                Um trabalho único e completamente prático, com sistema que combina técnicas de gestão, processos, finanças, estoques, produção, compras, logística, comercial, estratégias, pessoas, sistemas e mais de uma década de experiência, para evoluir sua empresa.
              </p>
            </Reveal>

            <Reveal delay={300} className="mt-10 flex flex-wrap items-center gap-5">
              <CalAnchor href={CONTACT.whatsapp} target="_blank" rel="noreferrer">
                Evolua Conosco
              </CalAnchor>
              <CalLink to="/sobre" variant="outline" arrow={false}>
                Conheça a Cáliber
              </CalLink>
            </Reveal>
            
            <Reveal delay={450} className="mt-16 flex items-center gap-6 border-l-2 border-purple/10 pl-6">
              <div className="flex flex-col">
                <span className="tabular text-3xl font-extrabold text-purple-deep">+12 anos</span>
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Experiência no mercado</span>
              </div>
              <div className="h-10 w-px bg-purple/10" />
              <div className="flex flex-col">
                <span className="tabular text-3xl font-extrabold text-purple-deep">R$ 1,1 bi</span>
                <span className="text-xs font-bold tracking-wider text-muted-foreground uppercase">Faturamento clientes</span>
              </div>
            </Reveal>
          </div>

          <Reveal variant="image" delay={200} className="relative aspect-[4/5] w-full lg:aspect-square">
            <div className="absolute inset-0 rounded-[40px] bg-purple-deep/5" />
            <img
              src="https://images.unsplash.com/photo-1600880212340-02d956ea3b85?q=80&w=2070&auto=format&fit=crop"
              alt="Consultoria estratégica e gestão empresarial"
              className="h-full w-full rounded-[40px] object-cover shadow-lift"
              loading="eager"
            />
            
            {/* Elemento flutuante decorativo inspirado no símbolo */}
            <div className="absolute -bottom-6 -left-6 hidden size-32 items-center justify-center rounded-3xl bg-white p-6 shadow-lift lg:flex">
               <LogoWatermark className="inset-4 opacity-10 text-purple" />
               <div className="text-center">
                 <div className="text-2xl font-black text-purple tabular">8</div>
                 <div className="text-[0.6rem] font-bold tracking-tighter text-muted-foreground uppercase">Estados</div>
               </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
