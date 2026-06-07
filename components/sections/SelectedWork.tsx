'use client'

import { useState } from 'react'
import type { Project, ProjectCategory } from '@/lib/types'
import Image from 'next/image'

const CATEGORIES: { label: string; value: ProjectCategory | 'All' }[] = [
  { label: 'All', value: 'All' },
  { label: 'Cities of the Future', value: 'Cities of the Future' },
  { label: 'Residential Lifestyle', value: 'Residential Lifestyle' },
  { label: 'Elevating Interiors', value: 'Elevating Interiors' },
  { label: 'Path to Net Zero', value: 'Path to Net Zero' },
]

// Consistent card image ratio across all projects
const IMAGE_RATIO = '4/3'

interface Props {
  projects: Project[]
}

export default function SelectedWork({ projects }: Props) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All')

  const sorted = [...projects]
    .filter((p) => p.category !== 'AI & Digital Tools')
    .sort((a, b) => a.order - b.order)
  const filtered =
    activeCategory === 'All'
      ? sorted
      : sorted.filter((p) => p.category === activeCategory)

  return (
    <section id="work" className="divider">
      <div className="section-wrapper">
        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-3">
            <p className="section-label">Selected Work</p>
          </div>
          <div className="lg:col-span-9">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`text-xs tracking-wide px-4 py-1.5 border transition-colors duration-200 ${
                    activeCategory === cat.value
                      ? 'border-stone-900 dark:border-stone-100 bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900'
                      : 'border-stone-300 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-stone-500 dark:hover:border-stone-500'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-stone-400 text-sm py-12">No projects in this category.</p>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col">

      {/* ── Image block — consistent 16:9 for all cards ── */}
      <div className="relative w-full overflow-hidden mb-4 rounded-xl" style={{ aspectRatio: IMAGE_RATIO }}>
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className={`${project.imageFit === 'contain' ? 'object-contain' : 'object-cover'} transition-transform duration-700 ease-out`}
            style={{
              objectPosition: project.imagePosition ?? 'center center',
              transform: `scale(${project.imageScale ?? 1})`,
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = `scale(${(project.imageScale ?? 1) + 0.05})`)}
            onMouseLeave={e => (e.currentTarget.style.transform = `scale(${project.imageScale ?? 1})`)}
          />
        ) : (
          /* Placeholder — same 16:9 box, subtle grid pattern */
          <div className="absolute inset-0 bg-stone-100 dark:bg-stone-900 flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="opacity-25">
              <rect width="36" height="36" rx="2" fill="currentColor" fillOpacity="0.15"/>
              <path d="M6 26l8-8 5 5 5-7 6 10H6z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
              <circle cx="24" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" fill="none"/>
            </svg>
          </div>
        )}

      </div>

      {/* ── Text block ── */}
      <div className="flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-sm font-medium text-stone-900 dark:text-stone-100 leading-snug mb-1">
          {project.title}
          {project.subtitle && (
            <span className="text-stone-400 dark:text-stone-500 font-normal"> — {project.subtitle}</span>
          )}
        </h3>

        {/* Location & role */}
        {(project.location || project.role) && (
          <p className="text-xs text-stone-400 dark:text-stone-500 mb-2">
            {[project.location, project.role].filter(Boolean).join(' · ')}
          </p>
        )}

        {/* Description */}
        <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-3 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
