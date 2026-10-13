import { useState } from 'react'
import { projects } from '../data/projects'
import type { Project } from '../data/types'
import { ProjectCard } from './ProjectCard'
import { ProjectDialog } from './ProjectDialog'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <Section
      id="projects"
      index="04"
      kicker="Projects"
      title="Things I've been working on"
      jp="作品"
      description="Apps, concepts, and academic work. Some finished, some still taking shape, and each one a lesson."
    >
      <ul className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <li key={project.id}>
            <Reveal delay={(i % 2) * 100} className="h-full">
              <ProjectCard project={project} index={i} onOpen={setSelected} />
            </Reveal>
          </li>
        ))}
      </ul>
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}
