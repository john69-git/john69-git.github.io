import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { profile } from '../../data/profile'
import { asset } from '../../lib/asset'
import { Centipede } from '../art/Centipede'
import { SpiderLilyTop } from '../art/SpiderLily'
import { SplitText } from '../ui/SplitText'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const discRef = useRef<HTMLDivElement>(null)
  const centipedeLayer = useRef<HTMLDivElement>(null)
  // where the white disc sits in the centipede's own coordinates, so legs over it can be faded
  const [fadeCircle, setFadeCircle] = useState<{ cx: number; cy: number; r: number } | null>(null)
  useEffect(() => {
    const measure = () => {
      const disc = discRef.current
      const svg = centipedeLayer.current?.querySelector('svg')
      if (!disc || !svg) return
      const d = disc.getBoundingClientRect()
      const c = svg.getBoundingClientRect()
      if (!c.width || !d.width) return
      const k = 1000 / c.width // viewBox is 1000 wide
      setFadeCircle({
        cx: (d.left + d.width / 2 - c.left) * k,
        cy: (d.top + d.height / 2 - c.top) * k,
        r: d.width * 0.39 * k, // the disc circle is r = 78 of a 200 box
      })
    }
    measure()
    const t = window.setTimeout(measure, 400)
    window.addEventListener('resize', measure)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('resize', measure)
    }
  }, [])
  const reduced = useReducedMotion()
  const [finePointer] = useState(() => window.matchMedia('(pointer: fine)').matches)
  const { hero, avatar } = profile

  // --- scroll parallax --------------------------------------------------
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const artY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  // --- pointer parallax (desktop only) ----------------------------------
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18 })
  const sy = useSpring(my, { stiffness: 60, damping: 18 })
  const avatarX = useTransform(sx, (v) => v * -10)
  const discX = useTransform(sx, (v) => v * 22)
  const discY = useTransform(sy, (v) => v * 16)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !finePointer) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      mx.set((e.clientX - r.left) / r.width - 0.5)
      my.set((e.clientY - r.top) / r.height - 0.5)
    }
    el.addEventListener('pointermove', onMove, { passive: true })
    return () => el.removeEventListener('pointermove', onMove)
  }, [reduced, finePointer, mx, my])

  const still = Boolean(reduced)

  return (
    <section ref={ref} id="home" aria-labelledby="home-title" className="relative isolate min-h-[100svh] overflow-hidden">
      {/* ===== background: halftone + ink centipede coiling behind the figure ===== */}
      <motion.div aria-hidden className="absolute inset-0 -z-20 will-change-transform" style={still ? undefined : { y: bgY }}>
        <div className="tone absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_70%_40%,#000_10%,transparent_75%)]" />
      </motion.div>

      {/* ===== the white disc sits BEHIND the centipede: same box as the figure, so same position ===== */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <motion.div className="relative mt-20 ml-auto mr-[8%] aspect-[720/1453] h-[50svh] min-h-[340px] sm:mr-[16%] sm:h-[54svh] lg:absolute lg:right-[5%] lg:bottom-0 lg:mt-0 lg:mr-0 lg:h-[88svh] lg:min-h-[420px] lg:max-h-[980px]" style={still ? undefined : { y: artY }}>
            {/* paper-white disc */}
            <motion.div
              ref={discRef}
              aria-hidden
              className="absolute top-[2%] left-[-22%] aspect-square w-[118%]"
              style={still ? undefined : { x: discX, y: discY }}
            >
              <motion.svg
                viewBox="0 0 200 200"
                className="size-full"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.6, ease, delay: 0.2 }}
              >
                <defs>
                  <pattern id="hero-disc-tone" width="3.2" height="3.2" patternUnits="userSpaceOnUse">
                    <circle cx="1.6" cy="1.6" r="0.55" fill="#100e11" opacity=".38" />
                  </pattern>
                  <radialGradient id="hero-disc-fade" cx="0.3" cy="0.3" r="0.9">
                    <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
                    <stop offset="1" stopColor="#fff" stopOpacity="1" />
                  </radialGradient>
                  <mask id="hero-disc-mask">
                    <rect width="200" height="200" fill="url(#hero-disc-fade)" />
                  </mask>
                </defs>
                <circle cx="100" cy="100" r="78" style={{ fill: 'var(--t-disc)' }} filter="url(#ink-rough)" />
                <circle cx="100" cy="100" r="78" fill="url(#hero-disc-tone)" mask="url(#hero-disc-mask)" />
                <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 5" opacity=".55" />
              </motion.svg>
            </motion.div>
        </motion.div>
      </div>

      <motion.div ref={centipedeLayer} aria-hidden className="absolute inset-0 -z-20 will-change-transform" style={still ? undefined : { y: bgY }}>
        <Centipede
          fadeCircle={fadeCircle}
          className="absolute top-[-4%] right-[-46%] h-[92%] w-auto text-stroke opacity-40 sm:right-[-24%] sm:opacity-55 lg:top-[-4%] lg:right-[-4%] lg:h-[104%] lg:max-h-[1000px] lg:opacity-75 xl:top-[-6%] xl:right-[7%] xl:h-[112%]" />
      </motion.div>

      {/* ===== the flower on the disc sits ABOVE the centipede (disc stays behind it), same position ===== */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <motion.div className="relative mt-20 ml-auto mr-[8%] aspect-[720/1453] h-[50svh] min-h-[340px] sm:mr-[16%] sm:h-[54svh] lg:absolute lg:right-[5%] lg:bottom-0 lg:mt-0 lg:mr-0 lg:h-[88svh] lg:min-h-[420px] lg:max-h-[980px]" style={still ? undefined : { y: artY }}>
          <motion.div className="absolute top-[2%] left-[-22%] aspect-square w-[118%]" style={still ? undefined : { x: discX, y: discY }}>
            {/* black-and-white ink spider lily, seen from above, centered on the white disc */}
              <motion.div
                className="absolute inset-0"
                style={{ clipPath: 'circle(38.6% at 50% 50%)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.9 }}
              >
                <div className="absolute inset-[11%]">
                  <SpiderLilyTop seed={23} className="size-full animate-spin-slow motion-reduce:animate-none" />
                </div>
              </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ===== focus lines ===== */}
      <div
        aria-hidden
        className="speedlines animate-spin-slow pointer-events-none absolute top-1/2 right-[-40%] -z-10 aspect-square w-[150vh] -translate-y-1/2 text-stroke opacity-[0.07] motion-reduce:animate-none lg:right-[-25%]"
      />

      {/* ===== the figure: avatar breaking out of a manga panel ===== */}
      <motion.div
        className="relative -z-10 mt-20 ml-auto mr-[8%] aspect-[720/1453] h-[50svh] min-h-[340px] sm:mr-[16%] sm:h-[54svh] lg:absolute lg:right-[5%] lg:bottom-0 lg:mt-0 lg:mr-0 lg:h-[88svh] lg:min-h-[420px] lg:max-h-[980px]"
        style={still ? undefined : { y: artY }}
      >
        {/* vertical Japanese caption beside the figure (the frame around it was removed) */}
        <motion.div
          aria-hidden
          className="absolute inset-x-[-12%] top-[24%] bottom-[5%] -rotate-2"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 1.2, ease, delay: 0.35 }}
        >
          <span lang="ja" className="absolute top-4 left-3 font-jp text-sm tracking-[0.5em] text-fg/70 vertical">
            {profile.nicknameJp}・{hero.taglineJp}
          </span>
        </motion.div>

        {/* avatar */}
        <motion.div
          className="absolute inset-x-0 bottom-[3%] h-[95%]"
          style={still ? undefined : { x: avatarX }}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.3, ease, delay: 0.55 }}
        >
          <img
            src={asset(avatar.src)}
            alt={avatar.alt}
            width={avatar.width}
            height={avatar.height}
            decoding="async"
            className="mx-auto h-full w-auto object-contain drop-shadow-[10px_14px_0_rgb(16_14_17/0.55)]"
          />
        </motion.div>

      </motion.div>

      {/* ===== readability overlays ===== */}
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-bg via-bg/60 to-transparent lg:block lg:w-[62%]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[58%] bg-gradient-to-t from-bg via-bg/85 to-transparent lg:h-40 lg:via-bg/40" />

      {/* ===== copy ===== */}
      <motion.div
        className="relative mx-auto flex max-w-7xl flex-col justify-end px-4 pt-2 pb-32 sm:px-6 lg:min-h-[100svh] lg:justify-center lg:pt-28 lg:px-10 lg:pb-20"
        style={still ? undefined : { y: textY, opacity: textOpacity }}
      >
        <motion.p
          className="label flex flex-wrap items-center gap-x-3 gap-y-1 text-muted"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <span className="text-accent">Chapter 00</span>
          <span lang="ja" className="font-jp tracking-[0.3em]">序章</span>
          <span aria-hidden className="h-px w-10 bg-line" />
          <span>{profile.role}</span>
          <span aria-hidden className="text-dim">/</span>
          <span>{profile.location}</span>
        </motion.p>

        <h1
          id="home-title"
          className="relative mt-4 font-display text-[clamp(5.2rem,19vw,15.5rem)] leading-[0.85] lg:text-[min(13vw,15.5rem)] font-extrabold tracking-[-0.02em]"
        >
          <SplitText text={hero.title} immediate delay={0.35} stagger={0.08} />
          <motion.span
            aria-hidden
            className="inline-block text-crimson"
            initial={{ scale: 0, rotate: -40 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.95 }}
          >
            .
          </motion.span>
          <span className="sr-only"> — {profile.fullName}</span>
        </h1>

        <motion.p
          className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-display text-2xl italic sm:text-3xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.05 }}
        >
          {hero.tagline}
          <span lang="ja" className="font-jp text-sm tracking-[0.35em] text-dim not-italic">
            {hero.taglineJp}
          </span>
        </motion.p>

        <motion.p
          className="mt-5 max-w-md text-base leading-relaxed text-muted text-pretty sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.2 }}
        >
          {hero.intro}
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 1.35 }}
        >
          <a href="#projects" className="btn btn-primary">
            Explore Projects
            <ArrowRight aria-hidden className="size-4" />
          </a>
          <a href="#about" className="btn btn-ghost">
            About Me
          </a>
        </motion.div>

        <motion.p
          className="label mt-10 hidden text-xs text-dim sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          Vol. 01 — {hero.footnote}
        </motion.p>
      </motion.div>

      {/* ===== bottom rail ===== */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto flex max-w-7xl items-end justify-between px-4 pb-6 sm:px-6 lg:px-10">
        <a href="#about" className="group pointer-events-auto flex items-center gap-3 text-muted transition-colors hover:text-fg" aria-label="Scroll to About Me">
          <span aria-hidden className="relative block h-12 w-px overflow-hidden bg-line">
            <span className="animate-scroll-line absolute inset-0 bg-crimson" />
          </span>
          <span className="label flex items-center gap-2">
            Scroll
            <ArrowDown aria-hidden className="size-3 transition-transform group-hover:translate-y-0.5" />
          </span>
          <span lang="ja" aria-hidden className="hidden font-jp text-xs tracking-[0.3em] text-dim sm:inline">
            頁をめくる
          </span>
        </a>
      </div>
    </section>
  )
}
