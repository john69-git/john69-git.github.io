import type { Project } from './types'

/* ==================================================================
   PROJECTS — one object per project card.

   status: 'concept' | 'in-progress' | 'completed'  (or leave it out)
   screenshots: put images in /public/images/projects/ and reference
                them WITHOUT a leading slash, e.g.
                { src: 'images/projects/iseekct-1.png', alt: 'iSEEKct home screen' }
                The first screenshot becomes the card cover.
   demoUrl / sourceUrl: only add real, working links.
   art / hue: abstract cover shown until you add a screenshot.
              art: 'rings' | 'nodes' | 'wave' | 'pulse'
              hue: 'cyan' | 'violet' | 'blue'
   Empty fields are hidden on the live site.
   ================================================================== */

export const projects: Project[] = [
  {
    id: 'iseekct',
    title: 'iSEEKct',
    category: 'Mobile app · 2nd-year team project',
    status: 'completed',
    summary: 'A smart lost-and-found platform.',
    purpose: 'Helps people report lost items and find them again, all in one place.',
    technologies: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'Firebase Storage', 'Supabase'],
    role: 'Team project. I handled both the front end and the back end.',
    contributions: [
      'Built the app interface in Flutter',
      'Set up the back end and database',
    ],
    learned: 'Building iSEEKct is how I studied Flutter and databases: designing screens, then connecting them to real data.',
    screenshots: [],
    art: 'rings',
    hue: 'cyan',
  },
  {
    id: 'project-nexus',
    title: 'PROJECT NEXUS',
    category: 'iNav · Campus guide app',
    status: 'concept',
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
    art: 'nodes',
    hue: 'violet',
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
    hue: 'blue',
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
    hue: 'cyan',
  },
]
