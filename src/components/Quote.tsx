import { useEffect, useRef } from 'react'
import { quote } from '../content'
import { gsap, usePrefersReducedMotion } from '../lib/motion'

/**
 * The emotional peak: a full-viewport section holding only the quote.
 * Desktop: pinned, words rise inside masks one at a time, scrubbed to
 * scroll; the green rule and attribution land last. Mobile: the same
 * reveal plays once on entry. Reduced motion: fully static.
 */
export function Quote() {
  const reduced = usePrefersReducedMotion()
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const pinEl = root.current?.querySelector('.quote-pin')
      if (!pinEl) return
      const tl = gsap.timeline({
        scrollTrigger: { trigger: pinEl, start: 'top top', end: '+=170%', scrub: 1, pin: true, anticipatePin: 1 },
      })
      tl.from('.quote-word', { yPercent: 110, duration: 1, stagger: 0.22, ease: 'none' })
        .fromTo('.quote-rule', { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'none', transformOrigin: 'left center' })
        .from('.quote-attr', { autoAlpha: 0, y: 12, duration: 1, ease: 'none' }, '-=0.6')
        .to({}, { duration: 1.4 }) // stillness before the section releases
    })

    mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 65%', once: true },
      })
      tl.from('.quote-word', { yPercent: 110, duration: 0.7, stagger: 0.05, ease: 'expo.out' })
        .fromTo(
          '.quote-rule',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.5, ease: 'expo.out', transformOrigin: 'left center' },
          '-=0.2',
        )
        .from('.quote-attr', { autoAlpha: 0, y: 10, duration: 0.5, ease: 'expo.out' }, '-=0.3')
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={root} aria-label="Quote">
      <div className={reduced ? '' : 'quote-pin flex min-h-screen items-center overflow-hidden'}>
        <div className="mx-auto w-full max-w-[1100px] px-6 py-28 text-center md:px-8 md:py-0">
          {quote.arabic ? (
            <p dir="rtl" lang="ar" className="mb-10 font-display text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[1.3] text-ink">
              {quote.arabic}
            </p>
          ) : null}

          <blockquote>
            <p className="font-display text-[clamp(2.2rem,5.5vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.03em] text-ink">
              {quote.text.split(' ').map((word, i) => (
                <span key={i}>
                  <span className="inline-block overflow-hidden align-bottom">
                    <span className="quote-word inline-block will-change-transform">{word}</span>
                  </span>{' '}
                </span>
              ))}
            </p>
            <footer className="mt-14 flex flex-col items-center">
              <span aria-hidden="true" className="quote-rule h-[2px] w-[60px] bg-accent" />
              <cite className="quote-attr label-mono mt-5 not-italic text-ink-muted">{quote.attribution}</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}
