import { memo } from "react";

/* ── Decorative code window ──────────────────────────────────────────────── */
/* Split out of Hero so the markup and tokens stay out of the critical bundle:
   it is above-the-fold but purely decorative and hidden below `lg`. */

type Token = [text: string, tone?: "kw" | "str" | "tag" | "fn" | "muted"];

const TONES: Record<NonNullable<Token[1]>, string> = {
  kw: "text-brand-600 dark:text-brand-300",
  str: "text-accent-600 dark:text-accent-400",
  tag: "text-sky-600 dark:text-sky-300",
  fn: "text-indigo-600 dark:text-indigo-300",
  muted: "text-slate-400 dark:text-slate-500",
};

const CODE_LINES: Token[][] = [
  [
    ["import", "kw"],
    [" { useState } ", undefined],
    ["from", "kw"],
    [" 'react'", "str"],
    [";"],
  ],
  [
    ["import", "kw"],
    [" { useTheme } ", undefined],
    ["from", "kw"],
    [" '@/hooks/useTheme'", "str"],
    [";"],
  ],
  [],
  [
    ["const", "kw"],
    [" stack = ", undefined],
    ["['React', 'TypeScript', 'Tailwind']", "str"],
    [";"],
  ],
  [],
  [["export function ", "kw"], ["Hero", "fn"], ["() {"]],
  [
    ["  const", "kw"],
    [" { theme } = ", undefined],
    ["useTheme", "fn"],
    ["();"],
  ],
  [
    ["  const", "kw"],
    [" [ready, setReady] = ", undefined],
    ["useState", "fn"],
    ["(", undefined],
    ["false", "kw"],
    [");"],
  ],
  [],
  [["  return", "kw"], [" ("]],
  [
    ["    <"],
    ["section", "tag"],
    [" className=", undefined],
    ['"hero"', "str"],
    [">"],
  ],
  [["      <"], ["h1", "tag"], [">{name}</"], ["h1", "tag"], [">"]],
  [["    </"], ["section", "tag"], [">"]],
  [["  );"]],
  [["}"]],
];

const TABS = [
  { name: "Hero.tsx", active: true },
  { name: "resume.md", active: false },
  { name: "tailwind.config.js", active: false },
];

const CHIPS = [
  { label: "React", position: "-left-6 top-[16%]", delay: "0s" },
  { label: "TypeScript", position: "-right-5 top-[54%]", delay: "-2.4s" },
  { label: "Tailwind", position: "left-[10%] -bottom-5", delay: "-4.2s" },
];

const CodeWindow = memo(function CodeWindow() {
  return (
    <div className="relative hidden lg:block" aria-hidden="true">
      <div style={{ perspective: "1600px" }}>
        <div
          className="relative"
          style={{ transform: "rotateY(-11deg) rotateX(5deg)" }}
        >
          {/* brand glow behind the card */}
          <div className="pointer-events-none absolute -inset-10 rounded-[44px] bg-gradient-to-br from-brand-500/25 via-accent-400/15 to-transparent blur-3xl dark:from-brand-500/30 dark:via-accent-500/15" />

          <div className="hero-card-float relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/75 dark:shadow-black/50">
            {/* title bar */}
            <div className="flex items-center gap-3 border-b border-slate-200/70 bg-slate-50/80 px-4 py-3 dark:border-white/5 dark:bg-slate-950/40">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="ml-1 flex items-center gap-1 overflow-hidden">
                {TABS.map((tab) => (
                  <span
                    key={tab.name}
                    className={
                      tab.active
                        ? "rounded-md border border-slate-200/70 bg-white px-2.5 py-1 font-mono text-[10px] font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-200"
                        : "px-2 py-1 font-mono text-[10px] text-slate-400 dark:text-slate-500"
                    }
                  >
                    {tab.name}
                  </span>
                ))}
              </div>
            </div>

            {/* code */}
            <div className="px-4 py-4 font-mono text-[11.5px] leading-[1.85] sm:text-xs">
              {CODE_LINES.map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span className="w-4 shrink-0 select-none text-right text-slate-300 dark:text-slate-600">
                    {i + 1}
                  </span>
                  <span className="whitespace-pre text-slate-600 dark:text-slate-300">
                    {line.map(([text, tone], j) => (
                      <span key={j} className={tone ? TONES[tone] : undefined}>
                        {text}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>

            {/* status bar */}
            <div className="flex items-center justify-between border-t border-slate-200/70 bg-slate-50/80 px-4 py-2 font-mono text-[10px] text-slate-500 dark:border-white/5 dark:bg-slate-950/40 dark:text-slate-400">
              <span className="flex items-center gap-3">
                <span className="text-brand-600 dark:text-brand-400">
                  main*
                </span>
                <span>TypeScript React</span>
              </span>
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />0
                  problems
                </span>
                <span>UTF-8</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* floating tech chips */}
      {CHIPS.map((chip) => (
        <span
          key={chip.label}
          className={`hero-chip-float absolute ${chip.position} inline-flex items-center gap-1.5 rounded-xl border border-slate-200/70 bg-white/85 px-3 py-1.5 font-mono text-[11px] font-medium text-slate-600 shadow-lg shadow-slate-900/5 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-300`}
          style={{ animationDelay: chip.delay }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-brand-400" />
          {chip.label}
        </span>
      ))}
    </div>
  );
});

export default CodeWindow;
