# HAISE — Personal Portfolio

My own corner of the internet. A dark, minimal, slightly anime-inspired portfolio built with
**React + TypeScript + Vite + Tailwind CSS v4 + Lucide icons**.

---

## 1. Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install        # first time only
npm run dev        # start the dev server → http://localhost:5173
```

Other commands:

| Command             | What it does                                      |
| ------------------- | ------------------------------------------------- |
| `npm run build`     | Type-checks and builds the final site into `dist/` |
| `npm run preview`   | Serves the built `dist/` folder to double-check it |
| `npm run typecheck` | Only checks TypeScript for mistakes                |

### "EDIT ME" boxes
While running `npm run dev`, you'll see **dashed cyan "EDIT ME" boxes** wherever information is
still missing (your story, contact links, project details, goals…).
**They never appear on the published site.** Empty fields are simply hidden there.

---

## 2. Editing your information

All personal content lives in **`src/data/`**. You never need to touch the components to update the site.

| File                    | What's inside                                                                  |
| ----------------------- | ------------------------------------------------------------------------------ |
| `src/data/profile.ts`   | Nickname, hero text, About Me story, quote, Currently Learning, favorites, contact links, footer message, nav labels |
| `src/data/interests.ts` | Interest cards                                                                 |
| `src/data/skills.ts`    | Skill groups and honest skill levels                                           |
| `src/data/projects.ts`  | Project cards and their detail pop-ups                                         |
| `src/data/journey.ts`   | "My Journey So Far" timeline + future goals                                    |

The dev server reloads instantly when you save a file.

### About Me story (`profile.ts → about.chapters`)
Each chapter has a `title`, a `prompt` (a hint just for you), and `text`. Write your own words in `text`:

```ts
{
  title: 'Why Computer Engineering',
  prompt: 'What made you choose Computer Engineering?',
  text: 'I picked Computer Engineering because…',
},
```
Chapters with empty `text` stay hidden. Remove or rename chapters freely.

### Contact links (`profile.ts → contact`)
```ts
email: 'you@example.com',
socials: [
  { label: 'GitHub',   url: 'https://github.com/your-username',      icon: 'github' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/your-username', icon: 'linkedin' },
  { label: 'Facebook', url: 'https://facebook.com/your-page',        icon: 'facebook' },
],
```
Icons available: `github`, `linkedin`, `facebook`, `instagram`, `globe`, `link`.
Links with an empty `url` are not shown.

### Favorites (`profile.ts → favorites`)
Hidden until you add something:
```ts
favorites: { music: ['…'], anime: ['…'], inspiration: ['…'] },
```

### Your photo (optional)
1. Put the image in `public/images/`, e.g. `public/images/me.jpg`
2. In `profile.ts` set `photo: 'images/me.jpg'` (**no leading slash**)

It replaces the night-landscape artwork in the hero and the "H" mark in the About card.

### Interests (`interests.ts`)
Add, remove, or reorder objects. To change an icon, pick one at [lucide.dev/icons](https://lucide.dev/icons),
import it at the top of the file, and use it:
```ts
import { Gamepad2 } from 'lucide-react'
{ title: 'Game dev', description: '…', icon: Gamepad2 },
```

### Skills (`skills.ts`)
Only list things you've actually worked with. Levels (no fake percentages):

| `level`     | Shown as      | Meaning                          |
| ----------- | ------------- | -------------------------------- |
| `exploring` | Exploring     | Just started, trying things out  |
| `learning`  | Learning      | Actively studying and practicing |
| `building`  | Building with | Used it to make something real   |

Everything starts at `learning`, so adjust each one to match where you really are.

### Projects (`projects.ts`)
Every field is optional except `id`, `title`, `category`, `art`, and `hue`. Empty ones are hidden.

```ts
{
  id: 'iseekct',
  title: 'iSEEKct',
  category: 'Mobile app',
  status: 'in-progress',            // 'concept' | 'in-progress' | 'completed' (or leave undefined)
  summary: 'One or two sentences, in your voice.',
  purpose: 'The problem it solves / why it exists.',
  technologies: ['Flutter', 'Dart'],
  role: 'What you were responsible for.',
  contributions: ['Built the …', 'Designed the …'],
  learned: 'What building it taught you.',
  screenshots: [
    { src: 'images/projects/iseekct-1.png', alt: 'iSEEKct home screen' },
  ],
  sourceUrl: 'https://github.com/you/iseekct',  // only real links
  demoUrl: undefined,
  art: 'rings',   // cover art until a screenshot exists: 'rings' | 'nodes' | 'wave' | 'pulse'
  hue: 'cyan',    // 'cyan' | 'violet' | 'blue'
},
```
- Screenshots go in `public/images/projects/`. The **first** screenshot becomes the card cover.
- To add a new project, copy an existing object and give it a unique `id`.

### Journey (`journey.ts`)
```ts
{ title: 'Built my first Flutter app', description: '…', status: 'done', date: '2025' },
```
`status`: `done` (reached), `now` (in progress), `next` (planned). `date` is optional, so only add real ones.
Add goals to `futureGoals` to fill the "What's next" card.

### Look & feel
- **Colors and fonts:** `src/index.css`, inside `@theme { … }`
- **Cursor glow:** `profile.ts → features.cursorGlow` (`true` / `false`)
- **Katakana signature (ハイセ):** `profile.ts → nicknameJp` (set to `''` to remove)
- **Small Japanese section labels:** the `jp="…"` prop in each section component

### Page title & search metadata
Edit the `<title>` and `<meta>` tags at the top of `index.html`. After you deploy, uncomment the
`og:url`, `og:image`, and `canonical` lines and fill in your real URL.

---

## 3. Deploying

The build output is a static folder (`dist/`), so any static host works. It's configured with
relative paths, so it works at a root domain **or** a sub-path like `username.github.io/portfolio/`.

### Option A — Vercel (easiest)
1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import the repo.
3. It detects Vite automatically (build: `npm run build`, output: `dist`). Click **Deploy**.

### Option B — Netlify
1. Push to GitHub, then on [netlify.com](https://netlify.com) choose **Add new site → Import from Git**.
2. Build command `npm run build`, publish directory `dist`.
   (Or drag-and-drop the `dist/` folder onto Netlify's dashboard for a quick manual deploy.)

### Option C — GitHub Pages (free, workflow included)
1. Push to a GitHub repo on the `main` branch.
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. Every push to `main` now builds and publishes automatically (`.github/workflows/deploy.yml`).

No API keys, secrets, or environment variables are needed.

---

## 4. Project structure

```
├── index.html               # page shell + SEO meta tags
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/              # your photo + project screenshots go here
├── src/
│   ├── data/                # ← ALL your editable content
│   │   ├── profile.ts
│   │   ├── interests.ts
│   │   ├── skills.ts
│   │   ├── projects.ts
│   │   ├── journey.ts
│   │   └── types.ts         # shapes of the data (helps catch typos)
│   ├── components/          # one file per section / UI piece
│   │   ├── Navbar.tsx  Hero.tsx  HeroVisual.tsx  NightLandscape.tsx
│   │   ├── About.tsx  ProfileCard.tsx  Interests.tsx  Skills.tsx
│   │   ├── Projects.tsx  ProjectCard.tsx  ProjectDialog.tsx  ProjectArt.tsx
│   │   ├── Journey.tsx  Contact.tsx  Footer.tsx
│   │   └── Section.tsx  Reveal.tsx  Placeholder.tsx  …  (shared building blocks)
│   ├── hooks/               # reduced-motion + active-section helpers
│   ├── App.tsx              # puts the sections together
│   ├── main.tsx
│   └── index.css            # Tailwind + design tokens + animations
└── .github/workflows/deploy.yml
```

---

## 5. Accessibility & performance notes
- Keyboard friendly: skip-to-content link, visible focus rings, Esc closes the menu and project dialog.
- **Reduced motion:** if your device asks for less motion, the hero scene renders as a still image,
  scroll reveals and smooth scrolling turn off, and the cursor glow is disabled.
- The hero animation pauses when it's off-screen or the tab is hidden.
- The cursor glow is a soft light only. Your real cursor is never replaced.
- Images use lazy loading. The whole site is about 63 KB of gzipped JavaScript.
