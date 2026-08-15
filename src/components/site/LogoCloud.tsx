import { CLIENTS } from "@/lib/site-data";
import { Reveal } from "./Reveal";

export function LogoCloud() {
  const loop = [...CLIENTS, ...CLIENTS];
  return (
    <section id="clientes" className="overflow-hidden border-y border-purple/10 bg-card py-20">
      <div className="container-cal text-center">
        <Reveal>
          <span className="eyebrow block">
            Algumas das empresas que confiam no nosso trabalho
          </span>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 text-[clamp(2rem,3.6vw,3rem)] leading-tight font-extrabold text-ink mx-auto max-w-2xl">
            Parceiros &amp; Clientes
          </h2>
        </Reveal>
      </div>

      <div className="relative mt-14">
        <div className="flex w-max marquee-track gap-14 px-8">
          {loop.map((client, index) => (
            <img
              key={`${client.name}-${index}`}
              src={client.src}
              alt={client.name}
              loading="lazy"
              width={140}
              height={64}
              className="h-14 w-auto max-w-[9rem] object-contain transition-opacity duration-500 hover:opacity-100"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function LogoGrid() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-purple/10 bg-purple/10 sm:grid-cols-3 lg:grid-cols-5">
      {CLIENTS.map((client) => (
        <div
          key={client.name}
          className="flex aspect-[4/3] items-center justify-center bg-card p-6 transition-colors duration-300 hover:bg-lavender"
        >
          <img
            src={client.src}
            alt={client.name}
            loading="lazy"
            width={140}
            height={64}
            className="max-h-12 w-auto max-w-[8rem] object-contain transition-opacity duration-500 hover:opacity-100"
          />
        </div>
      ))}
    </div>
  );
}
