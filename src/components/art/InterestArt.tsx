import type { ReactElement } from 'react'
import type { InterestArt as ArtName } from '../../data/types'
import { SpiderLily } from './SpiderLily'

/**
 * Original line-art motifs for the interest cards.
 * Lines use currentColor; crimson marks the "point of focus" in each drawing.
 */
const C = '#b60f2c'

const drawings: Record<Exclude<ArtName, 'lily'>, ReactElement> = {
  monitor: (
    <>
      <rect x="52" y="14" width="96" height="64" rx="3" />
      <rect x="58" y="20" width="84" height="52" strokeOpacity=".4" />
      {[30, 38, 46, 54, 62].map((y) => (
        <line key={y} x1="62" x2="138" y1={y} y2={y} strokeOpacity=".22" />
      ))}
      <circle cx="118" cy="40" r="11" fill={C} stroke="none" />
      <path d="M92 78 L88 98 H112 L108 78" />
      <line x1="72" x2="128" y1="100" y2="100" strokeWidth="2.2" />
    </>
  ),
  code: (
    <>
      <path d="M58 30 L34 60 L58 90" strokeWidth="3" />
      <path d="M142 30 L166 60 L142 90" strokeWidth="3" />
      <path d="M112 22 L88 98" strokeWidth="3" stroke={C} />
      {[44, 56, 68].map((y, i) => (
        <line key={y} x1="66" x2={i === 1 ? 92 : 100} y1={y} y2={y} strokeOpacity=".35" />
      ))}
    </>
  ),
  phone: (
    <>
      <rect x="112" y="16" width="44" height="88" rx="8" strokeDasharray="3 4" strokeOpacity=".5" transform="rotate(8 134 60)" />
      <rect x="74" y="10" width="48" height="98" rx="9" />
      <line x1="90" x2="106" y1="16" y2="16" strokeWidth="2" />
      <rect x="81" y="26" width="34" height="20" strokeOpacity=".5" />
      <rect x="81" y="52" width="34" height="9" strokeOpacity=".35" />
      <rect x="81" y="66" width="22" height="9" strokeOpacity=".35" />
      <circle cx="117" cy="14" r="5" fill={C} stroke="none" />
    </>
  ),
  web: (
    <>
      <rect x="30" y="18" width="120" height="84" rx="3" strokeOpacity=".5" />
      <line x1="30" x2="150" y1="30" y2="30" strokeOpacity=".5" />
      <circle cx="38" cy="24" r="1.8" fill={C} stroke="none" />
      <circle cx="122" cy="66" r="34" />
      <ellipse cx="122" cy="66" rx="14" ry="34" />
      <line x1="88" x2="156" y1="66" y2="66" />
      <path d="M93 48 Q122 56 151 48 M93 84 Q122 76 151 84" strokeOpacity=".6" />
      <circle cx="140" cy="50" r="4" fill={C} stroke="none" />
    </>
  ),
  layout: (
    <>
      <rect x="40" y="12" width="120" height="96" />
      <rect x="40" y="12" width="120" height="12" fill="currentColor" fillOpacity=".12" />
      <rect x="50" y="34" width="50" height="40" />
      <path d="M50 34 L100 74 M100 34 L50 74" strokeOpacity=".35" />
      {[36, 46, 56, 66].map((y) => (
        <line key={y} x1="110" x2={y === 66 ? 132 : 150} y1={y} y2={y} strokeOpacity=".45" />
      ))}
      <rect x="50" y="86" width="40" height="12" fill={C} stroke="none" />
      <path d="M128 96 l8 -10 l2 13 l-4 -3 l-3 5 Z" fill="currentColor" stroke="none" />
    </>
  ),
  circuit: (
    <>
      <rect x="82" y="42" width="36" height="36" strokeWidth="2" />
      {[48, 56, 64, 72].map((y) => (
        <g key={y}>
          <line x1="74" x2="82" y1={y} y2={y} />
          <line x1="118" x2="126" y1={y} y2={y} />
        </g>
      ))}
      <path d="M74 48 H52 V22 H30" />
      <path d="M74 72 H40 V98" />
      <path d="M126 56 H150 V24 H172" />
      <path d="M126 72 H160 V100" />
      <circle cx="30" cy="22" r="3.5" />
      <circle cx="40" cy="100" r="3.5" />
      <circle cx="172" cy="24" r="3.5" />
      <circle cx="160" cy="102" r="5" fill={C} stroke="none" />
    </>
  ),
  spark: (
    <>
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2
        const r1 = 14
        const r2 = i % 2 ? 34 : 48
        return (
          <line
            key={i}
            x1={100 + Math.cos(a) * r1}
            y1={60 + Math.sin(a) * r1}
            x2={100 + Math.cos(a) * r2}
            y2={60 + Math.sin(a) * r2 * 0.92}
            strokeOpacity={i % 2 ? 0.45 : 1}
          />
        )
      })}
      <circle cx="100" cy="60" r="8" fill={C} stroke="none" />
    </>
  ),
  maze: (
    <>
      {/* outer walls: entrance top-left, exit bottom-right */}
      <path d="M40 16 H160 V74.7 M160 104 H40 V45.3" />
      {/* inner walls — the path below only runs through the open corridors */}
      <path d="M40 45.3 H130 M70 74.7 H160 M70 16 V26 M100 45.3 V52 M130 104 V94" strokeOpacity=".7" />
      <path d="M28 30.7 H145 V60 H55 V89.3 H160" stroke={C} strokeWidth="2.4" strokeDasharray="1 5" strokeLinecap="round" />
      <circle cx="172" cy="89.3" r="4" fill={C} stroke="none" />
    </>
  ),
}

export function InterestArt({ art, className }: { art: ArtName; className?: string }) {
  if (art === 'lily') {
    return <SpiderLily variant="ink" seed={21} stem={40} className={className} />
  }
  return (
    <svg
      viewBox="0 0 200 120"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      {drawings[art]}
    </svg>
  )
}
