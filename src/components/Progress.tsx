import { useEffect, useRef } from 'react'
import { gsap, usePrefersReducedMotion } from '../lib/motion'

/** Thin green scroll-progress bar along the top edge, scrubbed to scroll. */
export function Progress() {
  const reduced = usePrefersReducedMotion()
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced || !bar.current) return
    const tween = gsap.to(bar.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.4 },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-[2px]">
      <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-accent" />
    </div>
  )
}
