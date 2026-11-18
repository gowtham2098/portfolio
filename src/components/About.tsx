import { Briefcase, GraduationCap, MapPin, Mail } from "lucide-react";
import type { ResumeData } from "@/types/resume";
import { SectionHeading } from "./SectionHeading";
import { SectionBackdrop } from "./SectionBackdrop";
import { Reveal } from "./Reveal";

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
      className="section-padding relative isolate overflow-hidden"
    >
      <SectionBackdrop variant="mesh" tint />
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
            <div className="grid grid-cols-2 gap-3">
              {facts.map(({ icon: Icon, label, value, href }, i) => (
                <Reveal key={label} delay={i * 70}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-5 backdrop-blur-sm transition-transform duration-300 ease-out hover:-translate-y-1 dark:border-slate-800/60 dark:bg-slate-900/40">
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
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
