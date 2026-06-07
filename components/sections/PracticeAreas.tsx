import type { PracticeArea } from '@/lib/types'
import {
  Building2,
  Leaf,
  Layers,
  Cpu,
  Sparkles,
  HardHat,
  type LucideIcon,
} from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  building: Building2,
  leaf: Leaf,
  layers: Layers,
  cpu: Cpu,
  sparkles: Sparkles,
  'hard-hat': HardHat,
}

interface Props {
  areas: PracticeArea[]
}

export default function PracticeAreas({ areas }: Props) {
  return (
    <section id="practice" className="divider">
      <div className="section-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            <p className="section-label">Practice Areas</p>
          </div>

          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" style={{ gap: 'var(--card-gap)' }}>
              {areas.map((area) => {
                const Icon = ICONS[area.icon] ?? Layers
                return (
                  <div
                    key={area.id}
                    className="group p-6 border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 transition-colors duration-300"
                  >
                    <Icon size={18} className="text-stone-400 dark:text-stone-500 mb-4" />
                    <h3 className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-3 leading-snug">
                      {area.title}
                    </h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
