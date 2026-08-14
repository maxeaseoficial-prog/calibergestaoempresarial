import { useEffect, useRef, useState } from "react";
import { METRICS } from "@/lib/site-data";
import { cn } from "@/lib/utils";

function useCountUp(target: number, decimals = 0) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(target);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(target * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  const formatted = value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return { ref, formatted };
}

function Metric({
  metric,
  tone,
}: {
  metric: (typeof METRICS)[number];
  tone: "light" | "dark";
}) {
  const decimals = "decimals" in metric ? (metric.decimals as number) : 0;
  const { ref, formatted } = useCountUp(metric.value, decimals);

  return (
    <div className="flex flex-col gap-2">
      <span
        ref={ref}
        className={cn(
          "tabular text-[clamp(2.2rem,3.4vw,3.1rem)] leading-none font-extrabold",
          tone === "dark" ? "text-white" : "text-purple-deep",
        )}
      >
        {metric.prefix}
        {formatted}
        {metric.suffix}
      </span>
      <span
        className={cn(
          "max-w-[15rem] text-sm leading-snug",
          tone === "dark" ? "text-white/60" : "text-muted-foreground",
        )}
      >
        {metric.label}
      </span>
    </div>
  );
}

export function MetricsBand({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <section
      aria-label="Números da Cáliber"
      className={cn(tone === "dark" ? "bg-purple-deep" : "bg-background")}
    >
      <div className="container-cal">
        <div
          className={cn(
            "grid gap-10 rounded-3xl px-7 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 lg:px-12",
            tone === "dark"
              ? "border border-white/10"
              : "border border-purple/10 bg-card shadow-soft",
          )}
        >
          {METRICS.map((metric) => (
            <Metric key={metric.label} metric={metric} tone={tone} />
          ))}
        </div>
      </div>
    </section>
  );
}
