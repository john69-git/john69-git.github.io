import { useMemo } from 'react'
import { seeded } from '../../lib/asset'

/**
 * Original abstract watercolor bleed — overlapping blobs run through the
 * #watercolor filter, with optional spatter dots and paint drips.
 */
interface InkSplashProps {
  seed?: number
  color?: string
  /** A second, thinner wash color (used sparingly — cyan / lilac / pink). */
  accent?: string
  drips?: number
  spatter?: number
  className?: string
}

export function InkSplash({ seed = 1, color = '#b60f2c', accent, drips = 0, spatter = 14, className }: InkSplashProps) {
  const art = useMemo(() => {
    const rand = seeded(seed * 7919)
    const blobs = Array.from({ length: 7 }, (_, i) => ({
      cx: 200 + (rand() - 0.5) * (i === 0 ? 40 : 190),
      cy: 200 + (rand() - 0.5) * (i === 0 ? 40 : 170),
      rx: (i === 0 ? 120 : 40) + rand() * 70,
      ry: (i === 0 ? 105 : 30) + rand() * 60,
      rot: rand() * 180,
      o: i === 0 ? 0.9 : 0.35 + rand() * 0.45,
    }))
    const accentBlobs = Array.from({ length: 2 }, () => ({
      cx: 120 + rand() * 160,
      cy: 120 + rand() * 160,
      rx: 30 + rand() * 50,
      ry: 18 + rand() * 30,
      rot: rand() * 180,
    }))
    const dots = Array.from({ length: spatter }, () => {
      const a = rand() * Math.PI * 2
      const d = 150 + rand() * 70
      return { cx: 200 + Math.cos(a) * d, cy: 200 + Math.sin(a) * d * 0.85, r: 0.8 + rand() * 4 }
    })
    const dripList = Array.from({ length: drips }, () => ({
      x: 120 + rand() * 170,
      y: 250 + rand() * 40,
      h: 60 + rand() * 120,
      w: 1.5 + rand() * 3.5,
      delay: rand() * 1.2,
    }))
    return { blobs, accentBlobs, dots, dripList }
  }, [seed, drips, spatter])

  return (
    <svg viewBox="0 0 400 520" className={className} aria-hidden focusable="false" overflow="visible">
      <g filter="url(#watercolor)">
        {art.blobs.map((b, i) => (
          <ellipse key={i} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} transform={`rotate(${b.rot} ${b.cx} ${b.cy})`} fill={color} opacity={b.o} />
        ))}
      </g>
      {accent && (
        <g filter="url(#watercolor-soft)" style={{ mixBlendMode: 'screen' }}>
          {art.accentBlobs.map((b, i) => (
            <ellipse key={i} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} transform={`rotate(${b.rot} ${b.cx} ${b.cy})`} fill={accent} opacity="0.45" />
          ))}
        </g>
      )}
      <g fill={color}>
        {art.dots.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} opacity={0.5 + (i % 3) * 0.2} />
        ))}
      </g>
      <g fill={color}>
        {art.dripList.map((d, i) => (
          <g key={i} className="animate-drip" style={{ animationDelay: `${d.delay}s`, transformBox: 'fill-box' }}>
            <rect x={d.x} y={d.y} width={d.w} height={d.h} rx={d.w / 2} />
            <circle cx={d.x + d.w / 2} cy={d.y + d.h} r={d.w * 0.95} />
          </g>
        ))}
      </g>
    </svg>
  )
}
