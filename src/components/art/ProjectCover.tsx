import { useId, useMemo, type ReactElement } from 'react'
import type { ProjectArt } from '../../data/types'
import { seeded } from '../../lib/asset'
import { SpiderLily } from './SpiderLily'

/**
 * Original abstract cover art for each project — shown until real screenshots
 * are added to src/data/projects.ts. Never a fake screenshot.
 */
const C = '#b60f2c'

const kanji: Record<ProjectArt, { char: string; meaning: string }> = {
  seek: { char: '探', meaning: 'search' },
  nav: { char: '案内', meaning: 'guide' },
  lily: { char: '頁', meaning: 'page' },
  wave: { char: '制御', meaning: 'control' },
  pulse: { char: '薬', meaning: 'medicine' },
  calc: { char: '計', meaning: 'calculate' },
  games: { char: '遊', meaning: 'play' },
}

function Seek({ seed }: { seed: number }) {
  const items = useMemo(() => {
    const r = seeded(seed)
    return Array.from({ length: 9 }, () => ({ x: 60 + r() * 520, y: 50 + r() * 300, s: 10 + r() * 16, k: Math.floor(r() * 3) }))
  }, [seed])
  return (
    <>
      {items.map((it, i) =>
        it.k === 0 ? (
          <rect key={i} x={it.x} y={it.y} width={it.s} height={it.s * 1.7} rx="3" strokeOpacity=".55" />
        ) : it.k === 1 ? (
          <circle key={i} cx={it.x} cy={it.y} r={it.s / 1.6} strokeOpacity=".55" />
        ) : (
          <path key={i} d={`M${it.x} ${it.y} l${it.s} 0 l-${it.s / 2} ${it.s} Z`} strokeOpacity=".55" />
        ),
      )}
      <path d="M90 330 C 180 250, 220 300, 300 230 S 380 170, 330 200" stroke={C} strokeWidth="2" strokeDasharray="2 8" />
      <circle cx="350" cy="175" r="78" strokeWidth="5" />
      <circle cx="350" cy="175" r="66" strokeOpacity=".35" />
      <path d="M405 232 L470 300" strokeWidth="14" strokeLinecap="round" />
      <rect x="333" y="150" width="30" height="50" rx="4" fill={C} stroke="none" />
    </>
  )
}

function Nav({ seed }: { seed: number }) {
  const qr = useMemo(() => {
    const r = seeded(seed)
    return Array.from({ length: 64 }, (_, i) => ({ x: i % 8, y: Math.floor(i / 8), on: r() > 0.5 }))
  }, [seed])
  return (
    <>
      <path d="M70 60 H420 V340 H70 Z" strokeWidth="3" />
      <path d="M70 150 H200 V60 M200 150 V250 H70 M260 60 V180 H420 M260 180 V340 M200 250 H260 M330 180 V250 H420" strokeOpacity=".7" />
      {[95, 130, 165].map((y) => (
        <rect key={y} x="350" y={y - 20} width="50" height="18" strokeOpacity=".5" />
      ))}
      <path d="M120 330 V290 H230 V215 H300 V125 H375" stroke={C} strokeWidth="3.5" strokeDasharray="10 7" />
      <circle cx="120" cy="330" r="8" fill="currentColor" stroke="none" />
      <circle cx="375" cy="125" r="11" fill={C} stroke="none" />
      <g transform="translate(470 80)">
        <rect x="-8" y="-8" width="112" height="112" strokeWidth="2" />
        {qr.map((c, i) => (c.on ? <rect key={i} x={c.x * 12} y={c.y * 12} width="12" height="12" fill="currentColor" stroke="none" /> : null))}
        {[
          [0, 0],
          [60, 0],
          [0, 60],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width="36" height="36" style={{ fill: 'var(--t-panel)' }} strokeWidth="5" />
            <rect x={x + 11} y={y + 11} width="14" height="14" fill={C} stroke="none" />
          </g>
        ))}
      </g>
      <text x="470" y="245" className="label" fill="currentColor" stroke="none" fontSize="15">
        WINDOW 03 →
      </text>
    </>
  )
}

function Pages() {
  return (
    <>
      <g strokeWidth="3">
        <path d="M60 50 H330 V200 H60 Z" />
        <path d="M60 215 H190 V350 H60 Z" />
        <path d="M205 215 H330 V350 H205 Z" />
      </g>
      <g strokeOpacity=".3">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={80} x2={300 - (i % 3) * 40} y1={75 + i * 13} y2={75 + i * 13} />
        ))}
      </g>
      <text x="80" y="185" style={{ fontFamily: 'var(--font-display)' }} fontSize="62" fontWeight="900" fill="currentColor" stroke="none" letterSpacing="-2">
        HAISE<tspan fill={C}>.</tspan>
      </text>
    </>
  )
}

