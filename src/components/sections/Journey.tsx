import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { useRef } from 'react'
import { futureGoals, milestones } from '../../data/journey'
import type { MilestoneStatus } from '../../data/types'
import { InkSplash } from '../art/InkSplash'
import { Chapter } from '../ui/Chapter'
import { Placeholder } from '../ui/Placeholder'
import { Reveal } from '../ui/Reveal'

const STATUS: Record<MilestoneStatus, { label: string; jp: string; chip: string; node: string }> = {
  done: { label: 'Reached', jp: '達成', chip: 'bg-fg text-bg border-fg', node: 'bg-crimson border-crimson' },
  now: { label: 'In progress', jp: '進行中', chip: 'bg-crimson text-paper border-crimson', node: 'bg-bg border-crimson animate-ink-pulse' },
  next: { label: 'Next', jp: '次', chip: 'border-lilac text-lilac', node: 'bg-bg border-lilac border-dashed' },
}

export function Journey() {
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })
  const usedStatuses = (Object.keys(STATUS) as MilestoneStatus[]).filter((s) => milestones.some((m) => m.status === s))

  return (
    <Chapter id="journey" chapter="05" kicker="My journey" title="My Journey So Far" jp="歩み">
      <Reveal>
        <ul className="mb-12 flex flex-wrap gap-x-6 gap-y-2" aria-label="Legend">
          {usedStatuses.map((s) => (
            <li key={s} className="label flex items-center gap-2 text-xs text-muted">
              <span aria-hidden className={`size-3 rounded-full border-2 ${STATUS[s].node.replace('animate-ink-pulse', '')}`} />
              {STATUS[s].label}
            </li>
          ))}
        </ul>
      </Reveal>

      <ol ref={listRef} className="relative">
        {/* the spine: faint track + crimson ink that fills as you scroll */}
        <span aria-hidden className="absolute top-0 bottom-0 left-[11px] w-[2px] bg-line lg:left-1/2 lg:-translate-x-1/2" />
        <motion.span
          aria-hidden
          className="absolute top-0 bottom-0 left-[11px] w-[2px] origin-top bg-crimson lg:left-1/2 lg:-translate-x-1/2"
          style={reduced ? undefined : { scaleY: progress }}
        />

        {milestones.map((m, i) => {
          const s = STATUS[m.status]
          const right = i % 2 === 1
          return (
            <li key={m.title} className="relative pb-8 pl-12 last:pb-0 lg:grid lg:grid-cols-2 lg:gap-16 lg:pb-0 lg:pl-0 lg:[&:not(:first-child)]:-mt-10">
              <span aria-hidden className={`absolute top-6 left-0 z-10 size-6 rounded-full border-[3px] lg:left-1/2 lg:-translate-x-1/2 ${s.node}`} />
              <Reveal y={20} delay={60} className={`lg:pb-4 ${right ? 'lg:col-start-2' : 'lg:col-start-1'}`}>
                <article className="panel panel-hover p-5 text-left sm:p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`label inline-flex items-center gap-2 border-2 px-2 py-1 text-xs ${s.chip}`}>
                      {s.label}
                      <span lang="ja" aria-hidden className="font-jp tracking-normal opacity-75">
                        {s.jp}
                      </span>
                    </span>
                    {m.date && <span className="font-mono text-xs text-dim">{m.date}</span>}
                    <span className="ml-auto font-mono text-xs text-dim">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl leading-snug font-bold sm:text-2xl">{m.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{m.description}</p>
                </article>
              </Reveal>
            </li>
          )
        })}
      </ol>

      {/* ---- next chapter: future goals ---- */}
      {futureGoals.length > 0 ? (
        <Reveal className="mt-16">
          <section aria-labelledby="goals-title" className="panel relative overflow-hidden p-8 sm:p-12">
            <InkSplash
              seed={17}
              color="#a88bbe"
              accent="#56c8ca"
              spatter={8}
              className="pointer-events-none absolute -top-24 -right-24 w-[420px] opacity-60 mix-blend-screen [[data-theme=light]_&]:mix-blend-multiply"
            />
            <p className="label relative text-accent">
              Next chapter <span lang="ja" className="font-jp tracking-normal text-dim">次章</span>
            </p>
            <h3 id="goals-title" className="relative mt-3 font-display text-3xl font-black sm:text-4xl">
              Where the story goes next
            </h3>
            <ul className="relative mt-6 space-y-3">
              {futureGoals.map((goal) => (
                <li key={goal} className="flex gap-4 font-display text-xl italic sm:text-2xl">
                  <span aria-hidden className="mt-3 h-[3px] w-8 shrink-0 bg-crimson" />
                  {goal}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>
      ) : (
        <div className="mt-12">
          <Placeholder file="src/data/journey.ts → futureGoals">Add your future goals and a "Next chapter" panel appears here.</Placeholder>
        </div>
      )}
    </Chapter>
  )
}
