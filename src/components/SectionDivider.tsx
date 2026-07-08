import { BarsMark } from './LogoMark'

/**
 * Quiet section divider reusing the three-bar motif: a hairline with a
 * small ghosted mark sitting on it.
 */
export function SectionDivider() {
  return (
    <div aria-hidden="true" className="mx-auto flex w-full max-w-[1200px] items-center gap-6 px-6 md:px-8 lg:px-12">
      <div className="h-px flex-1 bg-hairline" />
      <BarsMark accentTop={false} className="h-3 w-auto text-hairline" />
    </div>
  )
}
