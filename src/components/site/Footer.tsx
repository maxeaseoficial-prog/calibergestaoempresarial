import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { CONTACT, OFFICES } from "@/lib/site-data";
import { useSocialLinks, useSiteSettings } from "@/hooks/use-site-content";
import { Logo, LogoWatermark } from "./Logo";

export function Footer() {
  const { data: socialLinks } = useSocialLinks();
  const { data: siteSettings } = useSiteSettings();

  const getSocialUrl = (platform: string, fallback: string) => {
    return socialLinks?.find(s => s.name.toLowerCase() === platform.toLowerCase())?.url || fallback;
  };

  const getSetting = (key: string, fallback: string) => {
    return siteSettings?.find(s => s.key === key)?.value || fallback;
  };

  const emailAddress = getSetting('contact_email', CONTACT.emailAddress);
  const phoneMT = getSetting('contact_phone_mt', CONTACT.phoneMT);
  const phonePR = getSetting('contact_phone_pr', CONTACT.phonePR);

  return (
    <footer className="relative overflow-hidden bg-night text-white">

      <div className="container-cal relative py-20">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div className="max-w-sm">
            <span className="flex items-center gap-3 text-white">
              <Logo className="h-11 w-11" />
            </span>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              Da operação à gestão: uma plataforma completa e prática, com uma equipe
              dedicada a tornar sua empresa melhor todos os dias.
            </p>
            <div className="mt-7 flex gap-2">
              {[
                { href: getSocialUrl('instagram', CONTACT.instagram), Icon: Instagram, label: "Instagram" },
                { href: getSocialUrl('facebook', CONTACT.facebook), Icon: Facebook, label: "Facebook" },
                { href: getSocialUrl('linkedin', CONTACT.linkedin), Icon: Linkedin, label: "LinkedIn" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-white/12 text-white/70 transition-colors duration-300 hover:border-white/40 hover:text-white"
                >
                  <Icon className="size-4.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="text-[0.68rem] font-bold tracking-[0.22em] text-purple-light uppercase">
              Navegação
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              {[
                { label: "Início", to: "/" },
                { label: "Sobre", to: "/", hash: "diferenciais" },
                { label: "Serviços", to: "/", hash: "metodologia" },
                { label: "Clientes", to: "/", hash: "clientes" },
                { label: "Contato", to: "/contato", target: "_blank" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to as any}
                    {...("hash" in item ? { hash: item.hash } : {})}
                    {...(item.target ? { target: item.target } : {})}
                    className="transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.68rem] font-bold tracking-[0.22em] text-purple-light uppercase">
              Contato
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              <li>
                <a
                  href={CONTACT.emailHref}
                  className="inline-flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  {CONTACT.emailAddress}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneMTHref}
                  className="inline-flex items-center gap-2 tabular transition-colors hover:text-white"
                >
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  {CONTACT.phoneMT}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phonePRHref}
                  className="inline-flex items-center gap-2 tabular transition-colors hover:text-white"
                >
                  <Phone className="size-4 shrink-0" aria-hidden="true" />
                  {CONTACT.phonePR}
                </a>
              </li>
            </ul>

            <h2 className="mt-9 text-[0.68rem] font-bold tracking-[0.22em] text-purple-light uppercase">
              Endereços
            </h2>
            <ul className="mt-5 space-y-4 text-sm text-white/65">
              {OFFICES.map((office) => (
                <li key={office.city}>
                  <a
                    href={office.map}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-white"
                  >
                    <span className="block font-semibold text-white/85">
                      {office.city} | {office.state}
                    </span>
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-16 border-t border-white/10 pt-6 text-xs text-white/40">
          © {new Date().getFullYear()} Direitos reservados à Cáliber.
        </p>
      </div>
    </footer>
  );
}
