import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = TESTIMONIALS[index]!;

  const go = (dir: number) =>
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="container-cal">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          <div>
            <Reveal>
              <span className="eyebrow">
                
                Quem já evoluiu
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.05] font-extrabold text-ink">
                Depoimentos
              </h2>
            </Reveal>
            <div className="mt-10 flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Depoimento anterior"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-purple/20 text-purple-deep transition-colors duration-300 hover:border-purple hover:bg-lavender"
              >
                <ArrowLeft className="size-4.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Próximo depoimento"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-purple/20 text-purple-deep transition-colors duration-300 hover:border-purple hover:bg-lavender"
              >
                <ArrowRight className="size-4.5" aria-hidden="true" />
              </button>
              <span className="tabular ml-2 text-sm text-muted-foreground">
                {String(index + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>
            </div>

            <ul className="mt-8 space-y-1">
              {TESTIMONIALS.map((item, i) => (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={i === index}
                    className={cn(
                      "w-full border-l-2 py-2.5 pl-4 text-left text-sm font-semibold transition-colors duration-300",
                      i === index
                        ? "border-purple text-purple-deep"
                        : "border-purple/12 text-muted-foreground hover:text-ink",
                    )}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <Reveal delay={120}>
            <figure className="relative h-full rounded-3xl border border-purple/10 bg-card p-8 shadow-soft md:p-14">
              <Quote
                className="size-12 text-purple/15 md:size-16"
                aria-hidden="true"
              />
              <blockquote className="mt-6 text-[clamp(1.15rem,1.9vw,1.6rem)] leading-[1.5] font-medium text-ink">
                “{active.quote}”
              </blockquote>
              <figcaption className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-purple/10 pt-7">
                <div>
                  <span className="block text-base font-bold text-ink">{active.name}</span>
                  <span className="block text-sm text-muted-foreground">{active.role}</span>
                </div>
                <img
                  src={active.logo}
                  alt={active.logoAlt}
                  loading="lazy"
                  width={120}
                  height={56}
                  className="h-10 w-auto max-w-[8rem] object-contain opacity-60 grayscale"
                />
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
