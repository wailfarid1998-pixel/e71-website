import { useEffect, useRef, useState } from 'react'
import { gsap, EASE, usePrefersReducedMotion } from '../lib/motion'

/**
 * Preloader: the three logo bars wipe in diagonally — red, green, white —
 * then the whole curtain reveals the page with a diagonal clip wipe.
 * Total ≈ 1.4s. Skipped entirely under reduced motion. The flag colors
 * live only here; the page itself stays monochrome.
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
        { clipPath: 'polygon(0% 0%, 0% 0%, -25% 100%, 0% 100%)' },
        {
          clipPath: 'polygon(0% 0%, 125% 0%, 100% 100%, 0% 100%)',
          duration: 0.4,
          stagger: 0.11,
          ease: EASE.out,
        },
      )
        .fromTo('.loader-num', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: EASE.out }, '-=0.15')
        .to({}, { duration: 0.15 })
        .to(root.current, {
          clipPath: 'polygon(0% 0%, 0% 0%, -25% 100%, 0% 100%)',
          duration: 0.55,
          ease: 'expo.inOut',
        })
    }, root)
    return () => ctx.revert()
  }, [reduced, onDone])

  if (gone) return null

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-base"
      style={{ clipPath: 'polygon(0% 0%, 125% 0%, 100% 100%, 0% 100%)' }}
    >
      <div className="flex items-end gap-4">
        <svg viewBox="0 0 68 52" className="h-10 w-auto" aria-hidden="true">
          <path className="loader-bar" d="M15 0 H61 L52 12 H6 Z" fill="#E4312B" />
          <path className="loader-bar" d="M15 18 H65 L56 30 H6 Z" fill="#00B368" />
          <path className="loader-bar" d="M15 36 H66 L57 48 H6 Z" fill="#F4F4EF" />
        </svg>
        <span className="loader-num font-[300] font-['Space_Grotesk'] text-4xl leading-none tracking-widest text-ink">
          71
        </span>
      </div>
    </div>
  )
}
