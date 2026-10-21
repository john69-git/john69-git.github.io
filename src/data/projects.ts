import type { Project } from './types'

/* ==================================================================
   PROJECTS — one object per "case file".

   status:      'concept' | 'in-progress' | 'completed'  (or leave it out)
   featured:    true = large panel; false/undefined = "Side chapters"
   screenshots: put images in /public/images/projects/ and reference
                them WITHOUT a leading slash, e.g.
                { src: 'images/projects/iseekct-1.png', alt: 'iSEEKct home screen' }
                The first screenshot becomes the card cover.
   demoUrl / sourceUrl: only add real, working links.
   logo:        optional { src, alt } — a transparent logo shown on a paper panel
   art:         original abstract cover shown until you add a screenshot or logo:
                'seek' | 'nav' | 'lily' | 'wave' | 'pulse' | 'calc' | 'games'
   Empty fields are hidden on the live site.
   ================================================================== */

export const projects: Project[] = [
  {
    id: 'iseekct',
    title: 'iSEEKct',
    category: 'Mobile app · 2nd-year team project',
    status: 'completed',
    featured: true,
    summary: 'A smart lost-and-found platform.',
    purpose: 'Helps people report lost items and find them again, all in one place.',
    technologies: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Firebase Storage', 'Supabase'],
    role: 'Team project. I handled both the front end and the back end.',
    contributions: ['Built the app interface in Flutter', 'Set up the back end and database'],
    learned:
      'Building iSEEKct is how I studied Flutter and databases: designing screens, then connecting them to real data.',
    screenshots: [],
    logo: {
      src: 'images/projects/iseekct-logo.webp',
      alt: 'iSEEKct logo: a large magnifying glass over everyday lost items, a wallet, keys, an ID card, shoes, and a backpack.',
    },
    art: 'seek',
  },
  {
    id: 'project-nexus',
    title: 'PROJECT NEXUS — iNav',
    category: 'Campus guide app',
    status: 'in-progress',
    featured: true,
    summary:
      'iNav, a campus guide and visual directory app that helps students find the right offices and Registrar windows at ICCT Colleges.',
    purpose:
      "New students, transferees, and parents often get lost in ICCT's Cainta main building looking for the right Registrar window or office, which leads to long queues and the same questions for frontline staff every day. iNav isn't a GPS router. It's a visual guide that uses real photos of each service window, step-by-step instructions, and QR codes so people can find where to go on their own.",
    features: [
      'Interactive building map with photos of the actual service windows',
      'Registrar window directory with services, requirements, and processing times',
      'Document requirements guide with step-by-step visual instructions',
      'Personal checklist for tracking enrollment requirements',
      'QR codes around the building that open window photos and office guides',
      'Search & filter directory, plus an announcements feed',
    ],
    technologies: ['Android / iOS', 'QR code scanning'],
    role: '',
    contributions: [],
    learned: '',
    screenshots: [],
    art: 'nav',
  },
  {
    id: 'haise-portfolio',
    title: 'HAISE Portfolio',
    category: 'Web · Personal site',
    status: 'in-progress',
    featured: true,
    summary: 'This website: a manga-editorial portfolio of ink, paper, and crimson.',
    purpose:
      'A personal home on the web where my story, skills, and projects live, redesigned around the HAISE identity. Content is kept in plain data files so it can grow with me.',
    features: [
      'Chapter-based single-page layout with active navigation',
      'Paper (light) and void (dark) themes',
      'Optional generative ambient sound, off by default',
      'Project case-file dialogs driven by data files',
      'Reduced-motion support and keyboard-accessible controls',
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS v4', 'Motion', 'GitHub Pages'],
    role: '',
    contributions: [],
    learned: '',
    screenshots: [],
    sourceUrl: 'https://github.com/john69-git/john69-git.github.io',
    demoUrl: 'https://john69-git.github.io/',
    art: 'lily',
  },
  {
    id: 'pid-controller',
    title: 'PID Controller Simulation',
    category: 'Academic · Control systems',
    status: undefined,
    summary: 'An academic control-systems project simulating a PID controller.',
    purpose: '',
    technologies: [],
    role: '',
    contributions: [],
    learned: '',
    screenshots: [],
    art: 'wave',
  },
  {
    id: 'smart-medication-reminder',
    title: 'Smart Medication Reminder System',
    category: 'Academic',
    status: undefined,
    summary: 'An academic project centered on medication reminders.',
    purpose: '',
    technologies: [],
    role: '',
    contributions: [],
    learned: '',
    screenshots: [],
    art: 'pulse',
  },
  {
    id: 'basic-calculator',
    title: 'Basic Calculator',
    category: 'Coding practice',
    status: undefined,
    summary: 'A basic calculator built from scratch in code.',
    purpose: '',
    technologies: [],
    role: '',
    contributions: [],
    learned: '',
    screenshots: [],
    art: 'calc',
  },
  {
    id: 'mini-games',
    title: 'Mini Games',
    category: 'Coding practice · Games',
    status: undefined,
    summary: 'Classic-style mini games recreated in code: a maze chase, a space shooter, a falling-block puzzle, and a slot game.',
    purpose: '',
    features: [
      'Pac-Man-style maze chase game',
      'Space shooter',
      'Tetris-style falling-block puzzle',
      'Slot machine game',
    ],
    technologies: [],
    role: '',
    contributions: [],
    learned: '',
    screenshots: [],
    art: 'games',
  },
]
