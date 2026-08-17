# Portfolio — Goutham S

A production-quality personal portfolio website for a Frontend Developer, built with **React.js**, **TypeScript**, **Vite**, and **Tailwind CSS**.

The entire portfolio is **data-driven from a single Markdown file** (`src/data/resume.md`). No professional information is hardcoded in components — edit the Markdown, save, and the site updates live during development.

## Features

- **Single source of truth** — all content (name, title, summary, skills, experience, projects, certifications, education, contact, social links) is parsed from `src/data/resume.md`.
- **Live editing during development** — edit `src/data/resume.md`, save, and Vite's HMR updates the UI instantly. No restart, no manual refresh.
- **Custom Markdown parser** — no heavy dependencies; a purpose-built parser extracts structured data from the resume format.
- **Dark / light theme** — system preference detection, persisted to `localStorage`, no theme flash on load.
- **Fully responsive** — mobile-first, tested from 320px up to 1440px+.
- **Accessible** — semantic HTML, keyboard navigation, focus states, skip link, `aria` labels, `prefers-reduced-motion` support.
- **SEO-ready** — title, meta description, Open Graph, Twitter cards, canonical URL, semantic headings.
- **Performant** — minimal dependencies, system fonts with Inter fallback, CSS-only animations, IntersectionObserver reveal-on-scroll.

## Tech Stack

| Area       | Technology                                  |
| ---------- | ------------------------------------------- |
| Framework  | React.js 18                                 |
| Language   | TypeScript                                  |
| Build tool | Vite                                        |
| Styling    | Tailwind CSS                                |
| Icons      | lucide-react                                |
| Content    | Markdown (`src/data/resume.md`)             |
| Versioning | Git / GitHub                                |

**Not used** (by design): Next.js, Gatsby, backend, database, CMS, or UI component libraries.

## Architecture

```
src/
├── components/
│   ├── Navbar.tsx           # Sticky nav, mobile menu, theme toggle, resume download
│   ├── Hero.tsx             # Name, title, summary, CTAs, social links
│   ├── About.tsx            # Summary + quick facts
│   ├── Skills.tsx           # Grouped skill cards (reusable SkillCard)
│   ├── Experience.tsx       # Timeline of roles (reusable ExperienceItem)
│   ├── Projects.tsx         # Project cards (reusable ProjectCard)
│   ├── Certifications.tsx   # Certification cards
│   ├── Education.tsx        # Education cards
│   ├── Contact.tsx          # Contact info + accessible form (mailto)
│   ├── Footer.tsx           # Social links + back-to-top
│   ├── Reveal.tsx           # Scroll-reveal wrapper (IntersectionObserver)
│   ├── SectionHeading.tsx   # Reusable section header
│   └── ThemeToggle.tsx      # Dark/light toggle button
│
├── data/
│   └── resume.md            # SINGLE SOURCE OF TRUTH
│
├── hooks/
│   ├── useResume.ts         # Imports resume.md?raw, parses, memoizes
│   └── useTheme.ts          # Theme state + persistence + system pref
│
├── types/
│   └── resume.ts            # TypeScript interfaces for resume data
│
├── utils/
│   ├── markdownParser.ts    # Custom Markdown → ResumeData parser
│   └── download.ts          # File download + slugify helpers
│
├── App.tsx                  # Composes all sections
├── main.tsx                 # Entry point
└── index.css                # Tailwind + base styles + components
```

### How the data flows

```
src/data/resume.md
      ↓  (Vite ?raw import — HMR on save)
src/hooks/useResume.ts
      ↓  (parseResume)
src/utils/markdownParser.ts
      ↓  (ResumeData)
src/components/*  (consume typed data, render UI)
```

Vite treats `import resumeRaw from '../data/resume.md?raw'` as a static string import. When `resume.md` changes on disk, Vite's HMR re-evaluates the module and React re-renders with the new data — **no server, no backend, no manual refresh**.

## The `resume.md` Workflow

1. Open `src/data/resume.md`.
2. Edit any section — add a project, a new experience entry, a skill group, etc.
3. Save the file.
4. The dev server hot-reloads and the portfolio updates instantly.
5. Run `npm run build` to bake the latest `resume.md` content into the production bundle.

### Adding a new project

Append to the `## Projects` section:

```markdown
### Project Name
Short description of the project.

**Technologies:** React.js, TypeScript, Tailwind CSS
**Live:** https://example.com
**GitHub:** https://github.com/user/repo

- Highlight or key feature
- Another highlight
```

### Adding a new experience entry

Append to the `## Experience` section:

```markdown
### Role Title
**Company · Location**
*Start Date – End Date*

- Responsibility or achievement
- Another responsibility

**Technologies:** React.js, TypeScript, Redux
```

## Local Setup

### Prerequisites

- Node.js 18+
- npm

### Install & run

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Type-check
npm run typecheck

# Production build
npm run build

# Preview the production build
npm run preview
```

## Development

- `npm run dev` — Vite dev server with HMR. Editing `resume.md` live-updates the UI.
- `npm run typecheck` — TypeScript strict-mode type checking.
- `npm run build` — Produces an optimized static bundle in `dist/`. The latest `resume.md` content is embedded at build time.
- `npm run preview` — Serves the production build locally.

## Deployment

The build output in `dist/` is fully static and can be deployed to any static host:

- **Vercel** — import the GitHub repo; framework preset: Vite.
- **Netlify** — build command `npm run build`, publish directory `dist`.
- **GitHub Pages** — push `dist/` contents to a `gh-pages` branch.

Remember to update the canonical URL and Open Graph image in `index.html` to your deployed domain.

## Project Structure Conventions

- **Functional components only** — no class components.
- **Strong typing** — every component receives typed props via interfaces in `src/types/resume.ts`.
- **Reusable components** — `SkillCard`, `ProjectCard`, `ExperienceItem`, `SectionHeading`, `Reveal` are reused across sections.
- **No hardcoded professional info** — components never contain names, companies, or dates; everything comes from `resume.md`.

## License

Personal portfolio. Feel free to reference the architecture for your own portfolio.
