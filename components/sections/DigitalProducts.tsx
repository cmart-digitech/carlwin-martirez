'use client'

import type { Project } from '@/lib/types'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

interface Props {
  projects: Project[]
}

export default function DigitalProducts({ projects }: Props) {
  const items = [...projects]
    .filter((p) => p.category === 'AI & Digital Tools')
    .sort((a, b) => a.order - b.order)

  if (items.length === 0) return null

  return (
    <section id="digital-products" className="divider">
      <div className="section-wrapper">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-3">
            <p className="section-label">AI & Digital Products</p>
          </div>
          <div className="lg:col-span-9">
            <p className="text-sm text-stone-500 dark:text-stone-400 max-w-lg">
              Design-led digital tools and AI applications built at the intersection of architecture, sustainability, and emerging technology.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
          {items.map((project) => (
            <ProductCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  )
}

function ProductCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex flex-col border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 transition-colors duration-300 overflow-hidden rounded-xl">

      {/* Image */}
      {project.image && (
        <div className="relative w-full overflow-hidden rounded-t-xl grayscale group-hover:grayscale-0 transition-all duration-700" style={{ aspectRatio: '4/3' }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            style={{ objectPosition: project.imagePosition ?? 'center top' }}
          />
        </div>
      )}

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base font-medium text-stone-900 dark:text-stone-100 leading-snug">
            {project.title}
            {project.subtitle && (
              <span className="text-stone-400 dark:text-stone-500 font-normal"> — {project.subtitle}</span>
            )}
          </h3>
          <ArrowUpRight
            size={16}
            className="shrink-0 text-stone-300 dark:text-stone-600 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors mt-0.5"
          />
        </div>

        {(project.location || project.role) && (
          <p className="text-xs text-stone-400 dark:text-stone-500">
            {[project.location, project.role].filter(Boolean).join(' · ')}
          </p>
        )}

        <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
