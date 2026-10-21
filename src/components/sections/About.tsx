import { profile } from '../../data/profile'
import { asset } from '../../lib/asset'
import { SpiderLily } from '../art/SpiderLily'
import { Chapter } from '../ui/Chapter'
import { Placeholder } from '../ui/Placeholder'
import { Reveal } from '../ui/Reveal'

const KANJI_NUMERALS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

/* Varied panel widths make the story read like a manga page, not a list. */
const CHAPTER_SPANS = ['lg:col-span-5', 'lg:col-span-7', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-4', 'lg:col-span-6', 'lg:col-span-6']

export function About() {
  const { intro, chapters } = profile.about
  const written = chapters.filter((c) => c.text.trim())
  const unwritten = chapters.filter((c) => !c.text.trim())
  const favorites = Object.entries(profile.favorites).filter(([, items]) => items.length > 0)
  const { photo, cityPhoto } = profile

  const facts = [
    { label: 'Real name', value: profile.fullName },
    { label: 'Goes by', value: profile.nickname },
    { label: 'Studying', value: profile.role },
    { label: 'School', value: profile.school },
    { label: 'Based in', value: profile.location },
  ].filter((f) => f.value)

  return (
    <Chapter id="about" chapter="01" kicker="About me" title="Beyond the screen" jp="自己紹介">
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-12">
        {/* ---- Panel: introduction ---- */}
        <Reveal className="lg:col-span-7">
          <article className="panel panel-hover h-full overflow-hidden p-6 sm:p-10">
            <div aria-hidden className="tone absolute inset-y-0 right-0 w-1/3 [mask-image:linear-gradient(to_left,#000,transparent)]" />
            <p className="label text-accent">Who's behind HAISE</p>
            <p className="relative mt-5 font-display text-2xl leading-[1.45] text-pretty sm:text-[1.7rem]">
              {intro}
            </p>
            <dl className="relative mt-8 grid gap-x-6 gap-y-4 border-t-2 border-frame pt-6 sm:grid-cols-2">
              {facts.map((f) => (
                <div key={f.label} className={f.label === 'Real name' ? 'sm:col-span-2' : ''}>
                  <dt className="label text-xs text-dim">{f.label}</dt>
                  <dd className={f.label === 'Real name' ? 'mt-1 font-display text-2xl font-bold' : 'mt-1 font-medium'}>{f.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </Reveal>

        {/* ---- Panel: portrait ---- */}
        {photo.src && (
          <Reveal delay={120} className="lg:col-span-5">
            <figure className="panel panel-hover group h-full overflow-hidden">
              <div className="relative h-full min-h-[460px]">
                <img
                  src={asset(photo.src)}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover object-[50%_30%] grayscale-[0.9] contrast-[1.15] transition-[filter,transform] duration-700 ease-ink group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:contrast-100"
                />
                <div aria-hidden className="absolute inset-0 bg-crimson mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" style={{ opacity: 0.35 }} />
                <div aria-hidden className="tone absolute inset-0 opacity-60 mix-blend-overlay" />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-void/90 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-paper">
                  <p className="label text-xs text-paper/70">Plate 00 · 本人</p>
                  <p className="mt-1 font-display text-xl italic">The person behind the ink.</p>
                </figcaption>
                <span lang="ja" aria-hidden className="absolute top-4 right-4 font-jp text-lg font-bold text-paper vertical">
                  {profile.nicknameJp}
                </span>
              </div>
            </figure>
          </Reveal>
        )}

        {/* ---- Panel: neon city photograph ---- */}
        <Reveal className="lg:col-span-8">
          <figure className="panel panel-hover group overflow-hidden">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={asset(cityPhoto.src)}
                alt={cityPhoto.alt}
                width={cityPhoto.width}
                height={cityPhoto.height}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-[1.2s] ease-ink group-hover:scale-[1.04]"
              />
              <div aria-hidden className="absolute inset-0 shadow-[inset_0_0_120px_40px_rgb(16_14_17/0.75)]" />
              <div aria-hidden className="absolute inset-0 bg-pink/0 mix-blend-screen transition-colors duration-700 group-hover:bg-pink/10" />
            </div>
            <figcaption className="flex items-center justify-between gap-4 border-t-2 border-frame bg-panel px-5 py-3">
              <span className="label text-xs text-dim">Plate 01</span>
              <span className="font-display text-lg italic">{cityPhoto.caption}</span>
              <span lang="ja" className="font-jp text-sm text-accent">
                {cityPhoto.captionJp}
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {/* ---- Panel: quote (beside the photo) ---- */}
        {profile.quote.text && (
          <Reveal delay={120} className="lg:col-span-4">
            <figure className="panel relative flex h-full min-h-[280px] flex-col justify-center overflow-hidden bg-bg-2 px-7 py-10">
              <div aria-hidden className="speedlines absolute inset-0 text-stroke opacity-[0.08]" />
              <SpiderLily
                seed={9}
                variant="ink"
                stem={200}
                className="pointer-events-none absolute -right-10 -bottom-10 h-[58%] w-auto text-stroke opacity-40"
              />
              <span aria-hidden className="relative font-display text-7xl leading-none text-crimson">“</span>
              <blockquote className="relative -mt-4">
                <p className="font-display text-[clamp(1.7rem,2.6vw,2.4rem)] leading-tight font-semibold italic text-balance">
                  {profile.quote.text}
                </p>
              </blockquote>
              <figcaption className="label relative mt-6 text-dim">— {profile.quote.author}</figcaption>
            </figure>
          </Reveal>
        )}

        {/* ---- Panels: story chapters ---- */}
        {written.map((chapter, i) => {
          const emphasis = i === written.length - 1
          return (
            <Reveal key={chapter.title} delay={(i % 3) * 80} className={CHAPTER_SPANS[i % CHAPTER_SPANS.length]}>
              <article
                className={`panel panel-hover h-full overflow-hidden p-6 sm:p-8 ${emphasis ? '!bg-crimson text-paper' : ''}`}
              >
                <span
                  lang="ja"
                  aria-hidden
                  className={`pointer-events-none absolute -top-3 right-3 font-jp text-[6.5rem] leading-none font-extrabold select-none ${
                    emphasis ? 'text-paper/15' : 'text-fg/[0.06]'
                  }`}
                >
                  {KANJI_NUMERALS[i] ?? i + 1}
                </span>
                <h3 className="relative font-display text-2xl font-bold">{chapter.title}</h3>
                <p className={`relative mt-3 leading-relaxed ${emphasis ? 'text-paper/90' : 'text-muted'}`}>{chapter.text}</p>
              </article>
            </Reveal>
          )
        })}

        {/* ---- Favorites (hidden until filled) ---- */}
        {favorites.length > 0 && (
          <Reveal className="lg:col-span-12">
            <div className="panel grid gap-6 p-6 sm:grid-cols-3 sm:p-8">
              {favorites.map(([key, items]) => (
                <div key={key}>
                  <p className="label text-accent">{key}</p>
                  <ul className="mt-3 space-y-1.5">
                    {items.map((item) => (
                      <li key={item} className="font-display text-lg">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>

      {(unwritten.length > 0 || favorites.length === 0) && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {unwritten.length > 0 && (
            <Placeholder file="src/data/profile.ts → about.chapters">
              <p className="mb-2">Tell your story in your own words. Still empty:</p>
              <ul className="list-inside list-disc space-y-1">
                {unwritten.map((c) => (
                  <li key={c.title}>
                    <strong className="font-medium text-fg">{c.title}</strong>: {c.prompt}
                  </li>
                ))}
              </ul>
            </Placeholder>
          )}
          {favorites.length === 0 && (
            <Placeholder file="src/data/profile.ts → favorites">
              Optional: add favorite music, anime, or inspirations and a panel for them appears here.
            </Placeholder>
          )}
        </div>
      )}
    </Chapter>
  )
}
