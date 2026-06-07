import Image from 'next/image'
import type { AboutContent } from '@/lib/types'

interface Props {
  content: AboutContent
}

export default function About({ content }: Props) {
  return (
    <section id="about" className="divider">
      <div className="section-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Section label */}
          <div className="lg:col-span-3">
            <p className="section-label">About</p>
          </div>

          {/* Text — left side */}
          <div className="lg:col-span-6 space-y-6">
            {content.paragraphs.map((para, i) => (
              <p
                key={i}
                className={`leading-relaxed text-stone-700 dark:text-stone-300 ${
                  i === 0
                    ? 'text-xl md:text-2xl font-normal text-stone-800 dark:text-stone-200'
                    : 'text-base md:text-lg'
                }`}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Portrait — right side */}
          <div className="lg:col-span-3">
            <div className="relative w-full overflow-hidden shadow-sm rounded-xl" style={{ aspectRatio: '3/4' }}>
              <Image
                src="/carl-profile.webp"
                alt="Carlwin Martirez"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
