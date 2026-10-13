import { PencilLine } from 'lucide-react'
import type { ReactNode } from 'react'

/**
 * A dashed "fill this in" hint. Rendered ONLY during `npm run dev`,
 * so empty fields never show up on the published site.
 */
export function Placeholder({ children, file }: { children: ReactNode; file?: string }) {
  if (!import.meta.env.DEV) return null
  return (
    <div className="rounded-xl border border-dashed border-accent/40 bg-accent/[0.04] p-4 text-sm text-accent/90">
      <p className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
        <PencilLine aria-hidden className="size-3.5" />
        Edit me · visible in dev only
      </p>
      <div className="text-fg/70">{children}</div>
      {file && <p className="mt-2 font-mono text-[11px] text-dim">→ {file}</p>}
    </div>
  )
}
