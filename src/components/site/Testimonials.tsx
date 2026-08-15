import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site-data";
import { Reveal } from "./Reveal";

export function Testimonials() {
  return (
    <section className="bg-background py-24 lg:py-32 overflow-hidden">
      <div className="container-cal">
        <Reveal>
          <div className="mb-20 mx-auto text-center max-w-2xl">
            <span className="eyebrow block">Quem já evoluiu</span>
            <h2 className="mt-5 text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.05] font-extrabold text-purple">
              Depoimentos
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 100}>
              <div className="flex flex-col h-full">
                {/* 5 Stars */}
                <div className="flex gap-0.5 mb-7 text-purple">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star 
                      key={starIndex} 
                      className="size-[18px] fill-purple stroke-purple" 
                      aria-hidden="true" 
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="flex-grow">
                  <p className="text-[clamp(1.05rem,1.2vw,1.2rem)] leading-[1.7] font-medium italic text-ink/90 antialiased">
                    “{testimonial.quote}”
                  </p>
                </blockquote>

                {/* Identity Block */}
                <div className="mt-10 pt-8 border-t border-purple/5 flex flex-col items-start space-y-6">
                  {/* Logo Area */}
                  <div className="h-10 w-full max-w-[140px] flex items-center justify-start overflow-hidden">
                    <img
                      src={testimonial.logo}
                      alt={testimonial.logoAlt}
                      loading="lazy"
                      className="h-full w-auto object-contain transition-all duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <span className="block text-base font-bold text-purple tracking-tight">
                      {testimonial.name}
                    </span>
                    <span className="block text-sm font-medium text-muted-foreground/80">
                      {testimonial.role}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
