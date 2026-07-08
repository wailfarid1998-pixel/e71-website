import { useEffect, useRef, useState } from 'react'
import { contact, footer } from '../content'
import { usePrefersReducedMotion } from '../lib/motion'
import { BarsMark } from './LogoMark'
import { Magnetic } from './Magnetic'
import { Reveal } from './Reveal'

const CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'

/** Giant mailto link that scrambles/decodes on hover. Static under reduced motion. */
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
      const resolved = frame // one character locks in per tick, left to right
      setDisplay(
        email
          .split('')
          .map((c, i) => (i < resolved || c === '@' || c === '.' ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join(''),
      )
      if (resolved >= email.length) window.clearInterval(timer.current)
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
        className="nav-link cursor-pointer font-mono text-[clamp(1.35rem,4.5vw,3.75rem)] tracking-tight text-ink"
      >
        <span aria-hidden="true">{display}</span>
      </a>
    </Magnetic>
  )
}

/** Contact + minimal footer — the closing moment. */
export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="mx-auto w-full max-w-[1280px] px-6 pb-24 pt-32 md:px-8 md:pb-32 md:pt-44 lg:px-12">
        <Reveal>
          <p className="label-mono text-ink-muted">
            <span aria-hidden="true">{'// '}</span>
            {contact.label}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-8 font-display text-[clamp(3.25rem,13vw,12rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink">
            {contact.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="mt-14 md:mt-20">
          <ScrambleEmail email={contact.email} />
        </Reveal>
      </div>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between md:px-8 lg:px-12">
          <BarsMark className="h-5 w-auto text-ink" />
          <p className="font-mono text-xs text-ink-muted/70">{footer.legal}</p>
          <nav aria-label="Social" className="flex items-center gap-7">
            {footer.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="nav-link label-mono cursor-pointer text-ink-muted transition-colors duration-200 hover:text-ink"
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
