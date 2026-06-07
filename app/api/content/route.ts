import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getContent, saveContent } from '@/lib/content'

async function isAdmin() {
  const cookieStore = await cookies()
  return cookieStore.get('cm_admin_session')?.value === 'authenticated'
}

export async function GET() {
  try {
    const content = getContent()
    return NextResponse.json(content)
  } catch {
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    saveContent(body)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 })
  }
}
