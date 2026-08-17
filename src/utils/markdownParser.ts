import type {
  ResumeData,
  SkillGroup,
  ExperienceEntry,
  ProjectEntry,
  EducationEntry,
  CertificationEntry,
  ContactInfo,
} from "@/types/resume";

interface Section {
  name: string;
  lines: string[];
}

function splitSections(markdown: string): Section[] {
  const lines = markdown.split("\n");
  const sections: Section[] = [];
  let current: Section = { name: "", lines: [] };

  for (const raw of lines) {
    const line = raw.replace(/\r$/, "");
    const headingMatch = line.match(/^##\s+(.+)$/);
    if (headingMatch) {
      if (current.name) sections.push(current);
      current = { name: headingMatch[1].trim(), lines: [] };
    } else if (line.startsWith("# ") && !current.name) {
      current = { name: "TITLE", lines: [line.slice(2).trim()] };
    } else {
      current.lines.push(line);
    }
  }
  if (current.name) sections.push(current);
  return sections;
}

function inlineClean(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/_(.+?)_/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .trim();
}

function stripComments(text: string): string {
  return text.replace(/<!--[\s\S]*?-->/g, "");
}

function parseTitleSection(lines: string[]): {
  name: string;
  title: string;
  summary: string;
  contact: ContactInfo;
} {
  const cleanLines = lines.map((l) => l.trim()).filter(Boolean);
  const name = inlineClean(cleanLines[0] || "Your Name");

  // Title line: may be italic in markdown, e.g. *Software Engineer...*
  const titleRaw = cleanLines[1] || "";
  const title = inlineClean(titleRaw);

  const contactRaw = cleanLines[2] || "";
  const contact = parseContactLine(contactRaw);

  return { name, title, summary: "", contact };
}

function parseContactLine(line: string): ContactInfo {
  const parts = line
    .split("·")
    .map((p) => p.trim())
    .filter(Boolean);
  let email = "";
  let phone = "";
  let location = "";
  let linkedin = "";
  let github = "";

  for (const part of parts) {
    if (part.match(/^[\w.+-]+@[\w-]+\.[\w.-]+$/)) email = part;
    else if (/^\+?[\d\s()-]+$/.test(part) && part.length < 25) phone = part;
    else if (/linkedin/i.test(part)) {
      const match = part.match(/(linkedin\.com\/[^\s|]+)/i);
      linkedin = match ? normalizeUrl(match[1]) : "";
    } else if (/github/i.test(part)) {
      const match = part.match(/(github\.com\/[^\s|]+)/i);
      github = match ? normalizeUrl(match[1]) : "";
    } else if (!location) {
      location = part;
    }
  }

  return { email, phone, location, linkedin, github };
}

function parseContactSection(lines: string[]): ContactInfo {
  const result: ContactInfo = {
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  };
  for (const raw of lines) {
    const line = raw.trim();
    const match = line.match(/^-\s*(\w+):\s*(.+)$/);
    if (!match) continue;
    const key = match[1].toLowerCase();
    const value = match[2].trim();
    if (key === "email") result.email = value;
    else if (key === "phone") result.phone = value;
    else if (key === "location") result.location = value;
    else if (key === "linkedin") result.linkedin = normalizeUrl(value);
    else if (key === "github") result.github = normalizeUrl(value);
  }
  return result;
}

function normalizeUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `https://${path}`;
}

function parseSummary(lines: string[]): string {
  return inlineClean(lines.filter((l) => l.trim()).join(" "));
}

function parseSkills(lines: string[]): SkillGroup[] {
  const groups: SkillGroup[] = [];
  let current: SkillGroup | null = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      if (current && current.items.length) groups.push(current);
      current = { category: h3[1].trim(), items: [] };
      continue;
    }

    if (current) {
      // Items may be comma-separated on one line
      const parts = line
        .split(",")
        .map((p) => inlineClean(p))
        .filter(Boolean);
      current.items.push(...parts);
    }
  }
  if (current && current.items.length) groups.push(current);
  return groups;
}

