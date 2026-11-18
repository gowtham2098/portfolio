import { cn } from "@/utils/cn";

type BackdropVariant =
  | "mesh"
  | "mesh-reverse"
  | "dots"
  | "grid"
  | "beam"
  | "aurora";

interface SectionBackdropProps {
  variant: BackdropVariant;
  /** Adds the subtle alternating section band used to give the page rhythm. */
  tint?: boolean;
  className?: string;
}

const MASK = {
  maskImage:
    "radial-gradient(ellipse 85% 75% at 50% 45%, #000 30%, transparent 100%)",
  WebkitMaskImage:
    "radial-gradient(ellipse 85% 75% at 50% 45%, #000 30%, transparent 100%)",
} as const;

const GRID_SIZE = { backgroundSize: "80px 80px" } as const;

const AURORA = {
  background:
    "conic-gradient(from 0deg, transparent 0deg, #3385ff 55deg, transparent 135deg, #2dd4bf 215deg, transparent 315deg)",
} as const;

/**
 * Decorative, purely CSS-driven section backdrop.
 *
 * Every animated layer uses transform/opacity only, so it runs on the
 * compositor and never triggers layout or paint. Motion is disabled by the
 * global prefers-reduced-motion rule in index.css.
 */
export function SectionBackdrop({
  variant,
  tint = false,
  className,
}: SectionBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "section-backdrop ambient-depth pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {tint && (
        <div
          className="absolute inset-0 bg-slate-50/70 dark:bg-slate-900/25"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
          }}
        />
      )}

      {variant === "mesh" && (
        <>
          <div className="ambient-orb ambient-drift-a -right-32 top-0 h-[430px] w-[430px]">
            <div className="h-full w-full rounded-full bg-brand-400/10 blur-[90px] dark:bg-brand-500/[0.14]" />
          </div>
          <div className="ambient-orb ambient-drift-b ambient-delay-1 -left-40 bottom-0 h-[400px] w-[400px]">
            <div className="h-full w-full rounded-full bg-accent-400/10 blur-[90px] dark:bg-accent-500/[0.10]" />
          </div>
        </>
      )}

      {variant === "mesh-reverse" && (
        <>
          <div className="ambient-orb ambient-drift-b -left-32 top-0 h-[420px] w-[420px]">
            <div className="h-full w-full rounded-full bg-accent-400/10 blur-[90px] dark:bg-accent-500/[0.10]" />
          </div>
          <div className="ambient-orb ambient-drift-a ambient-delay-2 -right-40 bottom-0 h-[400px] w-[400px]">
            <div className="h-full w-full rounded-full bg-brand-400/10 blur-[90px] dark:bg-brand-500/[0.14]" />
          </div>
        </>
      )}

      {variant === "dots" && (
        <>
          <div className="absolute inset-0" style={MASK}>
            <div className="absolute inset-0 bg-dot-pattern bg-dot dark:bg-dot-pattern-dark" />
          </div>
          <div className="ambient-orb ambient-drift-c ambient-delay-1 left-1/2 top-0 h-[380px] w-[380px]">
            <div className="h-full w-full rounded-full bg-brand-400/[0.08] blur-[100px] dark:bg-brand-500/[0.12]" />
          </div>
        </>
      )}

      {variant === "grid" && (
        <>
          <div className="absolute -inset-24 overflow-hidden" style={MASK}>
            <div
              className="ambient-grid-pan absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark"
              style={GRID_SIZE}
            />
          </div>
          <div className="ambient-sweep absolute -left-[10%] top-0 h-full w-[16%] bg-gradient-to-r from-transparent via-brand-400/[0.07] to-transparent dark:via-brand-400/[0.10]" />
          <div className="ambient-orb ambient-drift-b -right-40 top-1/4 h-[360px] w-[360px]">
            <div className="h-full w-full rounded-full bg-accent-400/[0.07] blur-[100px] dark:bg-accent-500/[0.09]" />
          </div>
        </>
      )}

      {variant === "beam" && (
        <>
          <div className="ambient-sweep absolute -left-[10%] top-0 h-full w-[18%] bg-gradient-to-r from-transparent via-brand-400/[0.07] to-transparent dark:via-brand-400/[0.10]" />
          <div className="ambient-sweep ambient-sweep-reverse absolute -left-[10%] top-0 h-full w-[10%] bg-gradient-to-r from-transparent via-accent-400/[0.06] to-transparent dark:via-accent-500/[0.08]" />
          <div className="ambient-orb ambient-drift-a ambient-delay-2 left-1/2 top-0 h-[420px] w-[420px]">
            <div className="h-full w-full rounded-full bg-brand-400/[0.07] blur-[110px] dark:bg-brand-500/[0.11]" />
          </div>
        </>
      )}

      {variant === "aurora" && (
        <>
          <div
            className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] dark:opacity-[0.10]"
            style={MASK}
          >
            <div
              className="ambient-aurora h-full w-full rounded-full"
              style={AURORA}
            />
          </div>
          <div className="ambient-orb ambient-drift-c -left-32 bottom-0 h-[340px] w-[340px]">
            <div className="h-full w-full rounded-full bg-accent-400/[0.08] blur-[100px] dark:bg-accent-500/[0.10]" />
          </div>
        </>
      )}
    </div>
  );
}
