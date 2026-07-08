import { useEffect, useState } from 'react'
import { nav } from '../content'
import { Logo } from './Logo'

/** Minimal fixed nav: logo + three mono anchor links. */
export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? 'border-line bg-base/85 backdrop-blur-md' : 'border-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#0A0B0A]"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between px-6 md:px-10"
      >
        <a href="#top" aria-label="E71 — home" className="cursor-pointer text-ink">
          <Logo className="h-5 w-auto" />
        </a>
        <div className="flex items-center gap-6 md:gap-10">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="draw-link label-mono cursor-pointer text-ink/60 transition-colors duration-200 hover:text-ink"
            >
              <span aria-hidden="true" className="text-steel">{'//'}</span> {l.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
