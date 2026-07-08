# E71 Design System — MASTER (Source of Truth)

Generated with the `ui-ux-pro-max` design-system generator (product: AI platform / AI-native company;
dials: variance 3 — centered/minimal, motion 8 — complex choreography, density 3 — spacious), then
locked to the E71 brand brief. Brand tokens below **override** the generator's default palette/fonts.

## Pattern

- **Name:** AI-Driven Dynamic Landing × Minimalism & Swiss Style
- **Conversion focus:** Immediate value demonstration — "show, don't tell". One primary CTA per screen.
- **Sections:** Hero → Feature reveals → Horizontal process (pinned) → Product showcase → Bento stats → Magnetic CTA → Footer
- **Styles drawn from skill:** Motion-Driven, Kinetic Typography, Parallax Storytelling, AI-Native UI, Minimalism & Swiss Style

## Colors (dark-first — "Union", UAE-flag-derived)

| Role                | Hex       | CSS variable        | Notes |
|---------------------|-----------|---------------------|-------|
| Base / page         | `#0A0B0A` | `--color-base`      | near-black, carries ~90% with off-white |
| Surface / cards     | `#16181A` | `--color-surface`   | |
| Hairline border     | `#1E201E` | `--color-hairline`  | 1px borders only |
| Text primary        | `#F4F4EF` | `--color-ink`       | 15.9:1 on base (AAA) |
| Text muted          | `#9AA097` | `--color-ink-muted` | 7.3:1 on base, 6.7:1 on surface (AA+) |
| Accent (green)      | `#00B368` | `--color-accent`    | 7.2:1 on base. Buttons (dark text on green), links, active states, ONE keyword highlight per section, top logo bar |
| Red (decorative)    | `#D8352A` | `--color-live`      | RARE. Live status dot (always with a text label), left-edge hoist band, hover/active micro-states. Never text-bearing, never load-bearing, never adjacent to green fills |

Rules: no gradients between red and green; red and green must never sit adjacent as fills.
Red is never the only signal — always pair with text/icon.

## Typography

| Role            | Font           | Weights   | Usage |
|-----------------|----------------|-----------|-------|
| Display         | Space Grotesk  | 300–500   | Headlines, large numerals. Light (300) at hero scale, tight leading, slight tracking |
| Body / UI       | Inter          | 400–500   | Paragraphs, buttons, UI |
| Technical labels| IBM Plex Mono  | 400       | Nav labels, eyebrows, stats labels, console chrome |

Scale (display): `clamp()`-driven — hero ≈ clamp(2.75rem, 8vw, 7rem), section ≈ clamp(2rem, 4.5vw, 3.5rem).
Body 16px minimum, line-height 1.6. Mono labels 11–13px, letter-spacing 0.08–0.14em, uppercase.

## Spacing & Layout (density: spacious)

- Spacing scale: 24 / 32 / 48 / 64 / 96 / 128 px between section-level elements
- Container: max-w-[1200px], gutters 24px (375) / 32px (768) / 48px (1024+)
- Breakpoints: 375 / 768 / 1024 / 1440
- Radius: 8px cards, 999px pills. Shadows: none — hierarchy via hairlines + surface steps
- z-index scale: 0 / 10 (content) / 40 (nav) / 50 (overlays) / 100 (loader)

## Brand mark — three-bar motif

Three right-leaning parallelogram bars (stylized "E") + thin "71" in Space Grotesk 300.
- PNG source: `/public/e71-logo.png` (black on transparent — invert on dark)
- Inline SVG component: `src/components/LogoMark.tsx` (top bar = accent green)
- Reused as: favicon, page loader (bars stagger/draw in), scroll-progress indicator (three bars fill in thirds), section dividers. Always subtle.

## Motion (tier: complex — but restrained, Awwwards-caliber)

- Libraries: GSAP + ScrollTrigger (scroll-scrubbed/pinned), Motion (motion/react) for component/micro animation, Lenis for inertial scroll
- Easings: `expo.out` enter, `power2.out` micro, `none` for scrubbed. Nothing bouncy
- Durations: micro 150–300ms, reveals 400–700ms, scrubbed = tied to scroll
- Stagger: 30–50ms per item (chars 15ms)
- Pin at most this one section (horizontal process); scrub 0.5–1.5, never instant jumps
- SplitText is a paid plugin — use the in-house word/char splitter with sr-only fallback text
- Magnetic effect on ONE focal CTA only; clamp pull ≤ 0.3× offset; pointer:fine only
- **Every animation is gated behind `prefers-reduced-motion`** (gsap.matchMedia + useReducedMotion). Reduced = content visible immediately, no pinning, no loader choreography, native scroll

## Anti-patterns (from skill — avoid)

- Heavy chrome, slow response feedback, wall of cards, crowded layouts
- Emoji as icons (SVG/Lucide only), raw hex in components (tokens only)
- Decorative-only animation; animating width/height/top/left (transform/opacity only)
- Removing focus rings; hover-only affordances; color-only meaning
- Pinning >2 sections; split-animating long paragraphs; magnetic on many elements
- Layout shift from animation (reserve space; CLS < 0.1)

## Pre-delivery checklist (skill)

- [ ] No emojis as icons (Lucide SVG); cursor-pointer on all clickables
- [ ] Hover states 150–300ms; visible focus states (2px accent ring)
- [ ] Text contrast ≥ 4.5:1 on base AND surface (verified above)
- [ ] prefers-reduced-motion respected on every animation incl. Lenis, loader, pin
- [ ] Responsive at 375 / 768 / 1024 / 1440; no horizontal scroll (except the intentional pinned scrub)
- [ ] Images/containers pre-sized (CLS < 0.1); fonts display=swap; heavy work lazy
- [ ] Keyboard navigable; skip link; aria-labels on icon-only buttons; red never sole signal
