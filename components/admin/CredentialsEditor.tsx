'use client'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { Credential } from '@/lib/types'
import { EditorSection, Field, inputCls, selectCls, BtnPrimary, BtnDanger } from './shared'

interface Props {
  credentials: Credential[]
  onChange: (c: Credential[]) => void
}

export default function CredentialsEditor({ credentials, onChange }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  function update(id: string, patch: Partial<Credential>) {
    onChange(credentials.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  }

  function remove(id: string) {
    onChange(credentials.filter((c) => c.id !== id))
  }

  function add() {
    const newCred: Credential = { id: uuidv4(), title: 'New credential', issuer: '', year: '', type: 'accreditation' }
    onChange([...credentials, newCred])
    setExpandedId(newCred.id)
  }

  return (
    <EditorSection title="Credentials">
      <div className="space-y-2">
        {credentials.map((cred) => (
          <div key={cred.id} className="border border-stone-200 rounded overflow-hidden">
            <div
              className="flex items-center justify-between px-4 py-3 bg-stone-50 cursor-pointer"
              onClick={() => setExpandedId(expandedId === cred.id ? null : cred.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-stone-800">{cred.title}</span>
                <span className="text-xs text-stone-400 capitalize">{cred.type}</span>
              </div>
              <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                <BtnDanger onClick={() => remove(cred.id)}>Delete</BtnDanger>
                <span className="text-xs text-stone-400">{expandedId === cred.id ? '▲' : '▼'}</span>
              </div>
            </div>

            {expandedId === cred.id && (
              <div className="px-4 py-4 border-t border-stone-200 bg-white space-y-3">
                <Field label="Credential title">
                  <input className={inputCls} value={cred.title} onChange={(e) => update(cred.id, { title: e.target.value })} />
                </Field>
                <Field label="Issuing body">
                  <input className={inputCls} value={cred.issuer ?? ''} onChange={(e) => update(cred.id, { issuer: e.target.value })} />
                </Field>
                <Field label="Year (optional)">
                  <input className={inputCls} value={cred.year ?? ''} onChange={(e) => update(cred.id, { year: e.target.value })} placeholder="e.g. 2022" />
                </Field>
                <Field label="Type">
                  <select className={selectCls} value={cred.type} onChange={(e) => update(cred.id, { type: e.target.value as Credential['type'] })}>
                    <option value="registration">Professional Registration</option>
                    <option value="accreditation">Accreditation</option>
                    <option value="certification">Certification</option>
                  </select>
                </Field>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <BtnPrimary onClick={add}>+ Add credential</BtnPrimary>
      </div>
    </EditorSection>
  )
}
