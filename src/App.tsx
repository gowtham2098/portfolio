import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useResume } from "@/hooks/useResume";
import { useTheme } from "@/hooks/useTheme";

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
        <Experience experience={resume.experience} />
        <Projects projects={resume.projects} />
        <Certifications certifications={resume.certifications} />
        <Education education={resume.education} />
        <Contact contact={resume.contact} name={resume.name} />
      </main>

      <Footer name={resume.name} contact={resume.contact} />
    </div>
  );
}

export default App;
