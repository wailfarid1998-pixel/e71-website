/**
 * A thin red band fixed to the left edge — an abstract nod to the hoist bar
 * of the UAE flag. Purely decorative (red is never load-bearing) and kept
 * away from any green fill.
 */
export function EdgeAccent() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-1/2 z-40 hidden h-40 w-[3px] -translate-y-1/2 bg-live/70 lg:block"
    />
  )
}
