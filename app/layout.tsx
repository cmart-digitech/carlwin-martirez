import type { Metadata } from 'next'
import { Inter, Libre_Baskerville, DM_Sans, Playfair_Display, Bodoni_Moda } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['700'],
  style: ['italic'],
  variable: '--font-bodoni',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Carlwin Martirez — Architecture, Planning & Sustainability',
  description:
    'Design-led built environment professional working across architecture, planning, sustainability, digital workflows, and construction management.',
  openGraph: {
    title: 'Carlwin Martirez',
    description: 'Architecture · Planning · Sustainability · Design Strategy · Digital Integration',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} ${libreBaskerville.variable} ${playfair.variable} ${bodoniModa.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
