import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  index: string
  kicker: string
  title: string
  /** Optional small Japanese label shown next to the kicker. */
  jp?: string
  description?: string
  align?: 'left' | 'center'
  children: ReactNode
}

export function Section({ id, index, kicker, title, jp, description, align = 'left', children }: SectionProps) {
  const centered = align === 'center'
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <header className={`mb-12 max-w-2xl sm:mb-16 ${centered ? 'mx-auto text-center' : ''}`}>
            <p
              className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted ${centered ? 'justify-center' : ''}`}
            >
              <span className="text-accent">{index}</span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              <span>{kicker}</span>
              {jp && (
                <span lang="ja" aria-hidden className="font-jp text-[11px] normal-case tracking-[0.3em] text-dim">
                  {jp}
                </span>
              )}
            </p>
            <h2
              id={`${id}-title`}
              className="mt-4 font-display text-3xl font-semibold tracking-tight text-fg sm:text-5xl"
            >
              {title}
            </h2>
            {description && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
