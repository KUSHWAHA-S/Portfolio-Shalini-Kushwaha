# Portfolio

My personal portfolio site — built with Next.js (App Router), Tailwind CSS, Framer Motion, and a small Three.js scene in the hero.

## Live website

You can view it here: `https://portfolio-shalini-kushwaha.vercel.app/`

##👀

Your portfolio should look like **you**, not like “Shalini, but with a different name” 😎.

## Quick start

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Structure (high level)

- **Page composition**: `app/page.tsx`
- **Global styles + theme tokens**: `app/globals.css`
- **Main sections**: `components/*-section.tsx`
- **Static assets**: `public/` (project thumbnails, SVGs)

## Resume download

Drop your resume PDF into `public/` as `resume.pdf`. The navbar “Resume” button links to `/resume.pdf` with the `download` attribute.

## How the project works (developer notes)

- **Routing / page**: This is a single-page layout rendered from `app/page.tsx`, composed of section components (hero, about, skills, experience, projects, contact).
- **Theme**: Light/dark mode is handled with `next-themes`. Color tokens live in `app/globals.css` and the UI uses semantic CSS variables (so the theme swaps without rewriting component styles).
- **Animations**:
  - Framer Motion is used for section reveals and micro-interactions.
  - Heavier visuals are gated to desktop and respect `prefers-reduced-motion`.
- **Performance choices**:
  - Below-the-fold sections are mounted lazily to reduce initial JS work.
  - Images are served through Next’s image optimization (thumbnails live in `public/`).

## Build for production

```bash
npm run build
npm run start
```

## Notes

- **Theme**: Light/dark tokens are in `app/globals.css` (`:root` and `.dark`)
- **Fonts**: Loaded via `next/font/google` in `app/layout.tsx` (logo font: `Mrs Saint Delafield`)

## License

MIT (edit this if you want a different license).