function Wave() {
  const d = useMemo(() => {
    const pts: string[] = []
    for (let i = 0; i <= 120; i++) {
      const t = i / 120
      const x = 70 + t * 520
      const y = 300 - 150 * (1 - Math.exp(-4.2 * t) * Math.cos(15 * t))
      pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`)
    }
    return `M${pts.join(' L')}`
  }, [])
  return (
    <>
      <path d="M70 50 V300 H600" strokeWidth="2.5" />
      <line x1="70" x2="600" y1="150" y2="150" strokeDasharray="8 8" strokeOpacity=".6" />
      <path d={d} stroke={C} strokeWidth="4" />
      <path d="M70 300 V150 H600" stroke="#56c8ca" strokeOpacity=".7" strokeWidth="1.5" strokeDasharray="2 6" />
      <text x="560" y="140" fill="currentColor" stroke="none" fontSize="14" className="label">
        SP
      </text>
    </>
  )
}

function Pulse() {
  return (
    <>
      <circle cx="210" cy="190" r="110" strokeWidth="4" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2
        return <line key={i} x1={210 + Math.cos(a) * 92} y1={190 + Math.sin(a) * 92} x2={210 + Math.cos(a) * 102} y2={190 + Math.sin(a) * 102} />
      })}
      <path d="M210 190 V115 M210 190 L262 220" strokeWidth="5" strokeLinecap="round" />
      <circle cx="210" cy="190" r="7" fill={C} stroke="none" />
      <path d="M340 220 H400 L418 170 L440 270 L462 140 L482 220 H600" stroke={C} strokeWidth="4" />
      <g transform="rotate(-30 470 320)">
        <rect x="430" y="305" width="80" height="30" rx="15" strokeWidth="2.5" />
        <path d="M470 305 V335" />
        <rect x="470" y="306.5" width="38.5" height="27" rx="13" fill={C} stroke="none" />
      </g>
    </>
  )
}

function Calc() {
  const keys = ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', '.', '=', '+']
  return (
    <g transform="rotate(-6 250 200)">
      <rect x="150" y="40" width="200" height="320" rx="18" strokeWidth="3" />
      <rect x="172" y="62" width="156" height="58" rx="6" />
      <text x="316" y="104" textAnchor="end" fill="currentColor" stroke="none" fontSize="30" style={{ fontFamily: 'var(--font-mono)' }}>
        128+64
      </text>
      {keys.map((k, i) => {
        const x = 172 + (i % 4) * 40
        const y = 140 + Math.floor(i / 4) * 52
        const eq = k === '='
        return (
          <g key={k}>
            <rect x={x} y={y} width="32" height="42" rx="5" fill={eq ? C : 'none'} stroke={eq ? 'none' : 'currentColor'} />
            <text x={x + 16} y={y + 28} textAnchor="middle" fill="currentColor" stroke="none" fontSize="17" style={{ fontFamily: 'var(--font-mono)' }}>
              {k}
            </text>
          </g>
        )
      })}
    </g>
  )
}

function Games() {
  const block = (x: number, y: number, fill?: string) => <rect key={`${x}-${y}`} x={x} y={y} width="30" height="30" fill={fill ?? 'none'} strokeWidth="2.2" />
  return (
    <>
      {/* falling-block puzzle */}
      <g>
        {[
          [60, 310], [90, 310], [120, 310], [150, 310], [60, 280], [90, 280], [150, 280], [180, 310], [180, 280], [120, 250],
        ].map(([x, y]) => block(x, y))}
        {[[90, 220], [120, 220], [150, 220], [120, 190]].map(([x, y]) => block(x, y, C))}
        <path d="M120 150 V178" strokeDasharray="3 5" />
      </g>
      {/* slot reels */}
      <g transform="translate(205 70)">
        <rect x="0" y="0" width="190" height="96" rx="10" strokeWidth="3" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={14 + i * 58} y="14" width="48" height="68" rx="4" />
            <text x={38 + i * 58} y="64" textAnchor="middle" fill={i === 1 ? C : 'currentColor'} stroke="none" fontSize="38" fontWeight="700" style={{ fontFamily: 'var(--font-display)' }}>
              7
            </text>
          </g>
        ))}
        <path d="M206 18 V70" strokeWidth="3" />
        <circle cx="206" cy="14" r="8" fill={C} stroke="none" />
      </g>
      {/* space shooter */}
      <g transform="translate(420 275)">
        <path d="M0 40 L22 -10 L44 40 L22 28 Z" strokeWidth="2.6" />
        <path d="M22 -20 V-60 M22 -80 V-110" stroke={C} strokeWidth="3" />
        <path d="M-30 -150 h24 v12 h-24 z M40 -170 h24 v12 h-24 z" />
      </g>
      {/* maze dots */}
      <g fill="currentColor" stroke="none">
        {Array.from({ length: 9 }, (_, i) => (
          <circle key={i} cx={260 + i * 24} cy="230" r={i === 8 ? 7 : 3} />
        ))}
      </g>
      <path d="M240 205 H470 V255 H240" strokeOpacity=".5" />
    </>
  )
}

export function ProjectCover({ art, className }: { art: ProjectArt; className?: string }) {
  const id = useId().replace(/:/g, '')
  const k = kanji[art]
  const body: Record<ProjectArt, ReactElement> = {
    seek: <Seek seed={3} />,
    nav: <Nav seed={8} />,
    lily: <Pages />,
    wave: <Wave />,
    pulse: <Pulse />,
    calc: <Calc />,
    games: <Games />,
  }

  return (
    <div className={`relative overflow-hidden bg-panel-2 text-stroke ${className ?? ''}`}>
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" aria-hidden focusable="false">
        <defs>
          <pattern id={`tone-${id}`} width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="3.5" cy="3.5" r="1.1" fill="currentColor" opacity=".16" />
          </pattern>
          <linearGradient id={`fade-${id}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={`m-${id}`}>
            <rect width="640" height="400" fill={`url(#fade-${id})`} />
          </mask>
        </defs>
        <rect width="640" height="400" fill={`url(#tone-${id})`} mask={`url(#m-${id})`} />
        <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {body[art]}
        </g>
      </svg>

      {art === 'lily' && (
        <SpiderLily seed={4} stem={120} className="absolute right-[6%] bottom-[-8%] h-[105%] w-auto animate-sway motion-reduce:animate-none" />
      )}

      <span lang="ja" aria-hidden className="absolute top-3 right-3 bg-bg/85 px-1.5 py-2 font-jp text-2xl font-bold text-fg vertical sm:text-3xl">
        {k.char}
      </span>
    </div>
  )
}
