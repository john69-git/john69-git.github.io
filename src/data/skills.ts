import { CircuitBoard, Smartphone, SquareTerminal, Wrench } from 'lucide-react'
import type { SkillGroup, SkillLevel } from './types'

/* ==================================================================
   SKILLS — only list what you've actually worked with.
   level: 'exploring' | 'learning' | 'building'  (see labels below)
   ================================================================== */

export const skillLevels: Record<SkillLevel, { label: string; description: string; rank: 1 | 2 | 3 }> = {
  exploring: { label: 'Exploring', description: 'Just started, trying things out', rank: 1 },
  learning: { label: 'Learning', description: 'Actively studying and practicing', rank: 2 },
  building: { label: 'Building with', description: 'Used it to make something real', rank: 3 },
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming',
    icon: SquareTerminal,
    skills: [
      { name: 'Dart', level: 'building' },
      { name: 'Python', level: 'learning' },
    ],
  },
  {
    title: 'Application Development',
    icon: Smartphone,
    skills: [
      { name: 'Flutter', level: 'building' },
      { name: 'Mobile app development', level: 'building' },
      { name: 'Databases (Firebase, Supabase)', level: 'building' },
    ],
  },
  {
    title: 'Engineering',
    icon: CircuitBoard,
    skills: [
      { name: 'Arduino', level: 'learning' },
      { name: 'Sensors', level: 'learning' },
      { name: 'Electronics', level: 'learning' },
      { name: 'Control-system simulations', level: 'learning' },
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: [
      { name: 'Visual Studio Code', level: 'learning' },
      { name: 'Android Studio', level: 'learning' },
    ],
  },
]
