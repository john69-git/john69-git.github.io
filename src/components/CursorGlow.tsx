import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/** A faint light that trails the mouse. The real cursor is untouched. Desktop only. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const [finePointer] = useState(() => window.matchMedia('(pointer: fine)').matches)
  const enabled = profile.features.cursorGlow && finePointer && !reduced

  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return
    let x = -999
    let y = -999
    let cx = x
    let cy = y
    let raf = 0

    const tick = () => {
      cx += (x - cx) * 0.15
      cy += (y - cy) * 0.15
      el.style.transform = `translate3d(${cx - 250}px, ${cy - 250}px, 0)`
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.5 ? requestAnimationFrame(tick) : 0
    }
    const onMove = (e: PointerEvent) => {
      if (cx < -500) {
        cx = e.clientX
        cy = e.clientY
      }
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0 size-[500px] rounded-full [background:radial-gradient(circle,rgb(110_226_245/0.06),transparent_60%)]"
      style={{ transform: 'translate3d(-999px, -999px, 0)' }}
    />
  )
}
