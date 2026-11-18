import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import type { ProjectEntry } from "@/types/resume";
import { SectionHeading } from "./SectionHeading";
import { SectionBackdrop } from "./SectionBackdrop";
import { Reveal } from "./Reveal";

interface ProjectsProps {
  projects: ProjectEntry[];
}

export function Projects({ projects }: ProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section
      id="projects"
      className="section-padding relative isolate overflow-hidden"
    >
      <SectionBackdrop variant="beam" tint />

      <div className="section-container">
        <Reveal>
          <SectionHeading
            eyebrow="04 / Projects"
            title="Featured work"
            description="Selected projects I've contributed to across healthcare, CRM, and HRMS domains."
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.name} delay={index * 90}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: ProjectEntry }) {
  const { name, description, technologies, liveUrl, githubUrl, highlights } =
    project;
  const hasLinks = Boolean(liveUrl || githubUrl);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-7 backdrop-blur-sm transition-transform duration-300 ease-out hover:-translate-y-1 dark:border-slate-800/60 dark:bg-slate-900/40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {name}
        </h3>
        {hasLinks && (
          <div className="flex flex-shrink-0 items-center gap-1.5">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${name} live site`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-all duration-300 hover:bg-brand-50 hover:text-brand-600 hover:shadow-sm dark:hover:bg-brand-950/30 dark:hover:text-brand-400"
              >
                <ExternalLink
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${name} source on GitHub`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-all duration-300 hover:bg-brand-50 hover:text-brand-600 hover:shadow-sm dark:hover:bg-brand-950/30 dark:hover:text-brand-400"
              >
                <Github
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
              </a>
            )}
          </div>
        )}
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {description}
      </p>

      {highlights && highlights.length > 0 && (
        <ul className="mt-4 space-y-2">
          {highlights.map((highlight, i) => (
            <li
              key={i}
              className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-400"
            >
              <ArrowUpRight
                size={15}
                className="mt-0.5 flex-shrink-0 text-brand-500"
                aria-hidden="true"
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      {technologies.length > 0 && (
        <ul
          className="mt-6 flex flex-wrap gap-2"
          aria-label="Project technologies"
        >
          {technologies.map((tech) => (
            <li key={tech} className="tag-glow font-mono">
              {tech}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
