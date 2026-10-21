import { motion } from 'motion/react'
import { useMemo, type CSSProperties } from 'react'

/**
 * Original, procedurally drawn ink centipedes (no traced or copied artwork).
 *
 * Manga pen style: bone-white vertebra-like armor plates with a dark central groove,
 * a shadowed back edge and dense hatching; curved lateral spines; long, thin, jointed
 * legs that ripple in a wave from head to tail. Lines use currentColor, so the
 * creature is paper-white on the dark theme and black ink on the light theme.
 *
 *  <Centipede />        — the large hero centipede (both ends run off the canvas)
 *  <CentipedeFigure />  — any shape: pass a spine, size and whether it has a head
 */

export type Pt = { x: number; y: number }

const f = (n: number) => n.toFixed(1)
const add = (a: Pt, b: Pt, k = 1): Pt => ({ x: a.x + b.x * k, y: a.y + b.y * k })
const rot = (v: Pt, deg: number): Pt => {
  const r = (deg * Math.PI) / 180
  return { x: v.x * Math.cos(r) - v.y * Math.sin(r), y: v.x * Math.sin(r) + v.y * Math.cos(r) }
}
const P = (p: Pt) => `${f(p.x)} ${f(p.y)}`
/** Deterministic 0…1 noise, so every leg keeps the same shape on every render. */
const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function catmullRom(points: Pt[], samples = 40): Pt[] {
  const out: Pt[] = []
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    for (let s = 0; s < samples; s++) {
      const t = s / samples
      const t2 = t * t
      const t3 = t2 * t
      out.push({
        x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      })
    }
  }
  out.push(points[points.length - 1])
  return out
}

/** A tapered quadratic spike from `a` (thick) through `ctrl` to `b` (sharp). */
function taper(a: Pt, ctrl: Pt, b: Pt, w0: number, w1 = 0.2) {
  const n = 14
  const pts: Pt[] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const u = 1 - t
    pts.push({ x: u * u * a.x + 2 * u * t * ctrl.x + t * t * b.x, y: u * u * a.y + 2 * u * t * ctrl.y + t * t * b.y })
  }
  const left: string[] = []
  const right: string[] = []
  pts.forEach((p, i) => {
    const q = pts[Math.min(i + 1, n)]
    const pr = pts[Math.max(i - 1, 0)]
    const dx = q.x - pr.x
    const dy = q.y - pr.y
    const len = Math.hypot(dx, dy) || 1
    const w = (w0 * (1 - i / n) + w1) / 2
    left.push(P({ x: p.x - (dy / len) * w, y: p.y + (dx / len) * w }))
    right.push(P({ x: p.x + (dy / len) * w, y: p.y - (dx / len) * w }))
  })
  return `M${left.join(' L')} L${right.reverse().join(' L')} Z`
}

interface Leg {
  upper: string
  lower: string
  knee: Pt
  base: Pt
  tip: Pt
  dir: 1 | -1
}

interface Segment {
  i: number
  p: Pt
  reach: number
  plate: string
  shadow: string
  groove: string
  hatch: string
  ticks: string
  /** rich manga shading (used when shading="rich") */
  sideShade: string
  crossHatch: string
  rim: string
  spikes: string
  legs: Leg[]
}

interface Head {
  /** short neck plate that bridges the last body plate and the head, so they never separate */
  collar: string
  plate: string
  details: string
  antennae: string[]
  antennaDots: Pt[]
  fangs: string[]
}

