'use client'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { PracticeArea } from '@/lib/types'
import { EditorSection, Field, inputCls, textareaCls, selectCls, BtnPrimary, BtnSecondary, BtnDanger } from './shared'

const ICON_OPTIONS = [
  'building', 'leaf', 'layers', 'cpu', 'sparkles', 'hard-hat',
  'globe', 'pen-tool', 'bar-chart', 'settings',
]

interface Props {
  areas: PracticeArea[]
  onChange: (areas: PracticeArea[]) => void
}

export default function PracticeEditor({ areas, onChange }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  function update(id: string, patch: Partial<PracticeArea>) {
    onChange(areas.map((a) => (a.id === id ? { ...a, ...patch } : a)))
  }

  function remove(id: string) {
    onChange(areas.filter((a) => a.id !== id))
  }

  function add() {
    const newArea: PracticeArea = { id: uuidv4(), title: 'New practice area', description: '', icon: 'layers' }
    onChange([...areas, newArea])
    setExpandedId(newArea.id)
  }

  function move(index: number, dir: -1 | 1) {
    const arr = [...areas]
    const j = index + dir
    if (j < 0 || j >= arr.length) return
    ;[arr[index], arr[j]] = [arr[j], arr[index]]
    onChange(arr)
  }

  return (
    <div>
      <EditorSection title="Practice Areas">
        <div className="space-y-2">
          {areas.map((area, i) => (
            <div key={area.id} className="border border-stone-200 rounded overflow-hidden">
              {/* Row header */}
              <div className="flex items-center justify-between px-4 py-3 bg-stone-50 cursor-pointer"
                onClick={() => setExpandedId(expandedId === area.id ? null : area.id)}>
                <span className="text-sm font-medium text-stone-800">{area.title || 'Untitled'}</span>
                <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                  <button className="text-xs text-stone-400 hover:text-stone-600" onClick={() => move(i, -1)} disabled={i === 0}>↑</button>
                  <button className="text-xs text-stone-400 hover:text-stone-600" onClick={() => move(i, 1)} disabled={i === areas.length - 1}>↓</button>
                  <BtnDanger onClick={() => remove(area.id)}>Delete</BtnDanger>
                  <span className="text-xs text-stone-400">{expandedId === area.id ? '▲' : '▼'}</span>
                </div>
              </div>

              {/* Expanded editor */}
              {expandedId === area.id && (
                <div className="px-4 py-4 border-t border-stone-200 bg-white space-y-3">
                  <Field label="Title">
                    <input className={inputCls} value={area.title} onChange={(e) => update(area.id, { title: e.target.value })} />
                  </Field>
                  <Field label="Description">
                    <textarea className={textareaCls} value={area.description} onChange={(e) => update(area.id, { description: e.target.value })} rows={3} />
                  </Field>
                  <Field label="Icon">
                    <select className={selectCls} value={area.icon} onChange={(e) => update(area.id, { icon: e.target.value })}>
                      {ICON_OPTIONS.map((ico) => (
                        <option key={ico} value={ico}>{ico}</option>
                      ))}
                    </select>
                  </Field>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <BtnPrimary onClick={add}>+ Add practice area</BtnPrimary>
        </div>
      </EditorSection>
    </div>
  )
}
