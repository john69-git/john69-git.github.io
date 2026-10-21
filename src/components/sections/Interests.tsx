import { useRef, type PointerEvent } from 'react'
import { interests } from '../../data/interests'
import type { Interest } from '../../data/types'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { InterestArt } from '../art/InterestArt'
import { Chapter } from '../ui/Chapter'
import { Reveal } from '../ui/Reveal'

function InterestCard({ interest, index }: { interest: Interest; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const Icon = interest.icon

  // Subtle 3D tilt toward the pointer (mouse/pen only).
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el || reduced || e.pointerType === 'touch') return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`)
  }
  const onLeave = () => {
    ref.current?.style.setProperty('--rx', '0deg')
    ref.current?.style.setProperty('--ry', '0deg')
  }

  return (
    <article
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="panel group h-full overflow-hidden [transform:perspective(900px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] hover:shadow-[8px_8px_0_0_#b60f2c]"
    >
      {/* crimson ink rising from the bottom on hover */}
      <div
        aria-hidden
        className="absolute inset-0 origin-bottom scale-y-0 bg-crimson transition-transform duration-700 ease-ink group-hover:scale-y-100"
        style={{ clipPath: 'polygon(0 6%, 12% 2%, 30% 7%, 48% 0, 66% 5%, 84% 1%, 100% 6%, 100% 100%, 0 100%)' }}
      />
      <div aria-hidden className="tone absolute inset-0 opacity-50" />

      <div className="relative flex h-full flex-col p-6 transition-colors duration-500 group-hover:text-paper">
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs text-dim transition-colors group-hover:text-paper/70">02.{String(index + 1).padStart(2, '0')}</span>
          <span className="grid size-11 place-items-center rounded-full border-2 border-frame transition-colors duration-500 group-hover:border-paper">
            <Icon aria-hidden className="size-5" />
          </span>
        </div>

        <InterestArt
          art={interest.art}
          className="my-5 h-28 w-full text-stroke transition-[color,transform] duration-700 ease-ink group-hover:scale-[1.04] group-hover:text-paper"
        />

        <h3 className="mt-auto font-display text-xl leading-tight font-bold">{interest.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-paper/85">{interest.description}</p>
      </div>
    </article>
  )
}

export function Interests() {
  return (
    <Chapter
      id="interests"
      chapter="02"
      kicker="Interests"
      title="Things that pull me in"
      jp="好きなもの"
      description="The things I keep coming back to, one panel at a time."
    >
      <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {interests.map((interest, i) => (
          <li key={interest.title}>
            <Reveal delay={(i % 3) * 90} className="h-full">
              <InterestCard interest={interest} index={i} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Chapter>
  )
}
