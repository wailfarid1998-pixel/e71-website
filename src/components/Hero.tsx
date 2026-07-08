import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { hero } from '../content'
import { gsap, EASE, usePrefersReducedMotion } from '../lib/motion'
import { BarsMark } from './LogoMark'
import { Magnetic } from './Magnetic'

/** Grain texture as an inline SVG data-URI — no network request, GPU-cheap. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"

export function Hero({ ready }: { ready: boolean }) {
  const reduced = usePrefersReducedMotion()
  const root = useRef<HTMLElement>(null)

  // Entrance: bars draw, headline words rise inside masks, underline draws last.
  useEffect(() => {
    if (reduced || !ready) return
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(
          '.hero-mark .e71-bar',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, stagger: 0.09, ease: EASE.out, transformOrigin: 'left center' },
        )
        .from('.hero-word', { yPercent: 110, duration: 0.7, stagger: 0.06, ease: EASE.out }, '-=0.25')
        .from('.hero-follow', { opacity: 0, y: 20, duration: 0.55, stagger: 0.09, ease: EASE.out }, '-=0.35')
        .fromTo('.hero-underline', { scaleX: 0 }, { scaleX: 1, duration: 0.55, ease: EASE.out, transformOrigin: 'left center' }, '-=0.3')
    }, root)
    return () => ctx.revert()
  }, [reduced, ready])

  // Scroll: headline shifts subtly; the giant ghost 71 parallaxes slower.
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
      {/* Static grain — quiet, never competes with type */}
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />

      {/* Giant outlined 71 bleeding off the right edge, slow parallax */}
      <div
        aria-hidden="true"
        className="hero-ghost pointer-events-none absolute -right-[6vw] top-1/2 -translate-y-1/2 select-none font-display text-[clamp(16rem,42vw,38rem)] font-extrabold leading-none tracking-[-0.03em] text-ghost"
      >
        71
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-24 pt-32 md:px-8 lg:px-12">
        <BarsMark className="hero-mark h-8 w-auto text-ink md:h-10" />

        <h1 className="hero-shift mt-10 font-display text-[clamp(2.75rem,8.5vw,7.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-ink">
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
                            className="hero-underline absolute bottom-[0.02em] left-0 h-[0.045em] w-full bg-accent"
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

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-12">
          <p className="hero-follow max-w-xl text-base leading-relaxed text-ink-muted md:col-span-6 md:col-start-1 md:text-lg">
            {hero.subheadline}
          </p>

          <div className="hero-follow flex flex-wrap items-center gap-5 md:col-span-5 md:col-start-8 md:justify-end">
            <Magnetic>
              <a
                href={hero.cta.href}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-[#0A0B0A] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                {hero.cta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </Magnetic>
            <a
              href={hero.secondary.href}
              className="nav-link label-mono cursor-pointer text-ink-muted transition-colors duration-200 hover:text-ink"
            >
              {hero.secondary.label}
            </a>
          </div>
        </div>

        {/* Live status — the viewport's single red element; text carries meaning */}
        <p className="hero-follow mt-16 flex items-center gap-2.5">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live/50 [animation-duration:2.4s]" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
          </span>
          <span className="label-mono text-ink-muted">{hero.status}</span>
        </p>
      </div>
    </section>
  )
}
