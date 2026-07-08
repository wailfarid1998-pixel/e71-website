import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import type { HWord } from '../content'
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

/**
 * Diagonal clip-path wipe — the logo's slanted cut as a motion signature.
 * The revealing edge leans like the bars (top leads). clip-path only, so it
 * never fights transform-based tweens on the same element.
 */
export function DiagonalReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduced = usePrefersReducedMotion()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'polygon(0% 0%, 0% 0%, -25% 100%, 0% 100%)' }}
      whileInView={{ clipPath: 'polygon(0% 0%, 125% 0%, 100% 100%, 0% 100%)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, delay, ease: EXPO_OUT }}
    >
      {children}
    </motion.div>
  )
}

/** The section's single green keyword underline, drawing left-to-right. */
export function Underlined({ children, delay = 0.5 }: { children: ReactNode; delay?: number }) {
  const reduced = usePrefersReducedMotion()
  return (
    <span className="relative inline-block">
      {children}
      {reduced ? (
        <span aria-hidden="true" className="absolute -bottom-1 left-0 h-[3px] w-full bg-accent md:-bottom-2" />
      ) : (
        <motion.span
          aria-hidden="true"
          className="absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-accent md:-bottom-2"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '0px 0px -12% 0px' }}
          transition={{ duration: 0.6, delay, ease: EXPO_OUT }}
        />
      )}
    </span>
  )
}

/** Render headline words: `u` → green underline, `g` → outlined ghost type. */
export function HeadlineWords({ words }: { words: HWord[] }) {
  return (
    <>
      {words.map((w, i) => {
        const word = w.g ? (
          <span className="text-ghost">{w.t}</span>
        ) : w.u ? (
          <Underlined>{w.t}</Underlined>
        ) : (
          w.t
        )
        return (
          <span key={i}>
            {word}
            {i < words.length - 1 ? ' ' : null}
          </span>
        )
      })}
    </>
  )
}

type SectionHeadingProps = {
  eyebrow: string
  headline: HWord[]
  className?: string
}

/**
 * Section heading: "//"-prefixed mono eyebrow + loud Archivo display line.
 * Exactly one green underline per section, drawn on scroll.
 */
export function SectionHeading({ eyebrow, headline, className = '' }: SectionHeadingProps) {
  return (
    <div className={className}>
      <Reveal>
        <p className="label-mono text-ink-muted">
          <span aria-hidden="true">{'// '}</span>
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2.5rem,6.5vw,5.5rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-ink">
          <HeadlineWords words={headline} />
        </h2>
      </Reveal>
    </div>
  )
}
