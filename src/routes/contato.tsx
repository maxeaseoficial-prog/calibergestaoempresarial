import { createFileRoute } from '@tanstack/react-router';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { CONTACT, OFFICES } from '@/lib/site-data';
import { Reveal } from '@/components/site/Reveal';
import { Mail, Phone, MapPin, MessageSquare, Instagram, Facebook, Linkedin } from 'lucide-react';

export const Route = createFileRoute('/contato')({
  component: ContatoComponent,
});

function ContactCard({ 
  icon: Icon, 
  title, 
  value, 
  href, 
  label 
}: { 
  icon: any, 
  title: string, 
  value: string, 
  href: string,
  label: string 
}) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col rounded-3xl border border-purple/10 bg-card p-8 transition-all duration-500 hover:border-purple/30 hover:shadow-lift hover:-translate-y-1"
    >
      <div className="flex size-12 items-center justify-center rounded-2xl bg-purple/5 text-purple transition-colors duration-500 group-hover:bg-purple group-hover:text-white">
        <Icon className="size-6" />
      </div>
      <h3 className="mt-6 text-sm font-bold tracking-wider text-purple-light uppercase">{title}</h3>
      <p className="mt-2 text-xl font-bold text-ink">{value}</p>
      <span className="mt-4 text-sm font-medium text-purple/60 transition-colors group-hover:text-purple">
        {label} →
      </span>
    </a>
  );
}

function ContatoComponent() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 pt-32 pb-24">
        {/* Hero Section */}
        <section className="container-cal relative">
          <Reveal>
            <span className="eyebrow block text-center">Fale Conosco</span>
            <h1 className="mt-6 text-center text-5xl font-extrabold tracking-tight text-ink lg:text-7xl">
              Vamos levar sua empresa ao <span className="text-purple">próximo nível.</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-center text-lg text-muted-foreground lg:text-xl">
              Nossa equipe está pronta para entender seus desafios e apresentar as soluções ideais para a gestão do seu negócio.
            </p>
          </Reveal>
        </section>

        {/* Contact Methods Grid */}
        <section className="container-cal mt-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Reveal delay={100}>
              <ContactCard 
                icon={MessageSquare}
                title="WhatsApp"
                value="Atendimento Imediato"
                href={CONTACT.whatsapp}
                label="Iniciar conversa"
              />
            </Reveal>
            <Reveal delay={200}>
              <ContactCard 
                icon={Mail}
                title="E-mail"
                value={CONTACT.emailAddress}
                href={CONTACT.emailHref}
                label="Enviar mensagem"
              />
            </Reveal>
            <Reveal delay={300}>
              <div className="flex flex-col rounded-3xl border border-purple/10 bg-purple-dark p-8 text-white shadow-lift lg:col-span-1 md:col-span-2">
                <h3 className="text-sm font-bold tracking-wider text-purple-light uppercase">Redes Sociais</h3>
                <p className="mt-2 text-xl font-bold">Siga a Cáliber</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a 
                    href={CONTACT.instagram} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex size-14 items-center justify-center rounded-2xl bg-white/10 transition-all hover:bg-white/20 hover:scale-110"
                    aria-label="Instagram"
                  >
                    <Instagram className="size-6" />
                  </a>
                  <a 
                    href={CONTACT.linkedin} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex size-14 items-center justify-center rounded-2xl bg-white/10 transition-all hover:bg-white/20 hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="size-6" />
                  </a>
                  <a 
                    href={CONTACT.facebook} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex size-14 items-center justify-center rounded-2xl bg-white/10 transition-all hover:bg-white/20 hover:scale-110"
                    aria-label="Facebook"
                  >
                    <Facebook className="size-6" />
                  </a>
                </div>
                <p className="mt-auto pt-8 text-sm text-white/60">
                  Acompanhe nossos conteúdos e cases de sucesso diariamente.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Offices Section */}
        <section className="container-cal mt-24">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink lg:text-4xl">Nossas Unidades</h2>
          </Reveal>
          
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {OFFICES.map((office, idx) => (
              <Reveal key={office.city} delay={idx * 100}>
                <div className="group relative overflow-hidden rounded-[2.5rem] border border-purple/10 bg-card p-10 transition-all duration-500 hover:border-purple/30">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="flex size-8 items-center justify-center rounded-lg bg-purple text-[10px] font-bold text-white uppercase">
                          {office.state}
                        </span>
                        <h3 className="text-2xl font-bold text-ink">{office.city}</h3>
                      </div>
                      <div className="mt-6 space-y-1 text-muted-foreground">
                        {office.lines.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <a 
                          href={office.phoneHref}
                          className="flex items-center gap-3 text-lg font-bold text-purple transition-colors hover:text-purple-deep"
                        >
                          <Phone className="size-5" />
                          {office.phone}
                        </a>
                      </div>
                    </div>
                    <a 
                      href={office.map}
                      target="_blank"
                      rel="noreferrer"
                      className="flex size-16 items-center justify-center rounded-full bg-lavender text-purple transition-all duration-500 hover:scale-110 group-hover:bg-purple group-hover:text-white"
                      aria-label="Ver no mapa"
                    >
                      <MapPin className="size-7" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
