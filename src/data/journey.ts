import type { Milestone } from './types'

/* ==================================================================
   MY JOURNEY — milestones, oldest first.
   status: 'done' (reached) | 'now' (in progress) | 'next' (planned)
   date:   optional, only add real dates.
   ================================================================== */

export const milestones: Milestone[] = [
  {
    title: 'Started my Computer Engineering journey',
    description: 'Began studying Computer Engineering, where software, hardware, and curiosity meet.',
    status: 'done',
  },
  {
    title: 'Building programming foundations',
    description: 'Learning to think in code with Python and Dart.',
    status: 'now',
  },
  {
    title: 'Exploring app development',
    description: 'Learning how mobile apps are designed and built with Flutter and Android Studio.',
    status: 'now',
  },
  {
    title: 'Getting hands-on with hardware',
    description: 'Experimenting with Arduino, sensors, and electronics.',
    status: 'now',
  },
  {
    title: 'Taking on academic projects',
    description: 'Working on projects like a PID controller simulation and a smart medication reminder system.',
    status: 'now',
  },
]

/** Future goals. Add your own; this block is hidden on the live site while empty. */
export const futureGoals: string[] = []
