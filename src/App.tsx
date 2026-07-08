import { useState } from 'react'
import { LenisProvider } from './lib/LenisProvider'
import { Preloader } from './components/Preloader'
import { Progress } from './components/Progress'
import { Cursor } from './components/Cursor'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Capabilities } from './components/Capabilities'
import { Manifesto } from './components/Manifesto'
import { Quote } from './components/Quote'
import { Contact } from './components/Contact'

/** Film grain as an inline SVG data-URI — no request, GPU-cheap. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <LenisProvider>
      <Preloader onDone={() => setReady(true)} />
      <Progress />
      <Cursor />
      <Nav />
      {/* Grain so the black never feels flat */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80] opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
      />
      <main id="main">
        <Hero ready={ready} />
        <Marquee />
        <Capabilities />
        <Manifesto />
        <Quote />
        <Contact />
      </main>
    </LenisProvider>
  )
}
