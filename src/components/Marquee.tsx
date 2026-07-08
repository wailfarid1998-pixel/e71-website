import { useEffect, useRef } from 'react'
import { marquee } from '../content'
import { gsap, scrollVelocity, usePrefersReducedMotion } from '../lib/motion'

/**
 * Infinite mono-type divider strip. The base drift is constant; its speed
 * subtly rises with live scroll velocity (lerped, clamped). Decorative —
 * aria-hidden, static under reduced motion.
 */
export function Marquee() {
  const reduced = usePrefersReducedMotion()
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced || !track.current) return

    const tween = gsap.to(track.current, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 })
    let scale = 1
    const tick = () => {
      const target = gsap.utils.clamp(1, 4, 1 + Math.abs(scrollVelocity.current) / 18)
      scale += (target - scale) * 0.08 // lerp so speed changes feel inertial
      tween.timeScale(scale)
    }
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      tween.kill()
    }
  }, [reduced])

  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-line py-4">
      <div ref={track} className="flex w-max whitespace-nowrap">
        {[0, 1].map((i) => (
          <span key={i} className="label-mono shrink-0 text-ink/50">
            {marquee.text.repeat(2)}
          </span>
        ))}
      </div>
    </div>
  )
}
