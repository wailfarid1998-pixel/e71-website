import { useEffect, useRef } from 'react'
import { hero } from '../content'
import { gsap, usePrefersReducedMotion } from '../lib/motion'

export function Hero({ ready }: { ready: boolean }) {
  const reduced = usePrefersReducedMotion()
  const root = useRef<HTMLElement>(null)

  // Load choreography: eyebrow → masked word rise → caption → underline last.
  useEffect(() => {
    if (reduced || !ready) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from('.hero-eyebrow', { autoAlpha: 0, y: 12, duration: 0.8 })
        .from('.hero-word', { yPercent: 115, duration: 1.1, stagger: 0.09 }, '-=0.5')
        .from('.hero-foot', { autoAlpha: 0, y: 14, duration: 0.8, stagger: 0.1 }, '-=0.7')
        .fromTo(
          '.hero-underline',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8, transformOrigin: 'left center' },
          '-=0.5',
        )
    }, root)
    return () => ctx.revert()
  }, [reduced, ready])

  // Scroll (scrubbed): headline drifts; the ghost 71 parallaxes slower than content.
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.to('.hero-headline', {
        yPercent: -12,
        autoAlpha: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom 35%', scrub: true },
      })
      gsap.to('.hero-ghost', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={root} id="top" className="relative flex min-h-[100dvh] items-end overflow-hidden pb-20 md:items-center md:pb-0">
      {/* Giant outlined 71 bleeding off the right edge */}
      <div
        aria-hidden="true"
        className="hero-ghost pointer-events-none absolute -right-[8vw] top-1/2 -translate-y-1/2 select-none font-display text-[40vw] font-extrabold leading-none tracking-[-0.03em] text-ghost"
      >
        71
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 pt-28 md:px-10">
        <p className="hero-eyebrow label-mono text-ink/60">
          <span aria-hidden="true">{'// '}</span>
          {hero.eyebrow}
        </p>

        <h1 className="hero-headline mt-10 font-display text-[clamp(2.6rem,9vw,8.75rem)] font-extrabold leading-[0.95] tracking-[-0.03em] md:mt-14">
          {hero.lines.map((line, li) => (
            <span key={li} className="block">
              {line.map((w, wi) => (
                <span key={wi}>
                  <span className="inline-block overflow-hidden align-bottom">
                    <span className="hero-word inline-block will-change-transform">
                      {w.u ? (
                        <span className="relative inline-block">
                          {w.t}
                          <span
                            aria-hidden="true"
                            className="hero-underline absolute bottom-[0.03em] left-0 h-[0.04em] w-full bg-accent"
                          />
                        </span>
                      ) : (
                        w.t
                      )}
                    </span>
                  </span>
                  {wi < line.length - 1 ? ' ' : null}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <div className="mt-16 flex items-end justify-between md:mt-24">
          {/* Scroll hint, bottom-left */}
          <p className="hero-foot label-mono flex items-center gap-3 text-ink/40">
            {hero.scrollHint}
            <span aria-hidden="true" className="inline-block h-px w-10 bg-steel" />
          </p>

          {/* Pulsing red live-dot — the viewport's single red moment */}
          <p className="hero-foot flex items-center gap-2.5">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live/50 [animation-duration:2.4s]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
            </span>
            <span className="label-mono text-ink/60">{hero.location}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
