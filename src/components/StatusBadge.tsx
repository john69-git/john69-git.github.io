import type { ProjectStatus } from '../data/types'

const styles: Record<ProjectStatus, { label: string; className: string; dot: string }> = {
  concept: { label: 'Concept', className: 'border-accent-2/40 text-accent-2', dot: 'bg-accent-2' },
  'in-progress': { label: 'In progress', className: 'border-accent/40 text-accent', dot: 'bg-accent animate-pulse' },
  completed: { label: 'Completed', className: 'border-fg/30 text-fg', dot: 'bg-fg' },
}

export function StatusBadge({ status }: { status?: ProjectStatus }) {
  if (!status) {
    if (!import.meta.env.DEV) return null
    return (
      <span className="inline-flex items-center rounded-full border border-dashed border-accent/50 bg-ink-950/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
        Set status
      </span>
    )
  }
  const { label, className, dot } = styles[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border bg-ink-950/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] backdrop-blur ${className}`}
    >
      <span aria-hidden className={`size-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  )
}
