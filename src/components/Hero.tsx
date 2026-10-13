import { ArrowDown, ArrowRight, GraduationCap, MapPin, User } from 'lucide-react'
import { profile } from '../data/profile'
import { HeroVisual } from './HeroVisual'

export function Hero() {
  const { hero, nickname, fullName, role, location } = profile

  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 lg:pt-24"
    >
      {/* ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent-3/10 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-0 h-[380px] w-[480px] rounded-full bg-accent-2/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-8">
        <div>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
            <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-accent" />
            {hero.eyebrow}
          </p>

          <h1
            id="home-title"
            className="mt-7 font-display text-[2.9rem] leading-[1.02] font-semibold tracking-tight text-fg sm:text-6xl lg:text-7xl"
          >
            {hero.greeting} <span className="text-gradient">{nickname}</span>.
          </h1>

          {fullName && (
            <p className="mt-4 flex items-center gap-3 font-display text-lg tracking-wide text-fg/80 sm:text-xl">
              <span aria-hidden className="h-px w-6 bg-accent/60" />
              {fullName}
            </p>
          )}

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{hero.intro}</p>

          <p className="mt-6 font-mono text-sm text-fg/85">
            <span aria-hidden className="mr-2 text-accent">
              &gt;
            </span>
            <span className="caret">{hero.tagline}</span>
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-fg px-6 py-3.5 text-sm font-semibold text-ink-950 transition hover:bg-white hover:shadow-[0_0_40px_-8px_rgb(110_226_245/0.6)]"
            >
              Explore My Portfolio
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line-strong bg-ink-850/60 px-6 py-3.5 text-sm font-semibold text-fg transition hover:border-accent/50 hover:bg-ink-800"
            >
              <User aria-hidden className="size-4 text-accent" />
              Get to Know Me
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <li className="flex items-center gap-2">
              <GraduationCap aria-hidden className="size-4 text-dim" />
              {role}
            </li>
            <li className="flex items-center gap-2">
              <MapPin aria-hidden className="size-4 text-dim" />
              {location}
            </li>
          </ul>
        </div>

        <HeroVisual />
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 rounded-lg p-2 font-mono text-[10px] uppercase tracking-[0.3em] text-dim transition-colors hover:text-fg md:flex"
      >
        Scroll
        <ArrowDown aria-hidden className="float-y size-4" />
      </a>
    </section>
  )
}
