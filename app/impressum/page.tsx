import type { Metadata } from "next"
import { LegalLayout } from "@/components/sections/legal-layout"

export const metadata: Metadata = {
  title: "Impressum",
  description: "Angaben gemäß § 5 TMG für das Prophylaxe Institut by Minka.",
  alternates: { canonical: "/impressum" },
  robots: { index: true, follow: true },
}

export default function ImpressumPage() {
  return (
    <LegalLayout
      title="Impressum"
      description="Angaben gemäß § 5 TMG und § 18 Abs. 2 MStV."
      breadcrumbs={[{ href: "/impressum", label: "Impressum" }]}
    >
      <h2>Anbieter</h2>
      <p>
        <strong>Prophylaxe Institut by Minka</strong>
        <br />
        ein Angebot der WissensReich Academy UG (haftungsbeschränkt)
        <br />
        Weinsbergstraße 190
        <br />
        50825 Köln
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href="mailto:info@wissensreich.academy">info@wissensreich.academy</a>
        <br />
        Web: <a href="https://wissensreich.academy" target="_blank" rel="noreferrer">wissensreich.academy</a>
      </p>

      <h2>Vertretungsberechtigte Geschäftsführer</h2>
      <p>Hermann Fürstenau &amp; Florian Domin</p>

      <h2>Registereintrag</h2>
      <p>
        Registergericht: Amtsgericht Köln
        <br />
        Registernummer: [HRB wird nachgereicht]
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
        <br />
        [DE wird nachgereicht]
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        Hermann Fürstenau
        <br />
        Anschrift wie oben
      </p>

      <h2>Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
        <a href="https://ec.europa.eu/consumers/odr" rel="noreferrer" target="_blank">
          https://ec.europa.eu/consumers/odr
        </a>
        . Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach
        den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
        jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
        überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
        Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
        Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
        Seiten verantwortlich.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
        dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
        Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung
        des jeweiligen Autors bzw. Erstellers.
      </p>

      <p className="text-sm italic text-muted-foreground">
        Mit [ ] markierte Felder werden durch die endgültigen Registerdaten ersetzt.
      </p>
    </LegalLayout>
  )
}
