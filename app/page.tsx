import { getContent } from '@/lib/content'
import Nav from '@/components/ui/Nav'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import PracticeAreas from '@/components/sections/PracticeAreas'
import SelectedWork from '@/components/sections/SelectedWork'
import DigitalProducts from '@/components/sections/DigitalProducts'
import Credentials from '@/components/sections/Credentials'
import ConstructionManagement from '@/components/sections/ConstructionManagement'
import Tools from '@/components/sections/Tools'
import Contact from '@/components/sections/Contact'
import ThemeWrapper from '@/components/ui/ThemeWrapper'

export default function Home() {
  const content = getContent()
  const { settings } = content

  return (
    <ThemeWrapper settings={settings}>
      <Nav name={content.hero.name} />
      <main>
        <Hero content={content.hero} />
        <About content={content.about} />
        <PracticeAreas areas={content.practiceAreas} />
        <SelectedWork projects={content.projects} />
        <DigitalProducts projects={content.projects} />
        <Credentials credentials={content.credentials} />
        <ConstructionManagement credentials={content.cmCredentials} />
        <Tools tools={content.tools} />
        <Contact content={content.contact} />
      </main>
      <footer className="border-t border-stone-200 dark:border-stone-800">
        <div className="section-wrapper" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <p className="text-xs text-stone-400 tracking-wide">
            © {new Date().getFullYear()} Carlwin Martirez. All rights reserved.
          </p>
        </div>
      </footer>
    </ThemeWrapper>
  )
}