export interface CentipedeFigureProps {
  spine: Pt[]
  viewBox: string
  /** Distance between body segments (user units). */
  step: number
  /** Maximum half-width of a plate. */
  width: number
  /** Draw a head at the end of the spine (the creature walks toward the last point). */
  head?: boolean
  /** Tilt the head this many degrees toward the bottom of the page (body unchanged). */
  headTilt?: number
  /** Leg length multiplier. */
  legs?: number
  /** Fade segments in one after another on mount. */
  animateIn?: boolean
  /** Hand-inked wobble filter (turn off for very large drawings). */
  rough?: boolean
  /** Rippling legs (turn off for very large drawings). */
  animated?: boolean
  /** Skip segments whose center (± their reach) lies entirely outside this x-range. */
  cullX?: [number, number]
  /** Draw a soft cast shadow under the body and legs, as if it is crawling on the page. */
  castShadow?: boolean
  /** Opacity of the creature itself (the cast shadow keeps its own strength). */
  bodyOpacity?: number
  /** 'rich' adds deeper flank shadows, cross-hatching and a rim line to every plate. */
  shading?: 'normal' | 'rich'
  /** Legs that touch this circle (in viewBox units) are drawn faded, e.g. where they cross a highlight. */
  fadeCircle?: { cx: number; cy: number; r: number } | null
  /** Opacity for the faded legs. */
  fadeOpacity?: number
  className?: string
  style?: CSSProperties
}

