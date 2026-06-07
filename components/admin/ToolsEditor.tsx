'use client'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { ToolItem } from '@/lib/types'
import { EditorSection, Field, inputCls, selectCls, BtnPrimary, BtnDanger } from './shared'

const CATEGORIES: ToolItem['category'][] = [
  'BIM & CAD',
  'Design & Visualisation',
  'AI & Generative',
  'Development',
  'Sustainability Standards',
]

interface Props {
  tools: ToolItem[]
  onChange: (t: ToolItem[]) => void
}

export default function ToolsEditor({ tools, onChange }: Props) {
  function update(id: string, patch: Partial<ToolItem>) {
    onChange(tools.map((t) => (t.id === id ? { ...t, ...patch } : t)))
  }

  function remove(id: string) {
    onChange(tools.filter((t) => t.id !== id))
  }

  function add() {
    const newTool: ToolItem = { id: uuidv4(), name: 'New tool', category: 'BIM & CAD' }
    onChange([...tools, newTool])
  }

  const grouped = CATEGORIES.reduce<Record<string, ToolItem[]>>((acc, cat) => {
    acc[cat] = tools.filter((t) => t.category === cat)
    return acc
  }, {})

  return (
    <div>
      {CATEGORIES.map((cat) => (
        <EditorSection key={cat} title={cat}>
          <div className="space-y-2 mb-4">
            {grouped[cat].map((tool) => (
              <div key={tool.id} className="flex items-center gap-3">
                <input
                  className={inputCls}
                  value={tool.name}
                  onChange={(e) => update(tool.id, { name: e.target.value })}
                />
                <select
                  className={`${selectCls} w-52 shrink-0`}
                  value={tool.category}
                  onChange={(e) => update(tool.id, { category: e.target.value as ToolItem['category'] })}
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <BtnDanger onClick={() => remove(tool.id)}>×</BtnDanger>
              </div>
            ))}
          </div>
          <BtnPrimary onClick={add}>+ Add tool</BtnPrimary>
        </EditorSection>
      ))}
    </div>
  )
}
