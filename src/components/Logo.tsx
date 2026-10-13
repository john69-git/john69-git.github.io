import { useId } from 'react'

/** The HAISE "H" mark — also used as the favicon (public/favicon.svg). */
export function LogoMark({ className = 'size-8' }: { className?: string }) {
  const gradientId = useId()
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id={gradientId} x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--color-accent)" />
          <stop offset="1" stopColor="var(--color-accent-2)" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="8" fill="var(--color-ink-850)" stroke="var(--color-line-strong)" />
      <path
        d="M10.5 9v14M21.5 9v14M10.5 17.5l11-3"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
