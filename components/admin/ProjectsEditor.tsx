'use client'

import { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Image from 'next/image'
import type { Project, ProjectCategory } from '@/lib/types'
import { EditorSection, Field, inputCls, textareaCls, selectCls, BtnPrimary, BtnSecondary, BtnDanger } from './shared'

const CATEGORIES: ProjectCategory[] = [
  'Cities of the Future',
  'Residential Lifestyle',
  'Elevating Interiors',
  'Path to Net Zero',
  'AI & Digital Tools',
]

interface Props {
  projects: Project[]
  onChange: (projects: Project[]) => void
}

export default function ProjectsEditor({ projects, onChange }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [uploading, setUploading] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null)

  const sorted = [...projects].sort((a, b) => a.order - b.order)

  function update(id: string, patch: Partial<Project>) {
    onChange(projects.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  }

  function remove(id: string) {
    onChange(projects.filter((p) => p.id !== id))
  }

  function add() {
    const maxOrder = projects.reduce((m, p) => Math.max(m, p.order), 0)
    const newProj: Project = {
      id: uuidv4(),
      title: 'New Project',
      subtitle: '',
      category: 'Cities of the Future',
      location: '',
      role: '',
      description: '',
      tags: [],
      image: '',
      order: maxOrder + 1,
      featured: false,
    }
    onChange([...projects, newProj])
    setExpandedId(newProj.id)
  }

  function moveProject(id: string, dir: -1 | 1) {
    const arr = [...sorted]
    const idx = arr.findIndex((p) => p.id === id)
    const j = idx + dir
    if (j < 0 || j >= arr.length) return
    const newArr = arr.map((p, i) => {
      if (i === idx) return { ...p, order: arr[j].order }
      if (i === j) return { ...p, order: arr[idx].order }
      return p
    })
    onChange(newArr)
  }

  function triggerUpload(id: string) {
    setActiveUploadId(id)
    fileInputRef.current?.click()
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !activeUploadId) return
    setUploading(activeUploadId)

    const fd = new FormData()
    fd.append('file', file)

    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    if (res.ok) {
      const { url } = await res.json()
      update(activeUploadId, { image: url })
    }
    setUploading(null)
    setActiveUploadId(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <EditorSection title={`Selected Work (${projects.length} projects)`}>
        <div className="space-y-2">
          {sorted.map((project, i) => (
            <div key={project.id} className="border border-stone-200 rounded overflow-hidden">
              {/* Row header */}
              <div
                className="flex items-center justify-between px-4 py-3 bg-stone-50 cursor-pointer"
                onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs text-stone-400 w-5 shrink-0">{i + 1}</span>
                  <span className="text-sm font-medium text-stone-800 truncate">{project.title}</span>
                  <span className="text-xs text-stone-400 shrink-0 hidden sm:inline">{project.category}</span>
                </div>
                <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button className="text-xs text-stone-400 hover:text-stone-600" onClick={() => moveProject(project.id, -1)} disabled={i === 0}>↑</button>
                  <button className="text-xs text-stone-400 hover:text-stone-600" onClick={() => moveProject(project.id, 1)} disabled={i === sorted.length - 1}>↓</button>
                  <BtnDanger onClick={() => remove(project.id)}>Delete</BtnDanger>
                  <span className="text-xs text-stone-400">{expandedId === project.id ? '▲' : '▼'}</span>
                </div>
              </div>

              {/* Expanded editor */}
              {expandedId === project.id && (
                <div className="px-4 py-5 border-t border-stone-200 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Project title">
                      <input className={inputCls} value={project.title} onChange={(e) => update(project.id, { title: e.target.value })} />
                    </Field>
                    <Field label="Subtitle (optional)">
                      <input className={inputCls} value={project.subtitle ?? ''} onChange={(e) => update(project.id, { subtitle: e.target.value })} />
                    </Field>
                    <Field label="Category">
                      <select className={selectCls} value={project.category} onChange={(e) => update(project.id, { category: e.target.value as ProjectCategory })}>
                        {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </Field>
                    <Field label="Location">
                      <input className={inputCls} value={project.location ?? ''} onChange={(e) => update(project.id, { location: e.target.value })} />
                    </Field>
                    <Field label="Role">
                      <input className={inputCls} value={project.role ?? ''} onChange={(e) => update(project.id, { role: e.target.value })} />
                    </Field>
                    <Field label="Featured">
                      <label className="flex items-center gap-2 mt-2">
                        <input type="checkbox" checked={project.featured ?? false} onChange={(e) => update(project.id, { featured: e.target.checked })} />
                        <span className="text-xs text-stone-600">Mark as featured</span>
                      </label>
                    </Field>
                  </div>

                  <Field label="Description">
                    <textarea className={textareaCls} value={project.description} onChange={(e) => update(project.id, { description: e.target.value })} rows={4} />
                  </Field>

                  <Field label="Tags" hint="Comma-separated list, e.g. Mixed-Use, Sustainability, BIM">
                    <input
                      className={inputCls}
                      value={project.tags.join(', ')}
                      onChange={(e) =>
                        update(project.id, {
                          tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                        })
                      }
                    />
                  </Field>

                  {/* Image */}
                  <Field label="Project image">
                    <div className="flex items-start gap-4">
                      {project.image ? (
                        <div className="relative w-32 h-24 rounded overflow-hidden border border-stone-200 shrink-0">
                          <Image src={project.image} alt={project.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-32 h-24 bg-stone-100 flex items-center justify-center text-xs text-stone-400 rounded border border-stone-200 shrink-0">
                          No image
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                        <BtnPrimary onClick={() => triggerUpload(project.id)}>
                          {uploading === project.id ? 'Uploading…' : project.image ? 'Replace image' : 'Upload image'}
                        </BtnPrimary>
                        {project.image && (
                          <BtnDanger onClick={() => update(project.id, { image: '' })}>Remove image</BtnDanger>
                        )}
                        <p className="text-xs text-stone-400">JPG, PNG, WebP · max 10 MB</p>
                      </div>
                    </div>
                  </Field>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <BtnPrimary onClick={add}>+ Add project</BtnPrimary>
        </div>
      </EditorSection>
    </div>
  )
}
