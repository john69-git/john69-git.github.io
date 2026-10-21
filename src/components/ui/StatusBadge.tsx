import { profile } from '../../data/profile'
import type { ProjectStatus } from '../../data/types'

const styles: Record<ProjectStatus, { label: string; jp: string; className: string; dot: string }> = {
  completed: { label: 'Completed', jp: '完', className: 'bg-paper text-void border-void', dot: 'bg-crimson' },
  'in-progress': { label: 'In progress', jp: '進', className: 'bg-crimson text-paper border-crimson', dot: 'bg-paper animate-blink' },
  concept: { label: 'Concept', jp: '案', className: 'bg-void text-paper border-paper/70', dot: 'bg-lilac' },
}

export function StatusBadge({ status }: { status?: ProjectStatus }) {
  if (!status) {
    if (!import.meta.env.DEV || !profile.features.editHints) return null
    return (
      <span className="label inline-flex items-center border-2 border-dashed border-pink/70 bg-void/80 px-2 py-1 text-xs text-pink">
        Set status
      </span>
    )
  }
  const s = styles[status]
  return (
    <span className={`label inline-flex items-center gap-2 border-2 px-2 py-1 text-xs ${s.className}`}>
      <span aria-hidden className={`size-1.5 rounded-full ${s.dot}`} />
      {s.label}
      <span lang="ja" aria-hidden className="font-jp text-[11px] tracking-normal opacity-70">
        {s.jp}
      </span>
    </span>
  )
}
