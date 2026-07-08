import { useEffect, useRef } from 'react'
import { gsap, usePrefersReducedMotion } from '../lib/motion'

/**
 * Minimal custom cursor — a small dot that trails the pointer and expands
 * over links. Desktop (pointer: fine) only; never rendered under reduced
 * motion, in which case the native cursor is left untouched.
 */
export function Cursor() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !window.matchMedia('(pointer: fine)').matches) return

    document.documentElement.classList.add('custom-cursor')
    const xTo = gsap.quickTo(el, 'x', { duration: 0.22, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.22, ease: 'power3.out' })

    const move = (e: MouseEvent) => {
      // stay invisible until the pointer's real position is known
      gsap.set(el, { autoAlpha: 1 })
      xTo(e.clientX)
      yTo(e.clientY)
    }
    const isTarget = (e: Event) => (e.target as Element | null)?.closest?.('a, button')
    const over = (e: MouseEvent) => {
      if (isTarget(e)) gsap.to(el, { scale: 3, duration: 0.3, ease: 'power3.out' })
    }
    const out = (e: MouseEvent) => {
      if (isTarget(e)) gsap.to(el, { scale: 1, duration: 0.3, ease: 'power3.out' })
    }
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over)
    window.addEventListener('mouseout', out)
    return () => {
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mouseout', out)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none invisible fixed left-0 top-0 z-[90] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink opacity-0 mix-blend-difference md:block"
    />
  )
}
