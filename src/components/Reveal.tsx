import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../lib/motion'

const EXPO_OUT = [0.16, 1, 0.3, 1] as const

export function revealVariants(delay = 0): Variants {
  return {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: EXPO_OUT } },
  }
}

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section'
}

/**
 * Scroll-triggered entrance (fade + translate, transform/opacity only).
 * Renders static content under reduced motion.
 */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const reduced = usePrefersReducedMotion()
  const Tag = motion[as]

  if (reduced) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Tag
      className={className}
      variants={revealVariants(delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
    >
      {children}
    </Tag>
  )
}
