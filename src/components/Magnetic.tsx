import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, usePrefersReducedMotion } from '../lib/motion'

/**
 * Magnetic hover wrapper — used on exactly one focal CTA (skill rule:
 * 1–2 magnetic elements max). Pull is clamped to 0.3× the cursor offset so
 * the element never leaves its hit box. Pointer-fine devices only; inert
 * under reduced motion.
 */
export function Magnetic({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !window.matchMedia('(pointer: fine)').matches) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' })

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      xTo((e.clientX - r.left - r.width / 2) * 0.3)
      yTo((e.clientY - r.top - r.height / 2) * 0.3)
    }
    const leave = () => {
      xTo(0)
      yTo(0)
    }
    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', leave)
    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', leave)
      gsap.set(el, { x: 0, y: 0 })
    }
  }, [reduced])

  return (
    <div ref={ref} className="inline-block will-change-transform">
      {children}
    </div>
  )
}
