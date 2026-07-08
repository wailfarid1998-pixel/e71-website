import { useEffect, useRef } from 'react'
import { process } from '../content'
import { gsap, ScrollTrigger } from '../lib/motion'
import { DiagonalReveal, Reveal, SectionHeading } from './Reveal'

/**
 * "How it works" — the one pinned section on the page. On desktop without
 * reduced motion, the panel track scrolls horizontally, scrubbed to scroll
 * position. On mobile or with reduced motion it falls back to a vertical
 * stack. Panels reveal with the diagonal clip signature.
 */
export function Process() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const trackEl = track.current
      const pinEl = root.current?.querySelector('.process-pin')
      if (!trackEl || !pinEl) return

      const distance = () => trackEl.scrollWidth - window.innerWidth
      const tween = gsap.to(trackEl, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinEl,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      // Fonts/images can change track width — recalc once loaded
      document.fonts?.ready.then(() => ScrollTrigger.refresh())
      return () => {
        tween.kill()
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="process">
      <div className="process-pin lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
        <div className="mx-auto w-full max-w-[1280px] px-6 pt-28 md:px-8 lg:px-12 lg:pt-0">
          <SectionHeading eyebrow={process.eyebrow} headline={process.headline} />
          <Reveal delay={0.15}>
            <p className="label-mono mt-6 hidden text-ink-muted lg:block">
              <span aria-hidden="true">{'// '}</span>
              {process.intro}
            </p>
          </Reveal>
        </div>

        <div
          ref={track}
          className="mt-14 flex flex-col gap-6 px-6 md:px-8 lg:mt-16 lg:w-max lg:flex-row lg:gap-8 lg:pl-[max(3rem,calc((100vw-1280px)/2+3rem))] lg:pr-[20vw]"
        >
          {process.steps.map((step) => (
            <DiagonalReveal
              key={step.index}
              className="process-panel relative flex min-h-[300px] w-full flex-col justify-end overflow-hidden border border-hairline bg-surface p-8 md:p-10 lg:min-h-[360px] lg:w-[540px] lg:shrink-0"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-[clamp(6rem,10vw,9rem)] font-extrabold leading-none tracking-[-0.03em] text-ghost"
              >
                {step.index}
              </span>
              <div>
                <h3 className="font-display text-3xl font-extrabold uppercase tracking-[-0.02em] text-ink lg:text-5xl">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-ink-muted">{step.body}</p>
              </div>
            </DiagonalReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
