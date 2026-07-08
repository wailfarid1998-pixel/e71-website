import { useSyncExternalStore } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const mq = () => window.matchMedia(REDUCED_MOTION_QUERY)

/** Live prefers-reduced-motion flag. Every animation in the site gates on this. */
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

/** Shared easing/duration tokens so all motion has one rhythm. */
export const EASE = {
  out: 'expo.out',
  micro: 'power2.out',
} as const
