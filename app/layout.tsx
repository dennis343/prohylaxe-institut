import type { Metadata, Viewport } from 'next'
import { Geist, Fraunces } from 'next/font/google'
import { Navbar } from '@/components/sections/navbar'
import { Footer } from '@/components/sections/footer'
import { StickyMobileCTA } from '@/components/sticky-mobile-cta'
import { CookieConsent } from '@/components/cookie-consent'
import { AnalyticsGate } from '@/components/analytics-gate'
import { HideOnMatchingMagnet } from '@/components/matching-magnet/LayoutGuard'
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

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5ecd6' },
    { media: '(prefers-color-scheme: dark)', color: '#14203a' },
  ],
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      'Prophylaxe-Institut by Minka — Praxismentoring für Zahnarztpraxen',
    template: '%s | Prophylaxe-Institut by Minka',
  },
  description:
    'Praxismentoring & Beratung für Zahnarztpraxen: Prophylaxe als strategische Umsatz- und Bindungssäule. Persönlich begleitet durch Minka Mujezinovic — über 150 Praxen im DACH-Raum. Beratung 50–80 % förderfähig.',
  applicationName: 'Prophylaxe-Institut',
  authors: [
    { name: 'Minka Mujezinovic', url: `${siteUrl}/mentor` },
  ],
  creator: 'Prophylaxe-Institut UG (haftungsbeschränkt)',
  publisher: 'Prophylaxe-Institut UG (haftungsbeschränkt)',
  keywords: [
    'Prophylaxe Mentoring',
    'Zahnarzt Coaching',
    'Praxismentoring',
    'Dentalhygiene',
    'Prophylaxe Institut',
    'Minka Mujezinovic',
    'Praxisberatung Zahnarzt',
    'Profitcenter Prophylaxe',
    'BAFA Förderung Zahnarztpraxis',
    'Recall Zahnarzt',
    'Patientenbindung Zahnarztpraxis',
    'DH Dentalhygiene Mentoring',
  ],
  category: 'Zahnmedizin · Praxisberatung',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: siteUrl,
    siteName: 'Prophylaxe-Institut by Minka',
    title: 'Prophylaxe-Institut by Minka — Praxismentoring für Zahnärzte',
    description:
      'Nachhaltiger Praxiserfolg mit System. Mentoring für Zahnarztpraxen — Prophylaxe als Umsatz- und Bindungssäule.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prophylaxe-Institut by Minka',
    description:
      'Nachhaltiger Praxiserfolg mit System — persönliches Mentoring für Zahnarztpraxen.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: { 'de-DE': '/' },
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
        >
          Zum Inhalt springen
        </a>
        <HideOnMatchingMagnet><Navbar /></HideOnMatchingMagnet>
        <div id="main-content" className="flex-1">
          {children}
        </div>
        <HideOnMatchingMagnet><Footer /></HideOnMatchingMagnet>
        <HideOnMatchingMagnet><StickyMobileCTA /></HideOnMatchingMagnet>
        <HideOnMatchingMagnet><CookieConsent /></HideOnMatchingMagnet>
        <AnalyticsGate />
      </body>
    </html>
  )
}
