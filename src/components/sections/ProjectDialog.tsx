import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react'
import { useEffect, useRef, type KeyboardEvent, type ReactNode } from 'react'
import type { Project } from '../../data/types'
import { asset } from '../../lib/asset'
import { ProjectCover } from '../art/ProjectCover'
import { Placeholder } from '../ui/Placeholder'
import { SocialIcon } from '../ui/SocialIcon'
import { StatusBadge } from '../ui/StatusBadge'
import { LogoMark } from './LogoMark'

function Block({ title, jp, children }: { title: string; jp: string; children: ReactNode }) {
  return (
    <section className="grid gap-3 border-t-2 border-frame pt-6 sm:grid-cols-[10rem_1fr] sm:gap-6">
      <h3 className="label flex items-baseline gap-2 text-accent">
        {title}
        <span lang="ja" aria-hidden className="font-jp text-xs tracking-normal text-dim">
          {jp}
        </span>
      </h3>
      <div className="leading-relaxed text-fg/90">{children}</div>
    </section>
  )
}

interface ProjectDialogProps {
  project: Project | null
  projects: Project[]
  onClose: () => void
  onNavigate: (project: Project) => void
}

/** Accessible modal on the native <dialog> element (focus trap + Esc for free). ← / → switch case files. */
export function ProjectDialog({ project, projects, onClose, onNavigate }: ProjectDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const index = project ? projects.findIndex((p) => p.id === project.id) : -1
  const prev = index > 0 ? projects[index - 1] : projects[projects.length - 1]
  const next = index >= 0 && index < projects.length - 1 ? projects[index + 1] : projects[0]

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

  // Scroll back to the top when switching between case files.
  useEffect(() => {
    ref.current?.querySelector('[data-scroll]')?.scrollTo({ top: 0 })
  }, [project?.id])

  const handleClose = () => {
    document.documentElement.style.overflow = ''
    onClose()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (!project || projects.length < 2) return
    const target = e.target as HTMLElement
    if (target.closest('a, input, textarea')) return
    if (e.key === 'ArrowRight') onNavigate(next)
    if (e.key === 'ArrowLeft') onNavigate(prev)
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
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      aria-labelledby="project-dialog-title"
      className="m-auto max-h-[92svh] w-[calc(100%-1.5rem)] max-w-4xl overflow-hidden border-2 border-frame bg-bg p-0 text-fg shadow-[12px_12px_0_0_#b60f2c]"
    >
      {project && (
        <div data-scroll className="max-h-[92svh] overflow-y-auto overscroll-contain">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative aspect-[21/9] min-h-[180px] border-b-2 border-frame">
                {project.screenshots[0] ? (
                  <img src={asset(project.screenshots[0].src)} alt="" className="size-full object-cover" />
                ) : (
                  <ProjectCover art={project.art} className="size-full" />
                )}
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
              </div>

              <div className="space-y-6 p-6 sm:p-10">
                <header>
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={project.status} />
                    <span className="label text-xs text-dim">{project.category}</span>
                  </div>
                  <h2 id="project-dialog-title" className="mt-4 font-display text-4xl leading-none font-black tracking-tight sm:text-5xl">
                    {project.logo && <LogoMark src={project.logo.src} alt={project.logo.alt} className="mr-3 size-[1.1em]" />}
                    {project.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-muted">
                    {project.summary || <span className="italic text-dim">More details coming soon.</span>}
                  </p>
                </header>

                {project.purpose && (
                  <Block title="Problem / purpose" jp="目的">
                    <p>{project.purpose}</p>
                  </Block>
                )}

                {project.features && project.features.length > 0 && (
                  <Block title="Key features" jp="機能">
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {project.features.map((f) => (
                        <li key={f} className="flex gap-3 border border-line bg-panel p-3 text-sm">
                          <span aria-hidden className="mt-1.5 size-1.5 shrink-0 bg-crimson" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </Block>
                )}

                {(project.role || project.contributions.length > 0) && (
                  <Block title="My role" jp="担当">
                    {project.role && <p>{project.role}</p>}
                    {project.contributions.length > 0 && (
                      <ul className="mt-2 space-y-1.5">
                        {project.contributions.map((c) => (
                          <li key={c} className="flex gap-3">
                            <span aria-hidden className="mt-3 h-[2px] w-3 shrink-0 bg-crimson" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Block>
                )}

                {project.technologies.length > 0 && (
                  <Block title="Technologies" jp="技術">
                    <ul className="flex flex-wrap gap-2">
                      {project.technologies.map((t) => (
                        <li key={t} className="border-2 border-frame px-2.5 py-1 font-mono text-xs">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </Block>
                )}

                {project.screenshots.length > 0 && (
                  <Block title="Screenshots" jp="画面">
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {project.screenshots.map((s) => (
                        <li key={s.src}>
                          <img src={asset(s.src)} alt={s.alt} loading="lazy" decoding="async" className="w-full border-2 border-frame object-cover" />
                        </li>
                      ))}
                    </ul>
                  </Block>
                )}

                {project.learned && (
                  <Block title="What I learned" jp="学び">
                    <p>{project.learned}</p>
                  </Block>
                )}

                {(project.sourceUrl || project.demoUrl) && (
                  <div className="flex flex-wrap gap-3 border-t-2 border-frame pt-6">
                    {project.sourceUrl && (
                      <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                        <SocialIcon name="github" className="size-4" /> Source code
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                        <ExternalLink aria-hidden className="size-4" /> Live site
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                )}

                {missing.length > 0 && (
                  <Placeholder file={`src/data/projects.ts → id: '${project.id}'`}>Still to fill in: {missing.join(', ')}.</Placeholder>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* sticky footer: case navigation */}
          <nav
            aria-label="Case files"
            className="sticky bottom-0 flex items-center justify-between gap-2 border-t-2 border-frame bg-bg/95 px-4 py-3 backdrop-blur sm:px-6"
          >
            {projects.length > 1 ? (
              <button type="button" className="icon-btn" onClick={() => onNavigate(prev)} aria-label={`Previous case: ${prev.title}`}>
                <ChevronLeft aria-hidden className="size-5" />
              </button>
            ) : (
              <span />
            )}
            <p className="label text-xs text-dim" aria-live="polite">
              Case {index + 1} / {projects.length}
              <span className="hidden sm:inline"> · ← → to flip</span>
            </p>
            <div className="flex items-center gap-2">
              {projects.length > 1 && (
                <button type="button" className="icon-btn" onClick={() => onNavigate(next)} aria-label={`Next case: ${next.title}`}>
                  <ChevronRight aria-hidden className="size-5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => ref.current?.close()}
                className="icon-btn !border-frame"
                aria-label="Close project details"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </dialog>
  )
}
