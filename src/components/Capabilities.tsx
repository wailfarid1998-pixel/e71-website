import { useEffect, useRef } from 'react'
import { capabilities } from '../content'
import { gsap, ScrollTrigger, WIPE_FROM, WIPE_TO } from '../lib/motion'

/**
 * "// WHAT WE BUILD" — the pinned horizontal moment. The section pins and
 * the user scrolls sideways through four full-width panels, scrubbed to
 * scroll, with a thin green progress bar along the bottom. Each statement
 * reveals with the diagonal wipe as its panel enters. Below 768px the
 * panels stack vertically with scroll-triggered reveals instead of pinning.
 */
export function Capabilities() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const pinEl = root.current?.querySelector('.caps-pin')
      const trackEl = track.current
      if (!pinEl || !trackEl) return

      const distance = () => trackEl.scrollWidth - window.innerWidth
      const tween = gsap.to(trackEl, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinEl,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          transformOrigin: 'left center',
          scrollTrigger: { trigger: pinEl, start: 'top top', end: () => `+=${distance()}`, scrub: true },
        },
      )
      const panels = gsap.utils.toArray<HTMLElement>('.caps-panel')
      panels.forEach((panel, i) => {
        const statement = panel.querySelector('.caps-statement')
        if (!statement) return
        if (i === 0) {
          // first panel is on screen at pin start — wipe as the section approaches
          gsap.fromTo(
            statement,
            { clipPath: WIPE_FROM },
            {
              clipPath: WIPE_TO,
              ease: 'none',
              scrollTrigger: { trigger: pinEl, start: 'top 70%', end: 'top 15%', scrub: true },
            },
          )
        } else {
          gsap.fromTo(
            statement,
            { clipPath: WIPE_FROM },
            {
              clipPath: WIPE_TO,
              ease: 'none',
              scrollTrigger: { trigger: panel, containerAnimation: tween, start: 'left 80%', end: 'left 25%', scrub: true },
            },
          )
        }
      })
      document.fonts?.ready.then(() => ScrollTrigger.refresh())
    })

    // Mobile: vertical stack, triggered (not pinned) reveals
    mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('.caps-panel').forEach((panel) => {
        gsap
          .timeline({ scrollTrigger: { trigger: panel, start: 'top 75%', once: true } })
          .fromTo(
            panel.querySelector('.caps-statement'),
            { clipPath: WIPE_FROM },
            { clipPath: WIPE_TO, duration: 0.9, ease: 'power4.out' },
          )
          .from(panel.querySelector('.caps-body'), { autoAlpha: 0, y: 16, duration: 0.6, ease: 'power3.out' }, '-=0.45')
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={root} id="work">
      <div className="caps-pin relative md:h-screen md:overflow-hidden">
        {/* Section header, held on screen through the pin */}
        <div className="pointer-events-none z-10 mx-auto w-full max-w-[1320px] px-6 pt-24 md:absolute md:inset-x-0 md:top-0 md:px-10">
          <p className="label-mono text-ink/60">
            <span aria-hidden="true">{'// '}</span>
            {capabilities.eyebrow}
          </p>
          <p className="mt-3 font-display text-lg font-semibold tracking-tight text-ink/80">{capabilities.heading}</p>
        </div>

        <div ref={track} className="flex flex-col md:h-screen md:w-max md:flex-row">
          {capabilities.panels.map((p) => (
            <article
              key={p.num}
              className="caps-panel flex w-full flex-col justify-center border-b border-line px-6 py-20 last:border-b-0 md:h-screen md:w-screen md:border-b-0 md:px-10 md:py-0"
            >
              <div className="mx-auto w-full max-w-[1320px]">
                <p className="label-mono text-ink/60">
                  <span className="text-accent">{p.num}</span>
                  {'  —  '}
                  {p.label}
                </p>
                <h3 className="caps-statement mt-7 max-w-[14ch] font-display text-[clamp(2.4rem,7vw,7rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-ink md:mt-9">
                  {p.statement}
                </h3>
                <p className="caps-body mt-7 max-w-md text-[0.95rem] leading-relaxed text-ink/60 md:mt-9">{p.body}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Thin green progress bar along the bottom of the pinned viewport */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-[2px] bg-line md:block">
          <div ref={bar} className="h-full w-full origin-left scale-x-0 bg-accent" />
        </div>
      </div>
    </section>
  )
}
