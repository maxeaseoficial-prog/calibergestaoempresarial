import { cn } from "@/lib/utils";
import { STEPS } from "@/lib/site-data";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Methodology() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden">
      <div className="container-cal">
        <SectionHeading
          eyebrow="Nossa Abordagem"
          title={<>Como tornamos sua empresa <br className="hidden md:block" /> mais eficiente?</>}
          align="center"
          className="mb-16 lg:mb-24"
        />

        <div className="relative grid gap-12 md:grid-cols-3">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-0 hidden h-px w-full bg-purple/10 md:block" aria-hidden="true" />
          
          {STEPS.map((step, idx) => (
            <Reveal key={step.number} delay={idx * 150} className="relative z-10">
              <div className="group flex flex-col items-center text-center md:items-start md:text-left">
                <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-white text-xl font-black text-purple shadow-soft transition-transform duration-500 group-hover:scale-110 group-hover:bg-purple group-hover:text-white">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-ink uppercase tracking-wide md:text-2xl">
                  {step.title}
                </h3>
                <div className="mt-4 h-1 w-12 bg-purple/20 transition-all duration-500 group-hover:w-full group-hover:bg-purple" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
