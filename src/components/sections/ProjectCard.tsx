import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../data/types'
import { asset } from '../../lib/asset'
import { ProjectCover } from '../art/ProjectCover'
import { StatusBadge } from '../ui/StatusBadge'
import { LogoMark } from './LogoMark'

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: (project: Project) => void
  size?: 'large' | 'wide' | 'small'
}

export function ProjectCard({ project, index, onOpen, size = 'large' }: ProjectCardProps) {
  const cover = project.screenshots[0]
  const wide = size === 'wide'
  const small = size === 'small'
  const chips = project.technologies.slice(0, small ? 3 : 5)
  const extra = project.technologies.length - chips.length

  return (
    <article className={`panel panel-hover group relative flex h-full w-full flex-col overflow-hidden ${wide ? 'lg:flex-row' : ''}`}>
      <div className={`relative overflow-hidden border-frame ${wide ? 'aspect-[16/10] border-b-2 lg:aspect-auto lg:w-[55%] lg:border-r-2 lg:border-b-0' : 'border-b-2'} ${small ? 'aspect-[16/8]' : wide ? '' : 'aspect-[16/10]'}`}>
        <div className="absolute inset-0 transition-transform duration-[1.1s] ease-ink group-hover:scale-[1.05]">
          {cover ? (
            <img src={asset(cover.src)} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
          ) : (
            <ProjectCover art={project.art} className="size-full" />
          )}
        </div>
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
        </div>
        <span className="label absolute bottom-3 left-3 bg-bg px-2 py-1 text-xs text-fg">
          Case {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${small ? 'p-5' : 'p-6 sm:p-7'}`}>
        <p className="label text-xs text-accent">{project.category}</p>
        <h3 className={`mt-2 font-display leading-[1.05] font-extrabold ${small ? 'text-2xl' : 'text-3xl sm:text-4xl'}`}>
          {/* Stretched button: the whole panel is clickable, but only this element is in the tab order. */}
          <button
            type="button"
            onClick={() => onOpen(project)}
            aria-haspopup="dialog"
            className="text-left after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none"
          >
            {project.logo && <LogoMark src={project.logo.src} className="mr-2.5 size-[1.15em]" />}
            {project.title}
            <span className="sr-only"> — open case file</span>
          </button>
        </h3>
        {project.summary && <p className="mt-3 line-clamp-3 leading-relaxed text-muted">{project.summary}</p>}

        {chips.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
            {chips.map((t) => (
              <li key={t} className="border border-line bg-panel-2 px-2 py-1 font-mono text-xs">
                {t}
              </li>
            ))}
            {extra > 0 && <li className="px-1 py-1 font-mono text-xs text-dim">+{extra}</li>}
          </ul>
        )}

        <span aria-hidden className="label mt-auto flex items-center gap-2 pt-6 text-[11px] text-fg">
          <span className="relative">
            Open case file
            <span aria-hidden className="absolute inset-x-0 -bottom-1 h-[2px] origin-left scale-x-0 bg-crimson transition-transform duration-500 group-hover:scale-x-100" />
          </span>
          <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  )
}
