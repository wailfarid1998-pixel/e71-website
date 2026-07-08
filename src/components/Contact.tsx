import { useEffect, useRef, useState } from 'react'
import { contact, footer } from '../content'
import { gsap, usePrefersReducedMotion } from '../lib/motion'
import { BarsIcon } from './Logo'
import { Magnetic } from './Magnetic'

const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'

/**
 * Giant mono mailto link: text scrambles/decodes on hover, a green underline
 * draws in (.draw-link-accent), and the whole link is magnetic. Static under
 * reduced motion.
 */
function ScrambleEmail({ email }: { email: string }) {
  const reduced = usePrefersReducedMotion()
  const [display, setDisplay] = useState(email)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearInterval(timer.current), [])

  const start = () => {
    if (reduced) return
    let frame = 0
    window.clearInterval(timer.current)
    timer.current = window.setInterval(() => {
      frame += 1
      setDisplay(
        email
          .split('')
          .map((c, i) => (i < frame || c === '@' || c === '.' ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join(''),
      )
      if (frame >= email.length) window.clearInterval(timer.current)
    }, 40)
  }
  const stop = () => {
    window.clearInterval(timer.current)
    setDisplay(email)
  }

  return (
    <Magnetic>
      <a
        href={`mailto:${email}`}
        aria-label={`Email ${email}`}
        onMouseEnter={start}
        onMouseLeave={stop}
        onFocus={start}
        onBlur={stop}
        className="draw-link draw-link-accent cursor-pointer font-mono text-[clamp(1.3rem,4.5vw,3.75rem)] tracking-tight text-ink"
      >
        <span aria-hidden="true">{display}</span>
      </a>
    </Magnetic>
  )
}

/** Contact + minimal footer — the closing moment. */
export function Contact() {
  const reduced = usePrefersReducedMotion()
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: 'top 70%', once: true } })
        .from('.contact-in', { autoAlpha: 0, y: 34, duration: 0.9, stagger: 0.12, ease: 'power4.out' })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={root} id="contact">
      <div className="mx-auto w-full max-w-[1320px] px-6 pb-28 pt-36 md:px-10 md:pb-36 md:pt-48">
        <p className="contact-in label-mono text-ink/60">
          <span aria-hidden="true">{'// '}</span>
          {contact.eyebrow}
        </p>
        <h2 className="contact-in mt-8 font-display text-[clamp(3.25rem,13vw,12rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink">
          {contact.headline}
        </h2>
        <div className="contact-in mt-14 md:mt-20">
          <ScrambleEmail email={contact.email} />
        </div>
      </div>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <BarsIcon className="h-5 w-auto" />
          <p className="font-mono text-xs text-ink/50">{footer.legal}</p>
          <nav aria-label="Social" className="flex items-center gap-8">
            {footer.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="draw-link label-mono cursor-pointer text-ink/60 transition-colors duration-200 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </section>
  )
}
