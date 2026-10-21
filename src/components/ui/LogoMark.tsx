/**
 * HAISE signboard — an original shop-sign plaque (arched crown, notched corners,
 * inner rule) in the brand crimson, with ハイセ lettered inside.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 64" className={className} aria-hidden focusable="false">
      <path
        d="M10 12 H44 Q60 1 76 12 H110 A6 6 0 0 0 116 18 V52 A6 6 0 0 0 110 58 H10 A6 6 0 0 0 4 52 V18 A6 6 0 0 0 10 12 Z"
        fill="#b60f2c"
      />
      <path
        d="M13 16 H45.5 Q60 7 74.5 16 H107 A5 5 0 0 0 112 21 V49 A5 5 0 0 0 107 54 H13 A5 5 0 0 0 8 49 V21 A5 5 0 0 0 13 16 Z"
        fill="none"
        stroke="#f1eee8"
        strokeWidth="1.3"
        opacity=".75"
      />
      <circle cx="60" cy="10.5" r="1.6" fill="#f1eee8" opacity=".85" />
      <text
        x="60"
        y="44"
        textAnchor="middle"
        fill="#f1eee8"
        fontSize="21"
        fontWeight="800"
        letterSpacing="2"
        style={{ fontFamily: 'var(--font-jp)' }}
      >
        ハイセ
      </text>
    </svg>
  )
}
