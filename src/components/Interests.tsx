import { interests } from '../data/interests'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function Interests() {
  return (
    <Section
      id="interests"
      index="02"
      kicker="Interests"
      title="Things that pull me in"
      jp="好きなもの"
      description="The topics I keep coming back to, in class and outside of it."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {interests.map(({ title, description, icon: Icon }, i) => (
          <li key={title}>
            <Reveal delay={(i % 3) * 80} className="h-full">
              <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-ink-850/60 p-6 transition-colors duration-300 hover:border-accent/35 hover:bg-ink-800/70">
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 size-40 rounded-full bg-accent/0 blur-3xl transition-colors duration-500 group-hover:bg-accent/10"
                />
                <div className="relative flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-ink-900 text-accent transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span aria-hidden className="font-mono text-[11px] text-dim">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="relative mt-6 font-display text-lg font-medium text-fg">{title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted">{description}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
