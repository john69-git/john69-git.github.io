import { motion } from 'motion/react'
import { Fragment } from 'react'

interface SplitTextProps {
  text: string
  className?: string
  /** Delay before the first character, in seconds. */
  delay?: number
  /** Seconds between characters. */
  stagger?: number
  /** Animate on mount (hero) instead of when scrolled into view. */
  immediate?: boolean
}

/**
 * Reveals text character by character from behind a mask, like ink being pulled
 * up off the page. Words never break mid-word. Screen readers get the plain string once.
 */
export function SplitText({ text, className, delay = 0, stagger = 0.05, immediate = false }: SplitTextProps) {
  const target = { y: '0%', rotate: 0, opacity: 1 }
  const trigger = immediate ? { animate: target } : { whileInView: target, viewport: { once: true } }
  const words = text.split(' ')
  let index = 0

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, w) => (
          <Fragment key={`${word}-${w}`}>
            {w > 0 && ' '}
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((char) => {
                const i = index++
                return (
                  <span key={i} className="-mt-[0.1em] -mb-[0.3em] inline-block overflow-hidden pt-[0.1em] pb-[0.3em] align-bottom">
                    <motion.span
                      className="inline-block will-change-transform"
                      initial={{ y: '105%', rotate: 6, opacity: 0 }}
                      {...trigger}
                      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: delay + i * stagger }}
                    >
                      {char}
                    </motion.span>
                  </span>
                )
              })}
            </span>
          </Fragment>
        ))}
      </span>
    </span>
  )
}
