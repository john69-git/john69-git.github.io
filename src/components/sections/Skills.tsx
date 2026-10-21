import { useState } from 'react'
import { profile } from '../../data/profile'
import { skillGroups, skillLevels } from '../../data/skills'
import { asset } from '../../lib/asset'
import type { SkillLevel } from '../../data/types'
import { SpiderLily } from '../art/SpiderLily'
import { Chapter } from '../ui/Chapter'
import { Reveal } from '../ui/Reveal'

/** 1–3 brush strokes instead of a percentage bar. */
function Strokes({ rank, className = '' }: { rank: 1 | 2 | 3; className?: string }) {
  return (
    <span aria-hidden className={`inline-flex items-center gap-1 ${className}`}>
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={`h-[6px] w-5 ${n <= rank ? 'bg-crimson' : 'bg-line'}`}
          style={{ clipPath: 'polygon(0 30%, 18% 0, 100% 20%, 92% 100%, 10% 80%)' }}
        />
      ))}
    </span>
  )
}

const LEVELS = Object.keys(skillLevels) as SkillLevel[]

/** Lilies for the "Currently learning" panel, back to front. */
const LILY_FIELD: { x: string; h: string; stem: number; seed: number; v: 'ghost' | 'vivid'; o: number; blur?: number }[] = [
  { x: '4%', h: '70%', stem: 170, seed: 31, v: 'ghost', o: 0.85, blur: 1.2 },
  { x: '26%', h: '86%', stem: 200, seed: 32, v: 'ghost', o: 0.9, blur: 0.8 },
  { x: '47%', h: '64%', stem: 150, seed: 38, v: 'ghost', o: 0.8, blur: 1.4 },
  { x: '68%', h: '80%', stem: 190, seed: 33, v: 'ghost', o: 0.9, blur: 0.8 },
  { x: '94%', h: '72%', stem: 170, seed: 34, v: 'ghost', o: 0.85, blur: 1.2 },
  { x: '57%', h: '92%', stem: 210, seed: 35, v: 'vivid', o: 1 },
  { x: '18%', h: '66%', stem: 140, seed: 36, v: 'vivid', o: 1 },
  { x: '38%', h: '48%', stem: 90, seed: 39, v: 'vivid', o: 1 },
  { x: '86%', h: '58%', stem: 120, seed: 37, v: 'vivid', o: 1 },
]
const countAt = (level: SkillLevel) => skillGroups.reduce((n, g) => n + g.skills.filter((s) => s.level === level).length, 0)

