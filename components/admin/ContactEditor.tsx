'use client'

import type { ContactContent } from '@/lib/types'
import { EditorSection, Field, inputCls, textareaCls } from './shared'

interface Props {
  content: ContactContent
  onChange: (c: ContactContent) => void
}

export default function ContactEditor({ content, onChange }: Props) {
  function set(patch: Partial<ContactContent>) {
    onChange({ ...content, ...patch })
  }

  return (
    <EditorSection title="Contact Details">
      <Field label="Email address">
        <input className={inputCls} type="email" value={content.email} onChange={(e) => set({ email: e.target.value })} />
      </Field>
      <Field label="LinkedIn URL">
        <input className={inputCls} type="url" value={content.linkedin ?? ''} onChange={(e) => set({ linkedin: e.target.value })} placeholder="https://linkedin.com/in/…" />
      </Field>
      <Field label="Location">
        <input className={inputCls} value={content.location} onChange={(e) => set({ location: e.target.value })} />
      </Field>
      <Field label="Tagline / availability note">
        <textarea className={textareaCls} value={content.tagline ?? ''} onChange={(e) => set({ tagline: e.target.value })} rows={2} />
      </Field>
    </EditorSection>
  )
}
