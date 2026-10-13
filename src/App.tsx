import { About } from './components/About'
import { Contact } from './components/Contact'
import { CursorGlow } from './components/CursorGlow'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Interests } from './components/Interests'
import { Journey } from './components/Journey'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      {/* page-wide backdrop: faint grid that fades out toward the bottom */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none fixed inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_30%,transparent_80%)]"
      />
      <CursorGlow />

      <Navbar />
      <main id="main" className="relative">
        <Hero />
        <About />
        <Interests />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
