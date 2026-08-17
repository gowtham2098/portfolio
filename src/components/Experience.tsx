import type { ExperienceEntry } from '@/types/resume';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { motion } from 'framer-motion';
import { cardHover } from '@/utils/cn';

interface ExperienceProps {
  experience: ExperienceEntry[];
}

function getTotalYears(experience: ExperienceEntry[]): number {
  const currentYear = new Date().getFullYear();
  let earliestYear = currentYear;

  for (const entry of experience) {
    const years = entry.duration.match(/\d{4}/g);
    if (years) {
      const start = parseInt(years[0], 10);
      if (start < earliestYear) earliestYear = start;
    }
  }

  return currentYear - earliestYear;
}

export function Experience({ experience }: ExperienceProps) {
  if (experience.length === 0) return null;

  const totalYears = getTotalYears(experience);

  return (
    <section id="experience" className="section-padding section-bg-grid relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-accent-400/5 blur-[100px] dark:bg-accent-500/8" />
      <div className="section-container">
        <Reveal>
          <SectionHeading
            eyebrow="03 / Experience"
            title="Work history"
            description="Roles where I've shipped production software and grown as a developer."
          />
        </Reveal>

        {/* Duration stat badge */}
        <Reveal delay={100}>
          <div className="mb-10 inline-flex flex-col items-center rounded-2xl border border-brand-200/60 bg-brand-50/80 px-8 py-5 backdrop-blur-sm dark:border-brand-800/40 dark:bg-brand-950/30 sm:flex-row sm:gap-4">
            <span className="text-5xl font-bold tracking-tight text-brand-600 dark:text-brand-400 sm:text-6xl">
              {totalYears}
            </span>
            <span className="mt-1 font-mono text-xs font-semibold uppercase tracking-widest text-brand-700/70 dark:text-brand-300/60 sm:mt-0">
              Years<br className="hidden sm:inline" /> Experience
            </span>
          </div>
        </Reveal>

        {/* Experience cards */}
        <div className="space-y-5">
          {experience.map((entry, index) => (
            <Reveal key={`${entry.role}-${entry.company}`} delay={150 + index * 100}>
              <ExperienceCard entry={entry} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  const { role, company, duration, responsibilities, technologies } = entry;

  return (
    <motion.article
      {...cardHover}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 backdrop-blur-sm dark:border-slate-800/60 dark:bg-slate-900/40"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Header */}
      <div className="border-b border-slate-200/60 bg-slate-50/50 px-6 py-5 dark:border-slate-800/60 dark:bg-slate-900/30 sm:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{role}</h3>
            {company && (
              <p className="mt-1 text-sm font-semibold text-brand-600 dark:text-brand-400">{company}</p>
            )}
          </div>
          {duration && (
            <span className="inline-flex w-fit items-center rounded-full border border-slate-200/60 bg-white/80 px-3 py-1 font-mono text-xs font-medium text-slate-600 shadow-sm dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-300">
              {duration}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-6 sm:px-8">
        {responsibilities.length > 0 && (
          <ul className="space-y-3">
            {responsibilities.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-brand-500 to-accent-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {technologies.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
            {technologies.map((tech) => (
              <li key={tech} className="tag-glow font-mono">
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
}
