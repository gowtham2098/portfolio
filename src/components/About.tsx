import { Briefcase, GraduationCap, MapPin, Mail } from "lucide-react";
import type { ResumeData } from "@/types/resume";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem, cardHover } from "@/utils/cn";

interface AboutProps {
  resume: ResumeData;
}

export function About({ resume }: AboutProps) {
  const { summary, contact, experience, languages } = resume;
  const yearsExperience = experience.length > 0 ? "4+ years" : "Frontend";

  const facts = [
    { icon: Briefcase, label: "Experience", value: yearsExperience },
    { icon: MapPin, label: "Location", value: contact.location || "India" },
    { icon: GraduationCap, label: "Focus", value: "React · TypeScript" },
    {
      icon: Mail,
      label: "Email",
      value: contact.email || "—",
      href: contact.email ? `mailto:${contact.email}` : undefined,
    },
  ];

  return (
    <section
      id="about"
      className="section-padding section-bg-mesh relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-brand-400/5 blur-[80px] dark:bg-brand-500/8"
      />
      <div className="section-container">
        <Reveal>
          <SectionHeading
            eyebrow="01 / About"
            title="A bit about me"
            description="Frontend Developer focused on building accessible, performant web applications with React.js and TypeScript."
          />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-3">
          <Reveal className="lg:col-span-2" delay={100}>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              {summary}
            </p>

            {languages.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-sm text-slate-500 dark:text-slate-400">
                  Languages:
                </span>
                {languages.map((lang) => (
                  <span key={lang} className="tag-glow">
                    {lang}
                  </span>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal delay={200} variant="slide-right">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 gap-3"
            >
              {facts.map(({ icon: Icon, label, value, href }) => (
                <motion.div
                  key={label}
                  variants={staggerItem}
                  {...cardHover}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-5 backdrop-blur-sm dark:border-slate-800/60 dark:bg-slate-900/40"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-100 dark:bg-brand-950/30 dark:text-brand-400 dark:group-hover:bg-brand-900/30">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold break-words text-slate-900 dark:text-white">
                    {href ? (
                      <a
                        href={href}
                        className="transition-colors duration-300 hover:text-brand-600 dark:hover:text-brand-400"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </motion.div>
              ))}
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
