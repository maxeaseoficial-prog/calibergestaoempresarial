import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { useTestimonials } from "@/hooks/use-site-content";

// Explicit imports for local assets to ensure they are handled by Vite
import leoLogo from "@/assets/leo-madeiras.png?url";
import maxvinilLogo from "@/assets/tintas-maxvinil.png?url";
import tabladoLogo from "@/assets/tablado-madeireira.png?url";



export function Testimonials() {
  const { data: dbTestimonials } = useTestimonials();
  
  // Use a local mapping for assets that exist in src/assets
  // These are imported via .asset.json in site-data.ts but here we use the resolved paths
  const testimonials = dbTestimonials && dbTestimonials.length > 0
    ? dbTestimonials.map(t => {
        let logo = t.logo_url;
        
        // Fix for broken external URLs by using confirmed local assets
        if (t.company_name?.toLowerCase().includes('leo madeiras')) {
          logo = leoLogo;
        } else if (t.company_name?.toLowerCase().includes('maxvinil')) {
          logo = maxvinilLogo;
        } else if (t.company_name?.toLowerCase().includes('megasom')) {
          logo = tabladoLogo;
        }
        
        return {
          name: t.name,

          role: t.role || '',
          quote: t.quote,
          logo: logo || TESTIMONIALS[0].logo,
          logoAlt: t.company_name || t.name
        };
      })
    : TESTIMONIALS;



  return (
    <section className="relative overflow-hidden bg-white">
      {/* Top Frame */}
      <div className="relative z-20 h-16 w-full bg-purple lg:h-24">
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

      <div className="container-cal relative z-10 py-20 lg:py-32">
        <Reveal>
          <div className="mb-12 mx-auto text-center max-w-2xl">
            <span className="eyebrow block">Quem já evoluiu</span>
            <h2 className="mt-4 text-[clamp(2rem,3.5vw,3rem)] leading-[1.05] font-extrabold text-purple">
              Depoimentos
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 100}>
              <div className="flex flex-col h-full">
                {/* 5 Stars */}
                <div className="flex gap-0.5 mb-5 text-purple">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star 
                      key={starIndex} 
                      className="size-[16px] fill-purple stroke-purple" 
                      aria-hidden="true" 
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="flex-grow">
                  <p className="text-[clamp(1rem,1.1vw,1.15rem)] leading-[1.6] font-medium italic text-ink/90 antialiased">
                    “{testimonial.quote}”
                  </p>
                </blockquote>

                {/* Identity Block */}
                <div className="mt-8 pt-6 border-t border-purple/5 flex flex-col items-start space-y-4">
                  {/* Logo Area */}
                  <div className="h-8 w-full max-w-[120px] flex items-center justify-start overflow-hidden">
                    <img
                      src={testimonial.logo}
                      alt={testimonial.logoAlt}
                      loading="lazy"
                      className="h-full w-auto object-contain transition-all duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="space-y-0.5">
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
