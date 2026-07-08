import { useScroll, useTransform, motion } from 'motion/react'
import { usePrefersReducedMotion } from '../lib/motion'

/**
 * Scroll progress as the three-bar motif: each slanted bar fills across a
 * third of the page. Monochrome — color budget stays with the logo,
 * keyword underline, and live dot. Hidden under reduced motion.
 */
export function ScrollProgress() {
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll()

  const first = useTransform(scrollYProgress, [0, 1 / 3], [0, 1], { clamp: true })
  const second = useTransform(scrollYProgress, [1 / 3, 2 / 3], [0, 1], { clamp: true })
  const third = useTransform(scrollYProgress, [2 / 3, 1], [0, 1], { clamp: true })

  if (reduced) return null

  return (
    <div
      aria-hidden="true"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-1.5 md:flex"
    >
      {[first, second, third].map((p, i) => (
        <div key={i} className="h-[3px] w-7 -skew-x-[30deg] overflow-hidden bg-hairline">
          <motion.div className="h-full w-full origin-left bg-ink" style={{ scaleX: p }} />
        </div>
      ))}
    </div>
  )
}
