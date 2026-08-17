import { useMemo } from "react";
import { parseResume } from "@/utils/markdownParser";
import type { ResumeData } from "@/types/resume";
// Vite handles ?raw imports and triggers HMR when the file changes.
import resumeRaw from "../data/resume.md?raw";

export const rawResumeMarkdown: string = resumeRaw;

export function useResume(): ResumeData {
  return useMemo(() => parseResume(resumeRaw), []);
}
