import { CircuitBoard, Globe, PenTool, Smartphone, SquareTerminal, Wrench } from 'lucide-react'
import type { SkillGroup, SkillLevel } from './types'

/* ==================================================================
   SKILLS — only list what you've actually worked with.
   level: 'exploring' | 'learning' | 'building'  (see labels below)
   No percentages: each level is shown as 1–3 ink strokes.
   logo:  optional, a file in /public/images/logos (official logos from
          Devicon, MIT license — see public/images/logos/DEVICON-LICENSE.txt;
          AutoCAD from Simple Icons, CC0 — SIMPLE-ICONS-LICENSE.md).
          More logos: https://devicon.dev → download the SVG into that folder.
   ================================================================== */

export const skillLevels: Record<SkillLevel, { label: string; description: string; rank: 1 | 2 | 3; kanji: string }> = {
  exploring: { label: 'Exploring', description: 'Just started, trying things out', rank: 1, kanji: '一' },
  learning: { label: 'Learning', description: 'Actively studying and practicing', rank: 2, kanji: '二' },
  building: { label: 'Building with', description: 'Used it to make something real', rank: 3, kanji: '三' },
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming',
    icon: SquareTerminal,
    skills: [
      { name: 'Dart', level: 'building', logo: 'images/logos/dart.svg' },
      { name: 'Python', level: 'learning', logo: 'images/logos/python.svg' },
      // ↓ Added — set each level to where you honestly are.
      { name: 'Java', level: 'learning', logo: 'images/logos/java.svg' },
      { name: 'Kotlin', level: 'learning', logo: 'images/logos/kotlin.svg' },
    ],
  },
  {
    title: 'Web Development',
    icon: Globe,
    // ↓ Added — set each level to where you honestly are.
    skills: [
      { name: 'HTML', level: 'learning', logo: 'images/logos/html5.svg' },
      { name: 'CSS', level: 'learning', logo: 'images/logos/css3.svg' },
      { name: 'JavaScript', level: 'learning', logo: 'images/logos/javascript.svg' },
      // ↓ Used to build this portfolio — raise the level as you work with them more.
      { name: 'React', level: 'exploring', logo: 'images/logos/react.svg' },
      { name: 'TypeScript', level: 'exploring', logo: 'images/logos/typescript.svg' },
      { name: 'Tailwind CSS', level: 'exploring', logo: 'images/logos/tailwindcss.svg' },
      { name: 'Vite', level: 'exploring', logo: 'images/logos/vitejs.svg' },
    ],
  },
  {
    title: 'Application Development',
    icon: Smartphone,
    skills: [
      { name: 'Flutter', level: 'building', logo: 'images/logos/flutter.svg' },
      { name: 'Mobile app development', level: 'building' },
      { name: 'Databases (Firebase, Supabase)', level: 'building', logo: 'images/logos/firebase.svg' },
    ],
  },
  {
    title: 'Engineering',
    icon: CircuitBoard,
    skills: [
      { name: 'Arduino', level: 'learning', logo: 'images/logos/arduino.svg' },
      { name: 'Sensors', level: 'learning' },
      { name: 'Electronics', level: 'learning' },
      { name: 'Control-system simulations', level: 'learning' },
    ],
  },
  {
    title: 'Design & CAD',
    icon: PenTool,
    // ↓ Added — set each level to where you honestly are.
    skills: [
      { name: 'Figma', level: 'learning', logo: 'images/logos/figma.svg' },
      { name: 'Canva', level: 'learning', logo: 'images/logos/canva.svg' },
      { name: 'AutoCAD', level: 'learning', logo: 'images/logos/autocad.svg' },
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: [
      { name: 'Visual Studio Code', level: 'learning', logo: 'images/logos/vscode.svg' },
      { name: 'Android Studio', level: 'learning', logo: 'images/logos/androidstudio.svg' },
      { name: 'Git', level: 'exploring', logo: 'images/logos/git.svg' },
      { name: 'GitHub', level: 'exploring', logo: 'images/logos/github.svg' },
    ],
  },
]
