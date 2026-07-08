import { ArrowUpRight } from 'lucide-react'
import { finalCta } from '../content'
import { Magnetic } from './Magnetic'
import { Reveal, SectionHeading } from './Reveal'

/** Final CTA — the page's single cursor-responsive moment (magnetic button). */
export function FinalCta() {
  return (
    <section id="access" className="mx-auto w-full max-w-[1200px] px-6 py-32 text-center md:px-8 md:py-44 lg:px-12">
      <SectionHeading
        eyebrow={finalCta.eyebrow}
        headline={finalCta.headline}
        className="[&_h2]:mx-auto [&_h2]:text-[clamp(2.5rem,6vw,5rem)]"
      />
      <Reveal delay={0.15}>
        <p className="mx-auto mt-8 max-w-xl text-ink-muted">{finalCta.body}</p>
      </Reveal>
      <Reveal delay={0.25} className="mt-12">
        <Magnetic>
          <a
            href={finalCta.cta.href}
            className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-accent px-9 py-4 text-[15px] font-medium text-[#0A0B0A] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            {finalCta.cta.label}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </Magnetic>
      </Reveal>
    </section>
  )
}
