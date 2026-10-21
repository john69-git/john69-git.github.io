import { MotionConfig } from 'motion/react'
import { PageCentipede } from './components/art/PageCentipede'
import { InkDefs } from './components/art/InkDefs'
import { CursorGlow } from './components/layout/CursorGlow'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Interests } from './components/sections/Interests'
import { Journey } from './components/sections/Journey'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'

export default function App() {
  return (
    // reducedMotion="user": when the OS asks for reduced motion, Motion drops
    // movement (transforms) and keeps only gentle opacity fades.
    <MotionConfig reducedMotion="user">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <InkDefs />
      <div aria-hidden className="grain" />
      <CursorGlow />
      <ScrollProgress />

      <Navbar />
      <main id="main" className="relative isolate">
        <PageCentipede />
        <Hero />
        <About />
        <Interests />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
