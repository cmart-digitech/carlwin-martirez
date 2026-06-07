import type { HeroContent } from '@/lib/types'

interface Props {
  content: HeroContent
}

export default function Hero({ content }: Props) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end pb-20 md:pb-28"
    >
      {/* Minimal geometric background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute right-0 top-0 w-1/2 h-full opacity-[0.03]"
          style={{
            background:
              'repeating-linear-gradient(90deg, var(--accent) 0px, var(--accent) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(0deg, var(--accent) 0px, var(--accent) 1px, transparent 1px, transparent 60px)',
          }}
        />
      </div>

      <div className="section-wrapper" style={{ paddingTop: '0', paddingBottom: '0' }}>
        {/* Tagline — above the name */}
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-8 font-medium" style={{ letterSpacing: '0.2em' }}>
          {content.tagline}
        </p>

        {/* Name — very large editorial treatment */}
        <h1 className="text-6xl md:text-8xl lg:text-[7rem] xl:text-[8rem] font-medium text-stone-900 dark:text-stone-100 leading-none tracking-tight mb-10">
          {content.name}
        </h1>

        {/* Intro paragraph */}
        <div className="max-w-xl mb-12">
          <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 leading-relaxed">
            {content.intro}
          </p>
        </div>

        {/* CTA links */}
        <div className="flex flex-wrap gap-8 items-center">
          {content.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-stone-900 dark:text-stone-100 border-b border-stone-900 dark:border-stone-100 hover:border-transparent transition-all duration-200 pb-0.5 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-12 bg-stone-900 dark:bg-stone-100 animate-pulse" />
      </div>
    </section>
  )
}
