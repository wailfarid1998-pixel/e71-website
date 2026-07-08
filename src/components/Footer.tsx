import { useEffect, useRef } from 'react'
import { footer, site } from '../content'
import { gsap, EASE, usePrefersReducedMotion } from '../lib/motion'
import { BarsMark } from './LogoMark'

/**
 * Footer — the calm close. The three-bar mark draws in one last time as it
 * scrolls into view, and the original PNG wordmark (inverted for dark)
 * anchors the brand block. Bars nudge on hover — quiet, not showy.
 */
export function Footer() {
  const reduced = usePrefersReducedMotion()
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.footer-mark .e71-bar',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: EASE.out,
          transformOrigin: 'left center',
          scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
        },
      )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <footer ref={root} className="border-t border-hairline">
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-12 pt-20 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.2fr_2fr]">
          {/* Brand block — inline SVG mark (animated) + original PNG wordmark */}
          <div>
            <BarsMark className="footer-mark h-12 w-auto text-ink [&_.e71-bar]:transition-transform [&_.e71-bar]:duration-300 hover:[&_.e71-bar:nth-child(1)]:translate-x-1 hover:[&_.e71-bar:nth-child(3)]:-translate-x-1" />
            <img
              src="/e71-logo.png"
              alt="E71 wordmark"
              width={565}
              height={223}
              loading="lazy"
              decoding="async"
              className="mt-8 h-14 w-auto invert-[0.95]"
            />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-muted">{site.about}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footer.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="label-mono text-ink-muted/70">{col.title}</h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#top"
                        className="cursor-pointer text-sm text-ink-muted transition-colors duration-200 hover:text-ink"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-ink-muted/70">{footer.legal}</p>
          <p className="font-mono text-xs text-ink-muted/70">{footer.location}</p>
        </div>
      </div>
    </footer>
  )
}
