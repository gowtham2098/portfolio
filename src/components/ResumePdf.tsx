import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type {
  ResumeData,
  ExperienceEntry,
  ProjectEntry,
  EducationEntry,
  CertificationEntry,
  SkillGroup,
} from "@/types/resume";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1e293b",
  },
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 12,
    color: "#2563eb",
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 16,
    fontSize: 9,
    color: "#475569",
  },
  contactItem: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#2563eb",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 4,
    marginTop: 14,
    marginBottom: 8,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.6,
    color: "#334155",
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillGroup: {
    width: "48%",
    marginBottom: 6,
  },
  skillCategory: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  skillItems: {
    fontSize: 9,
    color: "#475569",
  },
  entry: {
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  entryRole: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  entryDuration: {
    fontSize: 9,
    color: "#64748b",
    fontFamily: "Helvetica-Oblique",
  },
  entryCompany: {
    fontSize: 10,
    color: "#2563eb",
    marginBottom: 4,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 3,
    paddingLeft: 12,
  },
  bulletDot: {
    width: 4,
    fontSize: 10,
    color: "#2563eb",
    marginRight: 6,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.5,
    color: "#334155",
  },
  techRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    gap: 4,
  },
  techTag: {
    fontSize: 8,
    color: "#2563eb",
    backgroundColor: "#eff6ff",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 2,
  },
  projectDesc: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#475569",
    marginTop: 2,
  },
  eduEntry: {
    marginBottom: 8,
  },
  eduDegree: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  eduInstitution: {
    fontSize: 9,
    color: "#475569",
  },
  eduYear: {
    fontSize: 9,
    color: "#64748b",
    fontFamily: "Helvetica-Oblique",
  },
  certEntry: {
    marginBottom: 6,
  },
  certName: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  certIssuer: {
    fontSize: 9,
    color: "#475569",
  },
  certYear: {
    fontSize: 9,
    color: "#64748b",
  },
  certDesc: {
    fontSize: 9,
    color: "#475569",
    marginTop: 2,
  },
  langRow: {
    flexDirection: "row",
    gap: 8,
  },
  langItem: {
    fontSize: 9,
    color: "#334155",
  },
});

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function ExperienceEntryView({ entry }: { entry: ExperienceEntry }) {
  return (
    <View style={styles.entry}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryRole}>{entry.role}</Text>
        {entry.duration && (
          <Text style={styles.entryDuration}>{entry.duration}</Text>
        )}
      </View>
      {entry.company && (
        <Text style={styles.entryCompany}>{entry.company}</Text>
      )}
      {entry.responsibilities.map((item, i) => (
        <View key={i} style={styles.bullet}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
      {entry.technologies.length > 0 && (
        <View style={styles.techRow}>
          {entry.technologies.map((tech) => (
            <Text key={tech} style={styles.techTag}>
              {tech}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

function ProjectEntryView({ entry }: { entry: ProjectEntry }) {
  return (
    <View style={styles.entry}>
      <Text style={styles.entryRole}>{entry.name}</Text>
      <Text style={styles.projectDesc}>{entry.description}</Text>
      {entry.technologies.length > 0 && (
        <View style={styles.techRow}>
          {entry.technologies.map((tech) => (
            <Text key={tech} style={styles.techTag}>
              {tech}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

function EducationEntryView({ entry }: { entry: EducationEntry }) {
  return (
    <View style={styles.eduEntry}>
      <Text style={styles.eduDegree}>{entry.degree}</Text>
      {entry.institution && (
        <Text style={styles.eduInstitution}>{entry.institution}</Text>
      )}
      {entry.year && <Text style={styles.eduYear}>{entry.year}</Text>}
    </View>
  );
}

function CertificationEntryView({ entry }: { entry: CertificationEntry }) {
  return (
    <View style={styles.certEntry}>
      <Text style={styles.certName}>{entry.name}</Text>
      <View style={{ flexDirection: "row", gap: 6 }}>
        {entry.issuer && <Text style={styles.certIssuer}>{entry.issuer}</Text>}
        {entry.year && <Text style={styles.certYear}>{entry.year}</Text>}
      </View>
      {entry.description && (
        <Text style={styles.certDesc}>{entry.description}</Text>
      )}
    </View>
  );
}

function SkillGroupView({ group }: { group: SkillGroup }) {
  return (
    <View style={styles.skillGroup}>
      <Text style={styles.skillCategory}>{group.category}</Text>
      <Text style={styles.skillItems}>{group.items.join(", ")}</Text>
    </View>
  );
}

export function ResumePdfDocument({ resume }: { resume: ResumeData }) {
  const {
    name,
    title,
    contact,
    summary,
    skills,
    experience,
    projects,
    certifications,
    education,
    languages,
  } = resume;

  const contactParts: string[] = [];
  if (contact.email) contactParts.push(contact.email);
  if (contact.phone) contactParts.push(contact.phone);
  if (contact.location) contactParts.push(contact.location);
  if (contact.linkedin) contactParts.push(contact.linkedin);
  if (contact.github) contactParts.push(contact.github);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.contactRow}>
          {contactParts.map((part) => (
            <Text key={part} style={styles.contactItem}>
              {part}
            </Text>
          ))}
        </View>

        {summary && (
          <Section title="Summary">
            <Text style={styles.summary}>{summary}</Text>
          </Section>
        )}

        {skills.length > 0 && (
          <Section title="Skills">
            <View style={styles.skillsGrid}>
              {skills.map((group) => (
                <SkillGroupView key={group.category} group={group} />
              ))}
            </View>
          </Section>
        )}

        {experience.length > 0 && (
          <Section title="Experience">
            {experience.map((entry, i) => (
              <ExperienceEntryView key={i} entry={entry} />
            ))}
          </Section>
        )}

        {projects.length > 0 && (
          <Section title="Projects">
            {projects.map((entry, i) => (
              <ProjectEntryView key={i} entry={entry} />
            ))}
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education">
            {education.map((entry, i) => (
              <EducationEntryView key={i} entry={entry} />
            ))}
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title="Certifications">
            {certifications.map((entry, i) => (
              <CertificationEntryView key={i} entry={entry} />
            ))}
          </Section>
        )}

        {languages.length > 0 && (
          <Section title="Languages">
            <View style={styles.langRow}>
              {languages.map((lang) => (
                <Text key={lang} style={styles.langItem}>
                  {lang}
                </Text>
              ))}
            </View>
          </Section>
        )}
      </Page>
    </Document>
  );
}
