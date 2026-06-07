import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { SiteContent } from './types'

const CONTENT_PATH = join(process.cwd(), 'content', 'site.json')

export function getContent(): SiteContent {
  const raw = readFileSync(CONTENT_PATH, 'utf-8')
  return JSON.parse(raw) as SiteContent
}

export function saveContent(content: SiteContent): void {
  writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2), 'utf-8')
}
