import { ArrowUp } from 'lucide-react'
import { navLinks, profile } from '../../data/profile'

/** The footer keeps its own editorial type: Bodoni Moda + Inter, with a mono "Back to top". */
export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden border-t-2 border-frame bg-bg-2 font-inter">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <p className="font-editorial text-2xl leading-snug italic">{profile.footerMessage}</p>
            <p lang="ja" aria-hidden className="mt-3 font-jp text-sm tracking-[0.3em] text-dim">
              {profile.hero.taglineJp}
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-sm text-muted transition-colors hover:text-accent">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a href="#home" className="btn btn-ghost self-start font-mono text-[0.78rem] font-medium tracking-[0.16em] lg:self-auto">
            <ArrowUp aria-hidden className="size-4" />
            Back to top
          </a>
        </div>

        <p
          aria-hidden
          className="pointer-events-none mt-10 font-editorial text-[clamp(5rem,22vw,20rem)] leading-[0.78] font-black tracking-[-0.04em] text-outline select-none"
        >
          {profile.nickname}
          <span className="text-crimson [-webkit-text-stroke:0]">.</span>
        </p>

        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 text-xs text-dim sm:flex-row sm:justify-between">
          <p>
            © {year} {profile.fullName} · {profile.nickname}
          </p>
          <p>Ink, paper &amp; crimson. All artwork on this site is original.</p>
        </div>
      </div>
    </footer>
  )
}
