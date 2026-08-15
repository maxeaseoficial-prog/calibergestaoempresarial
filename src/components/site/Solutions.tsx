import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/site-data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { CalAnchor } from "./CalButton";
import { CONTACT } from "@/lib/site-data";

const IMAGES = [
  "https://images.unsplash.com/photo-1454165833767-027ffd49d9c8?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
];

export function Solutions() {
  return (
    <section className="bg-purple-dark py-24 lg:py-32">
      <div className="container-cal">
        <SectionHeading
          eyebrow="Metodologia e Soluções"
          title="O caminho para o faturamento bilionário"
          tone="dark"
          align="center"
          className="mb-20"
        />

        <div className="space-y-24 lg:space-y-32">
          {SERVICES.map((service, idx) => (
            <div 
              key={service.id}
              className={cn(
                "grid items-center gap-12 lg:grid-cols-2 lg:gap-24",
                idx % 2 !== 0 && "lg:direction-rtl"
              )}
            >
              <Reveal className={cn(idx % 2 !== 0 && "lg:order-2")}>
                <div className="flex flex-col">
                  <span className="text-5xl font-black text-white/10 lg:text-7xl">
                    {service.number}
                  </span>
                  <h3 className="mt-4 text-3xl font-extrabold text-white lg:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-6 text-lg leading-relaxed text-white/60">
                    {service.description}
                  </p>
                  <div className="mt-10">
                    <CalAnchor href={CONTACT.whatsapp} variant="ghostLight" target="_blank">
                      Solicitar Detalhes
                    </CalAnchor>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="image" delay={150} className={cn(idx % 2 !== 0 && "lg:order-1")}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[32px]">
                  <img
                    src={IMAGES[idx]}
                    alt={service.title}
                    className="h-full w-full object-cover grayscale opacity-80 transition-all duration-700 hover:grayscale-0 hover:opacity-100 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-dark/80 to-transparent" />
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
