import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navLinks, profile } from '../data/profile'
import { useActiveSection } from '../hooks/useActiveSection'
import { LogoMark } from './Logo'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(navLinks.map((link) => link.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        solid ? 'border-line/80 bg-ink-900/80 backdrop-blur-xl' : 'border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#home" className="group flex items-center gap-3 rounded-lg" onClick={() => setOpen(false)}>
          <LogoMark className="size-8 transition-transform duration-300 group-hover:rotate-[-6deg]" />
          <span className="font-mono text-sm font-medium tracking-[0.3em] text-fg">{profile.nickname}</span>
          {profile.nicknameJp && (
            <span lang="ja" aria-hidden className="hidden font-jp text-xs tracking-[0.2em] text-dim sm:inline">
              {profile.nicknameJp}
            </span>
          )}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ id, label }) => {
            const isActive = active === id
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-accent to-accent-2 transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-line text-fg transition-colors hover:border-line-strong lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        </button>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-line/80 lg:hidden">
        <ul className="mx-auto grid max-w-6xl gap-1 px-4 py-4 sm:px-6">
          {navLinks.map(({ id, label }, i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                aria-current={active === id ? 'location' : undefined}
                className={`flex items-center gap-4 rounded-xl px-3 py-3 text-base transition-colors hover:bg-ink-800 ${
                  active === id ? 'text-fg' : 'text-muted'
                }`}
              >
                <span className="font-mono text-xs text-accent/70">{String(i).padStart(2, '0')}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
