import { capabilities } from '../content'
import { DiagonalReveal, SectionHeading } from './Reveal'

/**
 * Capabilities as asymmetric editorial rows — oversized ghost numerals,
 * hairline separators, content offset off the left edge. No card grid.
 */
export function Features() {
  return (
    <section id="capabilities" className="mx-auto w-full max-w-[1280px] px-6 py-28 md:px-8 md:py-36 lg:px-12">
      <SectionHeading eyebrow={capabilities.eyebrow} headline={capabilities.headline} />

      <ul className="mt-20 md:mt-24">
        {capabilities.items.map((item, i) => (
          <li key={item.title} className="border-t border-hairline last:border-b">
            <DiagonalReveal delay={0.05}>
              <div className="grid grid-cols-12 items-baseline gap-y-4 py-10 md:py-14">
                <span
                  aria-hidden="true"
                  className="col-span-3 font-display text-[clamp(3.5rem,8vw,7.5rem)] font-extrabold leading-none tracking-[-0.03em] text-ghost md:col-span-2"
                >
                  {item.index}
                </span>
                <h3
                  className={`col-span-9 font-display text-2xl font-extrabold uppercase tracking-[-0.02em] text-ink md:col-span-4 md:text-4xl ${
                    i % 2 === 1 ? 'md:col-start-4' : 'md:col-start-3'
                  }`}
                >
                  {item.title}
                </h3>
                <p className="col-span-12 max-w-md text-[0.95rem] leading-relaxed text-ink-muted md:col-span-4 md:col-start-9">
                  {item.body}
                </p>
              </div>
            </DiagonalReveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
