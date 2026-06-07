'use client'

import type { AboutContent } from '@/lib/types'
import { EditorSection, Field, textareaCls, BtnPrimary, BtnDanger } from './shared'

interface Props {
  content: AboutContent
  onChange: (c: AboutContent) => void
}

export default function AboutEditor({ content, onChange }: Props) {
  function updateParagraph(i: number, val: string) {
    const paragraphs = content.paragraphs.map((p, idx) => (idx === i ? val : p))
    onChange({ paragraphs })
  }

  function addParagraph() {
    onChange({ paragraphs: [...content.paragraphs, ''] })
  }

  function removeParagraph(i: number) {
    onChange({ paragraphs: content.paragraphs.filter((_, idx) => idx !== i) })
  }

  function moveParagraph(i: number, dir: -1 | 1) {
    const arr = [...content.paragraphs]
    const j = i + dir
    if (j < 0 || j >= arr.length) return
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
    onChange({ paragraphs: arr })
  }

  return (
    <EditorSection title="About Section">
      <p className="text-xs text-stone-400 mb-5">
        The first paragraph is displayed larger — use it as the lead statement.
      </p>

      {content.paragraphs.map((para, i) => (
        <div key={i} className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-stone-500">
              Paragraph {i + 1}
              {i === 0 && <span className="ml-2 text-stone-400">(lead)</span>}
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                className="text-xs text-stone-400 hover:text-stone-600"
                onClick={() => moveParagraph(i, -1)}
                disabled={i === 0}
              >
                ↑
              </button>
              <button
                type="button"
                className="text-xs text-stone-400 hover:text-stone-600"
                onClick={() => moveParagraph(i, 1)}
                disabled={i === content.paragraphs.length - 1}
              >
                ↓
              </button>
              <BtnDanger onClick={() => removeParagraph(i)}>Remove</BtnDanger>
            </div>
          </div>
          <textarea
            className={textareaCls}
            value={para}
            onChange={(e) => updateParagraph(i, e.target.value)}
            rows={4}
          />
        </div>
      ))}

      <BtnPrimary onClick={addParagraph}>+ Add paragraph</BtnPrimary>
    </EditorSection>
  )
}
