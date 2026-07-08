import { useEffect, useRef, useState } from 'react'
import { gsap, EASE, usePrefersReducedMotion } from '../lib/motion'

/**
 * First-load page loader: the three bars draw in with a stagger, hold a
 * beat, then the curtain lifts. Skipped entirely under reduced motion.
 */
export function Loader({ onDone }: { onDone: () => void }) {
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
      const tl = gsap.timeline({
        onComplete: () => {
          setGone(true)
          onDone()
        },
      })
      tl.fromTo(
        '.loader-bar',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.55, stagger: 0.12, ease: EASE.out, transformOrigin: 'left center' },
      )
        .fromTo('.loader-num', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: EASE.out }, '-=0.2')
        .to({}, { duration: 0.25 })
        .to(root.current, { yPercent: -100, duration: 0.7, ease: 'expo.inOut' })
    }, root)
    return () => ctx.revert()
  }, [reduced, onDone])

  if (gone) return null

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-base"
    >
      <div className="flex items-end gap-4">
        <svg viewBox="0 0 68 52" className="h-10 w-auto text-ink" fill="currentColor" aria-hidden="true">
          <path className="loader-bar" d="M15 0 H61 L52 12 H6 Z" fill="var(--color-accent)" />
          <path className="loader-bar" d="M15 18 H65 L56 30 H6 Z" />
          <path className="loader-bar" d="M15 36 H66 L57 48 H6 Z" />
        </svg>
        <span className="loader-num font-display text-4xl font-light leading-none tracking-widest">71</span>
      </div>
    </div>
  )
}
