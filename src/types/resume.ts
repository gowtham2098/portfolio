export interface SocialLink {
  label: string;
  url: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface ExperienceEntry {
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
  technologies: string[];
}

export interface ProjectEntry {
  name: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  highlights?: string[];
}

export interface CertificationEntry {
  name: string;
  issuer: string;
  year: string;
  description?: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  year: string;
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  contact: ContactInfo;
  skills: SkillGroup[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  education: EducationEntry[];
  languages: string[];
}
