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
        "Konzeption für ein zusätzliches, kalkulierbares und steuerbares Profitcenter in der Zahnarztpraxis.",
      price: "3500",
      priceCurrency: "EUR",
      category: "Unternehmensberatung",
      url: `${siteUrl}/programme`,
    },
    {
      "@type": "Offer",
      name: "Kommunikations- und Bindungsoptimierung",
      description:
        "Patientenweg, Kommunikation, Teamwirkung — für mehr freiwillige Wiederkehr und Weiterempfehlung.",
      price: "3500",
      priceCurrency: "EUR",
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

const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Was ist das Prophylaxe-Institut by Minka?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Das Prophylaxe-Institut ist eine Mentoring- und Beratungsmarke für Zahnarztpraxen im DACH-Raum. Gegründet von Minka Mujezinovic (ZFA, ZMP, Praxismanagerin IHK), unterstützt das Institut Zahnärztinnen und Zahnärzte dabei, Prophylaxe als strategischen Umsatz- und Bindungsfaktor zu etablieren.",
      },
    },
    {
      "@type": "Question",
      name: "Wie viel kostet eine Beratung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Beide Einstiegs-Beratungen (Strategische Prophylaxe-Integration und Kommunikations- und Bindungsoptimierung) kosten jeweils 3.500 €. Praxen aus West-Bundesländern erhalten üblicherweise 50 % Förderung (Netto-Eigenanteil 1.750 €), Praxen aus Ost-Bundesländern bis zu 80 % (Netto-Eigenanteil 700 €).",
      },
    },
    {
      "@type": "Question",
      name: "Für welche Praxen ist das Angebot gedacht?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Für Zahnärztinnen, Zahnärzte und Praxisinhaber, die Prophylaxe strategisch als Umsatz- und Bindungsfaktor etablieren möchten — unabhängig von der Praxisgröße.",
      },
    },
    {
      "@type": "Question",
      name: "Kann die Beratung gefördert werden?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja. Über öffentliche Beratungsförderprogramme sind 50 % (West) bzw. bis zu 80 % (Ost) Förderung möglich. Bis zu zwei geförderte Beratungen pro Jahr sind kombinierbar. Unser Fördermittel-Concierge-Team übernimmt die komplette organisatorische Abwicklung.",
      },
    },
    {
      "@type": "Question",
      name: "Wie läuft das Mentoring konkret ab?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nach einem Kennenlerngespräch legen wir gemeinsam Ziele und einen Fahrplan fest. Das Mentoring findet in drei Stufen statt (Reinschnuppern 3 Monate, Umsetzer-Programm 6 Monate, Elite-Training 18 Monate) und verbindet regelmäßige Sessions mit konkreten Umsetzungsschritten zwischen den Terminen.",
      },
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
  const data = [organization, minka, servicesCatalog, faq, website]
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
