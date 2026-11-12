import { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useResume } from "@/hooks/useResume";
import { useTheme } from "@/hooks/useTheme";

const Experience = lazy(() =>
  import("@/components/Experience").then((m) => ({ default: m.Experience })),
);
const Projects = lazy(() =>
  import("@/components/Projects").then((m) => ({ default: m.Projects })),
);
const Certifications = lazy(() =>
  import("@/components/Certifications").then((m) => ({
    default: m.Certifications,
  })),
);
const Education = lazy(() =>
  import("@/components/Education").then((m) => ({ default: m.Education })),
);

function SectionFallback() {
  return <div className="section-padding" />;
}

function App() {
  const resume = useResume();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white text-slate-700 dark:bg-slate-950 dark:text-slate-300">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        name={resume.name}
        resume={resume}
      />

      <main id="main">
        <Hero resume={resume} />
        <About resume={resume} />
        <Skills skills={resume.skills} />
        <Suspense fallback={<SectionFallback />}>
          <Experience experience={resume.experience} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects projects={resume.projects} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Certifications certifications={resume.certifications} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Education education={resume.education} />
        </Suspense>
        <Contact contact={resume.contact} name={resume.name} />
      </main>

      <Footer name={resume.name} contact={resume.contact} />
    </div>
  );
}

export default App;
