import { useEffect, useRef } from 'react'
import { manifesto } from '../content'
import { gsap, usePrefersReducedMotion } from '../lib/motion'
import { Reveal } from './Reveal'

const CLIP_FROM = 'polygon(0% 0%, 0% 0%, -25% 100%, 0% 100%)'
const CLIP_TO = 'polygon(0% 0%, 125% 0%, 100% 100%, 0% 100%)'

/**
 * About — a pinned, scroll-scrubbed manifesto. Statements swap as you
 * scroll; each key word reveals with the logo's diagonal wipe (outlined
 * ghost type). Falls back to a static stack on mobile / reduced motion.
 */
export function Manifesto() {
  const reduced = usePrefersReducedMotion()
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const pinEl = root.current?.querySelector('.manifesto-pin')
      const sts = gsap.utils.toArray<HTMLElement>('.manifesto-statement')
      if (!pinEl || sts.length === 0) return

      gsap.set(sts.slice(1), { autoAlpha: 0 })
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinEl,
          start: 'top top',
          end: `+=${sts.length * 85}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })
      tl.fromTo(
        sts[0].querySelector('.manifesto-key'),
        { clipPath: CLIP_FROM },
        { clipPath: CLIP_TO, duration: 0.6, ease: 'none' },
        0.05,
      )
      sts.forEach((st, i) => {
        if (i === 0) return
        tl.to(sts[i - 1], { autoAlpha: 0, y: -60, duration: 0.45, ease: 'power2.in' }, i)
        tl.fromTo(st, { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power2.out' }, i + 0.35)
        tl.fromTo(
          st.querySelector('.manifesto-key'),
          { clipPath: CLIP_FROM },
          { clipPath: CLIP_TO, duration: 0.45, ease: 'none' },
          i + 0.6,
        )
      })
      tl.to({}, { duration: 0.6 }) // beat of stillness on the last statement
    })
    return () => mm.revert()
  }, [])

  const pinned = !reduced

  return (
    <section ref={root} id="about">
      <div className={pinned ? 'manifesto-pin flex min-h-screen flex-col justify-center overflow-hidden' : ''}>
        <div className="mx-auto w-full max-w-[1280px] px-6 py-24 md:px-8 md:py-0 lg:px-12">
          <Reveal>
            <p className="label-mono text-ink-muted">
              <span aria-hidden="true">{'// '}</span>
              {manifesto.label}
            </p>
          </Reveal>

          <div className={pinned ? 'relative mt-10 md:mt-12 md:h-[46vh]' : 'mt-10 space-y-16'}>
            {manifesto.statements.map((s, i) => (
              <p
                key={i}
                className={`manifesto-statement max-w-[16ch] font-display text-[clamp(2.4rem,6.5vw,6rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink ${
                  pinned ? 'md:absolute md:inset-0 md:flex md:max-w-none md:items-center' : ''
                }`}
              >
                <span className={pinned ? 'md:max-w-[18ch]' : ''}>
                  {s.pre} <span className="manifesto-key inline-block text-ghost">{s.key}</span>
                  {s.post ? <> {s.post}</> : null}
                </span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
