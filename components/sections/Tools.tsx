import type { ToolItem } from '@/lib/types'

const CATEGORY_ORDER: ToolItem['category'][] = [
  'BIM & CAD',
  'Design & Visualisation',
  'AI & Generative',
  'Development',
  'Sustainability Standards',
]

interface Props {
  tools: ToolItem[]
}

export default function Tools({ tools }: Props) {
  const grouped = CATEGORY_ORDER.reduce<Record<string, ToolItem[]>>((acc, cat) => {
    acc[cat] = tools.filter((t) => t.category === cat)
    return acc
  }, {})

  return (
    <section id="tools" className="divider">
      <div className="section-wrapper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-3">
            <p className="section-label">Tools &amp; Capabilities</p>
          </div>

          <div className="lg:col-span-9">
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-8">
              {CATEGORY_ORDER.map((cat) => {
                const items = grouped[cat]
                if (!items || items.length === 0) return null
                return (
                  <div key={cat}>
                    <p className="text-xs tracking-widest uppercase text-stone-400 mb-4 font-medium" style={{ letterSpacing: '0.12em' }}>
                      {cat}
                    </p>
                    <ul className="space-y-2">
                      {items.map((tool) => (
                        <li key={tool.id} className="text-sm text-stone-700 dark:text-stone-300">
                          {tool.name}
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
