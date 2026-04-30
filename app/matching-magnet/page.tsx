import type { Metadata } from 'next'
import { MatchingMagnetApp } from '@/components/matching-magnet/MatchingMagnetApp'

export const metadata: Metadata = {
  title: 'Matching Magnet by Miriam – Kooperationsplattform für hochwertige Kontakte',
  description:
    'Matching Magnet by Miriam: Token-basierte Plattform für anonyme Lead-Listen-Kooperation, smarte Empfehlungen und faire Lead-Partnerschaften – DSGVO-konform.',
  robots: { index: false, follow: false },
}

export default function MatchingMagnetPage() {
  return <MatchingMagnetApp />
}
