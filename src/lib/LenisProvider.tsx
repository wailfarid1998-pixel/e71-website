import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, scrollVelocity, usePrefersReducedMotion } from './motion'

/**
 * Smooth inertial scrolling wired into GSAP's ticker so ScrollTrigger stays
 * in sync. Publishes live scroll velocity for the marquee. Disabled entirely
 * under prefers-reduced-motion.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({ lerp: 0.11, anchors: true })
    lenis.on('scroll', (e: { velocity: number }) => {
      scrollVelocity.current = e.velocity
      ScrollTrigger.update()
    })

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      scrollVelocity.current = 0
    }
  }, [reduced])

  return <>{children}</>
}
