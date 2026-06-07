'use client'

import type { SiteSettings } from '@/lib/types'
import { EditorSection, Field, selectCls } from './shared'

interface Props {
  settings: SiteSettings
  onChange: (s: SiteSettings) => void
}

const FONT_OPTIONS: { value: SiteSettings['fontFamily']; label: string }[] = [
  { value: 'inter', label: 'Inter (Modern sans-serif)' },
  { value: 'dm-sans', label: 'DM Sans (Geometric sans-serif)' },
  { value: 'libre-baskerville', label: 'Libre Baskerville (Editorial serif)' },
  { value: 'playfair', label: 'Playfair Display (Elegant serif)' },
]

const ACCENT_PRESETS = [
  { label: 'Charcoal', value: '#1A1A1A' },
  { label: 'Forest', value: '#2D5016' },
  { label: 'Slate Blue', value: '#1E3A5F' },
  { label: 'Warm Terracotta', value: '#8B4513' },
  { label: 'Warm Bronze', value: '#7C5C3A' },
  { label: 'Deep Teal', value: '#1A5F5F' },
]

export default function SettingsEditor({ settings, onChange }: Props) {
  function set(patch: Partial<SiteSettings>) {
    onChange({ ...settings, ...patch })
  }

  return (
    <div>
      <EditorSection title="Theme">
        <Field label="Colour mode">
          <div className="flex gap-3">
            {(['light', 'dark'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set({ theme: t })}
                className={`px-5 py-2.5 text-sm border transition-colors capitalize rounded ${
                  settings.theme === t
                    ? 'bg-stone-900 text-stone-50 border-stone-900'
                    : 'border-stone-300 text-stone-600 hover:bg-stone-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Accent colour">
          <div className="flex flex-wrap gap-2 mb-3">
            {ACCENT_PRESETS.map((p) => (
              <button
                key={p.value}
                type="button"
                title={p.label}
                onClick={() => set({ accentColor: p.value })}
                className="w-8 h-8 rounded-full border-2 transition-all"
                style={{
                  backgroundColor: p.value,
                  borderColor: settings.accentColor === p.value ? '#fff' : 'transparent',
                  outline: settings.accentColor === p.value ? `2px solid ${p.value}` : 'none',
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={settings.accentColor}
              onChange={(e) => set({ accentColor: e.target.value })}
              className="w-10 h-10 rounded border border-stone-300 cursor-pointer"
            />
            <span className="text-xs font-mono text-stone-500">{settings.accentColor}</span>
          </div>
        </Field>
      </EditorSection>

      <EditorSection title="Typography">
        <Field label="Font family">
          <select className={selectCls} value={settings.fontFamily} onChange={(e) => set({ fontFamily: e.target.value as SiteSettings['fontFamily'] })}>
            {FONT_OPTIONS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </Field>

        <Field label="Font size">
          <div className="flex gap-3">
            {(['small', 'default', 'large'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => set({ fontSize: s })}
                className={`px-4 py-2 text-sm border transition-colors capitalize rounded ${
                  settings.fontSize === s
                    ? 'bg-stone-900 text-stone-50 border-stone-900'
                    : 'border-stone-300 text-stone-600 hover:bg-stone-50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </Field>
      </EditorSection>

      <EditorSection title="Layout">
        <Field label="Section spacing (density)">
          <div className="flex gap-3">
            {(['compact', 'balanced', 'spacious'] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => set({ density: d })}
                className={`px-4 py-2 text-sm border transition-colors capitalize rounded ${
                  settings.density === d
                    ? 'bg-stone-900 text-stone-50 border-stone-900'
                    : 'border-stone-300 text-stone-600 hover:bg-stone-50'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </Field>
      </EditorSection>

      <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
        <p className="text-xs text-stone-500">
          Style changes are applied site-wide. Click <strong>Save all changes</strong> in the top bar or sidebar to publish your updates.
        </p>
      </div>
    </div>
  )
}
