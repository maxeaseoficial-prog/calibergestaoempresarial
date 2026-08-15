import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
  titleClassName,
  as = "h2",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
}) {
  const Title = as;
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <div className={cn("eyebrow", tone === "dark" && "text-purple-light")}>
            {eyebrow}
          </div>
        </Reveal>
      ) : null}
      <Reveal delay={80}>
        <Title
          className={cn(
            "mt-5 text-[clamp(2.1rem,4.2vw,3.6rem)] leading-[1.06] font-extrabold",
            tone === "dark" ? "text-white" : "text-ink",
            titleClassName,
          )}
        >
          {title}
        </Title>
      </Reveal>
      {description ? (
        <Reveal delay={160}>
          <p
            className={cn(
              "mt-6 text-base leading-relaxed md:text-lg",
              tone === "dark" ? "text-white/70" : "text-muted-foreground",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
