import type { CMCredential } from '@/lib/types'
import { HardHat } from 'lucide-react'

interface Props {
  credentials: CMCredential[]
}

const GROUPS: CMCredential['group'][] = ['Safety & Induction', 'Professional Memberships']

export default function ConstructionManagement({ credentials }: Props) {
  return (
    <section id="construction" className="divider">
      <div className="section-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

          {/* Label */}
          <div className="lg:col-span-3">
            <p className="section-label">Construction Management</p>
          </div>

          {/* Content */}
          <div className="lg:col-span-9">

            {/* Intro badge */}
            <div className="flex items-center gap-2 mb-8">
              <HardHat size={14} className="text-stone-400" />
              <span className="text-xs tracking-widest text-stone-400 uppercase">
                Australian Credentials &amp; Memberships
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              {GROUPS.map((group) => {
                const items = credentials.filter((c) => c.group === group)
                return (
                  <div key={group}>
                    <p className="text-xs tracking-widest text-stone-400 uppercase mb-4 pb-2 border-b border-stone-200 dark:border-stone-800">
                      {group}
                    </p>
                    <ul className="space-y-4">
                      {items.map((item) => (
                        <li key={item.id} className="flex items-start justify-between gap-4">
                          <span className="text-sm text-stone-700 dark:text-stone-300 leading-snug">
                            {item.title}
                          </span>
                          {item.year && (
                            <span className="text-xs text-stone-400 dark:text-stone-500 shrink-0 mt-0.5">
                              {item.year}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
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
