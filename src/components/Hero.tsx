import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Loader2,
  Mail,
} from "lucide-react";
import { memo, useEffect, useState } from "react";
import type { ResumeData } from "@/types/resume";
import { useHeroSpotlight } from "@/hooks/useHeroSpotlight";
import { downloadResumePdf } from "@/utils/download";
import CodeWindow from "./CodeWindow";

const STATUSES = [
  "Available for opportunities",
  "Immediate Joiner",
  "Open to work",
] as const;

const STATUS_INTERVAL_MS = 2000;

const LIGHT_BG =
  "https://res.cloudinary.com/b5xebk6c/image/upload/v1795092119/hero-light.svg";
const DARK_BG =
  "https://res.cloudinary.com/b5xebk6c/image/upload/v1795092119/hero-dark.svg";

interface HeroProps {
  resume: ResumeData;
}

// Keeps the 2s state update local: only this pill re-renders, not the hero.
function StatusPill() {
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % STATUSES.length);
    }, STATUS_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-slate-200/70 bg-white/80 px-4 py-1.5 font-mono text-xs font-medium text-slate-600 shadow-sm backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-900/60 dark:text-slate-300">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75 dark:bg-brand-300" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500 dark:bg-brand-400" />
      </span>
      <span key={statusIndex} className="inline-block animate-status-fade">
        {STATUSES[statusIndex]}
      </span>
    </p>
  );
}

/* ── Decorative code window ─────────────────────────────────────────────── */

export const Hero = memo(function Hero({ resume }: HeroProps) {
  const { name, title, summary, contact } = resume;
  const [isDownloading, setIsDownloading] = useState(false);
  const { sectionRef, spotRef } = useHeroSpotlight();

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      await downloadResumePdf(resume);
    } catch (error) {
      console.error("Failed to generate resume PDF", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      className="hero-section relative isolate flex min-h-screen items-center overflow-hidden pt-16"
      aria-label="Introduction"
    >
      {/* Layered background: theme-aware artwork, wash, glow, grid and grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <img
          src={LIGHT_BG}
          alt=""
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[72%_50%] opacity-90 dark:hidden"
        />
        <img
          src={DARK_BG}
          alt=""
          decoding="async"
          className="absolute inset-0 hidden h-full w-full object-cover object-[72%_50%] opacity-95 dark:block"
        />

        {/* Theme wash — guarantees text contrast over the artwork */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/30 dark:from-slate-950 dark:via-slate-950/90 dark:to-slate-950/45 sm:to-white/15 dark:sm:to-slate-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-slate-950 dark:via-transparent" />

        {/* Soft moving glow */}
        <div className="hero-orb-1 absolute left-1/2 top-1/4 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-400/20 via-brand-500/10 to-accent-400/15 blur-[100px] dark:from-brand-500/25 dark:via-brand-600/15 dark:to-accent-500/20" />
        <div className="hero-orb-2 absolute -right-20 bottom-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-accent-400/15 via-brand-300/10 to-transparent blur-[80px] dark:from-accent-500/20 dark:via-brand-400/10" />

        {/* Fine grid + film grain */}
        <div
          className="absolute inset-0 bg-grid-pattern opacity-40 dark:bg-grid-pattern-dark dark:opacity-25"
          style={{ backgroundSize: "80px 80px" }}
        />
        <div className="hero-grain absolute inset-0" />

        {/* Pointer-tracked glow (desktop only) */}
        <div ref={spotRef} className="hero-spotlight" data-active="false" />
      </div>

      <div className="hero-text section-container w-full">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,430px)] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,520px)] xl:gap-16">
          <div className="max-w-2xl">
            {/* Status pill */}
            <div>
              <StatusPill />
            </div>

            {/* Name */}
            <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-6xl xl:text-7xl">
              {name}
            </h1>

            {/* Title with gradient */}
            <p className="mt-5 text-xl font-semibold sm:text-2xl lg:text-3xl">
              <span className="gradient-text">{title}</span>
            </p>

            {/* Summary */}
            {summary && (
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
                {summary}
              </p>
            )}

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-brand-600/30 active:scale-[0.98]"
              >
                View Projects
                <ArrowDown
                  size={16}
                  className="transition-transform duration-300 ease-out group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              <button
                type="button"
                onClick={() => {
                  void handleDownload();
                }}
                disabled={isDownloading}
                aria-busy={isDownloading}
                className="group inline-flex items-center gap-2.5 rounded-xl border border-slate-300/70 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:scale-100 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-200"
              >
                {isDownloading ? (
                  <Loader2
                    size={16}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <Download
                    size={16}
                    className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                )}
                {isDownloading ? "Preparing…" : "Download Resume"}
              </button>

              <div className="flex items-center gap-2.5">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    aria-label="Send email"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300/70 bg-white/85 text-slate-600 shadow-sm backdrop-blur-md transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-110 active:scale-95 dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-300"
                  >
                    <Mail size={18} aria-hidden="true" />
                  </a>
                )}
                {contact.linkedin && (
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300/70 bg-white/85 text-slate-600 shadow-sm backdrop-blur-md transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-110 active:scale-95 dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-300"
                  >
                    <Linkedin size={18} aria-hidden="true" />
                  </a>
                )}
                {contact.github && (
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300/70 bg-white/85 text-slate-600 shadow-sm backdrop-blur-md transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:scale-110 active:scale-95 dark:border-slate-700/60 dark:bg-slate-900/70 dark:text-slate-300"
                  >
                    <Github size={18} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <CodeWindow />
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-slate-400 transition-colors duration-300 hover:text-brand-600 hover:translate-y-1 dark:hover:text-brand-400 sm:block"
      >
        <ArrowDown size={22} className="animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
});
