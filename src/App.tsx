import { useState } from 'react'
import { LenisProvider } from './lib/LenisProvider'
import { Loader } from './components/Loader'
import { Nav } from './components/Nav'
import { ScrollProgress } from './components/ScrollProgress'
import { EdgeAccent } from './components/EdgeAccent'
import { SectionDivider } from './components/SectionDivider'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Process } from './components/Process'
import { Showcase } from './components/Showcase'
import { Bento } from './components/Bento'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <LenisProvider>
      <Loader onDone={() => setReady(true)} />
      <Nav />
      <ScrollProgress />
      <EdgeAccent />
      <main id="main">
        <Hero ready={ready} />
        <SectionDivider />
        <Features />
        <SectionDivider />
        <Process />
        <SectionDivider />
        <Showcase />
        <SectionDivider />
        <Bento />
        <SectionDivider />
        <FinalCta />
      </main>
      <Footer />
    </LenisProvider>
  )
}
