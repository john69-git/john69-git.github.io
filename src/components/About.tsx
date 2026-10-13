import { profile } from '../data/profile'
import { Placeholder } from './Placeholder'
import { ProfileCard } from './ProfileCard'
import { Reveal } from './Reveal'
import { Section } from './Section'

export function About() {
  const { intro, chapters } = profile.about
  const written = chapters.filter((c) => c.text.trim())
  const unwritten = chapters.filter((c) => !c.text.trim())

  return (
    <Section id="about" index="01" kicker="About me" title="Beyond the screen" jp="自己紹介">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="font-display text-2xl leading-[1.45] text-fg/95 sm:text-[1.75rem]">{intro}</p>
          </Reveal>

          {written.length > 0 && (
            <ol className="mt-14 space-y-10">
              {written.map((chapter, i) => (
                <li key={chapter.title}>
                  <Reveal delay={i * 60} className="grid gap-3 sm:grid-cols-[4rem_1fr]">
                    <span aria-hidden className="font-mono text-xs text-accent/80 sm:pt-1.5">
                      {String(i + 1).padStart(2, '0')} /
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-medium text-fg">{chapter.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted">{chapter.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          )}

          {unwritten.length > 0 && (
            <div className="mt-10">
              <Placeholder file="src/data/profile.ts → about.chapters">
                <p className="mb-2">Tell your story in your own words. Still empty:</p>
                <ul className="list-inside list-disc space-y-1">
                  {unwritten.map((c) => (
                    <li key={c.title}>
                      <strong className="font-medium text-fg/90">{c.title}</strong>: {c.prompt}
                    </li>
                  ))}
                </ul>
              </Placeholder>
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={120} className="lg:sticky lg:top-24">
            <ProfileCard />
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
