import { useEffect, useState } from 'react'
import { nav } from '../content'
import { Wordmark } from './LogoMark'

/** Minimal nav: logo + two mono links. No buttons, no menus. */
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
        scrolled ? 'border-hairline bg-base/85 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-[#0A0B0A]"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-6 md:px-8 lg:px-12"
      >
        <a href="#top" aria-label="E71 — home" className="cursor-pointer">
          <Wordmark className="h-5 w-auto text-ink" />
        </a>

        <div className="flex items-center gap-7 md:gap-9">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link label-mono cursor-pointer text-ink-muted transition-colors duration-200 hover:text-ink ${
                l.accent ? 'nav-link-accent' : ''
              }`}
            >
              <span aria-hidden="true" className="text-steel">{'//'}</span> {l.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
