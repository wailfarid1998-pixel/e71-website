import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { hero } from '../content'
import { gsap, EASE, usePrefersReducedMotion } from '../lib/motion'
import { BarsMark } from './LogoMark'

/** Grain texture as an inline SVG data-URI — no network request, GPU-cheap. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"

/**
 * Split a phrase into per-word / per-char spans for kinetic animation.
 * The split copy is aria-hidden; a sr-only span carries the real text.
 */
function KineticText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`inline-block ${className}`} aria-hidden="true">
      {text.split(' ').map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden pb-[0.08em] align-bottom whitespace-nowrap">
          {word.split('').map((ch, ci) => (
            <span key={ci} className="hero-char inline-block will-change-transform">
              {ch}
            </span>
          ))}
          {' '}
        </span>
      ))}
    </span>
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const reduced = usePrefersReducedMotion()
  const root = useRef<HTMLElement>(null)

  // Entrance: bars draw, headline chars settle, supporting copy follows.
  useEffect(() => {
    if (reduced || !ready) return
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(
          '.hero-mark .e71-bar',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, stagger: 0.1, ease: EASE.out, transformOrigin: 'left center' },
        )
        .from(
          '.hero-char',
          { yPercent: 110, duration: 0.8, stagger: 0.014, ease: EASE.out },
          '-=0.35',
        )
        .from(
          '.hero-follow',
          { opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: EASE.out },
          '-=0.5',
        )
    }, root)
    return () => ctx.revert()
  }, [reduced, ready])

  // Scroll: the settled headline shifts subtly as you leave the hero (scrubbed).
  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.to('.hero-shift', {
        yPercent: -8,
        opacity: 0.25,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom 40%', scrub: 0.8 },
      })
      gsap.to('.hero-drift', {
        xPercent: 6,
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
      })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      {/* Slow drifting gradient + static grain — never competes with text */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="hero-drift absolute -left-1/4 top-[-30%] h-[80vmax] w-[80vmax] rounded-full bg-[radial-gradient(closest-side,rgba(0,179,104,0.07),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-24 pt-32 md:px-8 lg:px-12">
        <BarsMark className="hero-mark h-8 w-auto text-ink md:h-10" />

        <h1 className="hero-shift mt-10 font-display text-[clamp(2.75rem,7vw,6rem)] font-light leading-[1.02] tracking-[-0.02em] text-ink">
          <span className="sr-only">
            {hero.headline.pre} {hero.headline.accent} {hero.headline.post}
          </span>
          <KineticText text={`${hero.headline.pre} `} />
          <KineticText text={hero.headline.accent} className="text-accent" />
          <br className="hidden md:block" />
          <KineticText text={hero.headline.post} className="text-ink" />
        </h1>

        <p className="hero-follow hero-shift mt-8 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
          {hero.subheadline}
        </p>

        <div className="hero-follow mt-10 flex flex-wrap items-center gap-4">
          <a
            href={hero.cta.href}
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-[#0A0B0A] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            {hero.cta.label}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
          <a
            href={hero.secondary.href}
            className="label-mono cursor-pointer border-b border-transparent pb-0.5 text-ink-muted transition-colors duration-200 hover:border-hairline hover:text-ink"
          >
            {hero.secondary.label}
          </a>
        </div>

        {/* Live status — red dot is decorative; the text carries the meaning */}
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
