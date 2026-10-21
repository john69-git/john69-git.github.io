import { asset } from '../../lib/asset'

/** A small project logo shown inline, right before the project's name. */
export function LogoMark({ src, alt = '', className = '' }: { src: string; alt?: string; className?: string }) {
  return (
    <img
      src={asset(src)}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`inline-block shrink-0 object-contain align-[-0.18em] ${className}`}
    />
  )
}
