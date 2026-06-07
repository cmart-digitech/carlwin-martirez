import type { ContactContent } from '@/lib/types'
import { Mail, Linkedin, MapPin } from 'lucide-react'

interface Props {
  content: ContactContent
}

export default function Contact({ content }: Props) {
  return (
    <section id="contact" className="divider">
      <div className="section-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            <p className="section-label">Contact</p>
          </div>

          <div className="lg:col-span-9">
            {content.tagline && (
              <p className="text-lg md:text-2xl text-stone-700 dark:text-stone-300 font-normal max-w-xl mb-12 leading-relaxed">
                {content.tagline}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-8">
              <a
                href={`mailto:${content.email}`}
                className="group flex items-center gap-3 text-sm text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
              >
                <Mail size={16} className="text-stone-400 group-hover:text-stone-600 transition-colors" />
                {content.email}
              </a>

              {content.linkedin && (
                <a
                  href={content.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-sm text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  <Linkedin size={16} className="text-stone-400 group-hover:text-stone-600 transition-colors" />
                  LinkedIn
                </a>
              )}

              <span className="flex items-center gap-3 text-sm text-stone-400 dark:text-stone-500">
                <MapPin size={16} />
                {content.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
