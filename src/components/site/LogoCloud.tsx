import { CLIENTS } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { useClients } from "@/hooks/use-site-content";


export function LogoCloud() {
  const { data: dbClients } = useClients();
  const clients = dbClients && dbClients.length > 0 
    ? dbClients.map(c => ({ name: c.name, src: c.logo_url }))
    : CLIENTS;
    
  const loop = [...clients, ...clients];

  return (
    <section id="clientes" className="overflow-hidden border-y border-purple/10 bg-card py-12 lg:py-16">
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

      <div className="relative mt-10">
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
  const { data: dbClients } = useClients();
  const clients = dbClients && dbClients.length > 0 
    ? dbClients.map(c => ({ name: c.name, src: c.logo_url }))
    : CLIENTS;

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-purple/10 bg-purple/10 sm:grid-cols-3 lg:grid-cols-5">
      {clients.map((client) => (

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
