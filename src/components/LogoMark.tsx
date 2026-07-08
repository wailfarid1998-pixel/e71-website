type BarsProps = {
  className?: string
  /** Brand rule: the top bar carries the single green accent. */
  accentTop?: boolean
  barClassName?: string
}

/**
 * The E71 three-bar motif — three right-leaning parallelograms forming a
 * stylized "E". Recreated as inline SVG (crisp scaling + animatable bars).
 * Each bar carries the `e71-bar` class so GSAP/Motion can stagger them.
 */
export function BarsMark({ className, accentTop = true, barClassName = '' }: BarsProps) {
  return (
    <svg viewBox="0 0 68 52" aria-hidden="true" className={className} fill="currentColor">
      <path
        className={`e71-bar ${barClassName}`}
        d="M15 0 H61 L52 12 H6 Z"
        fill={accentTop ? 'var(--color-accent)' : 'currentColor'}
      />
      <path className={`e71-bar ${barClassName}`} d="M15 18 H65 L56 30 H6 Z" />
      <path className={`e71-bar ${barClassName}`} d="M15 36 H66 L57 48 H6 Z" />
    </svg>
  )
}

type WordmarkProps = {
  className?: string
  accentTop?: boolean
  title?: string
}

/** Full E71 wordmark: bars + a thin "71" set in the display font. */
export function Wordmark({ className, accentTop = true, title = 'E71' }: WordmarkProps) {
  return (
    <svg viewBox="0 0 162 52" role="img" aria-label={title} className={className} fill="currentColor">
      <path
        className="e71-bar"
        d="M15 0 H61 L52 12 H6 Z"
        fill={accentTop ? 'var(--color-accent)' : 'currentColor'}
      />
      <path className="e71-bar" d="M15 18 H65 L56 30 H6 Z" />
      <path className="e71-bar" d="M15 36 H66 L57 48 H6 Z" />
      <text
        x="80"
        y="49"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="300"
        fontSize="64"
        letterSpacing="2"
      >
        71
      </text>
    </svg>
  )
}
