import { CONTACT } from "@/lib/site-data";
import { CalAnchor } from "./CalButton";
import { LogoWatermark } from "./Logo";
import { Reveal } from "./Reveal";

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden gradient-deep py-20 text-white lg:py-28 min-h-[50vh] flex items-center">
      {/* Logo watermark removed */}
      <div className="container-cal relative">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow text-purple-light">
              
              Evolua conosco
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.02] font-extrabold">
              Sua empresa pode evoluir mais.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Fale com um especialista e descubra novas formas de gerar eficiência e
              rentabilidade para o seu negócio.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <CalAnchor href={CONTACT.whatsapp} target="_blank" rel="noreferrer" variant="white" arrow={false}>
                Fale com um especialista
              </CalAnchor>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
