# Portfolio

This is a personal portfolio site built with Next.js (App Router). It’s a single-page layout with a 3D hero scene (Three.js) and smooth animations (Framer Motion), all styled with Tailwind CSS. The page is split into clear sections: **Hero**, **About**, **Skills**, **Experience**, **Projects**, and **Contact**.

## What’s inside

The homepage is assembled in `app/page.tsx` using these components:

- `components/navigation.tsx` - top navigation + theme toggle
- `components/hero-section.tsx` (+ `components/hero-scene.tsx`) - hero + 3D scene
- `components/about-section.tsx` - about section (motion + illustration)
- `components/skills-section.tsx` - skills cards + the skills route/arrow overlay
- `components/experience-section.tsx` - experience section with tabs
- `components/projects-section.tsx` - featured project cards (images from `public/`)
- `components/contact-section.tsx` - contact CTA (email links)
- `components/footer.tsx` - footer

## Run it locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

Then open: `http://localhost:3000`

## Build for production

```bash
npm run build
npm run start
```

## Tech used

- Next.js + React + TypeScript
- Tailwind CSS (from `app/globals.css`)
- Framer Motion (scroll/hover animations)
- `next-themes` (light/dark mode)
- Three.js (`@react-three/fiber`, `@react-three/drei`)
- Icons: `lucide-react`

## Styling, theme, and fonts

- Light/dark theme tokens live in `app/globals.css` (`:root` for light, `.dark` for dark).
- The theme toggle is wired up in `app/layout.tsx` using `next-themes`.
- Fonts are loaded with `next/font/google` (including `Cedarville Cursive` for the navbar name).

## Assets

Most images live in `public/` and are referenced directly by components (for example, project thumbnails in `components/projects-section.tsx`).

## License

MIT (edit this if you want a different license).

