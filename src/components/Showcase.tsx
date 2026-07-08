import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { Check, CircleDashed, LoaderCircle, CornerDownLeft } from 'lucide-react'
import { showcase } from '../content'
import { usePrefersReducedMotion } from '../lib/motion'
import { DiagonalReveal, Reveal, SectionHeading } from './Reveal'

type StepState = 'done' | 'active' | 'queued'

function StepIcon({ state }: { state: StepState }) {
  if (state === 'done') return <Check className="h-3.5 w-3.5 text-ink" aria-hidden="true" />
  if (state === 'active')
    return <LoaderCircle className="h-3.5 w-3.5 animate-spin text-ink [animation-duration:1.6s]" aria-hidden="true" />
  return <CircleDashed className="h-3.5 w-3.5 text-ink-muted/60" aria-hidden="true" />
}

/**
 * Product showcase — an animated mock of the E71 Console, monochrome apart
 * from the small red live dot. The prompt types itself, response lines
 * stream in, agent steps tick over. Runs once when scrolled into view;
 * renders the finished state under reduced motion.
 */
export function Showcase() {
  const reduced = usePrefersReducedMotion()
  const frame = useRef<HTMLDivElement>(null)
  const inView = useInView(frame, { once: true, margin: '-20% 0px' })
  const play = inView && !reduced

  const { console: c } = showcase
  const [typed, setTyped] = useState(reduced ? c.prompt.length : 0)
  const [lines, setLines] = useState(reduced ? c.responseLines.length : 0)

  // Type the prompt, then stream response lines — plain timers, no layout thrash.
  useEffect(() => {
    if (!play) return
    let line = 0
    const typer = setInterval(() => {
      setTyped((n) => {
        if (n >= c.prompt.length) {
          clearInterval(typer)
          return n
        }
        return n + 2
      })
    }, 24)
    const streamer = setInterval(() => {
      line += 1
      setLines(Math.min(line, c.responseLines.length))
      if (line >= c.responseLines.length) clearInterval(streamer)
    }, 1100)
    return () => {
      clearInterval(typer)
      clearInterval(streamer)
    }
  }, [play, c.prompt.length, c.responseLines.length])

  useEffect(() => {
    if (reduced) {
      setTyped(c.prompt.length)
      setLines(c.responseLines.length)
    }
  }, [reduced, c.prompt.length, c.responseLines.length])

  const doneTyping = typed >= c.prompt.length
  const streaming = doneTyping && lines < c.responseLines.length

  return (
    <section id="platform" className="mx-auto w-full max-w-[1280px] px-6 py-28 md:px-8 md:py-36 lg:px-12">
      <SectionHeading eyebrow={showcase.eyebrow} headline={showcase.headline} />
      <Reveal delay={0.12}>
        <p className="mt-6 max-w-xl text-ink-muted">{showcase.subheadline}</p>
      </Reveal>

      <DiagonalReveal delay={0.15} className="mt-14 md:mt-16">
        {/* min-height reserves space so the streaming lines never shift layout */}
        <div ref={frame} className="overflow-hidden border border-hairline bg-surface">
          {/* Window chrome */}
          <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
            <span className="label-mono text-ink-muted">
              <span aria-hidden="true">{'// '}</span>
              {c.title}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-live" aria-hidden="true" />
              <span className="label-mono text-ink-muted">{c.live}</span>
            </span>
          </div>

          <div className="grid min-h-[320px] grid-cols-1 md:grid-cols-[1fr_240px]">
            {/* Conversation pane */}
            <div className="flex flex-col gap-6 p-6 md:p-8">
              <div>
                <p className="label-mono mb-2 text-ink-muted/70">Prompt</p>
                <p className="font-mono text-sm leading-relaxed text-ink">
                  {c.prompt.slice(0, typed)}
                  {!doneTyping && (
                    <span className="ml-0.5 inline-block h-4 w-[7px] animate-pulse bg-ink align-middle" aria-hidden="true" />
                  )}
                  {doneTyping && (
                    <CornerDownLeft className="ml-2 inline h-3.5 w-3.5 text-ink-muted/60" aria-hidden="true" />
                  )}
                </p>
              </div>

              <div className="min-h-[7.5rem] border-t border-hairline pt-5">
                <p className="label-mono mb-2 text-ink">E71</p>
                <ul className="space-y-2.5">
                  {c.responseLines.slice(0, lines).map((line) => (
                    <li key={line} className="font-mono text-[13px] leading-relaxed text-ink-muted">
                      <span className="mr-2 text-steel" aria-hidden="true">
                        ▸
                      </span>
                      {line}
                    </li>
                  ))}
                  {streaming && (
                    <li className="flex gap-1.5 pt-1" aria-label="E71 is responding">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          aria-hidden="true"
                          className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-muted"
                          style={{ animationDelay: `${d * 0.2}s` }}
                        />
                      ))}
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Agent-run sidebar */}
            <div className="border-t border-hairline p-6 md:border-l md:border-t-0">
              <p className="label-mono mb-4 text-ink-muted/70">Agent run</p>
              <ul className="space-y-3.5">
                {c.steps.map((step, i) => {
                  // Steps advance as response lines land
                  const state: StepState = reduced
                    ? step.state
                    : lines > i
                      ? 'done'
                      : lines === i && doneTyping
                        ? 'active'
                        : 'queued'
                  return (
                    <li key={step.label} className="flex items-center gap-2.5">
                      <StepIcon state={state} />
                      <span className={`font-mono text-xs ${state === 'queued' ? 'text-ink-muted/60' : 'text-ink'}`}>
                        {step.label}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <p className="border-t border-hairline px-5 py-2.5 text-right font-mono text-[11px] text-ink-muted/60">
            {c.footnote}
          </p>
        </div>
      </DiagonalReveal>
    </section>
  )
}
