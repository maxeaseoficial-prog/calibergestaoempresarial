import { MapPin, Phone } from "lucide-react";
import { OFFICES } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { LogoWatermark } from "./Logo";

export function NationalPresence() {
  return (
    <section className="relative overflow-hidden bg-lavender/60 py-24 lg:py-32">
      <LogoWatermark className="-top-24 -left-32 h-[30rem] w-[30rem] text-purple/[0.05]" />
      <div className="container-cal relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <Reveal>
              <span className="eyebrow">
                
                Atuação nacional
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.05] font-extrabold text-ink">
                Atendemos todo o Brasil.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Será um enorme prazer recebê-lo ou visitá-lo para tomar um café e
                conversarmos sobre novas formas de gerar eficiência e rentabilidade para o
                seu negócio.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="tabular mt-10 text-sm font-semibold tracking-[0.2em] text-purple uppercase">
                Clientes em 8 estados
              </p>
            </Reveal>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {OFFICES.map((office, i) => (
              <Reveal key={office.city} delay={i * 100}>
                <article className="h-full rounded-3xl border border-purple/12 bg-card p-8 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-purple/35">
                  <MapPin className="size-5 text-purple" aria-hidden="true" />
                  <h3 className="mt-6 text-xl font-bold text-ink">
                    {office.city} | {office.state}
                  </h3>
                  <address className="mt-3 text-sm leading-relaxed text-muted-foreground not-italic">
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <a
                    href={office.phoneHref}
                    className="tabular mt-6 inline-flex items-center gap-2 text-sm font-semibold text-purple-deep transition-colors hover:text-purple"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {office.phone}
                  </a>
                  <a
                    href={office.map}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 block text-sm font-semibold text-purple underline-offset-4 hover:underline"
                  >
                    Ver no mapa
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
