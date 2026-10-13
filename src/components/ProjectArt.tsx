import { useId } from 'react'
import type { AccentHue, ProjectArt as ArtKind } from '../data/types'

const hues: Record<AccentHue, string> = {
  cyan: 'var(--color-accent)',
  violet: 'var(--color-accent-2)',
  blue: 'var(--color-accent-3)',
}

/** PID step response: rises, overshoots, settles on the setpoint. */
const stepResponse = Array.from({ length: 120 }, (_, i) => {
  const t = (i / 119) * 10
  const v = 1 - Math.exp(-0.55 * t) * (Math.cos(2.2 * t) + 0.25 * Math.sin(2.2 * t))
  return `${i ? 'L' : 'M'}${(30 + i * (350 / 119)).toFixed(1)} ${(175 - v * 105).toFixed(1)}`
}).join(' ')

const mapNodes: [number, number][] = [
  [60, 60], [130, 38], [205, 82], [280, 48], [345, 96],
  [92, 138], [170, 166], [252, 148], [322, 182], [45, 192],
]
const mapEdges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 2], [5, 6], [6, 7], [7, 2], [7, 4], [7, 8], [9, 5], [9, 6], [8, 4],
]
const route = [9, 5, 6, 7, 4]

/** Abstract, generated cover art used until a project has real screenshots. */
export function ProjectArt({ art, hue }: { art: ArtKind; hue: AccentHue }) {
  const id = useId()
  const color = hues[hue]

  return (
    <svg
      viewBox="0 0 400 225"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className="absolute inset-0 h-full w-full"
      style={{ color }}
    >
      <defs>
        <radialGradient id={`${id}-glow`} cx="50%" cy="45%" r="65%">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="white" strokeOpacity="0.04" />
        </pattern>
        <linearGradient id={`${id}-sweep`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      <rect width="400" height="225" fill="var(--color-ink-900)" />
      <rect width="400" height="225" fill={`url(#${id}-grid)`} />
      <rect width="400" height="225" fill={`url(#${id}-glow)`} />

      <g fill="none" stroke="currentColor">
        {art === 'wave' && (
          <>
            <line x1="30" y1="70" x2="380" y2="70" strokeOpacity="0.4" strokeDasharray="4 6" />
            <line x1="30" y1="175" x2="380" y2="175" strokeOpacity="0.15" />
            <line x1="30" y1="30" x2="30" y2="190" strokeOpacity="0.15" />
            <path d={stepResponse} strokeWidth="6" strokeOpacity="0.12" />
            <path d={stepResponse} strokeWidth="1.8" />
            <text x="364" y="62" fill="currentColor" stroke="none" fontSize="10" fontFamily="var(--font-mono)" opacity="0.7">
              SP
            </text>
          </>
        )}

        {art === 'nodes' && (
          <>
            {mapEdges.map(([a, b]) => (
              <line key={`${a}-${b}`} x1={mapNodes[a][0]} y1={mapNodes[a][1]} x2={mapNodes[b][0]} y2={mapNodes[b][1]} strokeOpacity="0.18" />
            ))}
            <polyline
              points={route.map((n) => mapNodes[n].join(',')).join(' ')}
              strokeWidth="2"
              strokeDasharray="6 4"
              className="dash-flow"
            />
            {mapNodes.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={route.includes(i) ? 4 : 2.5} fill="var(--color-ink-900)" strokeOpacity={route.includes(i) ? 1 : 0.5} />
            ))}
            <circle cx={mapNodes[4][0]} cy={mapNodes[4][1]} r="12" strokeOpacity="0.4" />
            <circle cx={mapNodes[4][0]} cy={mapNodes[4][1]} r="20" strokeOpacity="0.15" />
          </>
        )}

        {art === 'rings' && (
          <>
            {[22, 46, 70, 94].map((r) => (
              <circle key={r} cx="200" cy="112" r={r} strokeOpacity={0.12 + (94 - r) / 400} />
            ))}
            <line x1="90" y1="112" x2="310" y2="112" strokeOpacity="0.15" />
            <line x1="200" y1="10" x2="200" y2="215" strokeOpacity="0.15" />
            <g className="spin-slow">
              <circle cx="200" cy="112" r="94" stroke="none" />
              <path d="M200 112 L294 112 A94 94 0 0 0 266 45 Z" fill={`url(#${id}-sweep)`} stroke="none" />
            </g>
            <circle cx="200" cy="112" r="5" fill="currentColor" />
            <circle cx="248" cy="80" r="3" fill="currentColor" stroke="none" opacity="0.8" />
            <circle cx="160" cy="150" r="2.5" fill="currentColor" stroke="none" opacity="0.5" />
            <circle cx="236" cy="168" r="2" fill="currentColor" stroke="none" opacity="0.4" />
          </>
        )}

        {art === 'pulse' && (
          <>
            <circle cx="110" cy="112" r="58" strokeOpacity="0.5" />
            <circle cx="110" cy="112" r="70" strokeOpacity="0.12" />
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i / 12) * Math.PI * 2
              const inner = i % 3 === 0 ? 46 : 50
              return (
                <line
                  key={i}
                  x1={110 + Math.cos(a) * inner}
                  y1={112 + Math.sin(a) * inner}
                  x2={110 + Math.cos(a) * 54}
                  y2={112 + Math.sin(a) * 54}
                  strokeOpacity="0.6"
                />
              )
            })}
            <line x1="110" y1="112" x2="110" y2="78" strokeWidth="2" strokeLinecap="round" />
            <line x1="110" y1="112" x2="136" y2="124" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
            <circle cx="110" cy="112" r="3" fill="currentColor" />
            <line x1="200" y1="112" x2="375" y2="112" strokeOpacity="0.2" />
            {[210, 255, 300, 345].map((x, i) => (
              <g key={x}>
                <circle cx={x} cy="112" r={i === 1 ? 6 : 3.5} fill={i === 1 ? 'currentColor' : 'var(--color-ink-900)'} strokeOpacity={i === 1 ? 1 : 0.5} />
                {i === 1 && <circle cx={x} cy="112" r="14" strokeOpacity="0.3" />}
              </g>
            ))}
            <rect x="238" y="58" width="36" height="14" rx="7" strokeOpacity="0.5" />
            <line x1="256" y1="58" x2="256" y2="72" strokeOpacity="0.5" />
            <rect x="300" y="148" width="30" height="12" rx="6" strokeOpacity="0.3" transform="rotate(-20 315 154)" />
          </>
        )}
      </g>
    </svg>
  )
}
