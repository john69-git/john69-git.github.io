import type { LucideIcon } from 'lucide-react'

export interface NavLink {
  id: string
  label: string
  /** Short label used in the desktop navbar. Falls back to `label`. */
  short?: string
  /** Chapter number shown next to the link (e.g. '01'). */
  chapter: string
}

export interface StoryChapter {
  title: string
  /** A hint for you — shown only while running `npm run dev` if `text` is empty. */
  prompt: string
  /** Your own words. Leave empty ('') to hide this chapter on the live site. */
  text: string
}

export type SocialIcon = 'github' | 'linkedin' | 'facebook' | 'instagram' | 'discord' | 'globe' | 'link'

export interface SocialLink {
  label: string
  /** Full URL, e.g. https://github.com/your-username. Empty = hidden. */
  url: string
  icon: SocialIcon
  /** Optional short text shown under the label, e.g. your username. */
  handle?: string
}

/** Original line-art motifs drawn for the interest cards (see components/art/InterestArt.tsx). */
export type InterestArt = 'monitor' | 'code' | 'phone' | 'web' | 'layout' | 'circuit' | 'lily' | 'spark' | 'maze'

export interface Interest {
  title: string
  description: string
  icon: LucideIcon
  art: InterestArt
}

/**
 * Honest skill levels — no percentages.
 *  exploring : just started, trying things out
 *  learning  : actively studying and practicing it
 *  building  : have used it to make something real
 */
export type SkillLevel = 'exploring' | 'learning' | 'building'

export interface Skill {
  name: string
  level: SkillLevel
  /** Optional logo in /public, e.g. 'images/logos/python.svg'. Logos come from Devicon (MIT). */
  logo?: string
}

export interface SkillGroup {
  title: string
  note?: string
  icon: LucideIcon
  skills: Skill[]
}

export type ProjectStatus = 'concept' | 'in-progress' | 'completed'

/** Original abstract cover art, used until real screenshots are added. */
export type ProjectArt = 'seek' | 'nav' | 'lily' | 'wave' | 'pulse' | 'calc' | 'games'

export interface Screenshot {
  /** Path to an image in /public, WITHOUT a leading slash — e.g. 'images/projects/iseekct-1.png' */
  src: string
  alt: string
}

export interface Project {
  id: string
  title: string
  category: string
  /** Leave undefined until you decide — no badge is shown on the live site. */
  status?: ProjectStatus
  /** Featured projects get large panels; the rest appear under "Side chapters". */
  featured?: boolean
  summary: string
  purpose: string
  /** Optional list of main features, shown in the project dialog. */
  features?: string[]
  technologies: string[]
  role: string
  contributions: string[]
  learned: string
  screenshots: Screenshot[]
  /** Optional project logo (transparent PNG/WebP in /public). Shown on a paper panel until a screenshot is added. */
  logo?: Screenshot
  demoUrl?: string
  sourceUrl?: string
  /** Abstract cover art shown when there is no screenshot yet. */
  art: ProjectArt
}

export type MilestoneStatus = 'done' | 'now' | 'next'

export interface Milestone {
  title: string
  description: string
  status: MilestoneStatus
  /** Optional — only add a real date (e.g. '2025' or 'Aug 2025'). */
  date?: string
}
