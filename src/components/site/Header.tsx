import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CONTACT } from "@/lib/site-data";
import { Logo } from "./Logo";
import { CalAnchor } from "./CalButton";

const NAV = [
  { label: "Início", to: "/" },
  { label: "Sobre", to: "/", hash: "diferenciais" },
  { label: "Serviços", to: "/", hash: "metodologia" },
  { label: "Clientes", to: "/", hash: "clientes" },
] as const;


export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openMenu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMenu]);

  useEffect(() => {
    if (!openDropdown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setOpenDropdown(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openDropdown]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "border-b border-purple/10 bg-black/85 backdrop-blur-md",
      )}
    >
      <div className="container-cal grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-4 lg:grid-cols-[auto_1fr_auto]">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-3 text-white"
          aria-label="Cáliber — página inicial"
        >
          <Logo className="h-12 w-12 shrink-0 lg:h-14 lg:w-14" />
        </Link>

        <nav aria-label="Principal" className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  {...("hash" in item ? { hash: item.hash } : {})}
                  activeOptions={{ exact: item.to === "/" && !("hash" in item) }}
                  className="inline-flex min-h-10 items-center rounded-[10px] px-3.5 text-sm font-semibold text-white/80 transition-colors duration-300 hover:text-purple-light"
                  activeProps={{ className: "text-purple-light" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/contato"
                className="inline-flex min-h-10 items-center rounded-[10px] px-3.5 text-sm font-semibold text-white/80 transition-colors duration-300 hover:text-purple-light"
                activeProps={{ className: "text-purple-light" }}
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <CalAnchor
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="hidden text-xs lg:inline-flex"
          >
            Fale com um Especialista
          </CalAnchor>
          <button
            type="button"
            onClick={() => setOpenMenu(true)}
            aria-label="Abrir menu"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[10px] border border-white/20 text-white lg:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <MobileNavigation open={openMenu} onClose={() => setOpenMenu(false)} />
    </header>
  );
}

function MobileNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-purple-dark text-white lg:hidden">
      <div className="container-cal flex items-center justify-between py-4">
        <span className="flex items-center text-white">
          <Logo className="h-12 w-12" />
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar menu"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[10px] border border-white/20"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile" className="container-cal flex-1 overflow-y-auto pt-6 pb-10">
        <ul className="space-y-1">
          {[...NAV, { label: "Contato", to: "/contato" as const }].map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                {...("hash" in item ? { hash: item.hash } : {})}
                onClick={onClose}
                className="block border-b border-white/10 py-4 text-2xl font-bold tracking-tight"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>


        <CalAnchor
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noreferrer"
          variant="white"
          className="mt-8 w-full"
        >
          Fale com um Especialista
        </CalAnchor>
      </nav>
    </div>
  );
}
