import type { SkillGroup } from "@/types/resume";
import { SectionHeading } from "./SectionHeading";
import { SectionBackdrop } from "./SectionBackdrop";
import { Reveal } from "./Reveal";

interface SkillsProps {
  skills: SkillGroup[];
}

export function Skills({ skills }: SkillsProps) {
  if (skills.length === 0) return null;

  return (
    <section
      id="skills"
      className="section-padding relative isolate overflow-hidden"
    >
      <SectionBackdrop variant="dots" />
      <div className="section-container">
        <Reveal>
          <SectionHeading
            eyebrow="02 / Skills"
            title="Technical toolkit"
            description="The technologies and tools I use to build modern web applications."
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, index) => (
            <Reveal key={group.category} delay={index * 70}>
              <SkillCard group={group} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ group, index }: { group: SkillGroup; index: number }) {
  const gradients = [
    "from-brand-500/5 to-accent-500/5 dark:from-brand-500/8 dark:to-accent-500/6",
    "from-accent-500/5 to-brand-500/5 dark:from-accent-500/8 dark:to-brand-500/6",
    "from-brand-400/5 to-brand-600/5 dark:from-brand-400/8 dark:to-brand-600/6",
  ];

  return (
    <div
      className={`group relative h-full overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br p-6 backdrop-blur-sm transition-transform duration-300 ease-out hover:-translate-y-1.5 dark:border-slate-800/60 ${gradients[index % gradients.length]}`}
    >
      {/* Top gradient accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
        {group.category}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li key={item} className="tag-glow">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
