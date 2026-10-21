import { useEffect, useMemo, useRef, useState } from 'react'
import { seeded } from '../../lib/asset'
import { CentipedeFigure, type Pt } from './Centipede'

/**
 * One long centipede crawling underneath the whole page, in the same ink style as the hero.
 *
 * It crawls back and forth across the full width in long, nearly straight runs with short,
 * tight turns — now and then slipping off one edge and coming back in. It sits
 * *under* everything: cards and panels are opaque, so it is only glimpsed through the gaps
 * between them and in the empty spaces, and it slips under every chapter title so
 * headings stay clean. The path is rebuilt from the real layout whenever the page resizes.
 */

interface Rect {
  x: number
  y: number
  w: number
  h: number
}

interface Geometry {
  W: number
  H: number
  start: number
  /** chapter headers (and anything else marked data-centipede-avoid) to slip under */
  avoid: Rect[]
}

/**
 * The path is "walked", not drawn: a point moves forward in small steps, steering toward
 * a target on the far side of the page with a limited turning rate and a little random
 * wander — so it travels in long, nearly straight runs, drifts slightly, and changes
 * direction in short, tight arcs, the way a real centipede crawls. The body then follows
 * that exact track.
 */
function buildSpine({ W, H, start }: Geometry) {
  const s = W < 768 ? 0.6 : W < 1280 ? 0.82 : 1
  const width = 24 * s
  const step = 30 * s
  const rand = seeded(1729)

  const stride = 30 * s // distance moved per step
  const maxTurn = (9 * Math.PI) / 180 // per step: tight, purposeful turns
  const wander = (2.2 * Math.PI) / 180 // per step: slight drift on the straights
  const rowGap = (W < 768 ? 560 : 700) * s // how far down the page each crossing goes

  // targets alternate sides, each a bit further down; now and then one sits off the edge
  const targets: Pt[] = []
  let ty = start + rowGap * 0.6
  let left = true
  // the crossings stop above the last chapter; the final run brings the head out into the
  // empty strip at the bottom of the Contact section, just above the footer
  while (ty < H - rowGap * 0.9) {
    const off = rand() < 0.28
    const x = left ? (off ? -220 : W * (0.04 + rand() * 0.14)) : off ? W + 220 : W * (0.82 + rand() * 0.14)
    targets.push({ x, y: ty + (rand() - 0.5) * rowGap * 0.35 })
    ty += rowGap * (0.8 + rand() * 0.4)
    left = !left
  }
  const headY = H - (W < 768 ? 70 : 92) * Math.max(s, 0.8)
  const enterX = left ? -160 : W + 160
  targets.push({ x: enterX, y: headY - rowGap * 0.35 })
  targets.push({ x: left ? W * 0.12 : W * 0.88, y: headY })
  targets.push({ x: left ? W * 0.4 : W * 0.6, y: headY - 6 })

  let p: Pt = { x: W + 200, y: start - 120 }
  let heading = Math.atan2(targets[0].y - p.y, targets[0].x - p.x)
  let drift = 0
  const pts: Pt[] = [p]
  let t = 0
  let n = 0
  while (t < targets.length && n < 20000) {
    const target = targets[t]
    const want = Math.atan2(target.y - p.y, target.x - p.x)
    let diff = want - heading
    while (diff > Math.PI) diff -= Math.PI * 2
    while (diff < -Math.PI) diff += Math.PI * 2
    drift = drift * 0.9 + (rand() - 0.5) * wander * 2
    heading += Math.max(-maxTurn, Math.min(maxTurn, diff * 0.35)) + drift
    p = { x: p.x + Math.cos(heading) * stride, y: p.y + Math.sin(heading) * stride }
    n++
    if (n % 3 === 0) pts.push(p) // a sparser spine keeps the smoothing cheap
    // close enough (or already past it): head for the next target
    const last = t === targets.length - 1
    if (Math.hypot(target.x - p.x, target.y - p.y) < stride * (last ? 1.5 : 6) || (!last && p.y > target.y + rowGap * 0.25)) t++
  }
  pts.push(p)
  return { spine: pts, width, step, cull: [-width * 6, W + width * 6] as [number, number] }
}

export function PageCentipede() {
  const ref = useRef<HTMLDivElement>(null)
  const [geo, setGeo] = useState<Geometry | null>(null)

  useEffect(() => {
    const main = ref.current?.parentElement
    if (!main) return
    let timer = 0
    const measure = () => {
      const box = main.getBoundingClientRect()
      const avoid: Rect[] = []
      main.querySelectorAll<HTMLElement>(':scope > section[id] header, [data-centipede-avoid]').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.width && r.height) avoid.push({ x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height })
      })
      const about = main.querySelector<HTMLElement>(':scope > section#about')
      const next: Geometry = { W: main.clientWidth, H: main.scrollHeight, start: about ? about.offsetTop : 0, avoid }
      setGeo((prev) =>
        prev &&
        Math.abs(prev.W - next.W) < 2 &&
        Math.abs(prev.H - next.H) < 8 &&
        prev.avoid.length === next.avoid.length &&
        prev.avoid.every((r, i) => Math.abs(r.y - next.avoid[i].y) < 8 && Math.abs(r.h - next.avoid[i].h) < 8)
          ? prev
          : next,
      )
    }
    const schedule = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(measure, 150)
    }
    measure()
    // reveal animations shift headers slightly on first view — re-measure once they settle
    const late = window.setTimeout(measure, 1600)
    const ro = new ResizeObserver(schedule)
    ro.observe(main)
    void document.fonts?.ready.then(schedule)
    return () => {
      ro.disconnect()
      window.clearTimeout(timer)
      window.clearTimeout(late)
    }
  }, [])

  const art = useMemo(() => (geo ? buildSpine(geo) : null), [geo])

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden text-stroke"
    >
      {geo && art && (
        <CentipedeFigure
          spine={art.spine}
          viewBox={`0 0 ${geo.W} ${geo.H}`}
          style={{ width: geo.W, height: geo.H }}
          step={art.step}
          width={art.width}
          legs={1.35}
          head
          headTilt={16}
          shading="rich"
          castShadow
          bodyOpacity={0.42}
          rough={false}
          animated={false}
          cullX={art.cull}
        />
      )}
      {/* it slips *under* the chapter titles: soft page-colored patches cover it there */}
      {geo?.avoid.map((r, i) => (
        <div
          key={i}
          className="absolute rounded-3xl bg-bg"
          style={{ left: r.x - 16, top: r.y - 16, width: r.w + 32, height: r.h + 32, boxShadow: '0 0 32px 26px var(--t-bg)' }}
        />
      ))}
    </div>
  )
}
