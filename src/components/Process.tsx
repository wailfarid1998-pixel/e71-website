import { useEffect, useRef } from 'react'
import { process } from '../content'
import { gsap, ScrollTrigger } from '../lib/motion'
import { Reveal, SectionHeading } from './Reveal'

/**
 * "How it works" — the one pinned section on the page (skill rule: 1–2 max).
 * On desktop without reduced motion, the panel track scrolls horizontally,
 * scrubbed to scroll position. On mobile or with reduced motion it falls
 * back to a plain vertical stack.
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
        <div className="mx-auto w-full max-w-[1200px] px-6 pt-28 md:px-8 lg:px-12 lg:pt-0">
          <SectionHeading eyebrow={process.eyebrow} headline={process.headline} />
          <Reveal delay={0.15}>
            <p className="label-mono mt-6 hidden text-ink-muted lg:block">{process.intro}</p>
          </Reveal>
        </div>

        <div
          ref={track}
          className="mt-14 flex flex-col gap-6 px-6 md:px-8 lg:mt-16 lg:w-max lg:flex-row lg:gap-8 lg:pl-[max(3rem,calc((100vw-1200px)/2+3rem))] lg:pr-[20vw]"
        >
          {process.steps.map((step, i) => (
            <Reveal
              key={step.index}
              delay={i * 0.08}
              className="process-panel flex min-h-[300px] w-full flex-col justify-between rounded-lg border border-hairline bg-surface p-8 md:p-10 lg:min-h-[340px] lg:w-[520px] lg:shrink-0"
            >
              <div className="flex items-baseline justify-between">
                <span className="label-mono text-accent">{step.index}</span>
                <span aria-hidden="true" className="h-px w-16 bg-hairline" />
              </div>
              <div>
                <h3 className="font-display text-3xl font-light text-ink lg:text-4xl">{step.title}</h3>
                <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-ink-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
