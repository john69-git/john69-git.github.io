import { useMemo } from 'react'
import { seeded } from '../../lib/asset'

/**
 * An original, procedurally drawn red spider lily (Lycoris radiata):
 * recurved ribbon petals, long arching stamens, and a slender stem.
 * The same seed always draws the same flower.
 *
 *  variant 'crimson' — red petals with dark ink edges
 *  variant 'ink'     — black-and-white manga line art (uses currentColor)
 *  variant 'sketch'  — detailed pen drawing: white petals, black ink, hatched shading,
 *                      a dense crown of stamens and ink spatter (for light backgrounds)
 *  variant 'ghost'   — pale white lily with soft grey lines (misty background flowers)
 *  variant 'vivid'   — bright red lily (foreground flowers on a pale background)
 */
interface SpiderLilyProps {
  seed?: number
  variant?: 'crimson' | 'ink' | 'sketch' | 'ghost' | 'vivid'
  stem?: number
  className?: string
  title?: string
}

type Pt = [number, number]

function ribbon(start: Pt, angleDeg: number, length: number, width: number, curlDeg: number, wobble: number) {
  const steps = 22
  const left: Pt[] = []
  const right: Pt[] = []
  const center: Pt[] = []
  const shadeA: Pt[] = []
  const shadeB: Pt[] = []
  let [x, y] = start
  const dl = length / steps
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const theta = ((angleDeg + curlDeg * t * t) * Math.PI) / 180
    if (i > 0) {
      x += Math.cos(theta) * dl
      y += Math.sin(theta) * dl
    }
    const w = (width * Math.pow(Math.sin(Math.PI * Math.min(t * 1.08, 1)), 0.75) * (1 - 0.45 * t) * (1 + 0.16 * Math.sin(t * 17 + wobble))) / 2
    const nx = -Math.sin(theta)
    const ny = Math.cos(theta)
    left.push([x + nx * w, y + ny * w])
    right.push([x - nx * w, y - ny * w])
    center.push([x, y])
    shadeA.push([x - nx * w * 0.55, y - ny * w * 0.55])
    shadeB.push([x - nx * w * 0.8, y - ny * w * 0.8])
  }
  const f = (p: Pt) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`
  const outline = `M${left.map(f).join(' L')} L${right.reverse().map(f).join(' L')} Z`
  const vein = `M${center.slice(2, -3).map(f).join(' L')}`
  // pen hatching on the shadow side of the petal
  const hatch = `M${shadeA.slice(4, -4).map(f).join(' L')} M${shadeB.slice(3, -6).map(f).join(' L')}`
  const cross = shadeB
    .slice(4, -5)
    .filter((_, i) => i % 2 === 0)
    .map((p, i) => `M${f(p)} L${f(left[i * 2 + 4] ?? p)}`)
    .join(' ')
  return { outline, vein, hatch, cross }
}

function curve(start: Pt, angleDeg: number, length: number, curlDeg: number) {
  const steps = 16
  let [x, y] = start
  const pts: Pt[] = [[x, y]]
  const dl = length / steps
  for (let i = 1; i <= steps; i++) {
    const t = i / steps
    const theta = ((angleDeg + curlDeg * t * t) * Math.PI) / 180
    x += Math.cos(theta) * dl
    y += Math.sin(theta) * dl
    pts.push([x, y])
  }
  return { d: `M${pts.map((p) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' L')}`, tip: pts[pts.length - 1] }
}

export function SpiderLily({ seed = 1, variant = 'crimson', stem = 170, className, title }: SpiderLilyProps) {
  const sketch = variant === 'sketch'
  const art = useMemo(() => {
    const rand = seeded(seed * 9973)
    const jitter = (n: number) => (rand() - 0.5) * n

    // Two rings of petals so the head looks full, like the real umbel (three rings when sketched).
    const petalAngles = [-172, -140, -112, -64, -36, -6, 22, 158, 128, 52, 96, 82]
    if (sketch) petalAngles.push(-150, -90, -50, -20, 170, 140)
    const petals = petalAngles.map((base, i) => {
      const angle = base + jitter(16)
      const side = Math.cos((angle * Math.PI) / 180) >= 0 ? -1 : 1
      const curl = side * (150 + rand() * 70)
      const len = (sketch ? 50 : 42) + rand() * 22 - (i > 8 ? 10 : 0) - (i > 11 ? 8 : 0)
      return ribbon([jitter(6), jitter(5)], angle, len, (sketch ? 9 : 7.5) + rand() * 3.5, curl, rand() * 10)
    })

    const stamenCount = sketch ? 16 : 7
    const stamens = Array.from({ length: stamenCount }, (_, i) => {
      const a0 = (sketch ? -195 : -168) + (i / (stamenCount - 1)) * (sketch ? 210 : 156) + jitter(10)
      const curl = (a0 > -90 ? -1 : 1) * (38 + rand() * 30)
      return curve([jitter(4), jitter(4)], a0, (sketch ? 62 : 78) + rand() * (sketch ? 26 : 32), curl)
    })

    // ink spatter flicked around the bloom
    const spatter = sketch
      ? Array.from({ length: 26 }, () => {
          const a = rand() * Math.PI * 2
          const d = 78 + rand() * 34
          return { x: Math.cos(a) * d, y: Math.sin(a) * d * 0.8 - 10, r: 0.5 + rand() * 1.3 }
        })
      : []

    const sway = jitter(26)
    const stemPath = `M0 6 Q ${(sway * 0.4).toFixed(1)} ${(stem * 0.55).toFixed(1)} ${sway.toFixed(1)} ${stem}`
    return { petals, stamens, spatter, stemPath }
  }, [seed, stem, sketch])

  const ink = variant === 'ink'
  const ghost = variant === 'ghost'
  const vivid = variant === 'vivid'
  const mono = ink || sketch
  const lineColor = sketch ? '#100e11' : 'currentColor'
  const petalFill = sketch ? '#f7f5f0' : ink ? 'var(--t-bg)' : ghost ? '#fbfaf7' : vivid ? '#de1a2e' : '#b60f2c'
  const petalStroke = mono ? lineColor : ghost ? '#a9a299' : vivid ? '#8a0b1c' : '#5a0414'
  const veinStroke = mono ? lineColor : ghost ? '#c4bdb4' : vivid ? '#ff6474' : '#e23b72'
  const stamenStroke = mono ? lineColor : ghost ? '#b8b1a8' : vivid ? '#e3263a' : '#c8213d'

  return (
    <svg
      viewBox={`-120 -125 240 ${125 + stem + 6}`}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      overflow="visible"
    >
      <path
        d={art.stemPath}
        fill="none"
        stroke={mono ? lineColor : ghost ? '#bfb8af' : vivid ? '#a30f22' : '#2a0a10'}
        strokeWidth={sketch ? 3.2 : 2.6}
        strokeLinecap="round"
      />
      {sketch && <path d={art.stemPath} fill="none" stroke="#f7f5f0" strokeWidth="1" strokeLinecap="round" />}
      {!mono && !ghost && <path d={art.stemPath} fill="none" stroke="#7a1022" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />}
      {sketch && (
        <g fill={lineColor}>
          {art.spatter.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} />
          ))}
        </g>
      )}
      <g strokeLinecap="round" fill="none">
        {art.stamens.map((s, i) => (
          <g key={i}>
            <path d={s.d} stroke={stamenStroke} strokeWidth={sketch ? 0.7 : ink ? 0.9 : 1.1} />
            <ellipse
              cx={s.tip[0]}
              cy={s.tip[1]}
              rx={sketch ? 1.8 : 2.1}
              ry={sketch ? 1 : 1.2}
              fill={mono ? lineColor : ghost ? '#bdb7af' : vivid ? '#ff8a96' : '#f1eee8'}
              opacity={mono ? 0.9 : 0.85}
            />
          </g>
        ))}
      </g>
      <g strokeLinejoin="round">
        {art.petals.map((p, i) => (
          <g key={i}>
            <path d={p.outline} style={{ fill: petalFill }} stroke={petalStroke} strokeWidth={sketch ? 0.95 : ink ? 1.1 : 0.8} />
            {sketch && (
              <>
                <path d={p.hatch} fill="none" stroke={lineColor} strokeWidth="0.45" opacity="0.8" />
                <path d={p.cross} fill="none" stroke={lineColor} strokeWidth="0.35" opacity="0.55" />
              </>
            )}
            <path d={p.vein} fill="none" stroke={veinStroke} strokeWidth={mono ? 0.55 : 0.6} opacity={mono ? 0.75 : 0.55} />
          </g>
        ))}
      </g>
      <circle r={sketch ? 5 : 4.2} fill={mono ? lineColor : ghost ? '#d4cec6' : '#5a0414'} />
    </svg>
  )
}

/**
 * The same lily seen from directly above, in the black-and-white pen style:
 * two rings of ribbon petals radiating from the center and curling at the tips,
 * a halo of long stamens fanning outward, hatched shading and a dark heart.
 * Drawn centered on (0, 0), so it sits neatly in the middle of a circle.
 */
export function SpiderLilyTop({ seed = 1, className }: { seed?: number; className?: string }) {
  const art = useMemo(() => {
    const rand = seeded(seed * 7121)
    const jitter = (n: number) => (rand() - 0.5) * n
    const petals: ReturnType<typeof ribbon>[] = []
    // outer ring: long petals, curling (alternately) clockwise / counter-clockwise at the tip
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * 360 + jitter(12)
      petals.push(ribbon([Math.cos((a * Math.PI) / 180) * 6, Math.sin((a * Math.PI) / 180) * 6], a, 58 + rand() * 12, 13 + rand() * 3, (i % 2 ? 1 : -1) * (120 + rand() * 60), rand() * 10))
    }
    // inner ring: shorter petals, offset between the outer ones, curling more tightly
    for (let i = 0; i < 7; i++) {
      const a = ((i + 0.5) / 7) * 360 + jitter(14)
      petals.push(ribbon([Math.cos((a * Math.PI) / 180) * 3, Math.sin((a * Math.PI) / 180) * 3], a, 36 + rand() * 8, 11 + rand() * 2, (i % 2 ? -1 : 1) * (170 + rand() * 60), rand() * 10))
    }
    const stamens = Array.from({ length: 22 }, (_, i) => {
      const a = (i / 22) * 360 + jitter(10)
      return curve([0, 0], a, 92 + rand() * 18, (i % 2 ? 1 : -1) * (24 + rand() * 22))
    })
    const spatter = Array.from({ length: 30 }, () => {
      const a = rand() * Math.PI * 2
      const d = 108 + rand() * 18
      return { x: Math.cos(a) * d, y: Math.sin(a) * d, r: 0.9 + rand() * 1.8 }
    })
    return { petals, stamens, spatter }
  }, [seed])

  const ink = '#100e11'
  return (
    <svg viewBox="-130 -130 260 260" className={className} aria-hidden focusable="false">
      <g fill={ink}>
        {art.spatter.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} />
        ))}
      </g>
      <g fill="none" stroke={ink} strokeLinecap="round">
        {art.stamens.map((s, i) => (
          <g key={i}>
            <path d={s.d} strokeWidth="1.5" />
            <ellipse cx={s.tip[0]} cy={s.tip[1]} rx="3" ry="1.7" fill={ink} stroke="none" />
          </g>
        ))}
      </g>
      <g strokeLinejoin="round">
        {art.petals.map((p, i) => (
          <g key={i}>
            <path d={p.outline} fill="#f7f5f0" stroke={ink} strokeWidth="2.1" />
            <path d={p.hatch} fill="none" stroke={ink} strokeWidth="1.1" opacity="0.95" />
            <path d={p.cross} fill="none" stroke={ink} strokeWidth="0.8" opacity="0.75" />
            <path d={p.vein} fill="none" stroke={ink} strokeWidth="1.1" opacity="0.9" />
          </g>
        ))}
      </g>
      {/* the heart of the flower, with short stamen bases */}
      <circle r="13" fill={ink} />
      <circle r="13" fill="none" stroke="#f7f5f0" strokeWidth="1" strokeDasharray="1.6 2.4" />
      <circle r="3" fill="#f7f5f0" opacity="0.5" />
    </svg>
  )
}
