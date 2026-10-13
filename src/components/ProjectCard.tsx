import { ArrowUpRight, ExternalLink } from 'lucide-react'
import type { Project } from '../data/types'
import { ProjectArt } from './ProjectArt'
import { SocialIcon } from './SocialIcon'
import { StatusBadge } from './StatusBadge'

interface ProjectCardProps {
  project: Project
  index: number
  onOpen: (project: Project) => void
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  const { title, category, status, summary, technologies, screenshots, sourceUrl, demoUrl, art, hue } = project
  const cover = screenshots[0]

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-ink-850/60 transition-colors duration-300 hover:border-line-strong">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]">
          {cover ? (
            <img src={cover.src} alt={cover.alt} loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <ProjectArt art={art} hue={hue} />
          )}
        </div>
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-2">
          <StatusBadge status={status} />
          <span aria-hidden className="font-mono text-[11px] text-fg/50">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">{category}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-fg">{title}</h3>
        <p className="mt-3 leading-relaxed text-muted">
          {summary || <span className="italic text-dim">More details coming soon.</span>}
        </p>

        {technologies.length > 0 && (
          <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <li key={tech} className="rounded-md border border-line bg-ink-900 px-2 py-1 font-mono text-[11px] text-fg/80">
                {tech}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center gap-2 pt-7">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-4 py-2.5 text-sm font-medium text-fg transition hover:border-accent/50 hover:bg-ink-800"
          >
            View details
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only"> about {title}</span>
          </button>
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-line text-muted transition hover:border-line-strong hover:text-fg"
              aria-label={`${title} source code (opens in a new tab)`}
            >
              <SocialIcon name="github" className="size-4" />
            </a>
          )}
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-xl border border-line text-muted transition hover:border-line-strong hover:text-fg"
              aria-label={`${title} live demo (opens in a new tab)`}
            >
              <ExternalLink aria-hidden className="size-4" />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
