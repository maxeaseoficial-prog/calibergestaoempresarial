import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { useTestimonials } from "@/hooks/use-site-content";


export function Testimonials() {
  const { data: dbTestimonials } = useTestimonials();
  const testimonials = dbTestimonials && dbTestimonials.length > 0
    ? dbTestimonials.map(t => ({
        name: t.name,
        role: t.role || '',
        quote: t.quote,
        logo: t.logo_url || '/lovable-uploads/Logo-Leo.png', // Fallback to a valid asset
        logoAlt: t.company_name || t.name
      }))
    : TESTIMONIALS;

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Top Frame */}
      <div className="relative z-20 h-24 w-full bg-purple lg:h-40">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="absolute bottom-0 left-0 w-full translate-y-[98%] scale-x-105"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 0H1440V0C1440 0 1140 120 720 120C300 120 0 0 0 0V0Z" 
            fill="var(--color-purple)"
          />
        </svg>
      </div>

      <div className="container-cal relative z-10 py-32 lg:py-48">
        <Reveal>
          <div className="mb-20 mx-auto text-center max-w-2xl">
            <span className="eyebrow block">Quem já evoluiu</span>
            <h2 className="mt-5 text-[clamp(2.2rem,4vw,3.4rem)] leading-[1.05] font-extrabold text-purple">
              Depoimentos
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
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

      {/* Bottom Frame */}
      <div className="relative z-20 h-24 w-full bg-purple lg:h-40">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="absolute top-0 left-0 w-full -translate-y-[98%] scale-x-105"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 120H1440V120C1440 120 1140 0 720 0C300 0 0 120 0 120V120Z" 
            fill="var(--color-purple)"
          />
        </svg>
      </div>
    </section>
  );
}
