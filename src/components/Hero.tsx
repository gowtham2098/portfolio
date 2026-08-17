import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { ResumeData } from '@/types/resume';
import { downloadResumePdf } from '@/utils/download';
import { staggerContainer, staggerItem, buttonHoverSolid, buttonHover, iconPop } from '@/utils/cn';

const STATUSES = [
  'Available for opportunities',
  'Immediate Joiner',
  'Open to work',
];

interface HeroProps {
  resume: ResumeData;
}

export function Hero({ resume }: HeroProps) {
  const { name, title, summary, contact } = resume;
  const [mounted, setMounted] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex(Math.floor(Math.random() * STATUSES.length));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = () => {
    downloadResumePdf(resume);
  };

  return (
    <section
      id="top"
      className="hero-section relative flex min-h-screen items-center overflow-hidden pt-16"
      aria-label="Introduction"
    >
      {/* Animated gradient mesh background — CSS scroll-driven animations */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="hero-orb-1 absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-400/20 via-brand-500/10 to-accent-400/15 blur-[100px] dark:from-brand-500/25 dark:via-brand-600/15 dark:to-accent-500/20" />
        <div className="hero-orb-2 absolute -right-20 bottom-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-tl from-accent-400/15 via-brand-300/10 to-transparent blur-[80px] dark:from-accent-500/20 dark:via-brand-400/10" />
        <div className="absolute -left-32 top-1/3 h-[300px] w-[300px] rounded-full bg-brand-300/10 blur-[60px] dark:bg-brand-400/15" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:bg-grid-pattern-dark dark:opacity-30" style={{ backgroundSize: '80px 80px' }} />
      </div>

      <div className="hero-text section-container w-full">
        <div className="max-w-3xl">
          <motion.div variants={staggerContainer} initial="initial" animate={mounted ? 'animate' : 'initial'}>
            {/* Status pill */}
            <motion.div variants={staggerItem}>
              <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-slate-200/60 bg-white/70 px-4 py-1.5 font-mono text-xs font-medium text-slate-600 shadow-sm backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-900/60 dark:text-slate-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75 dark:bg-brand-300" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500 dark:bg-brand-400" />
                </span>
                <span key={statusIndex} className="inline-block animate-status-fade">
                  {STATUSES[statusIndex]}
                </span>
              </p>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={staggerItem}
              className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
            >
              {name}
            </motion.h1>

            {/* Title with gradient */}
            <motion.p
              variants={staggerItem}
              className="mt-5 text-xl font-semibold sm:text-2xl lg:text-3xl"
            >
              <span className="gradient-text">{title}</span>
            </motion.p>

            {/* Summary */}
            {summary && (
              <motion.p
                variants={staggerItem}
                className="mt-7 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg"
              >
                {summary}
              </motion.p>
            )}

            {/* CTAs */}
            <motion.div variants={staggerItem} className="mt-10 flex flex-wrap items-center gap-4">
              <motion.a
                href="#projects"
                {...buttonHoverSolid}
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25"
              >
                View Projects
                <ArrowDown size={16} className="transition-transform duration-300 ease-out group-hover:translate-y-0.5" aria-hidden="true" />
              </motion.a>

              <motion.button
                type="button"
                onClick={handleDownload}
                {...buttonHover}
                className="group inline-flex items-center gap-2.5 rounded-xl border border-slate-300/60 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-200"
              >
                <Download size={16} className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5" aria-hidden="true" />
                Download Resume
              </motion.button>

              <div className="flex items-center gap-2.5">
                {contact.email && (
                  <motion.a
                    href={`mailto:${contact.email}`}
                    aria-label="Send email"
                    {...iconPop}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300/60 bg-white/80 text-slate-600 shadow-sm backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-300"
                  >
                    <Mail size={18} aria-hidden="true" />
                  </motion.a>
                )}
                {contact.linkedin && (
                  <motion.a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    {...iconPop}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300/60 bg-white/80 text-slate-600 shadow-sm backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-300"
                  >
                    <Linkedin size={18} aria-hidden="true" />
                  </motion.a>
                )}
                {contact.github && (
                  <motion.a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    {...iconPop}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-300/60 bg-white/80 text-slate-600 shadow-sm backdrop-blur-sm dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-300"
                  >
                    <Github size={18} aria-hidden="true" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
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
}
