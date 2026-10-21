/**
 * Shared SVG filters, rendered once at the top of the app.
 * Any inline SVG can use them with filter="url(#watercolor)" etc.
 */
export function InkDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="pointer-events-none absolute" focusable="false">
      <defs>
        {/* Ragged, hand-inked edges */}
        <filter id="ink-rough" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Subtle pen wobble for detailed line art (centipedes) */}
        <filter id="ink-rough-fine" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Watercolor bleed: displaced, softened, with a darker pooled edge */}
        <filter id="watercolor" x="-35%" y="-35%" width="170%" height="170%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="4" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="70" xChannelSelector="R" yChannelSelector="G" result="bleed" />
          <feGaussianBlur in="bleed" stdDeviation="5" result="soft" />
          <feMorphology in="bleed" operator="erode" radius="4" result="inner" />
          <feComposite in="bleed" in2="inner" operator="out" result="edge" />
          <feGaussianBlur in="edge" stdDeviation="1.4" result="edgeSoft" />
          <feMerge>
            <feMergeNode in="soft" />
            <feMergeNode in="edgeSoft" />
          </feMerge>
        </filter>

        {/* Lighter variant for small shapes */}
        <filter id="watercolor-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="11" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="22" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="2.2" />
        </filter>
      </defs>
    </svg>
  )
}
