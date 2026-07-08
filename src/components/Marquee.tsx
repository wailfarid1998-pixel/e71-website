import { marquee } from '../content'

function Row() {
  return (
    <span className="flex shrink-0 items-baseline">
      {marquee.items.map((item) => (
        <span key={item} className="label-mono flex items-baseline whitespace-nowrap text-ink-muted">
          <span className="px-6 text-steel md:px-10" aria-hidden="true">
            {'//'}
          </span>
          {item}
        </span>
      ))}
    </span>
  )
}

/**
 * Slow infinite marquee strip used as a section divider. Two identical
 * halves; the track translates -50% and loops. Decorative — aria-hidden,
 * static under reduced motion (global CSS kills the animation).
 */
export function Marquee() {
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-hairline py-4">
      <div className="marquee-track flex w-max">
        <Row />
        <Row />
      </div>
    </div>
  )
}
