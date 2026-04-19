const siteUrl = "https://prophylaxe-institut.de"

const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}#organization`,
  name: "Prophylaxe-Institut by Minka",
  legalName: "Prophylaxe-Institut UG (haftungsbeschränkt)",
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  image: `${siteUrl}/opengraph-image`,
  description:
    "Praxismentoring und Beratung für Zahnarztpraxen — Prophylaxe als strategische Umsatz- und Bindungsquelle. Persönlich begleitet durch Minka Mujezinovic.",
  slogan: "Nachhaltiger Praxiserfolg mit System.",
  founder: { "@id": `${siteUrl}#minka` },
  email: "info@prophylaxe-institut.de",
  areaServed: [
    { "@type": "Country", name: "Deutschland" },
    { "@type": "Country", name: "Österreich" },
    { "@type": "Country", name: "Schweiz" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Grenzstraße 144",
    postalCode: "47441",
    addressLocality: "Moers",
    addressCountry: "DE",
  },
  sameAs: [] as string[],
  knowsAbout: [
    "Prophylaxe",
    "Dentalhygiene",
    "Zahnarzt-Praxismanagement",
    "Profitcenter Prophylaxe",
    "Patientenbindung",
    "BAFA-Beratungsförderung",
  ],
}

const minka = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}#minka`,
  name: `Rusminka „Minka" Mujezinovic`,
  givenName: "Rusminka",
  familyName: "Mujezinovic",
  alternateName: "Minka Mujezinovic",
  jobTitle: "Gründerin & Mentorin",
  worksFor: { "@id": `${siteUrl}#organization` },
  url: `${siteUrl}/mentor`,
  image: `${siteUrl}/minka/portrait.jpg`,
  description:
    "Zahnmedizinische Fachangestellte (ZFA), Prophylaxeassistentin (ZMP), Praxismanagerin (IHK), iTOP-Teacher (Curaden). Über 150 begleitete Zahnarztpraxen.",
  knowsLanguage: ["de"],
  hasCredential: [
    "ZFA — Zahnmedizinische Fachangestellte",
    "ZMP — Zahnmedizinische Prophylaxeassistentin",
    "Praxismanagerin (IHK)",
    "iTOP-Teacher (Curaden)",
  ],
}

const servicesCatalog = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "Beratung & Mentoring",
  provider: { "@id": `${siteUrl}#organization` },
  itemListElement: [
    {
      "@type": "Offer",
      name: "Strategische Prophylaxe-Integration",
      description:
        "Konzeption für ein zusätzliches, kalkulierbares und steuerbares Profitcenter in der Zahnarztpraxis. BAFA-förderfähig (50–80 %).",
      category: "Unternehmensberatung",
      url: `${siteUrl}/programme`,
    },
    {
      "@type": "Offer",
      name: "Kommunikations- und Bindungsoptimierung",
      description:
        "Patientenweg, Kommunikation, Teamwirkung — für mehr freiwillige Wiederkehr und Weiterempfehlung. BAFA-förderfähig (50–80 %).",
      category: "Unternehmensberatung",
      url: `${siteUrl}/programme`,
    },
    {
      "@type": "Offer",
      name: "Praxis-Mentoring (3–18 Monate)",
      description:
        "Persönliches Mentoring in drei Stufen: Reinschnuppern, Umsetzer-Programm, Elite-Training.",
      category: "Mentoring",
      url: `${siteUrl}/programme`,
    },
  ],
}

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}#website`,
  url: siteUrl,
  name: "Prophylaxe-Institut by Minka",
  inLanguage: "de-DE",
  publisher: { "@id": `${siteUrl}#organization` },
}

export function HomeJsonLd() {
  const data = [organization, minka, servicesCatalog, website]
  return (
    <>
      {data.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  )
}
