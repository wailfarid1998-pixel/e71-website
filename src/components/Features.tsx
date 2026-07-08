import { BrainCircuit, Workflow, Languages, ShieldCheck, type LucideIcon } from 'lucide-react'
import { capabilities } from '../content'
import { Reveal, SectionHeading } from './Reveal'

const ICONS: Record<(typeof capabilities.items)[number]['icon'], LucideIcon> = {
  brain: BrainCircuit,
  workflow: Workflow,
  languages: Languages,
  shield: ShieldCheck,
}

/** Scroll-triggered feature reveals — sequential, staggered, never all at once. */
export function Features() {
  return (
    <section id="capabilities" className="mx-auto w-full max-w-[1200px] px-6 py-28 md:px-8 md:py-36 lg:px-12">
      <SectionHeading eyebrow={capabilities.eyebrow} headline={capabilities.headline} />

      <ul className="mt-16 grid grid-cols-1 gap-x-12 gap-y-14 md:mt-20 md:grid-cols-2">
        {capabilities.items.map((item, i) => {
          const Icon = ICONS[item.icon]
          return (
            <Reveal as="li" key={item.title} delay={i * 0.1} className="group max-w-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-hairline bg-surface transition-colors duration-300 group-hover:border-accent/40">
                <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-display text-xl font-normal text-ink">{item.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-muted">{item.body}</p>
            </Reveal>
          )
        })}
      </ul>
    </section>
  )
}
