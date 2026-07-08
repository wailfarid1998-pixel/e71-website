import { useEffect, useRef } from 'react'
import { quote } from '../content'
import { gsap, usePrefersReducedMotion } from '../lib/motion'

/**
 * The emotional peak — a full-viewport section holding only the quote.
 * Words fade from 8% opacity to full one at a time, scrubbed to scroll
 * (pinned on desktop, unpinned scrub on mobile); the green rule and mono
 * attribution land last. Fully static under reduced motion.
 */
export function Quote() {
  const reduced = usePrefersReducedMotion()
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    const build = (pin: boolean) => {
      const pinEl = root.current?.querySelector('.quote-pin')
      if (!pinEl) return
      gsap
        .timeline({
          scrollTrigger: pin
            ? { trigger: pinEl, start: 'top top', end: '+=170%', scrub: true, pin: true, anticipatePin: 1 }
            : { trigger: pinEl, start: 'top 70%', end: 'bottom 95%', scrub: true },
        })
        .fromTo('.q-word', { autoAlpha: 0.08 }, { autoAlpha: 1, duration: 1, stagger: 0.22, ease: 'none' })
        .fromTo(
          '.q-rule',
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'none', transformOrigin: 'left center' },
        )
        .fromTo('.q-attr', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 1, ease: 'none' }, '-=0.5')
        .to({}, { duration: 1.3 }) // a beat of stillness before release
    }

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => build(true))
    mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => build(false))
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} aria-label="Quote">
      <div className={reduced ? '' : 'quote-pin flex min-h-[100dvh] items-center overflow-hidden'}>
        <div className="mx-auto w-full max-w-[1100px] px-6 py-32 md:px-10 md:py-0">
          {quote.arabic ? (
            <p dir="rtl" lang="ar" className="mb-10 font-display text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.35] text-ink">
              {quote.arabic}
            </p>
          ) : null}

          <blockquote>
            <p className="font-display text-[clamp(2.1rem,5.5vw,5rem)] font-extrabold leading-[1.0] tracking-[-0.03em] text-ink">
              {quote.text.split(' ').map((word, i) => (
                <span key={i}>
                  <span className="q-word inline-block">{word}</span>{' '}
                </span>
              ))}
            </p>
            <footer className="mt-14">
              <span aria-hidden="true" className="q-rule block h-[2px] w-[60px] bg-accent" />
              <cite className="q-attr label-mono mt-5 block not-italic text-ink/60">{quote.attribution}</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
