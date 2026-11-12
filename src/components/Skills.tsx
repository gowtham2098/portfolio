import type { SkillGroup } from "@/types/resume";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { motion } from "framer-motion";
import { cardHover, staggerContainer, staggerItem } from "@/utils/cn";

interface SkillsProps {
  skills: SkillGroup[];
}

export function Skills({ skills }: SkillsProps) {
  if (skills.length === 0) return null;

  return (
    <section
      id="skills"
      className="section-padding section-bg-dots relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-brand-400/5 blur-[100px] dark:bg-brand-500/8"
      />
      <div className="section-container">
        <Reveal>
          <SectionHeading
            eyebrow="02 / Skills"
            title="Technical toolkit"
            description="The technologies and tools I use to build modern web applications."
          />
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-40px", amount: 0.1 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((group, index) => (
            <motion.div key={group.category} variants={staggerItem}>
              <SkillCard group={group} index={index} />
            </motion.div>
          ))}
        </motion.div>
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
    <motion.div
      {...cardHover}
      className={`group relative h-full overflow-hidden rounded-2xl border border-slate-200/60 bg-gradient-to-br p-6 backdrop-blur-sm dark:border-slate-800/60 ${gradients[index % gradients.length]}`}
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
    </motion.div>
  );
}
