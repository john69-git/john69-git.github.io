import { profile } from '../data/profile'

export function CurrentlyLearning() {
  const items = profile.currentlyLearning
  if (items.length === 0) return null

  return (
    <div className="rounded-2xl border border-line-strong bg-ink-900/85 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl">
      <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
        Currently learning
      </p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {items.map((item) => (
          <li key={item} className="rounded-md border border-line bg-ink-800 px-2 py-1 text-xs text-fg/90">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
