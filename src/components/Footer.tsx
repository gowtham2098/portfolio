import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import type { ContactInfo } from "@/types/resume";

interface FooterProps {
  name: string;
  contact: ContactInfo;
}

const iconLinkClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/60 bg-white/80 text-slate-600 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110 active:scale-95 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-300";

export function Footer({ name, contact }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-200/50 bg-white/80 backdrop-blur-sm dark:border-slate-800/50 dark:bg-slate-950/80">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/30 to-transparent" />

      <div className="section-container py-12">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="font-mono text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              {name}
            </p>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              &copy; {year} {name}. Built with React, TypeScript & Tailwind CSS.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                aria-label="Email"
                className={iconLinkClass}
              >
                <Mail size={16} aria-hidden="true" />
              </a>
            )}
            {contact.github && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={iconLinkClass}
              >
                <Github size={16} aria-hidden="true" />
              </a>
            )}
            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={iconLinkClass}
              >
                <Linkedin size={16} aria-hidden="true" />
              </a>
            )}
            <a href="#top" aria-label="Back to top" className={iconLinkClass}>
              <ArrowUp size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
