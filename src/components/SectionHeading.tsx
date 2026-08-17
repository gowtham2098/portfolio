import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: SectionHeadingProps) {
  return (
    <div id={id} className="mb-14 max-w-2xl scroll-mt-24">
      <p className="mb-4 font-mono text-sm font-semibold tracking-wider text-brand-600 dark:text-brand-400">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
