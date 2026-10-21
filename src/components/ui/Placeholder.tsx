import { PencilLine } from 'lucide-react'
import type { ReactNode } from 'react'
import { profile } from '../../data/profile'

/**
 * A dashed "fill this in" hint. Rendered ONLY during `npm run dev`,
 * so empty fields never show up on the published site.
 */
export function Placeholder({ children, file }: { children: ReactNode; file?: string }) {
  if (!import.meta.env.DEV || !profile.features.editHints) return null
  return (
    <div className="border-2 border-dashed border-pink/60 bg-pink/[0.06] p-4 text-sm">
      <p className="label mb-1.5 flex items-center gap-2 text-accent">
        <PencilLine aria-hidden className="size-3.5" />
        Edit me · visible in dev only
      </p>
      <div className="text-muted">{children}</div>
      {file && <p className="mt-2 font-mono text-xs text-dim">→ {file}</p>}
    </div>
  )
}