function build(spine: Pt[], step: number, width: number, head: boolean, legScale: number, headTilt = 0) {
  const curve = catmullRom(spine)
  const lengths = [0]
  for (let i = 1; i < curve.length; i++) lengths.push(lengths[i - 1] + Math.hypot(curve[i].x - curve[i - 1].x, curve[i].y - curve[i - 1].y))
  const total = lengths[lengths.length - 1]

  const at = (s: number) => {
    let k = 0
    while (k < lengths.length - 2 && lengths[k + 1] < s) k++
    const a = curve[k]
    const b = curve[k + 1]
    const u = (s - lengths[k]) / (lengths[k + 1] - lengths[k] || 1)
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1
    const T = { x: (b.x - a.x) / len, y: (b.y - a.y) / len }
    return { p: { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u }, T, N: { x: -T.y, y: T.x } }
  }

  const sw = step * 0.06 // main stroke width scales with the creature
  const segs: Segment[] = []
  const end = head ? total - step * 1.1 : total
  let lastS = 0
  for (let s = step / 2, i = 0; s < end; s += step, i++) {
    lastS = s
    const { p, T, N } = at(s)
    const t = s / total
    // width profile: both ends taper; a headed centipede stays broad near the head
    const ry = head
      ? width * (0.45 + 0.55 * Math.min(1, t / 0.35)) * (0.8 + 0.2 * Math.min(1, (1 - t) / 0.12))
      : width * (0.5 + 0.5 * Math.sin(Math.PI * t))
    const rx = step * 0.68

    // vertebra-like plate: broad shoulders, rounded front, pinched waist at the back
    const c1 = add(add(p, T, -rx), N, ry * 0.72)
    const c2 = add(add(p, T, rx * 0.72), N, ry)
    const c3 = add(add(p, T, rx * 0.72), N, -ry)
    const c4 = add(add(p, T, -rx), N, -ry * 0.72)
    const front = add(p, T, rx * 1.12)
    const plate = `M${P(c1)} Q${P(add(add(p, N, ry * 1.18), T, -rx * 0.1))} ${P(c2)} Q${P(front)} ${P(c3)} Q${P(add(add(p, N, -ry * 1.18), T, -rx * 0.1))} ${P(c4)} Q${P(add(p, T, -rx * 0.62))} ${P(c1)} Z`

    // dark crescent where this plate tucks under the next one
    const shadow = `M${P(add(c1, T, rx * 0.05))} Q${P(add(p, T, -rx * 0.35))} ${P(add(c4, T, rx * 0.05))} Q${P(add(p, T, -rx * 0.05))} ${P(add(c1, T, rx * 0.05))} Z`

    // central groove (the spine line down the back)
    const g1 = add(p, T, -rx * 0.5)
    const g2 = add(p, T, rx * 0.7)
    const groove = `M${P(g1)} Q${P(add(add(p, T, rx * 0.1), N, ry * 0.16))} ${P(g2)} Q${P(add(add(p, T, rx * 0.1), N, -ry * 0.16))} ${P(g1)} Z`

    // hatching: long strokes on the shadow side, cross-hatch near the groove
    const hatch: string[] = []
    for (let h = 0; h < 7; h++) {
      const u = -0.85 + h * 0.27
      const edge = add(add(p, T, rx * u * 0.85), N, -ry * 0.95)
      const inner = add(add(p, T, rx * u * 0.85 + rx * 0.16), N, -ry * 0.32)
      hatch.push(`M${P(edge)} L${P(inner)}`)
    }
    for (let h = 0; h < 4; h++) {
      const u = -0.5 + h * 0.3
      const a = add(add(p, T, rx * u), N, ry * 0.12)
      const b = add(add(p, T, rx * u + rx * 0.22), N, -ry * 0.3)
      hatch.push(`M${P(a)} L${P(b)}`)
    }
    // short ticks along the lit front edge
    const ticks: string[] = []
    for (let h = 0; h < 5; h++) {
      const ang = -60 + h * 30
      const dir = rot(T, ang)
      const o = add(add(p, T, rx * 0.35), { x: dir.x * rx * 0.62, y: dir.y * ry * 0.62 })
      ticks.push(`M${P(o)} L${P(add(o, dir, -ry * 0.16))}`)
    }

    // richer manga shading: a shadowed flank, a second layer of cross-hatching,
    // and an engraved rim line on the lit side so each plate reads as rounded
    const shA = add(add(p, T, -rx * 0.85), N, -ry * 0.72)
    const shB = add(add(p, T, rx * 0.72), N, -ry * 0.98)
    const sideShade = `M${P(shA)} Q${P(add(add(p, N, -ry * 1.14), T, -rx * 0.05))} ${P(shB)} Q${P(add(add(p, T, -rx * 0.05), N, -ry * 0.4))} ${P(shA)} Z`
    const cross: string[] = []
    for (let h = 0; h < 7; h++) {
      const u = -0.75 + h * 0.24
      const a = add(add(p, T, rx * u * 0.85), N, -ry * 0.9)
      const b = add(add(p, T, rx * u * 0.85 - rx * 0.24), N, -ry * 0.42)
      cross.push(`M${P(a)} L${P(b)}`)
    }
    for (let h = 0; h < 4; h++) {
      const u = -0.4 + h * 0.28
      const a = add(add(p, T, rx * u), N, ry * 0.5)
      const b = add(add(p, T, rx * u + rx * 0.14), N, ry * 0.28)
      cross.push(`M${P(a)} L${P(b)}`)
    }
    const rim = `M${P(add(add(p, T, -rx * 0.62), N, ry * 0.6))} Q${P(add(add(p, T, rx * 0.08), N, ry * 0.92))} ${P(add(add(p, T, rx * 0.62), N, ry * 0.7))}`

    // curved lateral spines sweeping back toward the tail
    const spikes = ([1, -1] as const)
      .map((side) => {
        const root = add(add(p, N, ry * side * 0.9), T, -rx * 0.1)
        const tip = add(add(p, N, ry * side * 1.3), T, -rx * 0.95)
        const ctrl = add(add(p, N, ry * side * 1.28), T, -rx * 0.2)
        return taper(root, ctrl, tip, ry * 0.26)
      })
      .join(' ')

    // Scolopendra-style legs: femur → tibia → tarsus with a hooked claw. They angle back
    // toward the tail, each with its own length and angle, and neighbouring legs sit at
    // different points of the walking stride (left and right half a stride apart).
    const legs = ([1, -1] as const).map((side) => {
      const r1 = hash(i * 2 + (side > 0 ? 0 : 1) + 11)
      const r2 = hash(i * 7 + (side > 0 ? 3 : 5) + 29)
      const r3 = hash(i * 13 + (side > 0 ? 1 : 2) + 47)
      const out = { x: N.x * side, y: N.y * side }
      const back = { x: -T.x, y: -T.y }
      // blend between straight out (0°) and straight back (90°)
      const toward = (deg: number): Pt => {
        const r = (deg * Math.PI) / 180
        const v = { x: out.x * Math.cos(r) + back.x * Math.sin(r), y: out.y * Math.cos(r) + back.y * Math.sin(r) }
        const l = Math.hypot(v.x, v.y) || 1
        return { x: v.x / l, y: v.y / l }
      }
      const stride = Math.sin(i * 0.85 + (side > 0 ? 0 : Math.PI)) // gait phase, -1 … 1
      const sweep = 34 + stride * 16 + (r1 - 0.5) * 16 // femur angle from perpendicular
      const len = (0.82 + r2 * 0.38) * legScale
      const base = add(add(p, N, ry * side * 0.78), T, rx * 0.1)
      const L1 = (ry * 0.95 + step * 0.22) * len
      const L2 = (ry * 1.15 + step * 0.32) * len
      const L3 = (ry * 0.7 + step * 0.22) * len
      const knee = add(base, toward(sweep), L1)
      const ankle = add(knee, toward(sweep + 26 + r3 * 18), L2)
      const tip = add(ankle, toward(sweep + 48 + r3 * 22), L3)
      // tiny claw hooking back toward the body
      const claw = add(tip, toward(sweep + 120), L3 * 0.22)
      const mid = (a: Pt, b: Pt, k: number) => ({ x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k })
      return {
        upper: taper(base, mid(base, knee, 0.5), knee, ry * 0.2 + sw, sw * 1.05),
        lower: [
          taper(knee, mid(knee, ankle, 0.5), ankle, sw * 1.15, sw * 0.7),
          taper(ankle, mid(ankle, tip, 0.5), tip, sw * 0.8, 0.12),
          taper(tip, mid(tip, claw, 0.5), claw, sw * 0.5, 0.1),
        ].join(' '),
        knee,
        base,
        tip,
        dir: side,
      }
    })

    segs.push({ i, p, reach: ry + (ry * 3 + step) * legScale, plate, shadow, groove, hatch: hatch.join(' '), ticks: ticks.join(' '), sideShade, crossHatch: cross.join(' '), rim, spikes, legs })
  }

  let headParts: Head | null = null
  if (head) {
    // the head's back edge ("neck") is anchored just inside the front of the last
    // body plate, so it always stays attached; any tilt pivots around that neck
    const r = width * 0.95
    const neck = at(Math.min(lastS + step * 0.42, total))
    const body = { T: neck.T, N: neck.N } // un-tilted body direction, for the collar
    let { T, N } = neck
    if (headTilt) {
      // rotate whichever way points further down the page
      const a = rot(T, headTilt)
      const b = rot(T, -headTilt)
      T = a.y >= b.y ? a : b
      N = { x: -T.y, y: T.x }
    }
    const c = add(neck.p, T, r * 0.5)
    // collar: follows the body (not the tilt) from inside the last plate to inside the head
    const cb = add(neck.p, body.T, -step * 0.3)
    const cf = add(neck.p, T, r * 0.25)
    const cw = r * 0.78
    const collar = `M${P(add(cb, body.N, cw))} L${P(add(cf, N, cw * 0.9))} Q${P(add(cf, T, cw * 0.35))} ${P(add(cf, N, -cw * 0.9))} L${P(add(cb, body.N, -cw))} Q${P(add(cb, body.T, -cw * 0.3))} ${P(add(cb, body.N, cw))} Z`
    const hp1 = add(add(c, T, -r * 0.6), N, r * 0.85)
    const hp2 = add(add(c, T, r * 0.9), N, r * 0.55)
    const hp3 = add(add(c, T, r * 0.9), N, -r * 0.55)
    const hp4 = add(add(c, T, -r * 0.6), N, -r * 0.85)
    const plate = `M${P(hp1)} Q${P(add(add(c, N, r * 1.05), T, r * 0.3))} ${P(hp2)} Q${P(add(c, T, r * 1.35))} ${P(hp3)} Q${P(add(add(c, N, -r * 1.05), T, r * 0.3))} ${P(hp4)} Q${P(add(c, T, -r * 0.95))} ${P(hp1)} Z`
    const details = [
      `M${P(add(add(c, T, r * 0.75), N, r * 0.3))} Q${P(add(c, T, r * 0.2))} ${P(add(add(c, T, r * 0.75), N, -r * 0.3))}`,
      `M${P(add(c, T, -r * 0.35))} L${P(add(c, T, r * 0.55))}`,
    ].join(' ')
    const antennae: string[] = []
    const antennaDots: Pt[] = []
    const fangs: string[] = []
    for (const side of [1, -1] as const) {
      const root = add(add(c, T, r * 0.95), N, r * 0.38 * side)
      const mid = add(add(root, T, r * 3.2), N, r * 2.2 * side)
      const tip = add(add(root, T, r * 5.6), N, r * 1.2 * side)
      antennae.push(taper(root, mid, tip, r * 0.22, 0.2))
      for (let k = 1; k <= 7; k++) {
        const t = k / 8
        const u = 1 - t
        antennaDots.push({ x: u * u * root.x + 2 * u * t * mid.x + t * t * tip.x, y: u * u * root.y + 2 * u * t * mid.y + t * t * tip.y })
      }
      const fRoot = add(add(c, T, r * 0.8), N, r * 0.62 * side)
      const fCtrl = add(add(c, T, r * 2.0), N, r * 0.95 * side)
      const fTip = add(add(c, T, r * 1.9), N, r * 0.08 * side)
      fangs.push(taper(fRoot, fCtrl, fTip, r * 0.3, 0.2))
    }
    headParts = { collar, plate, details, antennae, antennaDots, fangs }
  }
  return { segs, head: headParts, sw }
}

