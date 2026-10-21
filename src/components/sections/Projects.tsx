import { useState } from 'react'
import { projects } from '../../data/projects'
import type { Project } from '../../data/types'
import { Chapter } from '../ui/Chapter'
import { Reveal } from '../ui/Reveal'
import { ProjectCard } from './ProjectCard'
import { ProjectDialog } from './ProjectDialog'

/* Manga-page layout for featured work: two panels, then one wide panel, repeating. */
const FEATURED_LAYOUT = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-12'] as const

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const featured = projects.filter((p) => p.featured)
  const side = projects.filter((p) => !p.featured)
  const ordered = [...featured, ...side]

  return (
    <Chapter
      id="projects"
      chapter="04"
      kicker="Projects"
      title="Things I've been working on"
      jp="作品"
      description="Each panel is a case file. Open one to read the full story: the problem, my role, the tools, and what I learned."
    >
      <ul className="grid gap-3 sm:gap-4 lg:grid-cols-12">
        {featured.map((project, i) => {
          const span = FEATURED_LAYOUT[i % FEATURED_LAYOUT.length]
          return (
            <li key={project.id} className={span}>
              <Reveal delay={(i % 2) * 100} className="h-full">
                <ProjectCard project={project} index={i} onOpen={setSelected} size={span === 'lg:col-span-12' ? 'wide' : 'large'} />
              </Reveal>
            </li>
          )
        })}
      </ul>

      {side.length > 0 && (
        <div className="mt-16">
          <Reveal>
            <div className="mb-6 flex items-center gap-4">
              <h3 className="font-display text-2xl font-bold italic">Side chapters</h3>
              <span lang="ja" aria-hidden className="font-jp text-sm text-dim">
                番外編
              </span>
              <span aria-hidden className="h-px flex-1 bg-line" />
              <span className="label text-xs text-dim">Academic &amp; practice</span>
            </div>
          </Reveal>
          <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {side.map((project, i) => (
              <li key={project.id}>
                <Reveal delay={(i % 3) * 90} className="h-full">
                  <ProjectCard project={project} index={featured.length + i} onOpen={setSelected} size="small" />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ProjectDialog project={selected} projects={ordered} onClose={() => setSelected(null)} onNavigate={setSelected} />
    </Chapter>
  )
}
