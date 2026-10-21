import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { SplitText } from './SplitText'

/** Formal kanji numerals, like chapter stamps in a printed volume. */
const SEALS: Record<string, string> = { '00': '零', '01': '壱', '02': '弐', '03': '参', '04': '肆', '05': '伍', '終': '終' }

interface ChapterProps {
  id: string
  chapter: string
  kicker: string
  title: string
  jp: string
  description?: string
  align?: 'left' | 'center'
  children: ReactNode
  className?: string
}

/** A full-width "chapter" of the artbook: stamped chapter number, editorial title, vertical Japanese. */
export function Chapter({ id, chapter, kicker, title, jp, description, align = 'left', children, className = '' }: ChapterProps) {
  const centered = align === 'center'
  const label = chapter === '終' ? 'Final chapter' : `Chapter ${chapter}`
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative overflow-x-clip py-20 sm:py-28 ${className}`}>
      {/* giant vertical Japanese title in the margin */}
      <p
        lang="ja"
        aria-hidden
        className="pointer-events-none absolute top-24 right-2 hidden font-jp text-[7rem] leading-none font-extrabold text-fg/[0.045] select-none vertical xl:block 2xl:right-8"
      >
        {jp}
      </p>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <header className={`mb-14 sm:mb-20 ${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-4xl'}`}>
          <Reveal y={16}>
            <div className={`flex items-center gap-4 ${centered ? 'justify-center' : ''}`}>
              <span
                lang="ja"
                aria-hidden
                className="grid size-11 -rotate-3 place-items-center bg-crimson font-jp text-lg font-bold text-paper shadow-[3px_3px_0_0_var(--t-frame)]"
              >
                {SEALS[chapter] ?? chapter}
              </span>
              <p className="label text-accent">
                {label} <span className="text-dim">—</span> {kicker}
              </p>
              <span aria-hidden className="h-px w-16 bg-line" />
              <span lang="ja" aria-hidden className="font-jp text-sm text-dim">
                {jp}
              </span>
            </div>
          </Reveal>

          <h2
            id={`${id}-title`}
            className="mt-6 font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.95] font-extrabold tracking-[-0.02em] text-balance"
          >
            <SplitText text={title} stagger={0.022} />
          </h2>
          <Reveal delay={150}>
            <div aria-hidden className={`brush mt-5 w-40 ${centered ? 'mx-auto' : ''}`} />
            {description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty sm:text-xl">{description}</p>}
          </Reveal>
        </header>

        {children}
      </div>
    </section>
  )
}