export function CentipedeFigure({
  spine,
  viewBox,
  step,
  width,
  head = false,
  headTilt = 0,
  legs = 1,
  animateIn = false,
  rough = true,
  animated = true,
  cullX,
  fadeCircle = null,
  shading = 'normal',
  castShadow = false,
  bodyOpacity,
  fadeOpacity = 0.32,
  className,
  style,
}: CentipedeFigureProps) {
  const built = useMemo(() => build(spine, step, width, head, legs, headTilt), [spine, step, width, head, legs, headTilt])
  const art = useMemo(
    () => (cullX ? { ...built, segs: built.segs.filter((s) => s.p.x + s.reach > cullX[0] && s.p.x - s.reach < cullX[1]) } : built),
    [built, cullX],
  )
  const { sw } = art
  const ink = { stroke: 'var(--t-bg)' } as const

  return (
    <svg viewBox={viewBox} className={className} style={style} aria-hidden focusable="false" overflow="visible">
      {/* cast shadow: the silhouette offset down-right (light from the top-left), in two
          steps — a darker core and a wider, fainter edge — so it reads soft without a blur */}
      {castShadow &&
        [
          { k: 1, o: 0.7 },
          { k: 1.7, o: 0.35 },
        ].map(({ k, o }) => (
          <g
            key={k}
            transform={`translate(${f(width * 0.42 * k)} ${f(width * 0.62 * k)})`}
            style={{ fill: 'var(--t-shadow)' }}
            opacity={o}
          >
            {art.segs.map((s) => (
              <g key={s.i}>
                {s.legs.map((leg) => (
                  <g
                    key={leg.dir}
                    opacity={
                      // legs that are faded over the hero's white circle cast almost no shadow either
                      fadeCircle &&
                      [leg.base, leg.knee, leg.tip].some((q) => Math.hypot(q.x - fadeCircle.cx, q.y - fadeCircle.cy) < fadeCircle.r * 1.12)
                        ? 0.12
                        : undefined
                    }
                  >
                    <path d={leg.upper} />
                    <path d={leg.lower} />
                  </g>
                ))}
                <path d={s.spikes} />
                <path d={s.plate} />
              </g>
            ))}
            {art.head && <path d={art.head.collar} />}
            {art.head && <path d={art.head.plate} />}
          </g>
        ))}

      <g opacity={bodyOpacity}>
      {/* legs underneath the armor; each pair ripples a little after the one in front */}
      <g fill="currentColor" style={ink} strokeWidth={sw * 0.35}>
        {art.segs.map((s) =>
          s.legs.map((leg) => (
            <g
              key={`${s.i}-${leg.dir}`}
              className={animated ? 'centipede-leg' : undefined}
              opacity={
                fadeCircle &&
                [leg.base, leg.knee, leg.tip].some((q) => Math.hypot(q.x - fadeCircle.cx, q.y - fadeCircle.cy) < fadeCircle.r * 1.12)
                  ? fadeOpacity
                  : undefined
              }
              style={
                {
                  transformOrigin: `${f(leg.base.x)}px ${f(leg.base.y)}px`,
                  animationDelay: `${(-(art.segs.length - s.i) * 0.09).toFixed(2)}s`,
                  '--leg-dir': leg.dir,
                } as CSSProperties
              }
            >
              <path d={leg.upper} />
              <path d={leg.lower} />
              <circle cx={leg.knee.x} cy={leg.knee.y} r={sw * 0.9} />
            </g>
          )),
        )}
      </g>

      {/* body: tail first so every plate overlaps the one behind it */}
      <g filter={rough ? 'url(#ink-rough-fine)' : undefined}>
        {art.segs.map((s) => {
          const body = (
            <>
              <path d={s.spikes} fill="currentColor" style={ink} strokeWidth={sw * 0.4} />
              <path d={s.plate} fill="currentColor" style={ink} strokeWidth={sw} strokeLinejoin="round" />
              <path d={s.shadow} style={{ fill: 'var(--t-bg)' }} opacity={shading === 'rich' ? 0.82 : 0.55} />
              <path d={s.groove} style={{ fill: 'var(--t-bg)' }} opacity={shading === 'rich' ? 0.7 : 0.5} />
              <path d={s.hatch} fill="none" style={ink} strokeWidth={sw * 0.5} strokeLinecap="round" opacity={0.85} />
              <path d={s.ticks} fill="none" style={ink} strokeWidth={sw * 0.4} strokeLinecap="round" opacity={0.6} />
              {shading === 'rich' && (
                <>
                  <path d={s.sideShade} style={{ fill: 'var(--t-bg)' }} opacity={0.62} />
                  <path d={s.crossHatch} fill="none" style={ink} strokeWidth={sw * 0.5} strokeLinecap="round" opacity={0.95} />
                  <path d={s.rim} fill="none" style={ink} strokeWidth={sw * 0.38} strokeLinecap="round" opacity={0.55} />
                </>
              )}
            </>
          )
          return animateIn ? (
            <motion.g key={s.i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 + s.i * 0.035 }}>
              {body}
            </motion.g>
          ) : (
            <g key={s.i}>{body}</g>
          )
        })}

        {art.head && (
          <g>
            {art.head.antennae.map((d, i) => (
              <path key={`a${i}`} d={d} fill="currentColor" style={ink} strokeWidth={sw * 0.3} />
            ))}
            {art.head.antennaDots.map((d, i) => (
              <circle key={`d${i}`} cx={d.x} cy={d.y} r={sw * 0.5} style={{ fill: 'var(--t-bg)' }} />
            ))}
            {art.head.fangs.map((d, i) => (
              <path key={`f${i}`} d={d} fill="currentColor" style={ink} strokeWidth={sw * 0.5} />
            ))}
            <path d={art.head.collar} fill="currentColor" style={ink} strokeWidth={sw * 0.8} />
            <path d={art.head.plate} fill="currentColor" style={ink} strokeWidth={sw} />
            <path d={art.head.details} fill="none" style={ink} strokeWidth={sw * 0.5} strokeLinecap="round" />
          </g>
        )}
      </g>
      </g>
    </svg>
  )
}

/** The body's path through a 1000 × 1100 canvas — both ends run off the edges. */
const HERO_SPINE: Pt[] = [
  { x: 1080, y: -90 },
  { x: 900, y: 40 },
  { x: 690, y: 150 },
  { x: 530, y: 330 },
  { x: 500, y: 560 },
  { x: 600, y: 770 },
  { x: 800, y: 920 },
  { x: 1000, y: 1040 },
  { x: 1140, y: 1180 },
]

/** The large hero centipede. */
export function Centipede({ className, fadeCircle }: { className?: string; fadeCircle?: CentipedeFigureProps['fadeCircle'] }) {
  return (
    <CentipedeFigure
      spine={HERO_SPINE}
      viewBox="0 0 1000 1100"
      step={50}
      width={60}
      legs={1.75}
      animateIn
      shading="rich"
      castShadow
      fadeCircle={fadeCircle}
      className={className}
    />
  )
}
