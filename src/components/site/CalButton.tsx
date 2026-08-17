import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-[10px] px-6 py-3 text-sm font-bold tracking-wide transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]";

const variants = {
  primary: "bg-purple text-white hover:bg-purple-deep shadow-soft",
  dark: "bg-purple-dark text-white hover:bg-purple",
  outline: "border border-purple/30 text-purple-deep hover:border-purple hover:bg-lavender",
  ghostLight: "border border-white/25 text-white hover:bg-white/10",
  white: "bg-white text-purple-deep hover:bg-lavender shadow-soft",
} as const;

type Variant = keyof typeof variants;

function Inner({ children, arrow }: { children: ReactNode; arrow: boolean }) {
  return (
    <>
      {children}
      {arrow ? (
        <ArrowRight
          className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
          aria-hidden="true"
        />
      ) : null}
    </>
  );
}

export function CalLink({
  to,
  variant = "primary",
  arrow = true,
  className,
  children,
  ...rest
}: { to: string; variant?: Variant; arrow?: boolean; children: ReactNode } & Omit<
  ComponentProps<typeof Link>,
  "to" | "children"
>) {
  return (
    <Link to={to} className={cn(base, variants[variant], className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

export function CalAnchor({
  variant = "primary",
  arrow = true,
  className,
  children,
  ...rest
}: { variant?: Variant; arrow?: boolean } & ComponentProps<"a">) {
  return (
    <a className={cn(base, variants[variant], className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </a>
  );
}

export function CalButton({
  variant = "primary",
  arrow = false,
  className,
  children,
  ...rest
}: { variant?: Variant; arrow?: boolean } & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], className)} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
