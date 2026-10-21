import { AppWindow, Brain, CodeXml, Cpu, Globe, Lightbulb, Monitor, Smartphone, Sparkles } from 'lucide-react'
import type { Interest } from './types'

/* ==================================================================
   INTERESTS — one card each. `art` picks an original line-art motif:
   'monitor' | 'code' | 'phone' | 'web' | 'layout' | 'circuit' | 'lily' | 'spark' | 'maze'
   ================================================================== */

export const interests: Interest[] = [
  {
    title: 'Technology & computers',
    description: 'How machines work, from the hardware inside to the software on top.',
    icon: Monitor,
    art: 'monitor',
  },
  {
    title: 'Programming & software',
    description: 'Writing code and turning ideas into apps that actually run.',
    icon: CodeXml,
    art: 'code',
  },
  {
    title: 'Mobile applications',
    description: 'Apps people carry in their pocket. It is where iSEEKct and iNav began.',
    icon: Smartphone,
    art: 'phone',
  },
  {
    title: 'Web development',
    description: 'Building for the browser. This portfolio is my current playground.',
    icon: Globe,
    art: 'web',
  },
  {
    title: 'UI/UX design',
    description: 'How screens feel: layout, typography, and the small details that guide people.',
    icon: AppWindow,
    art: 'layout',
  },
  {
    title: 'Electronics & hardware',
    description: 'Circuits, microcontrollers, and sensors: making things in the physical world.',
    icon: Cpu,
    art: 'circuit',
  },
  {
    title: 'Creative digital projects',
    description: 'Design, visuals, and aesthetics, including a soft spot for anime-inspired art.',
    icon: Sparkles,
    art: 'lily',
  },
  {
    title: 'Learning new technologies',
    description: 'Picking up new tools and concepts, one experiment at a time.',
    icon: Brain,
    art: 'spark',
  },
  {
    title: 'Creative problem-solving',
    description: 'Breaking down problems and finding a way through them.',
    icon: Lightbulb,
    art: 'maze',
  },
]
