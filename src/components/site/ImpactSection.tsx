import { Reveal } from "./Reveal";
import { CalAnchor } from "./CalButton";
import { CONTACT } from "@/lib/site-data";
import { LogoWatermark } from "./Logo";

export function ImpactSection() {
  return (
    <section className="relative overflow-hidden bg-purple-dark py-24 text-center text-white lg:py-40">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-dark via-purple-deep to-purple opacity-40" />
      <LogoWatermark className="bottom-[-20%] left-[-10%] h-[80%] w-[80%] opacity-[0.04] text-white" />

      <div className="container-cal relative z-10">
        <Reveal>
          <span className="eyebrow mx-auto justify-center text-purple-light">
            <span className="h-px w-8 bg-purple-light/40" />
            A Solução Definitiva
          </span>
        </Reveal>

        <Reveal delay={150}>
          <h2 className="mt-8 text-[clamp(2.5rem,7vw,6.5rem)] font-black leading-[0.9] tracking-tighter uppercase">
            Alavanque seus <br />
            <span className="text-purple-light">Resultados.</span>
          </h2>
        </Reveal>

        <Reveal delay={300}>
          <p className="mx-auto mt-8 max-w-2xl text-xl font-medium text-white/70 lg:text-2xl">
            Transforme seu negócio com a eficiência de quem entende de gestão empresarial na prática.
          </p>
        </Reveal>

        <Reveal delay={450} className="mt-12 lg:mt-16">
          <CalAnchor href={CONTACT.whatsapp} variant="white" className="min-h-14 px-10 text-base">
            Evolua Conosco
          </CalAnchor>
        </Reveal>
      </div>
    </section>
  );
}
