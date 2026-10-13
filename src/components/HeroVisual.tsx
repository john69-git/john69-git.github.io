import { profile } from '../data/profile'
import { CurrentlyLearning } from './CurrentlyLearning'
import { NightLandscape } from './NightLandscape'

/** The framed artwork beside the hero text: your photo if set, otherwise an animated night landscape. */
export function HeroVisual() {
  const { photo, nickname, fullName, nicknameJp, location } = profile

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-ink-850 shadow-[0_40px_120px_-40px_rgb(91_140_255/0.35)]">
        {photo ? (
          <img
            src={photo}
            alt={`Photo of ${fullName || nickname}`}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-top brightness-[0.9] saturate-[0.9]"
          />
        ) : (
          <NightLandscape />
        )}

        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-ink-950/30" />

        {/* HUD details */}
        <div aria-hidden className="pointer-events-none absolute inset-4 font-mono text-[10px] uppercase tracking-[0.25em] text-fg/60">
          <span className="hud-corner left-0 top-0 border-l border-t" />
          <span className="hud-corner right-0 top-0 border-r border-t" />
          <span className="hud-corner bottom-0 left-0 border-b border-l" />
          <span className="hud-corner bottom-0 right-0 border-b border-r" />

          <span className="absolute left-6 top-5">sig // {nickname}</span>
          <span className="absolute right-6 top-5 flex items-center gap-2">
            <span className="size-1.5 animate-pulse rounded-full bg-accent" />
            live
          </span>
          <span className="absolute bottom-5 left-6">loc // {location}</span>
          {nicknameJp && (
            <span
              lang="ja"
              className="absolute right-5 bottom-14 font-jp text-sm tracking-[0.6em] text-fg/70 [writing-mode:vertical-rl]"
            >
              {nicknameJp}
            </span>
          )}
        </div>
      </div>

      <div className="absolute -bottom-6 left-4 sm:-left-6">
        <CurrentlyLearning />
      </div>
    </div>
  )
}
