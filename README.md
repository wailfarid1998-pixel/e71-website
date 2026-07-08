# E71 — Presence Site

Single-page brochure site for E71, an AI company from the UAE. Seven
choreographed moments, every scroll animation scrubbed to scroll position,
under 200 words of copy. Reference standard: Awwwards / CSSDA animated
site-of-the-day winners.

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
- GSAP + ScrollTrigger — every scroll animation uses `scrub: true`
- Lenis — smooth inertial scrolling, velocity feeds the marquee

## The seven moments

1. **Preloader** — three bars wipe in diagonally (red, green, white), diagonal clip exit, <1.5s
2. **Hero** — masked word rise, green underline last, 40vw ghost "71" parallaxing slower than content (scrubbed), pulsing red dot + location, scroll hint
3. **Marquee** — infinite mono strip whose speed rises with live scroll velocity
4. **Capabilities** — pinned horizontal scroll through four panels (scrubbed), green progress bar, diagonal-wipe statements; stacks vertically below 768px
5. **About** — manifesto words light up from dim gray to off-white one by one, scrubbed
6. **Quote** — full-viewport Sheikh Zayed quote, words fade 8%→100% scrubbed, green rule + mono attribution last (Arabic slot renders only if supplied in `content.ts`)
7. **Contact** — enormous "Let's talk.", scramble-decode magnetic mailto with green underline, minimal footer

Plus: thin green top scroll-progress bar, custom dot cursor (desktop only),
film-grain overlay, draw-in link underlines.

## Where things live

| Path | What |
|------|------|
| `src/content.ts` | **Every word on the site** — edit here only |
| `src/index.css` | Tokens (colors, fonts, ghost/label utilities, cursor) |
| `src/components/Logo.tsx` | Inline-SVG logo stand-in — swap in provided SVG files as-is |
| `src/lib/motion.ts` | GSAP setup, diagonal-wipe constants, reduced-motion hook |
| `src/lib/LenisProvider.tsx` | Lenis ↔ GSAP wiring + scroll-velocity feed |

## Rules encoded in the build

- 95% monochrome; red/green are micro-accents only (logo bars, red live dot,
  one green underline, green progress bars, hover states). No color surfaces.
- The name is never explained anywhere — keep it that way.
- Never generate Arabic text; `quote.arabic` renders only if you supply it.
- Every animation gates on `prefers-reduced-motion` (static page, native scroll).
- Verified at 375 / 768 / 1440; horizontal viewport scroll is locked.
