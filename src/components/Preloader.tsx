import { useEffect, useRef, useState } from 'react'
import { gsap, WIPE_FROM, WIPE_TO, usePrefersReducedMotion } from '../lib/motion'

/**
 * Preloader (<1.5s): the three logo bars wipe in diagonally one by one —
 * red, green, white — then the whole loader exits with a diagonal
 * clip-path reveal into the hero. Skipped under reduced motion.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion()
  const root = useRef<HTMLDivElement>(null)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    if (reduced) {
      setGone(true)
      onDone()
      return
    }
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            setGone(true)
            onDone()
          },
        })
        .fromTo(
          '.pre-bar',
          { clipPath: WIPE_FROM },
          { clipPath: WIPE_TO, duration: 0.38, stagger: 0.13, ease: 'power3.out' },
        )
        .to({}, { duration: 0.18 })
        .to(root.current, { clipPath: WIPE_FROM, duration: 0.55, ease: 'power4.inOut' })
    }, root)
    return () => ctx.revert()
  }, [reduced, onDone])

  if (gone) return null

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-base"
      style={{ clipPath: WIPE_TO }}
    >
      <svg viewBox="0 0 68 52" className="h-12 w-auto" aria-hidden="true">
        <path className="pre-bar" d="M15 0 H61 L52 12 H6 Z" fill="#E4312B" />
        <path className="pre-bar" d="M15 18 H65 L56 30 H6 Z" fill="#00B368" />
        <path className="pre-bar" d="M15 36 H66 L57 48 H6 Z" fill="#F4F4EF" />
      </svg>
    </div>
  )
}
