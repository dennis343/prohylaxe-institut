import type { Metadata } from 'next'
import { Geist, Fraunces } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/sections/navbar'
import { Footer } from '@/components/sections/footer'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  axes: ['opsz', 'SOFT'],
})

const siteUrl = 'https://prophylaxe-institut.de'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Prophylaxe Institut by Minka — Praxismentoring für Zahnärzte',
    template: '%s | Prophylaxe Institut by Minka',
  },
  description:
    'Nachhaltiger Praxiserfolg mit System. Persönliches Mentoring von Minka – für Zahnärztinnen, Zahnärzte und Teams, die Prophylaxe als strategischen Umsatztreiber etablieren wollen.',
  keywords: [
    'Prophylaxe Mentoring',
    'Zahnarzt Coaching',
    'Praxismentoring',
    'Dentalhygiene',
    'Prophylaxe Institut',
    'Minka',
    'Praxisberatung Zahnarzt',
    'Förderung BAFA Zahnarzt',
  ],
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: siteUrl,
    siteName: 'Prophylaxe Institut by Minka',
    title: 'Prophylaxe Institut by Minka — Praxismentoring für Zahnärzte',
    description:
      'Nachhaltiger Praxiserfolg mit System. Mentoring für Zahnarztpraxen – Prophylaxe als Umsatz- und Bindungsfaktor.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prophylaxe Institut by Minka',
    description:
      'Nachhaltiger Praxiserfolg mit System – persönliches Mentoring für Zahnarztpraxen.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="de"
      className={`${geist.variable} ${fraunces.variable} bg-background`}
    >
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
