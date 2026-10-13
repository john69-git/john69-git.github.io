import { ArrowUp } from 'lucide-react'
import { navLinks, profile } from '../data/profile'
import { LogoMark } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* oversized signature */}
      <p
        aria-hidden
        className="text-outline pointer-events-none absolute inset-x-0 -bottom-[0.18em] text-center font-display text-[24vw] leading-none font-bold tracking-tighter select-none"
      >
        {profile.nickname}
      </p>

      <div className="relative mx-auto max-w-6xl px-4 pt-16 pb-28 sm:px-6 sm:pb-40 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_auto]">
          <div>
            <a href="#home" className="inline-flex items-center gap-3 rounded-lg">
              <LogoMark className="size-9" />
              <span className="font-mono text-sm tracking-[0.3em] text-fg">{profile.nickname}</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{profile.footerMessage}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} className="rounded text-muted transition-colors hover:text-fg">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <a
              href="#home"
              className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-4 py-2.5 text-sm text-fg transition hover:border-accent/50"
            >
              <ArrowUp aria-hidden className="size-4" />
              Back to top
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 font-mono text-xs text-dim sm:flex-row sm:justify-between">
          <p>
            © {year} {profile.nickname}
            {profile.nicknameJp && (
              <span lang="ja" className="ml-2 font-jp">
                {profile.nicknameJp}
              </span>
            )}
          </p>
          <p>{profile.hero.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
