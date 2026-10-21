import { motion } from 'motion/react'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Delay in milliseconds. */
  delay?: number
  /** Starting vertical offset in px. */
  y?: number
  className?: string
}

/**
 * Fades + lifts its children into place the first time they scroll into view.
 * With "reduce motion" on, Motion skips the movement (see <MotionConfig> in App).
 */
export function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  )
}
