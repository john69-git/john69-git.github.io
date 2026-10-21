# HAISE — Portfolio of John Jerick Bernardo Barrios

**Between Logic and Imagination.**
A manga-editorial personal portfolio: ink, paper, and crimson, with spider lilies and a centipede that crawls through the whole page.

**Live:** https://john69-git.github.io/

Built with **React 18 · TypeScript · Vite 6 · Tailwind CSS v4 · Motion · Lucide**.

---

## Features

- **Cinematic hero:** pixel-art avatar, a white circle with an ink spider lily seen from above, and a large coiled ink centipede with deep shading and a cast shadow.
- **One centipede through the whole page:** it crawls back and forth underneath the content, slips under chapter titles, and ends with its head in the Contact section.
- **Chapters:** About, Interests, Skills, Projects, Journey, Contact, laid out like manga panels.
- **Honest skills:** levels are *Exploring / Learning / Building with* (no percentages), with official logos and a level filter.
- **Project case files:** cards open into detailed pop-ups (← / → to flip between projects).
- **Spider lily fields:** red and white lilies in "Currently learning" and along the bottom of Contact.
- **Themes:** Void (dark) and Paper (light), remembered per visitor.
- **Signboard logo:** crimson ハイセ plaque, also used as the browser-tab icon.
- **Accessibility:** keyboard-friendly, skip link, focus styles, and reduced-motion support.
- **Optional ambient soundtrack:** generated live in the browser, currently turned off.

All illustrations (centipedes, spider lilies, project covers, interest drawings) are original and drawn in code.

---

## Run it locally

You need **Node.js 20 or newer** (https://nodejs.org, LTS version).

Open a terminal **in the folder that contains `package.json`**, then run:

```bash
npm install      # first time only (or after moving the folder)
npm run dev      # start the dev server → http://localhost:5173/
```

| Command             | What it does                                         |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Start the local dev server (live reload)             |
| `npm run build`     | Type-check and build the final site into `dist/`     |
| `npm run preview`   | Preview the built `dist/` folder                     |
| `npm run typecheck` | Only check TypeScript                                |

---

## Editing content

All personal content lives in **`src/data/`**. You never need to touch the components to update the site.

| File                    | What's inside                                                                 |
| ----------------------- | ----------------------------------------------------------------------------- |
| `src/data/profile.ts`   | Name, hero text, photos, About story, quote, Currently Learning, contact links, feature switches |
| `src/data/interests.ts` | Interest cards                                                                |
| `src/data/skills.ts`    | Skill groups, honest levels, and logos                                        |
| `src/data/projects.ts`  | Project case files (cards and pop-ups)                                        |
| `src/data/journey.ts`   | Journey timeline and future goals                                             |

Empty fields (`''` or `[]`) are simply hidden on the site.

### Skills
```ts
{ name: 'Python', level: 'learning', logo: 'images/logos/python.svg' },
```
Levels: `'exploring'` · `'learning'` · `'building'`.
To add a logo, download the SVG from https://devicon.dev into `public/images/logos/`.

### Projects
- `status`: `'concept'` · `'in-progress'` · `'completed'`
- `featured: true` shows a large panel; otherwise it goes under **Side chapters**.
- Screenshots: put images in `public/images/projects/` and reference them **without** a leading slash:
  ```ts
  screenshots: [{ src: 'images/projects/inav-home.webp', alt: 'iNav home screen' }],
  ```
  The first screenshot replaces the drawn cover art.
- `logo` shows a small logo next to the project name (used by iSEEKct).
- Only add real `sourceUrl` / `demoUrl` links.

### Contact
In `profile.ts → contact`: `email` and `socials` (GitHub, LinkedIn, Instagram, Facebook, Discord).
Icon options: `'github' | 'linkedin' | 'facebook' | 'instagram' | 'discord' | 'globe' | 'link'`.

### Feature switches (`profile.ts → features`)
| Switch         | Default | What it does                                                         |
| -------------- | ------- | -------------------------------------------------------------------- |
| `cursorGlow`   | `true`  | Soft crimson glow that follows the mouse (desktop only)              |
| `ambientSound` | `false` | Shows the speaker button for the generated ambient soundtrack        |
| `soundtrack`   | `''`    | Your own music instead, e.g. `'audio/theme.mp3'` in `public/audio/`  |
| `editHints`    | `false` | Shows dashed "Edit me" hints for missing info while running `npm run dev` |

---

## Project structure

```
├─ .github/workflows/deploy.yml   Builds and deploys to GitHub Pages on every push to main
├─ public/
│  ├─ images/                     avatar, photos, project images
│  │  └─ logos/                   skill logos (Devicon / Simple Icons)
│  ├─ favicon.svg  og-image.jpg  robots.txt
├─ src/
│  ├─ data/                       ← your content (edit these)
│  ├─ components/
│  │  ├─ art/                     centipedes, spider lilies, covers, drawings (all code-drawn)
│  │  ├─ layout/                  Navbar, Footer, scroll progress, cursor glow
│  │  ├─ sections/                Hero, About, Interests, Skills, Projects, Journey, Contact
│  │  └─ ui/                      chapter headers, reveal animations, logo, badges
│  ├─ hooks/                      active section, theme, sound, reduced motion
│  ├─ lib/                        asset paths, ambient sound engine
│  ├─ App.tsx  main.tsx  index.css
├─ index.html  vite.config.ts  tsconfig.json  package.json
```

---

## Deploying to GitHub Pages

The site is published at the root of the user site **https://john69-git.github.io/** (`base: '/'` in `vite.config.ts`).

**First time:**
1. Create a **public**, empty repository named exactly `john69-git.github.io`.
2. In the repo, go to **Settings → Pages → Source** and choose **GitHub Actions**.
3. From the project folder:
   ```bash
   git init
   git add .
   git commit -m "Launch HAISE portfolio"
   git branch -M main
   git remote add origin https://github.com/john69-git/john69-git.github.io.git
   git push -u origin main
   ```
4. Watch the **Actions** tab. When the run shows a green check, the site is live.

**Updating later:**
```bash
git add .
git commit -m "Describe what changed"
git push
```
Every push to `main` redeploys automatically.

---

## Troubleshooting

| Problem | Fix |
| ------- | --- |
| `npm` is not recognized | Install Node.js, make sure `C:\Program Files\nodejs` is in your PATH, then restart VS Code. |
| `Could not read package.json` | You're in the wrong folder. `cd` into the folder that contains `package.json`. |
| "running scripts is disabled" (PowerShell) | Run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once. |
| Slow PC / "file in use" errors | The project is inside OneDrive. Move it to a folder like `C:\Projects\`. |
| Old icon or design still showing | Hard refresh with **Ctrl+Shift+R**. |

---

## Credits

- Design, illustrations, and code: original work for this site.
- Skill logos: [Devicon](https://devicon.dev) (MIT); AutoCAD and Discord marks: [Simple Icons](https://simpleicons.org) (CC0). Licenses are in `public/images/logos/`.
- Fonts: Shippori Mincho B1, Zen Kaku Gothic New, JetBrains Mono, Bodoni Moda, Inter (Google Fonts, OFL).

© John Jerick Bernardo Barrios · HAISE
