export interface SiteSettings {
  theme: 'light' | 'dark'
  fontFamily: 'inter' | 'dm-sans' | 'libre-baskerville' | 'playfair'
  fontSize: 'small' | 'default' | 'large'
  density: 'compact' | 'balanced' | 'spacious'
  accentColor: string
}

export interface HeroContent {
  name: string
  tagline: string
  intro: string
  links: { label: string; href: string; isExternal?: boolean }[]
}

export interface AboutContent {
  paragraphs: string[]
}

export interface PracticeArea {
  id: string
  title: string
  description: string
  icon: string
}

export type ProjectCategory =
  | 'Cities of the Future'
  | 'Residential Lifestyle'
  | 'Elevating Interiors'
  | 'Path to Net Zero'
  | 'AI & Digital Tools'

export interface Project {
  id: string
  title: string
  subtitle?: string
  category: ProjectCategory
  location?: string
  role?: string
  description: string
  tags: string[]
  image?: string
  imageFit?: 'cover' | 'contain'
  imagePosition?: string
  imageScale?: number
  order: number
  featured?: boolean
}

export interface Credential {
  id: string
  title: string
  subtitle?: string
  issuer?: string
  year?: string
  type: 'registration' | 'certification' | 'accreditation' | 'net-zero-tools' | 'tech-innovation'
}

export interface CMCredential {
  id: string
  title: string
  year?: string
  group: 'Safety & Induction' | 'Professional Memberships'
}

export interface ToolItem {
  id: string
  name: string
  category: 'BIM & CAD' | 'Design & Visualisation' | 'AI & Generative' | 'Development' | 'Sustainability Standards'
}

export interface ContactContent {
  email: string
  linkedin?: string
  location: string
  tagline?: string
}

export interface SiteContent {
  settings: SiteSettings
  hero: HeroContent
  about: AboutContent
  practiceAreas: PracticeArea[]
  projects: Project[]
  credentials: Credential[]
  cmCredentials: CMCredential[]
  tools: ToolItem[]
  contact: ContactContent
}