export function Skills() {
  const [filter, setFilter] = useState<SkillLevel | 'all'>('all')
  const total = skillGroups.reduce((n, g) => n + g.skills.length, 0)
  const matching = filter === 'all' ? total : skillGroups.reduce((n, g) => n + g.skills.filter((s) => s.level === filter).length, 0)

  return (
    <Chapter
      id="skills"
      chapter="03"
      kicker="Skills"
      title="What I'm working with"
      jp="スキル"
      description="No percentages, no inflated numbers. Each skill is marked by where I honestly am with it."
    >
      {/* ---- legend + filter ---- */}
      <Reveal>
        <div className="panel mb-4 flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="label text-dim">Filter by level</p>
          <div role="group" aria-label="Filter skills by level" className="flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={filter === 'all'}
              onClick={() => setFilter('all')}
              className="label border-2 border-frame px-4 py-2.5 text-xs transition-colors hover:bg-fg hover:text-bg aria-pressed:bg-fg aria-pressed:text-bg"
            >
              All
            </button>
            {LEVELS.map((level) => {
              const meta = skillLevels[level]
              const count = countAt(level)
              return (
                <button
                  key={level}
                  type="button"
                  aria-pressed={filter === level}
                  disabled={count === 0}
                  onClick={() => setFilter(level)}
                  title={count === 0 ? `${meta.description} — nothing at this level yet` : meta.description}
                  className="label flex items-center gap-3 border-2 border-frame px-4 py-2.5 text-xs transition-colors enabled:hover:bg-fg enabled:hover:text-bg disabled:cursor-not-allowed disabled:opacity-40 aria-pressed:bg-fg aria-pressed:text-bg"
                >
                  <Strokes rank={meta.rank} />
                  {meta.label}
                  <span className="font-mono tracking-normal opacity-60">({count})</span>
                  <span lang="ja" aria-hidden className="font-jp text-xs tracking-normal opacity-60">
                    {meta.kanji}
                  </span>
                </button>
              )
            })}
          </div>
          <p className="sr-only" aria-live="polite">
            {filter === 'all' ? `Showing all ${total} skills` : `Highlighting ${matching} skills at level ${skillLevels[filter].label}`}
          </p>
        </div>
      </Reveal>

      <div className="grid gap-3 sm:gap-4 lg:grid-cols-12">
        {/* ---- skill groups ---- */}
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-8">
          {skillGroups.map((group, gi) => {
            const Icon = group.icon
            return (
              <Reveal
                key={group.title}
                delay={(gi % 2) * 90}
                className={`h-full ${gi === skillGroups.length - 1 && skillGroups.length % 2 === 1 ? 'sm:col-span-2' : ''}`}
              >
                <section aria-labelledby={`skill-group-${gi}`} className="panel panel-hover h-full p-6">
                  <header className="flex items-center gap-3 border-b-2 border-frame pb-4">
                    <span className="grid size-10 place-items-center bg-crimson text-paper">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <h3 id={`skill-group-${gi}`} className="font-display text-xl font-bold">
                      {group.title}
                    </h3>
                    <span className="ml-auto font-mono text-xs text-dim">03.{gi + 1}</span>
                  </header>
                  {group.note && <p className="mt-3 text-sm text-muted">{group.note}</p>}
                  <ul className="mt-4 space-y-1">
                    {group.skills.map((skill) => {
                      const meta = skillLevels[skill.level]
                      const dimmed = filter !== 'all' && filter !== skill.level
                      return (
                        <li
                          key={skill.name}
                          className={`flex items-center justify-between gap-3 py-2 transition-opacity duration-300 ${dimmed ? 'opacity-25' : ''}`}
                        >
                          <span className="flex min-w-0 items-center gap-3">
                            {skill.logo ? (
                              <span className="grid size-8 shrink-0 place-items-center border border-line bg-paper p-1.5 shadow-[2px_2px_0_0_#b60f2c]">
                                <img src={asset(skill.logo)} alt="" width={20} height={20} loading="lazy" decoding="async" className="size-5 object-contain" />
                              </span>
                            ) : (
                              <span aria-hidden className="grid size-8 shrink-0 place-items-center border border-dashed border-line">
                                <span className="size-1.5 bg-crimson" />
                              </span>
                            )}
                            <span className="font-medium">{skill.name}</span>
                          </span>
                          <span className="flex shrink-0 items-center gap-2">
                            <span className="label hidden text-[11px] text-dim sm:inline">{meta.label}</span>
                            <Strokes rank={meta.rank} />
                            <span className="sr-only">— {meta.label}</span>
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              </Reveal>
            )
          })}
        </div>

        {/* ---- currently learning ---- */}
        <Reveal delay={150} className="lg:col-span-4">
          <aside aria-labelledby="learning-title" className="panel relative h-full overflow-hidden !bg-crimson p-6 text-paper sm:p-8">
            <div aria-hidden className="speedlines absolute inset-0 text-paper opacity-[0.12]" />
            <h3 id="learning-title" className="relative font-display text-3xl font-black">
              Currently learning
            </h3>
            <ol className="relative mt-6 space-y-4">
              {profile.currentlyLearning.map((item, i) => (
                <li key={item} className="flex items-baseline gap-4 border-b border-paper/25 pb-4">
                  <span className="font-mono text-xs text-paper/60">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-display text-xl">{item}</span>
                </li>
              ))}
            </ol>
            <p className="relative mt-6 text-sm text-paper/80">
              Still learning, still building<span className="animate-blink">_</span>
            </p>
            {/* a field of spider lilies: pale ones in the mist, vivid red ones in front */}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/85 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-paper/60 blur-xl" />
              {LILY_FIELD.map((l, i) => (
                <div
                  key={i}
                  className="absolute bottom-0 origin-bottom animate-sway motion-reduce:animate-none"
                  style={{ left: l.x, height: l.h, opacity: l.o, animationDelay: `${-i * 0.9}s`, filter: l.blur ? `blur(${l.blur}px)` : undefined }}
                >
                  <SpiderLily seed={l.seed} variant={l.v} stem={l.stem} className="h-full w-auto -translate-x-1/2" />
                </div>
              ))}
            </div>
          </aside>
        </Reveal>
      </div>
    </Chapter>
  )
}
