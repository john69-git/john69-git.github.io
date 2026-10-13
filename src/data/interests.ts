import { Brain, Code2, Cpu, Lightbulb, Monitor, Sparkles } from 'lucide-react'
import type { Interest } from './types'



export const interests: Interest[] = [
  {
    title: 'Technology & computers',
    description: 'How machines work, from the hardware inside to the software on top.',
    icon: Monitor,
  },
  {
    title: 'Programming & software',
    description: 'Writing code and turning ideas into apps that actually run.',
    icon: Code2,
  },
  {
    title: 'Electronics & hardware',
    description: 'Circuits, microcontrollers, and sensors: making things in the physical world.',
    icon: Cpu,
  },
  {
    title: 'Creative digital projects',
    description: 'Design, visuals, and aesthetics, including a soft spot for anime-inspired art.',
    icon: Sparkles,
  },
  {
    title: 'Learning new technologies',
    description: 'Picking up new tools and concepts, one experiment at a time.',
    icon: Brain,
  },
  {
    title: 'Creative problem-solving',
    description: 'Breaking down problems and finding a way through them.',
    icon: Lightbulb,
  },
]
