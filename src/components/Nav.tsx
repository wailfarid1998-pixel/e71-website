import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { nav } from '../content'
import { Wordmark } from './LogoMark'
import { usePrefersReducedMotion } from '../lib/motion'

export function Nav() {
  const reduced = usePrefersReducedMotion()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? 'border-hairline bg-base/85 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-[#0A0B0A]"
      >
        Skip to content
      </a>
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-6 md:px-8 lg:px-12"
      >
        <a href="#top" aria-label="E71 — home" className="cursor-pointer">
          <Wordmark className="h-5 w-auto text-ink" />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="label-mono cursor-pointer text-ink-muted transition-colors duration-200 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href={nav.cta.href}
            className="cursor-pointer rounded-full bg-accent px-5 py-2 text-sm font-medium text-[#0A0B0A] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            {nav.cta.label}
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="cursor-pointer p-2 text-ink md:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="border-t border-hairline bg-base/95 px-6 pb-8 pt-4 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="label-mono block cursor-pointer py-3 text-ink-muted transition-colors hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={nav.cta.href}
              onClick={() => setOpen(false)}
              className="mt-4 inline-block cursor-pointer rounded-full bg-accent px-6 py-3 text-sm font-medium text-[#0A0B0A]"
            >
              {nav.cta.label}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
