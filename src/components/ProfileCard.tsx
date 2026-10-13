import { Clapperboard, Music2, Quote, Sparkles } from 'lucide-react'
import { profile } from '../data/profile'
import { LogoMark } from './Logo'
import { Placeholder } from './Placeholder'

const favoriteGroups = [
  { key: 'music', label: 'Music', icon: Music2 },
  { key: 'anime', label: 'Anime', icon: Clapperboard },
  { key: 'inspiration', label: 'Inspiration', icon: Sparkles },
] as const

export function ProfileCard() {
  const { nickname, nicknameJp, role, location, photo, quote, favorites } = profile
  const filledFavorites = favoriteGroups.filter((g) => favorites[g.key].length > 0)

  return (
    <aside
      aria-label={`${nickname} at a glance`}
      className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-ink-800/80 to-ink-850/60 p-6 sm:p-8"
    >
      <div aria-hidden className="absolute -top-24 -right-24 size-56 rounded-full bg-accent-2/10 blur-3xl" />

      <div className="relative flex items-center gap-4">
        {photo ? (
          <img src={photo} alt={`Photo of ${nickname}`} className="size-16 rounded-2xl border border-line-strong object-cover" />
        ) : (
          <div className="relative grid size-16 place-items-center rounded-2xl border border-line-strong bg-ink-900">
            <LogoMark className="size-9" />
            <span aria-hidden className="absolute inset-[-5px] rounded-[20px] border border-dashed border-accent/25" />
          </div>
        )}
        <div>
          <p className="font-display text-xl font-semibold tracking-wide text-fg">
            {nickname}
            {nicknameJp && (
              <span lang="ja" aria-hidden className="ml-2 font-jp text-xs font-normal tracking-[0.2em] text-dim">
                {nicknameJp}
              </span>
            )}
          </p>
          <p className="text-sm text-muted">{role}</p>
          <p className="text-sm text-muted">{location}</p>
        </div>
      </div>

      {quote.text && (
        <figure className="relative mt-8 border-l border-accent/50 pl-5">
          <Quote aria-hidden className="absolute -top-1 -left-3 size-5 bg-ink-850 text-accent" />
          <blockquote className="font-display text-lg leading-snug text-fg/90">“{quote.text}”</blockquote>
          {quote.author && (
            <figcaption className="mt-2 font-mono text-xs tracking-[0.2em] text-dim">— {quote.author}</figcaption>
          )}
        </figure>
      )}

      {filledFavorites.length > 0 ? (
        <dl className="relative mt-8 space-y-4 border-t border-line pt-6">
          {filledFavorites.map(({ key, label, icon: Icon }) => (
            <div key={key} className="flex gap-3">
              <dt className="flex w-28 shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-dim">
                <Icon aria-hidden className="size-3.5" />
                {label}
              </dt>
              <dd className="text-sm text-fg/85">{favorites[key].join(', ')}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <div className="relative mt-8">
          <Placeholder file="src/data/profile.ts → favorites">
            Add your favorite music, anime, or inspirations, and they'll appear here.
          </Placeholder>
        </div>
      )}
    </aside>
  )
}
