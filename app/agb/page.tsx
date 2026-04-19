import type { Metadata } from "next"
import { LegalLayout } from "@/components/sections/legal-layout"

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen",
  description:
    "Allgemeine Geschäftsbedingungen für Beratungs- und Mentoring-Leistungen des Prophylaxe-Instituts UG.",
  alternates: { canonical: "/agb" },
  robots: { index: true, follow: true },
}

export default function AgbPage() {
  return (
    <LegalLayout
      title="Allgemeine Geschäftsbedingungen"
      description="Vertragsbedingungen für Beratungs- und Mentoring-Leistungen."
      breadcrumbs={[{ href: "/agb", label: "AGB" }]}
    >
      <h2>§ 1 Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge,
        Lieferungen und Leistungen zwischen der{" "}
        <strong>Prophylaxe-Institut UG (haftungsbeschränkt)</strong>,
        Grenzstraße 144, 47441 Moers (nachfolgend „Anbieter") und der Kundin
        bzw. dem Kunden (nachfolgend „Kunde") im Zusammenhang mit Beratungs-,
        Mentoring- und Weiterbildungsleistungen.
      </p>

      <h2>§ 2 Vertragsschluss</h2>
      <p>
        Darstellungen auf der Website stellen kein bindendes Angebot dar. Ein Vertrag kommt durch
        beidseitige Unterzeichnung eines individuellen Angebots oder durch schriftliche Bestätigung
        einer Anmeldung zustande.
      </p>

      <h2>§ 3 Leistungsumfang</h2>
      <p>
        Der konkrete Leistungsumfang ergibt sich aus dem individuellen Angebot. Mentoring-
        Leistungen werden online oder vor Ort durch den Anbieter oder von ihm beauftragte
        qualifizierte Personen erbracht.
      </p>

      <h2>§ 4 Mitwirkungspflichten</h2>
      <p>
        Der Kunde stellt rechtzeitig alle zur Leistungserbringung erforderlichen Informationen,
        Unterlagen und Zugänge bereit und benennt eine verantwortliche Ansprechperson. Termine
        werden verbindlich vereinbart.
      </p>

      <h2>§ 5 Preise und Zahlungsbedingungen</h2>
      <p>
        Es gelten die im Angebot genannten Preise zzgl. gesetzlicher Umsatzsteuer. Rechnungen sind,
        soweit nicht abweichend vereinbart, innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug
        zahlbar.
      </p>

      <h2>§ 6 Widerruf für Verbraucher</h2>
      <p>
        Ist der Kunde Verbraucher im Sinne des § 13 BGB, steht ihm ein Widerrufsrecht nach Maßgabe
        der <a href="/widerruf">Widerrufsbelehrung</a> zu.
      </p>

      <h2>§ 7 Laufzeit und Kündigung</h2>
      <p>
        Laufzeit und Kündigungsmöglichkeiten richten sich nach dem individuellen Angebot. Das Recht
        zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
      </p>

      <h2>§ 8 Haftung</h2>
      <p>
        Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie nach dem
        Produkthaftungsgesetz. Für leichte Fahrlässigkeit haftet der Anbieter nur bei Verletzung
        einer wesentlichen Vertragspflicht (Kardinalpflicht), begrenzt auf den vertragstypischen,
        vorhersehbaren Schaden. Eine weitergehende Haftung ist ausgeschlossen.
      </p>

      <h2>§ 9 Urheberrecht</h2>
      <p>
        Alle im Rahmen des Mentorings bereitgestellten Materialien, Konzepte, Präsentationen und
        Videos sind urheberrechtlich geschützt. Eine Vervielfältigung oder Weitergabe an Dritte ist
        ohne ausdrückliche schriftliche Zustimmung nicht gestattet.
      </p>

      <h2>§ 10 Datenschutz</h2>
      <p>
        Die Verarbeitung personenbezogener Daten erfolgt gemäß der{" "}
        <a href="/datenschutz">Datenschutzerklärung</a>.
      </p>

      <h2>§ 11 Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Sollten
        einzelne Bestimmungen unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen
        Bestimmungen unberührt.
      </p>
    </LegalLayout>
  )
}
