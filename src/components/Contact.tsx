import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { useState } from 'react'
import { profile } from '../data/profile'
import { Placeholder } from './Placeholder'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { SocialIcon } from './SocialIcon'

export function Contact() {
  const { heading, text, email, socials } = profile.contact
  const links = socials.filter((s) => s.url.trim())
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  }

  return (
    <Section id="contact" index="06" kicker="Contact" title={heading} jp="つながろう" description={text} align="center">
      <Reveal>
        <div className="mx-auto max-w-2xl">
          {email && (
            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href={`mailto:${email}`}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-fg px-6 py-4 font-semibold text-ink-950 transition hover:bg-white hover:shadow-[0_0_50px_-10px_rgb(110_226_245/0.7)]"
              >
                <Mail aria-hidden className="size-5" />
                <span className="break-all">{email}</span>
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-line-strong px-5 py-4 text-sm font-medium text-fg transition hover:border-accent/50"
              >
                {copied ? <Check aria-hidden className="size-4 text-accent" /> : <Copy aria-hidden className="size-4" />}
                {copied ? 'Copied' : 'Copy email'}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? 'Email address copied to clipboard' : ''}
              </span>
            </div>
          )}

          {links.length > 0 && (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer me"
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-ink-850/60 px-5 py-4 text-left transition hover:border-accent/40 hover:bg-ink-800"
                  >
                    <span className="grid size-10 place-items-center rounded-xl border border-line-strong bg-ink-900 text-fg">
                      <SocialIcon name={link.icon} />
                    </span>
                    <span className="flex-1 font-medium text-fg">
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 text-dim transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}

          {(!email || links.length === 0) && (
            <div className="mt-8 text-left">
              <Placeholder file="src/data/profile.ts → contact">
                {!email && 'Add your email address. '}
                {links.length === 0 && 'Add your GitHub, LinkedIn, or other profile URLs. '}
                Only filled-in links appear on the live site.
              </Placeholder>
            </div>
          )}
        </div>
      </Reveal>
    </Section>
  )
}
