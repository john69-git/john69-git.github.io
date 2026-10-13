import { skillGroups, skillLevels } from '../data/skills'
import type { SkillLevel } from '../data/types'
import { Reveal } from './Reveal'
import { Section } from './Section'

function LevelMeter({ level }: { level: SkillLevel }) {
  const { label, rank } = skillLevels[level]
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] text-muted">
      <span aria-hidden className="flex gap-0.5">
        {[1, 2, 3].map((n) => (
          <span key={n} className={`h-2.5 w-1 rounded-full ${n <= rank ? 'bg-accent' : 'bg-line-strong'}`} />
        ))}
      </span>
      {label}
    </span>
  )
}

export function Skills() {
  return (
    <Section
      id="skills"
      index="03"
      kicker="Skills"
      title="What I'm working with"
      jp="スキル"
      description="An honest snapshot, not a scoreboard. These are the tools I've explored and keep getting better at."
    >
      <Reveal>
        <dl className="mb-10 flex flex-wrap gap-x-8 gap-y-3 rounded-2xl border border-line bg-ink-850/40 px-5 py-4">
          {(Object.keys(skillLevels) as SkillLevel[]).map((level) => (
            <div key={level} className="flex items-center gap-3">
              <dt>
                <LevelMeter level={level} />
              </dt>
              <dd className="text-xs text-dim">{skillLevels[level].description}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2">
        {skillGroups.map(({ title, note, icon: Icon, skills }, i) => (
          <Reveal key={title} delay={(i % 2) * 100} className="h-full">
            <article className="h-full rounded-2xl border border-line bg-ink-850/60 p-6 sm:p-7">
              <header className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-accent/15 to-accent-2/15 text-accent">
                  <Icon aria-hidden className="size-5" />
                </span>
                <h3 className="font-display text-lg font-medium text-fg">{title}</h3>
              </header>
              {note && <p className="mt-3 text-sm text-muted">{note}</p>}
              <ul className="mt-5 divide-y divide-line">
                {skills.map((skill) => (
                  <li key={skill.name} className="flex items-center justify-between gap-4 py-3">
                    <span className="text-sm text-fg/90">{skill.name}</span>
                    <LevelMeter level={skill.level} />
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 text-center font-mono text-xs tracking-wide text-dim">// this list grows as I do</p>
    </Section>
  )
}
