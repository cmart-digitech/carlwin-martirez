'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Incorrect password.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-6" style={{ letterSpacing: '0.18em' }}>
          Admin Access
        </p>
        <h1 className="text-2xl font-medium text-stone-900 mb-8">Carlwin Martirez</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-stone-500 mb-2 tracking-wide">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-stone-300 bg-white text-stone-900 text-sm px-4 py-3 focus:outline-none focus:border-stone-600 transition-colors"
              placeholder="Enter admin password"
              autoFocus
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 text-stone-50 text-sm py-3 hover:bg-stone-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <a href="/" className="block text-center text-xs text-stone-400 hover:text-stone-600 transition-colors mt-8">
          ← Back to site
        </a>
      </div>
    </div>
  )
}
