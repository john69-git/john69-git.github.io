import type { LucideIcon } from 'lucide-react'

export interface NavLink {
  id: string
  label: string
}

export interface StoryChapter {
  title: string
  /** A hint for you — shown only while running `npm run dev` if `text` is empty. */
  prompt: string
  /** Your own words. Leave empty ('') to hide this chapter on the live site. */
  text: string
}

export type SocialIcon = 'github' | 'linkedin' | 'facebook' | 'instagram' | 'globe' | 'link'

export interface SocialLink {
  label: string
  /** Full URL, e.g. https://github.com/your-username. Empty = hidden. */
  url: string
  icon: SocialIcon
}

export interface Interest {
  title: string
  description: string
  icon: LucideIcon
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
}

export interface SkillGroup {
  title: string
  note?: string
  icon: LucideIcon
  skills: Skill[]
}

export type ProjectStatus = 'concept' | 'in-progress' | 'completed'
export type ProjectArt = 'rings' | 'nodes' | 'wave' | 'pulse'
export type AccentHue = 'cyan' | 'violet' | 'blue'

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
  summary: string
  purpose: string
  /** Optional list of main features, shown in the project pop-up. */
  features?: string[]
  technologies: string[]
  role: string
  contributions: string[]
  learned: string
  screenshots: Screenshot[]
  demoUrl?: string
  sourceUrl?: string
  /** Abstract cover art used when there is no screenshot yet. */
  art: ProjectArt
  hue: AccentHue
}

export type MilestoneStatus = 'done' | 'now' | 'next'

export interface Milestone {
  title: string
  description: string
  status: MilestoneStatus
  /** Optional — only add a real date (e.g. '2025' or 'Aug 2025'). */
  date?: string
}
