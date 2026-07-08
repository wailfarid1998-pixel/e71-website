import { useEffect, useRef } from 'react'
import { hero } from '../content'
import { gsap, EASE, usePrefersReducedMotion } from '../lib/motion'

export function Hero({ ready }: { ready: boolean }) {
  const reduced = usePrefersReducedMotion()
  const root = useRef<HTMLElement>(null)

  // Entrance: label fades, words rise inside masks, the underline draws last.
  useEffect(() => {
    if (reduced || !ready) return
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .from('.hero-label', { opacity: 0, y: 12, duration: 0.6, ease: EASE.out })
        .from('.hero-word', { yPercent: 110, duration: 0.9, stagger: 0.08, ease: EASE.out }, '-=0.35')
        .from('.hero-caption', { opacity: 0, y: 14, duration: 0.6, ease: EASE.out }, '-=0.5')
        .fromTo(
          '.hero-underline',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: EASE.out, transformOrigin: 'left center' },
          '-=0.35',
        )
    }, root)
    return () => ctx.revert()
  }, [reduced, ready])

  // Scroll: headline drifts subtly; the ghost 71 parallaxes slower than content.
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.to('.hero-shift', {
        yPercent: -10,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom 40%', scrub: 0.8 },
      })
      gsap.to('.hero-ghost', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={root} id="top" className="relative flex min-h-[100dvh] items-center overflow-hidden">
      {/* Giant outlined 71 bleeding off the right edge, slow parallax */}
      <div
        aria-hidden="true"
        className="hero-ghost pointer-events-none absolute -right-[7vw] top-1/2 -translate-y-1/2 select-none font-display text-[clamp(16rem,44vw,40rem)] font-extrabold leading-none tracking-[-0.03em] text-ghost"
      >
        71
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-24 pt-32 md:px-8 lg:px-12">
        <p className="hero-label label-mono text-ink-muted">
          <span aria-hidden="true">{'// '}</span>
          {hero.label}
        </p>

        <h1 className="hero-shift mt-12 font-display text-[clamp(2.6rem,9vw,8.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink">
          {hero.headline.map((line, li) => (
            <span key={li} className="block">
              {line.map((w, wi) => (
                <span key={wi}>
                  <span className="inline-block overflow-hidden align-bottom">
                    <span className={`hero-word inline-block will-change-transform ${w.g ? 'text-ghost' : ''}`}>
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

        {/* The viewport's single red element; text carries the meaning */}
        <p className="hero-caption mt-20 flex items-center gap-2.5">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live/50 [animation-duration:2.4s]" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
          </span>
          <span className="label-mono text-ink-muted">{hero.caption}</span>
        </p>
      </div>
    </section>
  )
}
