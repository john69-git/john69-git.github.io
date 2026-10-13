import { ExternalLink, X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import type { Project } from '../data/types'
import { Placeholder } from './Placeholder'
import { ProjectArt } from './ProjectArt'
import { SocialIcon } from './SocialIcon'
import { StatusBadge } from './StatusBadge'

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line pt-6">
      <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{title}</h3>
      <div className="mt-3 leading-relaxed text-fg/85">{children}</div>
    </section>
  )
}

interface ProjectDialogProps {
  project: Project | null
  onClose: () => void
}

/** Accessible modal built on the native <dialog> element (focus trap + Esc for free). */
export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) {
      dialog.showModal()
      document.documentElement.style.overflow = 'hidden'
    } else if (!project && dialog.open) {
      dialog.close()
    }
  }, [project])

  const handleClose = () => {
    document.documentElement.style.overflow = ''
    onClose()
  }

  const missing = project
    ? [
        !project.summary && 'short description',
        !project.status && 'status',
        !project.purpose && 'problem / purpose',
        project.technologies.length === 0 && 'technologies',
        !project.role && project.contributions.length === 0 && 'role & contributions',
        project.screenshots.length === 0 && 'screenshots',
        !project.learned && 'what you learned',
        !project.sourceUrl && !project.demoUrl && 'source / demo links (if available)',
      ].filter(Boolean)
    : []

  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      aria-labelledby="project-dialog-title"
      className="m-auto max-h-[90svh] w-[calc(100%-2rem)] max-w-3xl overflow-hidden rounded-3xl border border-line-strong bg-ink-850 p-0 text-fg shadow-2xl shadow-black/60 backdrop:bg-ink-950/80 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div className="max-h-[90svh] overflow-y-auto">
          <div className="relative aspect-[21/9] border-b border-line">
            <ProjectArt art={project.art} hue={project.hue} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-850 to-transparent" />
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-xl border border-line-strong bg-ink-900/80 text-fg backdrop-blur transition hover:border-accent/50"
              aria-label="Close project details"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <header>
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={project.status} />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dim">{project.category}</span>
              </div>
              <h2 id="project-dialog-title" className="mt-3 font-display text-3xl font-semibold tracking-tight">
                {project.title}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-muted">
                {project.summary || <span className="italic text-dim">More details coming soon.</span>}
              </p>
            </header>

            {project.purpose && (
              <Block title="Problem / purpose">
                <p>{project.purpose}</p>
              </Block>
            )}

            {(project.role || project.contributions.length > 0) && (
              <Block title="My role & contributions">
                {project.role && <p>{project.role}</p>}
                {project.contributions.length > 0 && (
                  <ul className="mt-2 space-y-1.5">
                    {project.contributions.map((c) => (
                      <li key={c} className="flex gap-3">
                        <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </Block>
            )}

            {project.technologies.length > 0 && (
              <Block title="Technologies">
                <ul className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <li key={t} className="rounded-md border border-line bg-ink-900 px-2.5 py-1 font-mono text-xs">
                      {t}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {project.screenshots.length > 0 && (
              <Block title="Screenshots">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {project.screenshots.map((s) => (
                    <li key={s.src}>
                      <img src={s.src} alt={s.alt} loading="lazy" className="w-full rounded-xl border border-line object-cover" />
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {project.learned && (
              <Block title="What I learned">
                <p>{project.learned}</p>
              </Block>
            )}

            {(project.sourceUrl || project.demoUrl) && (
              <div className="flex flex-wrap gap-3 border-t border-line pt-6">
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-fg px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-white"
                  >
                    <SocialIcon name="github" className="size-4" /> Source code
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-4 py-2.5 text-sm font-semibold transition hover:border-accent/50"
                  >
                    <ExternalLink aria-hidden className="size-4" /> Live demo
                  </a>
                )}
              </div>
            )}

            {missing.length > 0 && (
              <Placeholder file={`src/data/projects.ts → id: '${project.id}'`}>
                Still to fill in: {missing.join(', ')}.
              </Placeholder>
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}
