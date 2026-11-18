import { Award } from "lucide-react";
import type { CertificationEntry } from "@/types/resume";
import { SectionHeading } from "./SectionHeading";
import { SectionBackdrop } from "./SectionBackdrop";
import { Reveal } from "./Reveal";

interface CertificationsProps {
  certifications: CertificationEntry[];
}

export function Certifications({ certifications }: CertificationsProps) {
  if (certifications.length === 0) return null;

  return (
    <section
      id="certifications"
      className="section-padding relative isolate overflow-hidden"
    >
      <SectionBackdrop variant="aurora" />
      <div className="section-container">
        <Reveal>
          <SectionHeading
            eyebrow="05 / Certifications"
            title="Certifications"
            description="Professional certifications and credentials."
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <Reveal key={cert.name} delay={index * 70}>
              <CertificationCard cert={cert} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificationCard({ cert }: { cert: CertificationEntry }) {
  const { name, issuer, year, description } = cert;
  return (
    <article className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand-200/60 hover:shadow-xl dark:border-slate-800/60 dark:bg-slate-900/40 dark:hover:border-brand-800/40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-100 dark:bg-brand-950/30 dark:text-brand-400 dark:group-hover:bg-brand-900/30">
        <Award size={18} aria-hidden="true" />
      </div>
      <h3 className="text-base font-bold text-slate-900 dark:text-white">
        {name}
      </h3>
      <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
        {issuer}
        {year && (
          <span className="ml-2 font-mono text-xs text-slate-400">
            · {year}
          </span>
        )}
      </p>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
    </article>
  );
}
