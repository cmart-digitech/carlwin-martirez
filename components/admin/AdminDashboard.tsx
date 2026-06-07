'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { SiteContent } from '@/lib/types'
import HeroEditor from './HeroEditor'
import AboutEditor from './AboutEditor'
import PracticeEditor from './PracticeEditor'
import ProjectsEditor from './ProjectsEditor'
import CredentialsEditor from './CredentialsEditor'
import ToolsEditor from './ToolsEditor'
import ContactEditor from './ContactEditor'
import SettingsEditor from './SettingsEditor'
import { Save, LogOut, Eye, CheckCircle, AlertCircle } from 'lucide-react'

const TABS = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'practice', label: 'Practice Areas' },
  { id: 'projects', label: 'Selected Work' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'tools', label: 'Tools' },
  { id: 'contact', label: 'Contact' },
  { id: 'settings', label: 'Style & Theme' },
] as const

type TabId = (typeof TABS)[number]['id']

interface Props {
  initialContent: SiteContent
}

export default function AdminDashboard({ initialContent }: Props) {
  const [content, setContent] = useState<SiteContent>(initialContent)
  const [activeTab, setActiveTab] = useState<TabId>('hero')
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const router = useRouter()

  const update = useCallback((patch: Partial<SiteContent>) => {
    setContent((prev) => ({ ...prev, ...patch }))
    setSaveStatus('idle')
  }, [])

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      })
      if (res.ok) {
        setSaveStatus('saved')
        router.refresh()
        setTimeout(() => setSaveStatus('idle'), 3000)
      } else {
        setSaveStatus('error')
      }
    } catch {
      setSaveStatus('error')
    } finally {
      setSaving(false)
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-stone-100">
      {/* Top bar */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40">
        <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-stone-900">Admin</span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-500">Carlwin Martirez</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-800 transition-colors"
            >
              <Eye size={13} />
              View site
            </a>

            {saveStatus === 'saved' && (
              <span className="flex items-center gap-1.5 text-xs text-green-600">
                <CheckCircle size={13} />
                Saved
              </span>
            )}
            {saveStatus === 'error' && (
              <span className="flex items-center gap-1.5 text-xs text-red-500">
                <AlertCircle size={13} />
                Error saving
              </span>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1.5 bg-stone-900 text-stone-50 text-xs px-4 py-2 hover:bg-stone-700 transition-colors disabled:opacity-50"
            >
              <Save size={13} />
              {saving ? 'Saving…' : 'Save changes'}
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-700 transition-colors"
            >
              <LogOut size={13} />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar tabs */}
        <nav className="w-44 shrink-0">
          <ul className="space-y-0.5">
            {TABS.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left text-sm px-3 py-2 transition-colors ${
                    activeTab === tab.id
                      ? 'bg-stone-900 text-stone-50'
                      : 'text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-stone-300">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-stone-900 text-stone-50 text-xs py-2.5 hover:bg-stone-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save all changes'}
            </button>
          </div>
        </nav>

        {/* Editor panel */}
        <main className="flex-1 min-w-0">
          {activeTab === 'hero' && (
            <HeroEditor content={content.hero} onChange={(hero) => update({ hero })} />
          )}
          {activeTab === 'about' && (
            <AboutEditor content={content.about} onChange={(about) => update({ about })} />
          )}
          {activeTab === 'practice' && (
            <PracticeEditor areas={content.practiceAreas} onChange={(practiceAreas) => update({ practiceAreas })} />
          )}
          {activeTab === 'projects' && (
            <ProjectsEditor projects={content.projects} onChange={(projects) => update({ projects })} />
          )}
          {activeTab === 'credentials' && (
            <CredentialsEditor credentials={content.credentials} onChange={(credentials) => update({ credentials })} />
          )}
          {activeTab === 'tools' && (
            <ToolsEditor tools={content.tools} onChange={(tools) => update({ tools })} />
          )}
          {activeTab === 'contact' && (
            <ContactEditor content={content.contact} onChange={(contact) => update({ contact })} />
          )}
          {activeTab === 'settings' && (
            <SettingsEditor settings={content.settings} onChange={(settings) => update({ settings })} />
          )}
        </main>
      </div>
    </div>
  )
}
