import { useEffect, useState, type CSSProperties } from "react";
import { Download, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { downloadResumePdf } from "@/utils/download";
import { cn } from "@/utils/cn";
import type { ResumeData } from "@/types/resume";

interface NavbarProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  name: string;
  resume: ResumeData;
}

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar({ theme, toggleTheme, name, resume }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const handleDownload = () => {
    downloadResumePdf(resume);
  };
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-slate-200/50 bg-white/70 shadow-lg shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-950/70 dark:shadow-slate-900/20"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        className="section-container flex h-16 items-center justify-between"
        aria-label="Main navigation"
      >
        <a
          href="#top"
          onClick={closeMenu}
          className="flex items-center gap-2.5 font-mono text-sm font-semibold tracking-tight text-slate-900 dark:text-white"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white shadow-md shadow-brand-500/25 transition-shadow duration-300 hover:shadow-lg hover:shadow-brand-500/30">
            {initials || "G"}
          </span>
          <span className="hidden sm:inline">{name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2.5">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            type="button"
            onClick={handleDownload}
            className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition-all duration-300 hover:from-brand-700 hover:to-brand-800 hover:shadow-lg hover:shadow-brand-600/30 hover:-translate-y-0.5 sm:inline-flex"
          >
            <Download size={16} aria-hidden="true" />
            Resume
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/60 bg-white/80 text-slate-600 backdrop-blur-sm transition-all duration-300 hover:bg-slate-100 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-800 md:hidden"
          >
            {menuOpen ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <Menu size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Always mounted so open/close both animate, but visibility:hidden keeps
          the links out of the tab order and accessibility tree while closed. */}
      <div
        id="mobile-menu"
        data-open={menuOpen}
        aria-hidden={!menuOpen}
        className="mobile-menu md:hidden"
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-200/50 bg-white/90 px-5 py-4 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-950/90">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <li key={link.href} style={{ "--i": i } as CSSProperties}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-slate-700 transition-all duration-300 hover:bg-brand-50 hover:text-brand-600 dark:text-slate-200 dark:hover:bg-brand-950/30 dark:hover:text-brand-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                handleDownload();
                closeMenu();
              }}
              style={{ "--i": NAV_LINKS.length } as CSSProperties}
              className="mobile-menu-cta mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-300 hover:from-brand-700 hover:to-brand-800"
            >
              <Download size={16} aria-hidden="true" />
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
