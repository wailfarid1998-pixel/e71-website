import { useSyncExternalStore } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/** Diagonal clip-path wipe — the logo's cut, used for every reveal. */
export const WIPE_FROM = 'polygon(0% 0%, 0% 0%, -25% 100%, 0% 100%)'
export const WIPE_TO = 'polygon(0% 0%, 125% 0%, 100% 100%, 0% 100%)'

/** Live scroll velocity (px/s-ish), written by LenisProvider, read by Marquee. */
export const scrollVelocity = { current: 0 }

const QUERY = '(prefers-reduced-motion: reduce)'
const mq = () => window.matchMedia(QUERY)

/** Live prefers-reduced-motion flag — every animation gates on this. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const m = mq()
      m.addEventListener('change', onChange)
      return () => m.removeEventListener('change', onChange)
    },
    () => mq().matches,
    () => true,
  )
}
