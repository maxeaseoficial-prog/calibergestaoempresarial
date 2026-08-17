import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { LogoWatermark } from "./Logo";
import { CONTACT } from "@/lib/site-data";
import { useSiteSettings } from "@/hooks/use-site-content";
import { Headset } from "lucide-react";

export function WhyCaliber() {
  const { data: siteSettings } = useSiteSettings();
  const phoneMT = siteSettings?.find(s => s.key === 'contact_phone_mt')?.value || CONTACT.phoneMT;
  const phoneMTHref = `tel:${phoneMT.replace(/\D/g, '')}`;

  return (
    <section className="relative overflow-hidden bg-purple-deep py-24 text-white lg:py-32">
      <LogoWatermark className="top-1/2 right-[-10%] h-[70%] w-[70%] -translate-y-1/2 opacity-[0.05] text-white" />
      
      <div className="container-cal relative z-10">
        <div className="max-w-3xl">
          <SectionHeading
            tone="dark"
            eyebrow={<span className="block text-3xl font-extrabold tracking-tight text-white lg:text-5xl uppercase">Por que a Cáliber?</span>}
            title="Somos especialistas em eficiência e inovação."
            description="Ser cliente Cáliber é ter um parceiro da operação à gestão para a sua empresa crescer cada dia mais."
          />

          <Reveal delay={300} className="mt-16 inline-flex items-center gap-6 p-2 lg:p-4">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-purple text-white shadow-lg shadow-purple/20">
              <Headset className="size-8" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-white/50">Central de atendimento</p>
              <a href={phoneMTHref} className="mt-1 block text-2xl font-black transition-colors hover:text-purple-light lg:text-3xl">
                {phoneMT}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