function parseExperience(lines: string[]): ExperienceEntry[] {
  const entries: ExperienceEntry[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    const h3 = line.match(/^###\s+(.+)$/);
    if (!h3) {
      i++;
      continue;
    }

    const role = inlineClean(h3[1]);
    i++;
    let company = "";
    let duration = "";

    // Skip blank lines, then parse company and duration
    while (i < lines.length && !lines[i].trim()) i++;

    if (i < lines.length) {
      const companyLine = inlineClean(lines[i].trim());
      if (companyLine) {
        const parts = companyLine.split("·").map((p) => p.trim());
        company = parts[0] || "";
        i++;
      }
    }

    while (i < lines.length && !lines[i].trim()) i++;

    if (i < lines.length) {
      const durationLine = lines[i].trim();
      if (
        durationLine.startsWith("*") ||
        durationLine.startsWith("_") ||
        durationLine.match(/\d{4}/)
      ) {
        duration = inlineClean(durationLine);
        i++;
      }
    }

    // Collect responsibilities and technologies
    const responsibilities: string[] = [];
    let technologies: string[] = [];
    while (i < lines.length) {
      const l = lines[i].trim();
      if (!l) {
        i++;
        continue;
      }
      if (l.startsWith("### ")) break;
      if (l.startsWith("- ") || l.startsWith("* ")) {
        responsibilities.push(inlineClean(l.slice(2)));
        i++;
      } else if (l.toLowerCase().startsWith("**technologies:**")) {
        const techStr = l.replace(/^\*\*technologies:\*\*/i, "").trim();
        technologies = techStr
          .split(",")
          .map((t) => inlineClean(t))
          .filter(Boolean);
        i++;
      } else {
        i++;
      }
    }

    entries.push({ role, company, duration, responsibilities, technologies });
  }
  return entries;
}

function parseProjects(lines: string[]): ProjectEntry[] {
  const cleanLines = lines.filter((l) => !/^\s*$/.test(l));
  const entries: ProjectEntry[] = [];
  let i = 0;
  while (i < cleanLines.length) {
    const line = cleanLines[i].trim();
    const h3 = line.match(/^###\s+(.+)$/);
    if (!h3) {
      i++;
      continue;
    }

    const name = inlineClean(h3[1]);
    i++;
    let description = "";
    let technologies: string[] = [];
    let liveUrl: string | undefined;
    let githubUrl: string | undefined;
    let image: string | undefined;
    const highlights: string[] = [];

    if (i < cleanLines.length) {
      description = inlineClean(cleanLines[i].trim());
      i++;
    }

    while (i < cleanLines.length) {
      const l = cleanLines[i].trim();
      if (l.startsWith("### ")) break;
      if (l.toLowerCase().startsWith("**technologies:**")) {
        const techStr = l.replace(/^\*\*technologies:\*\*/i, "").trim();
        technologies = techStr
          .split(",")
          .map((t) => inlineClean(t))
          .filter(Boolean);
        i++;
      } else if (l.toLowerCase().startsWith("**live:**")) {
        liveUrl = normalizeUrl(l.replace(/^\*\*live:\*\*/i, "").trim());
        i++;
      } else if (l.toLowerCase().startsWith("**github:**")) {
        githubUrl = normalizeUrl(l.replace(/^\*\*github:\*\*/i, "").trim());
        i++;
      } else if (l.toLowerCase().startsWith("**image:**")) {
        image = l.replace(/^\*\*image:\*\*/i, "").trim();
        i++;
      } else if (l.startsWith("- ") || l.startsWith("* ")) {
        highlights.push(inlineClean(l.slice(2)));
        i++;
      } else {
        i++;
      }
    }

    entries.push({
      name,
      description,
      technologies,
      liveUrl,
      githubUrl,
      image,
      highlights,
    });
  }
  return entries;
}

function parseEducation(lines: string[]): EducationEntry[] {
  const entries: EducationEntry[] = [];
  let i = 0;
  const cleanLines = lines.filter((l) => !/^\s*$/.test(l));
  while (i < cleanLines.length) {
    const line = cleanLines[i].trim();
    const h3 = line.match(/^###\s+(.+)$/);
    if (!h3) {
      i++;
      continue;
    }
    const degree = inlineClean(h3[1]);
    i++;
    let institution = "";
    let year = "";
    if (i < cleanLines.length) {
      const instLine = cleanLines[i].trim();
      if (
        instLine &&
        !instLine.startsWith("### ") &&
        !instLine.match(/^\*\d{4}\*$/)
      ) {
        institution = inlineClean(instLine);
        i++;
      }
    }
    if (i < cleanLines.length) {
      const yearLine = cleanLines[i].trim();
      const yearMatch = yearLine.match(/^\*?(\d{4})\*?$/);
      if (yearMatch) {
        year = yearMatch[1];
        i++;
      }
    }
    entries.push({ degree, institution, year });
  }
  return entries;
}

function parseCertifications(lines: string[]): CertificationEntry[] {
  const cleanLines = lines.filter(
    (l) =>
      !/^\s*$/.test(l) && !/^<!--/.test(l.trim()) && !/^_\(/.test(l.trim()),
  );
  const entries: CertificationEntry[] = [];
  let i = 0;
  while (i < cleanLines.length) {
    const line = cleanLines[i].trim();
    const h3 = line.match(/^###\s+(.+)$/);
    if (!h3) {
      i++;
      continue;
    }
    const name = inlineClean(h3[1]);
    i++;
    let issuer = "";
    let year = "";
    let description = "";
    if (i < cleanLines.length) {
      const issuerLine = cleanLines[i].trim();
      if (
        issuerLine &&
        !issuerLine.startsWith("### ") &&
        !issuerLine.match(/^\*\d{4}\*$/)
      ) {
        issuer = inlineClean(issuerLine);
        i++;
      }
    }
    if (i < cleanLines.length) {
      const yearLine = cleanLines[i].trim();
      const yearMatch = yearLine.match(/^\*?(\d{4})\*?$/);
      if (yearMatch) {
        year = yearMatch[1];
        i++;
      }
    }
    if (i < cleanLines.length) {
      const descLine = cleanLines[i].trim();
      if (descLine && !descLine.startsWith("### ")) {
        description = inlineClean(descLine);
        i++;
      }
    }
    entries.push({ name, issuer, year, description });
  }
  return entries;
}

function parseLanguages(lines: string[]): string[] {
  const text = lines.filter((l) => l.trim()).join(" ");
  return text
    .split("·")
    .map((l) => inlineClean(l))
    .filter(Boolean);
}

export function parseResume(markdown: string): ResumeData {
  const cleaned = stripComments(markdown);
  const sections = splitSections(cleaned);

  const titleSection = sections.find((s) => s.name === "TITLE");
  const summarySection = sections.find((s) =>
    s.name.toLowerCase().includes("summary"),
  );
  const contactSection = sections.find(
    (s) => s.name.toLowerCase() === "contact",
  );
  const skillsSection = sections.find((s) =>
    s.name.toLowerCase().includes("skill"),
  );
  const experienceSection = sections.find((s) =>
    s.name.toLowerCase().includes("experience"),
  );
  const projectsSection = sections.find(
    (s) =>
      s.name.toLowerCase().includes("project") &&
      !s.name.toLowerCase().includes("certification"),
  );
  const certificationsSection = sections.find((s) =>
    s.name.toLowerCase().includes("certification"),
  );
  const educationSection = sections.find((s) =>
    s.name.toLowerCase().includes("education"),
  );
  const languagesSection = sections.find((s) =>
    s.name.toLowerCase().includes("language"),
  );

  const parsedTitle = titleSection
    ? parseTitleSection(titleSection.lines)
    : {
        name: "",
        title: "",
        summary: "",
        contact: {
          email: "",
          phone: "",
          location: "",
          linkedin: "",
          github: "",
        },
      };
  const summary = summarySection ? parseSummary(summarySection.lines) : "";
  const explicitContact = contactSection
    ? parseContactSection(contactSection.lines)
    : null;
  const contact =
    explicitContact && (explicitContact.email || explicitContact.linkedin)
      ? { ...parsedTitle.contact, ...explicitContact }
      : parsedTitle.contact;

  return {
    name: parsedTitle.name,
    title: parsedTitle.title,
    summary,
    contact,
    skills: skillsSection ? parseSkills(skillsSection.lines) : [],
    experience: experienceSection
      ? parseExperience(experienceSection.lines)
      : [],
    projects: projectsSection ? parseProjects(projectsSection.lines) : [],
    certifications: certificationsSection
      ? parseCertifications(certificationsSection.lines)
      : [],
    education: educationSection ? parseEducation(educationSection.lines) : [],
    languages: languagesSection ? parseLanguages(languagesSection.lines) : [],
  };
}
