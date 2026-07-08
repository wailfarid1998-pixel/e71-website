# E71 — Marketing Site

Dark-first marketing website for E71, an AI-native company. Built to the
[`design-system/MASTER.md`](design-system/MASTER.md) generated with the
**ui-ux-pro-max** skill (styles: Motion-Driven, Kinetic Typography, Parallax
Storytelling, AI-Native UI, Minimalism & Swiss Style), locked to the E71
brand palette ("Union" — UAE-flag-derived green/red over near-black).

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
- GSAP + ScrollTrigger — scroll-scrubbed motion, the pinned horizontal section
- Motion (`motion/react`) — component animation and reveals
- Lenis — smooth inertial scrolling (wired into GSAP's ticker)
- Lucide — SVG icons

## Where things live

| Path | What |
|------|------|
| `src/content.ts` | **All placeholder copy** — edit text here only |
| `src/index.css` | Brand tokens (colors, fonts, utilities) |
| `design-system/MASTER.md` | Design-system source of truth |
| `src/components/LogoMark.tsx` | Inline-SVG three-bar mark + wordmark (animatable) |
| `public/e71-logo.png` | Original wordmark PNG (trimmed + optimized, true alpha) |
| `src/lib/motion.ts` | GSAP/ScrollTrigger setup + `usePrefersReducedMotion` |
| `src/lib/LenisProvider.tsx` | Smooth scroll, disabled under reduced motion |

## Motion & accessibility notes

- Every animation — loader, kinetic hero, scroll reveals, the pinned
  horizontal section, console mock, magnetic CTA, Lenis itself — is gated
  behind `prefers-reduced-motion`; reduced users get static, fully-visible
  content and native scrolling.
- One pinned section only (skill rule), scrub `1`, with a vertical fallback
  below `lg` viewports.
- The red accent is decorative-only (live dot with text label, left-edge
  hoist band); green is the single functional accent.
- Verified at 375 / 768 / 1024 / 1440 with no horizontal overflow; animated
  containers are pre-sized to keep CLS low.
