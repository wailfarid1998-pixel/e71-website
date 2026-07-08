import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../lib/motion'

const EXPO_OUT = [0.16, 1, 0.3, 1] as const

export function revealVariants(delay = 0): Variants {
  return {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: EXPO_OUT } },
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

type HeadlineParts = { pre: string; accent: string; post: string }

type SectionHeadingProps = {
  eyebrow: string
  headline: HeadlineParts
  className?: string
}

/**
 * Section heading: mono eyebrow + display headline with exactly one
 * green keyword (brand rule: one highlight per section).
 */
export function SectionHeading({ eyebrow, headline, className = '' }: SectionHeadingProps) {
  return (
    <div className={className}>
      <Reveal>
        <p className="label-mono text-ink-muted">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.08] tracking-tight text-ink">
          {headline.pre} <span className="text-accent">{headline.accent}</span>
          {headline.post ? <> {headline.post}</> : null}
        </h2>
      </Reveal>
    </div>
  )
}
