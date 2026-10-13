import { Flag } from 'lucide-react'
import { futureGoals, milestones } from '../data/journey'
import { profile } from '../data/profile'
import type { MilestoneStatus } from '../data/types'
import { Placeholder } from './Placeholder'
import { Reveal } from './Reveal'
import { Section } from './Section'

const statusStyle: Record<MilestoneStatus, { label: string; dot: string; text: string }> = {
  done: { label: 'Milestone', dot: 'bg-fg border-fg', text: 'text-fg/70' },
  now: { label: 'In progress', dot: 'bg-accent border-accent shadow-[0_0_14px_rgb(110_226_245/0.7)]', text: 'text-accent' },
  next: { label: 'Up next', dot: 'bg-ink-900 border-accent-2', text: 'text-accent-2' },
}

export function Journey() {
  return (
    <Section
      id="journey"
      index="05"
      kicker="Journey"
      title="My Journey So Far"
      jp="歩み"
      description="No dramatic origin story, just steady steps forward. This timeline grows as I do."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <ol className="relative lg:col-span-7">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-line-strong via-accent/40 to-transparent"
          />
          {milestones.map((m, i) => {
            const style = statusStyle[m.status]
            return (
              <li key={m.title} className="relative pb-12 pl-10 last:pb-0">
                <Reveal delay={i * 60}>
                  <span aria-hidden className={`absolute top-1.5 left-0 size-[15px] rounded-full border-2 ${style.dot}`} />
                  <p className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em]">
                    <span className={style.text}>{style.label}</span>
                    {m.date && <span className="text-dim">· {m.date}</span>}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-medium text-fg">{m.title}</h3>
                  <p className="mt-2 max-w-lg leading-relaxed text-muted">{m.description}</p>
                </Reveal>
              </li>
            )
          })}
        </ol>

        <div className="lg:col-span-5">
          <Reveal delay={120} className="lg:sticky lg:top-24">
            <div className="rounded-3xl border border-line bg-ink-850/60 p-6 sm:p-8">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-2">
                <Flag aria-hidden className="size-3.5" />
                What's next
              </p>
              {futureGoals.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {futureGoals.map((goal) => (
                    <li key={goal} className="flex gap-3 text-fg/90">
                      <span aria-hidden className="mt-[0.6rem] size-1.5 shrink-0 rounded-full border border-accent-2" />
                      {goal}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-5">
                  <Placeholder file="src/data/journey.ts → futureGoals">
                    Add your future goals, and they'll appear here as you set them.
                  </Placeholder>
                </div>
              )}
              <p className="mt-8 border-t border-line pt-6 font-display text-2xl text-fg/90">{profile.hero.tagline}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
