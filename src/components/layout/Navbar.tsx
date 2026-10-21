import { AnimatePresence, motion } from 'motion/react'
import { Menu, Moon, Sun, Volume2, VolumeX, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { navLinks, profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useAmbientSound } from '../../hooks/useAmbientSound'
import { useTheme } from '../../hooks/useTheme'
import { SpiderLily } from '../art/SpiderLily'
import { LogoMark } from '../ui/LogoMark'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(navLinks.map((link) => link.id))
  const { theme, toggle: toggleTheme } = useTheme()
  const sound = useAmbientSound()
  const menuButton = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: Esc closes, Tab stays inside, page behind doesn't scroll.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    root.style.overflow = 'hidden'
    const first = menuRef.current?.querySelector<HTMLElement>('a, button')
    first?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
      if (e.key === 'Tab' && menuRef.current) {
        const items = [menuButton.current, ...menuRef.current.querySelectorAll<HTMLElement>('a, button')].filter(
          (el): el is HTMLElement => el !== null,
        )
        const i = items.indexOf(document.activeElement as HTMLElement)
        if (e.shiftKey && i <= 0) {
          e.preventDefault()
          items[items.length - 1].focus()
        } else if (!e.shiftKey && i === items.length - 1) {
          e.preventDefault()
          items[0].focus()
        }
      }
    }
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      root.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden
        className={`absolute inset-0 border-b transition-all duration-500 ${
          solid ? 'border-line bg-bg/85 backdrop-blur-xl' : 'border-transparent bg-gradient-to-b from-bg/70 to-transparent'
        }`}
      />
      <nav aria-label="Primary" className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.5rem] sm:px-6 lg:px-10">
        <a href="#home" className="group flex items-center gap-3" onClick={() => setOpen(false)} aria-label={`${profile.nickname} — back to top`}>
          <LogoMark className="h-10 w-auto transition-transform duration-500 ease-ink group-hover:rotate-[-4deg]" />
          <span className="font-display text-xl font-extrabold tracking-[0.18em]">{profile.nickname}</span>
        </a>

        <ul className="hidden items-center lg:flex">
          {navLinks.map(({ id, label, short }) => {
            const isActive = active === id
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`group relative flex items-baseline gap-1.5 px-3 py-2 text-sm transition-colors xl:px-4 ${
                    isActive ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {short ?? label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-ink"
                      aria-hidden
                      className="brush absolute inset-x-2 -bottom-1 h-[5px]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          {profile.features.ambientSound && sound.supported && (
            <button
              type="button"
              className="icon-btn"
              aria-pressed={sound.playing}
              aria-label="Ambient sound"
              title={sound.playing ? 'Turn ambient sound off' : 'Turn ambient sound on'}
              onClick={() => void sound.toggle()}
            >
              {sound.playing ? <Volume2 aria-hidden className="size-4" /> : <VolumeX aria-hidden className="size-4" />}
            </button>
          )}
          <button
            type="button"
            className="icon-btn"
            aria-label={theme === 'dark' ? 'Switch to paper (light) theme' : 'Switch to void (dark) theme'}
            title={theme === 'dark' ? 'Paper theme' : 'Void theme'}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun aria-hidden className="size-4" /> : <Moon aria-hidden className="size-4" />}
          </button>
          <button
            ref={menuButton}
            type="button"
            className="icon-btn lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t-2 border-frame bg-bg sm:top-[4.5rem] lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div aria-hidden className="tone pointer-events-none absolute inset-0 opacity-60" />
            <SpiderLily seed={5} stem={260} className="pointer-events-none absolute -right-10 bottom-0 h-[70%] w-auto opacity-90" />
            <ul className="relative grid gap-1 px-6 py-8">
              {navLinks.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === id ? 'location' : undefined}
                    className={`flex items-baseline gap-4 py-2 font-display text-4xl font-extrabold tracking-tight sm:text-5xl ${
                      active === id ? 'text-accent' : 'text-fg'
                    }`}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p lang="ja" aria-hidden className="relative px-6 pb-10 font-jp text-sm tracking-[0.4em] text-dim">
              {profile.hero.taglineJp}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
