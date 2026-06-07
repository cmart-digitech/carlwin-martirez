'use client'

import type { HeroContent } from '@/lib/types'
import { EditorSection, Field, inputCls, textareaCls, BtnPrimary, BtnDanger } from './shared'

interface Props {
  content: HeroContent
  onChange: (c: HeroContent) => void
}

export default function HeroEditor({ content, onChange }: Props) {
  function set(patch: Partial<HeroContent>) {
    onChange({ ...content, ...patch })
  }

  function updateLink(i: number, patch: Partial<HeroContent['links'][0]>) {
    const links = content.links.map((l, idx) => (idx === i ? { ...l, ...patch } : l))
    set({ links })
  }

  function addLink() {
    set({ links: [...content.links, { label: '', href: '' }] })
  }

  function removeLink(i: number) {
    set({ links: content.links.filter((_, idx) => idx !== i) })
  }

  return (
    <div>
      <EditorSection title="Hero Section">
        <Field label="Name">
          <input
            className={inputCls}
            value={content.name}
            onChange={(e) => set({ name: e.target.value })}
          />
        </Field>

        <Field label="Tagline" hint="Appears above the name in small caps">
          <input
            className={inputCls}
            value={content.tagline}
            onChange={(e) => set({ tagline: e.target.value })}
          />
        </Field>

        <Field label="Intro paragraph">
          <textarea
            className={textareaCls}
            value={content.intro}
            onChange={(e) => set({ intro: e.target.value })}
            rows={3}
          />
        </Field>
      </EditorSection>

      <EditorSection title="Hero Links">
        {content.links.map((link, i) => (
          <div key={i} className="grid grid-cols-5 gap-3 mb-3 items-start">
            <div className="col-span-2">
              <input
                className={inputCls}
                placeholder="Label"
                value={link.label}
                onChange={(e) => updateLink(i, { label: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <input
                className={inputCls}
                placeholder="href (e.g. #work or https://…)"
                value={link.href}
                onChange={(e) => updateLink(i, { href: e.target.value })}
              />
            </div>
            <div className="flex items-center pt-2">
              <BtnDanger onClick={() => removeLink(i)}>Remove</BtnDanger>
            </div>
          </div>
        ))}
        <BtnPrimary onClick={addLink}>+ Add link</BtnPrimary>
      </EditorSection>
    </div>
  )
}
