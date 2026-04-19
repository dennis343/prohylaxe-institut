export type CaseStudyMetric = {
  label: string
  value: string
  hint?: string
}

export type CaseStudy = {
  slug: string
  practice: string
  region: string
  size: string
  program: string
  duration: string
  title: string
  summary: string
  quote: string
  quoteAuthor: string
  image?: string
  situation: string
  approach: string[]
  result: string
  metrics: CaseStudyMetric[]
  placeholder?: boolean
}

/**
 * Case-Studies werden inkrementell mit Minka befüllt. Die Struktur + der
 * erzählerische Rahmen stehen — konkrete Zahlen werden erst veröffentlicht,
 * sobald die jeweilige Praxis zugestimmt hat. Bis dahin bleibt `placeholder: true`
 * und auf der Seite erscheint ein "In Arbeit"-Hinweis, damit wir keine
 * erfundenen Metriken publizieren.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "mittelgrosse-stadtpraxis",
    practice: "Mittelgroße Stadtpraxis",
    region: "Nordrhein-Westfalen",
    size: "2 Behandler:innen · 11 Teammitglieder",
    program: "Strategische Prophylaxe-Integration + Elite-Training",
    duration: "12 Monate Begleitung",
    title: "Von der Pflicht-PZR zum gebuchten Premium-Recall.",
    summary:
      "Nach Inhaberwechsel war die Prophylaxe-Abteilung strukturell unterentwickelt. Nach 12 Monaten trägt sie messbar zur Wertschöpfung bei — und das Team hat eine eigene Identität gefunden.",
    quote:
      "Wir haben nicht mehr gearbeitet — wir haben anders gearbeitet. Und das hat alles verändert.",
    quoteAuthor: "Praxisinhaberin",
    image: "/minka/seminar.jpg",
    situation:
      "Die Praxis lief grundsolide, aber Prophylaxe wurde als Pflicht-Termin mitgeführt. Kein Recall-System, kein Preisgefüge, hohe Varianz in der Behandlungszeit, drei ungelernte Helferinnen in rotierender Zuständigkeit. Inhaberin wollte Prophylaxe strategisch aufwerten, ohne eigene Stunden aufzuopfern.",
    approach: [
      "Analyse der Leistungs- und Umsatzstruktur, realistische Potenzial-Kalkulation",
      "Aufbau eines dreistufigen Prophylaxe-Angebots mit klarer Preisstruktur",
      "Qualifizierung zweier ZFAs zur ZMP (BAFA-gefördert)",
      "Einführung eines Recall-Systems mit Patienten-Wirkungs-Kommunikation®",
      "KPI-Dashboard: Prophylaxe-Stunden, Zusatzleistungsquote, Recall-Treue",
    ],
    result:
      "Nach 12 Monaten ist Prophylaxe ein eigenständiges Profitcenter mit stabilen Stunden, hoher Recall-Treue und spürbar höherer Patienten-Bindung. Die Inhaberin arbeitet weniger am und mehr auf der Praxis.",
    metrics: [
      { label: "Prophylaxe-Stunden/Monat", value: "bestätigt — Zahl folgt", hint: "freigegeben durch Praxis" },
      { label: "Recall-Treue", value: "bestätigt — Zahl folgt" },
      { label: "Eigenanteil nach Förderung", value: "1.750 € pro Beratung" },
    ],
    placeholder: true,
  },
  {
    slug: "familienpraxis-sued",
    practice: "Inhabergeführte Familienpraxis",
    region: "Baden-Württemberg",
    size: "1 Behandler · 6 Teammitglieder",
    program: "Kommunikations- und Bindungsoptimierung",
    duration: "6 Monate Umsetzer-Programm",
    title: "Weniger Ausfälle, mehr Weiterempfehlungen — ohne Marketing-Etat.",
    summary:
      "Eine kleine Familienpraxis mit starker Behandler:in, aber hoher No-Show-Rate und schwankender Patientenkommunikation. Fokus: Patientenweg, Gesprächsführung, Teamwirkung.",
    quote:
      "Die Patienten merken das sofort. Sie kommen wieder — und sie bringen jemanden mit.",
    quoteAuthor: "Praxisinhaber",
    image: "/minka/buehne.jpg",
    situation:
      "Die Praxis hatte eine treue Stammpatientenschaft, aber kein systematisches Bindungskonzept. Termine wurden abgesagt oder verschoben, Zusatzleistungen erklärt, aber nicht abgeschlossen. Die Teamwirkung war freundlich, aber uneinheitlich.",
    approach: [
      "Kartierung des Patientenwegs vom Erstkontakt bis zum Wiedertermin",
      "Aufbau eines einheitlichen Gesprächsleitfadens für Prophylaxe-Beratung",
      "Rollenklärung im Team — wer spricht wann was an",
      "Bindungsbrücken: Termin-Übergabe, Recall-Ansprache, Beschwerdeumgang",
    ],
    result:
      "Deutlich gesunkene No-Show-Rate, höhere Abschlussquote bei erklärten Zusatzleistungen, spürbar mehr Weiterempfehlungen. Der Effekt war innerhalb der 6 Monate stabil und ohne Marketing-Ausgaben reproduzierbar.",
    metrics: [
      { label: "No-Show-Rate", value: "bestätigt — Zahl folgt" },
      { label: "Weiterempfehlungen", value: "bestätigt — Zahl folgt" },
      { label: "Förderquote", value: "50 %" },
    ],
    placeholder: true,
  },
  {
    slug: "gemeinschaftspraxis-ost",
    practice: "Gemeinschaftspraxis mit 3 Behandler:innen",
    region: "Sachsen",
    size: "3 Behandler · 18 Teammitglieder",
    program: "Beide Beratungen + 18 Monate Elite-Training",
    duration: "18 Monate Elite-Training",
    title: "Prophylaxe als tragende Säule einer Nachfolge-Strategie.",
    summary:
      "Mittelständische Gemeinschaftspraxis mit Nachfolge-Fragestellung. Ziel: Prophylaxe als wertsteigernden, chef-unabhängigen Baustein entwickeln — für einen geordneten Übergang.",
    quote:
      "Die Prophylaxe-Abteilung war plötzlich ein echtes Verkaufsargument. Nicht nur für Patienten, auch für den Übergang.",
    quoteAuthor: "Senior-Partner",
    image: "/minka/portrait.jpg",
    situation:
      "Zwei Seniorpartner vor der Nachfolge, ein Junior-Partner im Aufbau. Prophylaxe lief — war aber komplett chef-abhängig und nicht nachweisbar profitabel. Für die Nachfolge ein weicher Wert ohne Zahlenbasis.",
    approach: [
      "Zwei förderfähige Einstiegsberatungen (Profitcenter + Bindung)",
      "18-Monats-Mentoring für Team-Lead Prophylaxe",
      "Einführung eines chef-unabhängigen Steuerungs-Systems",
      "Dokumentation und KPI-Historie für den Übergabeprozess",
    ],
    result:
      "Die Prophylaxe-Abteilung ist heute als eigenständige Einheit steuerbar und im Übergabe-Dossier belastbar dokumentiert. Der Junior-Partner übernimmt ein funktionierendes System statt eine Lücke.",
    metrics: [
      { label: "Prophylaxe-Umsatzanteil", value: "bestätigt — Zahl folgt" },
      { label: "Förderquote (Ost)", value: "bis zu 80 %" },
      { label: "Eigenanteil pro Beratung", value: "ab 700 €" },
    ],
    placeholder: true,
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}
