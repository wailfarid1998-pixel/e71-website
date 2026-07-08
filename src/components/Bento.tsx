import { stats } from '../content'
import { Reveal, SectionHeading } from './Reveal'

/**
 * Bento-grid stats — clean and breathable, not a wall of cards. Numerals in
 * light display weight; mono labels; two feature cells span wider.
 */
export function Bento() {
  return (
    <section id="scale" className="mx-auto w-full max-w-[1200px] px-6 py-28 md:px-8 md:py-36 lg:px-12">
      <SectionHeading eyebrow={stats.eyebrow} headline={stats.headline} />

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.cells.map((cell, i) => (
          <Reveal
            key={cell.label}
            delay={i * 0.07}
            className={`group rounded-lg border border-hairline bg-surface p-7 transition-colors duration-300 hover:border-accent/35 md:p-8 ${
              i === 0 || i === 3 ? 'lg:col-span-2' : ''
            }`}
          >
            <p className="font-display text-4xl font-light tracking-tight text-ink md:text-5xl">
              {cell.value}
            </p>
            <p className="mt-4 max-w-[28ch] font-mono text-xs tracking-[0.06em] text-ink-muted">
              {cell.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
