# E71 — Presence Site

Single-page portfolio/brochure site for E71, an AI company from the UAE.
Not a product site — six choreographed moments, under 150 words of copy,
95% monochrome with micro-accents. Reference standard: Awwwards/CSSDA
"animated" gallery winners.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build
```

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4 (tokens in `src/index.css` `@theme`)
- GSAP + ScrollTrigger — pinned, scroll-scrubbed choreography
- Lenis — smooth inertial scrolling (wired into GSAP's ticker)
- Motion (`motion/react`) — micro-interactions and reveals

## The six moments

1. **Preloader** — three logo bars wipe in diagonally (red, green, white), diagonal clip reveal, ≈1.4s
2. **Hero** — massive Archivo headline, masked word stagger, green underline draws last, giant ghost "71" parallaxes slower than content
3. **Marquee** — slow infinite mono strip (the seven emirates)
4. **About** — pinned manifesto; statements swap on scroll, key words reveal with the diagonal wipe
5. **Quote** — full-viewport Sheikh Zayed quote, words scrubbed to scroll, green rule + mono attribution land last
6. **Contact** — enormous "Let's talk.", scramble-decode mailto link, minimal footer

## Where things live

| Path | What |
|------|------|
| `src/content.ts` | **Every word on the site** (< 150 total) — edit here only |
| `src/index.css` | Brand tokens (colors, fonts, cursor, marquee) |
| `design-system/MASTER.md` | Design-system source of truth |
| `src/components/LogoMark.tsx` | Inline-SVG logo stand-in — swap in provided SVG files as-is |
| `src/lib/motion.ts` | GSAP setup + `usePrefersReducedMotion` |

## Notes

- The meaning of the name is never explained anywhere on the site — keep it that way.
- Color discipline: max 3 small color moments per viewport (logo bars, one green
  underline, one red live dot). No green/red surfaces or button fills, ever.
- The Arabic line of the quote renders only if supplied in `content.ts`
  (`quote.arabic`) — never generate it.
- Every animation (preloader, pins, scrubs, cursor, marquee, scramble, Lenis)
  gates on `prefers-reduced-motion`; reduced users get a fully static page.
- Custom cursor is desktop-only (`pointer: fine`), hidden until first mousemove.
- Verified at 375 / 768 / 1440; horizontal viewport scroll is locked.
