import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { useState } from 'react'
import { profile } from '../../data/profile'
import { SpiderLily } from '../art/SpiderLily'
import { Chapter } from '../ui/Chapter'
import { Placeholder } from '../ui/Placeholder'
import { Reveal } from '../ui/Reveal'
import { SocialIcon } from '../ui/SocialIcon'

type BottomLily = { x: string; h: string; stem: number; seed: number; v: 'ghost' | 'vivid' | 'crimson'; o: number; blur?: number; wide?: boolean }

/** Back to front. `wide` lilies only appear on tablets and up, so phones stay uncluttered. */
const BOTTOM_LILIES: BottomLily[] = [
  // misty white lilies at the back
  { x: '3%', h: '78%', stem: 230, seed: 41, v: 'ghost', o: 0.45, blur: 1.2 },
  { x: '17%', h: '64%', stem: 190, seed: 42, v: 'ghost', o: 0.4, blur: 1.6, wide: true },
  { x: '31%', h: '50%', stem: 150, seed: 43, v: 'ghost', o: 0.32, blur: 1.8, wide: true },
  { x: '68%', h: '56%', stem: 170, seed: 44, v: 'ghost', o: 0.36, blur: 1.6, wide: true },
  { x: '84%', h: '82%', stem: 250, seed: 45, v: 'ghost', o: 0.45, blur: 1.2 },
  { x: '97%', h: '62%', stem: 180, seed: 46, v: 'ghost', o: 0.4, blur: 1.4 },
  // deep crimson lilies in the middle distance
  { x: '11%', h: '58%', stem: 170, seed: 47, v: 'crimson', o: 0.75, wide: true },
  { x: '90%', h: '52%', stem: 150, seed: 48, v: 'crimson', o: 0.75 },
  { x: '48%', h: '34%', stem: 90, seed: 49, v: 'crimson', o: 0.55, wide: true },
  // vivid red lilies in front
  { x: '7%', h: '92%', stem: 270, seed: 50, v: 'vivid', o: 1 },
  { x: '23%', h: '58%', stem: 160, seed: 51, v: 'vivid', o: 0.95, wide: true },
  { x: '76%', h: '70%', stem: 200, seed: 52, v: 'vivid', o: 0.95, wide: true },
  { x: '93%', h: '96%', stem: 290, seed: 53, v: 'vivid', o: 1 },
  // a few white ones in front, catching the light
  { x: '15%', h: '40%', stem: 110, seed: 54, v: 'ghost', o: 0.9 },
  { x: '83%', h: '44%', stem: 120, seed: 55, v: 'ghost', o: 0.9, wide: true },
]

export function Contact() {
  const { heading, text, email, socials } = profile.contact
  const links = socials.filter((s) => s.url.trim())
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  }

  return (
    <Chapter
      id="contact"
      chapter="終"
      kicker="Contact"
      title={heading}
      jp="つながろう"
      description={text}
      className="overflow-hidden !pb-56 sm:!pb-72"
    >
      {/* a field of spider lilies along the bottom edge: misty white ones behind, vivid red in front,
          gathered toward the sides so they frame the contact cards instead of covering them */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[300px] overflow-hidden sm:h-[380px]">
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-crimson/15 to-transparent" />
        {BOTTOM_LILIES.map((l, i) => (
          <div
            key={i}
            className={`absolute bottom-[-6px] origin-bottom animate-sway motion-reduce:animate-none ${l.wide ? 'hidden sm:block' : ''}`}
            style={{ left: l.x, height: l.h, opacity: l.o, animationDelay: `${-i * 0.7}s`, filter: l.blur ? `blur(${l.blur}px)` : undefined }}
          >
            <SpiderLily seed={l.seed} variant={l.v} stem={l.stem} className="h-full w-auto -translate-x-1/2" />
          </div>
        ))}
      </div>
      <div className="relative grid gap-4 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="panel h-full p-6 sm:p-10">
            <p className="label text-dim">Write to me</p>
            {email ? (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
                <a href={`mailto:${email}`} className="btn btn-primary justify-start normal-case tracking-normal">
                  <Mail aria-hidden className="size-5 shrink-0" />
                  <span className="font-sans text-base break-all">{email}</span>
                </a>
                <button type="button" onClick={copyEmail} className="btn btn-ghost">
                  {copied ? <Check aria-hidden className="size-4 text-accent" /> : <Copy aria-hidden className="size-4" />}
                  {copied ? 'Copied' : 'Copy email'}
                </button>
                <span className="sr-only" aria-live="polite">
                  {copied ? 'Email address copied to clipboard' : ''}
                </span>
              </div>
            ) : (
              <>
                <p className="mt-6 font-display text-2xl italic text-muted text-pretty">
                  The fastest way to reach me right now is through the profiles listed here.
                </p>
                {links[0] && (
                  <a href={links[0].url} target="_blank" rel="noreferrer me" className="btn btn-primary mt-8">
                    <SocialIcon name={links[0].icon} className="size-4" />
                    Find me on {links[0].label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </>
            )}
            <p lang="ja" aria-hidden className="mt-10 font-jp text-sm tracking-[0.4em] text-dim">
              また会いましょう
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-5">
          <ul className="grid h-full content-start gap-3">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer me"
                  className="panel panel-hover group flex items-center gap-4 px-5 py-4"
                >
                  <span className="grid size-11 place-items-center bg-fg text-bg transition-colors group-hover:bg-crimson group-hover:text-paper">
                    <SocialIcon name={link.icon} />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-xl font-bold">{link.label}</span>
                    {link.handle && <span className="block font-mono text-xs text-dim">{link.handle}</span>}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 text-dim transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {(!email || links.length < socials.length) && (
        <div className="relative mt-6 max-w-2xl">
          <Placeholder file="src/data/profile.ts → contact">
            {!email && 'Add your email address to show the Write-to-me button. '}
            {links.length < socials.length && 'Some social links are still empty (e.g. LinkedIn). '}
            Only filled-in links appear on the live site.
          </Placeholder>
        </div>
      )}
    </Chapter>
  )
}
