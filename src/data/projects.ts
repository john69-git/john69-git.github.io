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
    category: 'Application',
    status: undefined,
    summary: '',
    purpose: '',
    technologies: [],
    role: '',
    contributions: [],
    learned: '',
    screenshots: [],
    art: 'rings',
    hue: 'cyan',
  },
  {
    id: 'project-nexus',
    title: 'PROJECT NEXUS',
    category: 'App concept',
    status: 'concept',
    summary: 'My concept for a campus guide and navigation application.',
    purpose: '',
    technologies: [],
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
