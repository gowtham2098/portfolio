import type { ResumeData } from "@/types/resume";

export function downloadTextFile(
  content: string,
  filename: string,
  mimeType = "text/plain",
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function downloadResumePdf(
  resume: ResumeData,
  filename = "Goutham_S_Resume.pdf",
): Promise<void> {
  const [{ pdf }, { ResumePdfDocument }] = await Promise.all([
    import("@react-pdf/renderer"),
    import("@/components/ResumePdf"),
  ]);
  const blob = await pdf(<ResumePdfDocument resume={resume} />).toBlob();
  downloadBlob(blob, filename);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
