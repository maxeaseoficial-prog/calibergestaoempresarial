import logoAsset from "@/assets/caliber-logo.png.asset.json";
import { cn } from "@/lib/utils";

/**
 * O logotipo original da Cáliber (PNG branco) é usado como máscara,
 * permitindo colorir a marca com currentColor sem redesenhá-la.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Cáliber"
      className={cn("block bg-current", className)}
      style={{
        WebkitMaskImage: `url(${logoAsset.url})`,
        maskImage: `url(${logoAsset.url})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

/** Símbolo Cáliber usado como marca d'água / textura de fundo. */
export function LogoWatermark({
  className,
  ariaHidden = true,
}: {
  className?: string;
  ariaHidden?: boolean;
}) {
  return (
    <span
      aria-hidden={ariaHidden}
      className={cn("pointer-events-none absolute block bg-current", className)}
      style={{
        WebkitMaskImage: `url(${logoAsset.url})`,
        maskImage: `url(${logoAsset.url})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "top center",
        maskPosition: "top center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
