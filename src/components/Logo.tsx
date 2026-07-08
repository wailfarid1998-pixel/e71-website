/**
 * E71 brand mark — three bars (red, green, white) with the diagonal cut,
 * forming an abstract "E". Inline SVG stand-in; replace with the provided
 * SVG files as-is when supplied. Bars carry `logo-bar` for animation.
 */
export function BarsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 68 52" aria-hidden="true" className={className}>
      <path className="logo-bar" d="M15 0 H61 L52 12 H6 Z" fill="#E4312B" />
      <path className="logo-bar" d="M15 18 H65 L56 30 H6 Z" fill="#00B368" />
      <path className="logo-bar" d="M15 36 H66 L57 48 H6 Z" fill="#F4F4EF" />
    </svg>
  )
}

/** Bars + "71" in Archivo 800. */
export function Logo({ className, title = 'E71' }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 176 52" role="img" aria-label={title} className={className}>
      <path className="logo-bar" d="M15 0 H61 L52 12 H6 Z" fill="#E4312B" />
      <path className="logo-bar" d="M15 18 H65 L56 30 H6 Z" fill="#00B368" />
      <path className="logo-bar" d="M15 36 H66 L57 48 H6 Z" fill="#F4F4EF" />
      <text
        x="80"
        y="49"
        fontFamily="'Archivo', sans-serif"
        fontWeight="800"
        fontSize="60"
        letterSpacing="-1"
        fill="currentColor"
      >
        71
      </text>
    </svg>
  )
}
