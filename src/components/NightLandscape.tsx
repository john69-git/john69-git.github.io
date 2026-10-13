import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/* An original, abstract anime-style night scene: big moon, drifting stars,
   layered ridgelines and a slow-moving perspective grid. Pure canvas, no images. */

const CYAN = '110, 226, 245'
const VIOLET = '157, 140, 255'

function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeRidge(rand: () => number) {
  const a = rand() * Math.PI * 2
  const b = rand() * Math.PI * 2
  const c = rand() * Math.PI * 2
  return (x: number) =>
    0.55 + 0.25 * Math.sin(x * 6.6 + a) + 0.14 * Math.sin(x * 16.6 + b) + 0.06 * Math.sin(x * 43 + c)
}

export function NightLandscape() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const rand = seeded(17)
    const stars = Array.from({ length: 90 }, () => ({
      x: rand(),
      y: rand(),
      r: rand() * 1.1 + 0.25,
      speed: rand() * 0.6 + 0.2,
      phase: rand() * Math.PI * 2,
    }))
    const farRidge = makeRidge(rand)
    const nearRidge = makeRidge(rand)

    let w = 0
    let h = 0
    let raf = 0
    let onScreen = true

    const drawRidge = (fn: (x: number) => number, base: number, amp: number, fill: string, edge: string) => {
      ctx.beginPath()
      ctx.moveTo(0, base)
      for (let i = 0; i <= 80; i++) {
        const x = i / 80
        ctx.lineTo(x * w, base - fn(x) * amp)
      }
      ctx.lineTo(w, base)
      ctx.closePath()
      ctx.fillStyle = fill
      ctx.fill()
      ctx.strokeStyle = edge
      ctx.lineWidth = 1
      ctx.stroke()
    }

    const draw = (t: number) => {
      const horizon = h * 0.64
      ctx.clearRect(0, 0, w, h)

      // sky
      const sky = ctx.createLinearGradient(0, 0, 0, horizon)
      sky.addColorStop(0, '#06070b')
      sky.addColorStop(1, '#121633')
      ctx.fillStyle = sky
      ctx.fillRect(0, 0, w, horizon)

      // stars drift slowly upward and twinkle
      for (const s of stars) {
        const y = ((((s.y - t * 0.004 * s.speed) % 1) + 1) % 1) * horizon * 0.92
        const alpha = 0.2 + 0.55 * (0.5 + 0.5 * Math.sin(t * 1.6 * s.speed + s.phase))
        ctx.fillStyle = `rgba(236, 235, 231, ${alpha})`
        ctx.beginPath()
        ctx.arc(s.x * w, y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // moon + halo
      const mx = w * 0.63
      const my = horizon * 0.46
      const mr = Math.min(w, h) * 0.19
      const halo = ctx.createRadialGradient(mx, my, mr * 0.8, mx, my, mr * 2.6)
      halo.addColorStop(0, `rgba(${CYAN}, 0.16)`)
      halo.addColorStop(1, `rgba(${CYAN}, 0)`)
      ctx.fillStyle = halo
      ctx.fillRect(0, 0, w, horizon)

      const disc = ctx.createRadialGradient(mx - mr * 0.35, my - mr * 0.35, mr * 0.1, mx, my, mr)
      disc.addColorStop(0, 'rgba(246, 244, 238, 0.95)')
      disc.addColorStop(1, 'rgba(184, 196, 222, 0.85)')
      ctx.fillStyle = disc
      ctx.beginPath()
      ctx.arc(mx, my, mr, 0, Math.PI * 2)
      ctx.fill()

      // orbit ring around the moon
      ctx.save()
      ctx.translate(mx, my)
      ctx.rotate(-0.35 + Math.sin(t * 0.15) * 0.04)
      ctx.strokeStyle = `rgba(${CYAN}, 0.35)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.ellipse(0, 0, mr * 1.75, mr * 0.42, 0, 0, Math.PI * 2)
      ctx.stroke()
      const ox = Math.cos(t * 0.5) * mr * 1.75
      const oy = Math.sin(t * 0.5) * mr * 0.42
      ctx.fillStyle = `rgba(${CYAN}, 0.9)`
      ctx.beginPath()
      ctx.arc(ox, oy, 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // ridgelines
      drawRidge(farRidge, horizon, horizon * 0.22, '#0d1124', `rgba(${VIOLET}, 0.35)`)
      drawRidge(nearRidge, horizon, horizon * 0.12, '#07080d', `rgba(${CYAN}, 0.22)`)

      // ground + perspective grid
      ctx.fillStyle = '#06070a'
      ctx.fillRect(0, horizon, w, h - horizon)
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, horizon, w, h - horizon)
      ctx.clip()
      const vx = w / 2
      for (let i = -10; i <= 10; i++) {
        ctx.strokeStyle = `rgba(${CYAN}, ${0.16 - Math.abs(i) * 0.008})`
        ctx.beginPath()
        ctx.moveTo(vx, horizon)
        ctx.lineTo(vx + i * w * 0.16, h)
        ctx.stroke()
      }
      const offset = (t * 0.25) % 1
      for (let k = 0; k < 12; k++) {
        const p = (k + offset) / 12
        const y = horizon + (h - horizon) * p * p
        ctx.strokeStyle = `rgba(${CYAN}, ${0.05 + p * 0.22})`
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
      ctx.restore()

      // horizon glow
      const line = ctx.createLinearGradient(0, 0, w, 0)
      line.addColorStop(0, `rgba(${CYAN}, 0)`)
      line.addColorStop(0.5, `rgba(${CYAN}, 0.7)`)
      line.addColorStop(1, `rgba(${CYAN}, 0)`)
      ctx.fillStyle = line
      ctx.fillRect(0, horizon - 0.5, w, 1)
    }

    const frame = (now: number) => {
      draw(now / 1000)
      raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    const start = () => {
      if (reduced) {
        draw(12)
        return
      }
      if (!raf && onScreen && !document.hidden) raf = requestAnimationFrame(frame)
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(reduced ? 12 : performance.now() / 1000)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      if (onScreen) start()
      else stop()
    })
    visibilityObserver.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    resize()
    start()

    return () => {
      stop()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reduced])

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
}
