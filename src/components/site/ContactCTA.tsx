import { CONTACT } from "@/lib/site-data";
import { CalAnchor } from "./CalButton";
import { LogoWatermark } from "./Logo";
import { Reveal } from "./Reveal";

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden gradient-deep py-24 text-white lg:py-32">
      <LogoWatermark className="-right-32 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 opacity-[0.05] text-white lg:-right-4 lg:h-[32rem] lg:w-[32rem]" />
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
              <CalAnchor href={CONTACT.whatsapp} target="_blank" rel="noreferrer" variant="white">
                Fale com um Especialista
              </CalAnchor>
              <CalAnchor href={CONTACT.emailHref} variant="ghostLight" arrow={false}>
                {CONTACT.emailAddress}
              </CalAnchor>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
