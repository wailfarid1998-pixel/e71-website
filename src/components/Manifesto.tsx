import { useEffect, useRef } from 'react'
import { manifesto } from '../content'
import { gsap, usePrefersReducedMotion } from '../lib/motion'

/**
 * About — scroll-scrubbed manifesto. Each statement starts dim gray and its
 * words light up to off-white one by one as it passes through the viewport,
 * scrubbed to scroll. Static off-white under reduced motion.
 */
export function Manifesto() {
  const reduced = usePrefersReducedMotion()
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.manifesto-st').forEach((st) => {
        gsap.fromTo(
          st.querySelectorAll('.m-word'),
          { color: '#3A3A35' },
          {
            color: '#F4F4EF',
            stagger: 0.3,
            ease: 'none',
            scrollTrigger: { trigger: st, start: 'top 80%', end: 'top 28%', scrub: true },
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={root} id="about" className="mx-auto w-full max-w-[1320px] px-6 py-32 md:px-10 md:py-48">
      <p className="label-mono text-ink/60">
        <span aria-hidden="true">{'// '}</span>
        {manifesto.eyebrow}
      </p>

      <div className="mt-16 space-y-28 md:mt-24 md:space-y-44">
        {manifesto.statements.map((s, i) => (
          <p
            key={i}
            className={`manifesto-st max-w-[22ch] font-display text-[clamp(2rem,5.5vw,4.75rem)] font-extrabold leading-[1.04] tracking-[-0.03em] ${
              reduced ? 'text-ink' : 'text-dim'
            } ${i === 1 ? 'md:ml-[16%]' : i === 2 ? 'md:ml-[8%]' : ''}`}
          >
            {s.split(' ').map((word, wi) => (
              <span key={wi}>
                <span className="m-word">{word}</span>{' '}
              </span>
            ))}
          </p>
        ))}
      </div>
    </section>
  )
}
