import type { Metadata } from "next"
import { LegalLayout } from "@/components/sections/legal-layout"

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten nach DSGVO beim Prophylaxe Institut by Minka.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: true, follow: true },
}

export default function DatenschutzPage() {
  return (
    <LegalLayout
      title="Datenschutzerklärung"
      description="Informationen zur Verarbeitung personenbezogener Daten gemäß Art. 13, 14 DSGVO."
      breadcrumbs={[{ href: "/datenschutz", label: "Datenschutz" }]}
    >
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
        <br />
        <strong>Prophylaxe Institut by Minka</strong>, ein Angebot der WissensReich Academy,
        [Straße, PLZ Ort], E-Mail:{" "}
        <a href="mailto:kontakt@prophylaxe-institut.de">kontakt@prophylaxe-institut.de</a>
      </p>

      <h2>2. Allgemeines zur Datenverarbeitung</h2>
      <p>
        Wir verarbeiten personenbezogene Daten unserer Nutzerinnen und Nutzer grundsätzlich nur,
        soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und
        Leistungen erforderlich ist. Die Verarbeitung erfolgt regelmäßig nur nach Einwilligung der
        Nutzer oder auf einer anderen zulässigen Rechtsgrundlage nach Art. 6 DSGVO.
      </p>

      <h2>3. Hosting</h2>
      <p>
        Diese Website wird bei einem externen Dienstleister gehostet (Vercel). Beim Besuch der Seite
        werden technische Daten verarbeitet, die der Browser automatisch übermittelt (insb.
        IP-Adresse, Datum und Uhrzeit, aufgerufene Ressource, Referrer, User-Agent). Die
        Verarbeitung erfolgt auf Grundlage unseres berechtigten Interesses an einer stabilen und
        sicheren Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO).
      </p>

      <h2>4. Server-Log-Dateien</h2>
      <p>
        Zur technischen Absicherung werden Log-Dateien erzeugt und in der Regel nach 14 Tagen
        gelöscht, sofern keine sicherheitsrelevanten Vorfälle eine längere Speicherung erfordern.
      </p>

      <h2>5. Kontaktaufnahme &amp; Warteliste</h2>
      <p>
        Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, werden Ihre Angaben
        (Name, E-Mail, ggf. Telefon, Praxisname, Rolle, Nachricht) zur Bearbeitung Ihrer Anfrage
        verarbeitet. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie zur
        Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO). Die Daten werden
        gelöscht, sobald sie für den Zweck der Erhebung nicht mehr erforderlich sind und keine
        gesetzlichen Aufbewahrungspflichten bestehen.
      </p>

      <h2>6. Cookies &amp; Tracking</h2>
      <p>
        Diese Website verwendet nur technisch notwendige Cookies, die für die Bereitstellung der
        Website erforderlich sind. Analyse-Tools oder Marketing-Cookies werden nur mit Ihrer
        vorherigen Einwilligung gesetzt. Ohne Ihre Einwilligung findet keine Analyse Ihres Verhaltens
        statt, die Sie identifiziert.
      </p>

      <h2>7. Webanalyse (Vercel Analytics)</h2>
      <p>
        In der Produktionsumgebung setzen wir Vercel Web Analytics ein. Dabei werden Aufrufe und
        Seitenwechsel anonymisiert erfasst (ohne Cookies, ohne IP-Speicherung). Rechtsgrundlage ist
        Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer statistischen Auswertung unserer
        Reichweite). Sie können der Erhebung mittels gängiger Browser- oder Betriebssystem-
        Einstellungen (z. B. „Do Not Track") widersprechen.
      </p>

      <h2>8. Schriftarten (Google Fonts – self-hosted)</h2>
      <p>
        Diese Website bindet Schriftarten (&bdquo;Geist" und &bdquo;Geist Mono") über Next/Font ein.
        Die Fonts werden zur Build-Zeit lokal eingebettet; es findet keine Verbindung zu Servern
        Dritter statt.
      </p>

      <h2>9. Ihre Rechte</h2>
      <p>Ihnen stehen folgende Rechte zu:</p>
      <ul>
        <li>Auskunft (Art. 15 DSGVO)</li>
        <li>Berichtigung (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li>Widerruf einer erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</li>
        <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
      </ul>
      <p>
        Anfragen zu diesen Rechten richten Sie bitte an{" "}
        <a href="mailto:kontakt@prophylaxe-institut.de">kontakt@prophylaxe-institut.de</a>.
      </p>

      <h2>10. Datensicherheit</h2>
      <p>
        Wir verwenden eine TLS-Verschlüsselung (HTTPS), um die Kommunikation zwischen Ihrem Browser
        und unseren Servern gegen Mitlesen durch Dritte zu schützen.
      </p>

      <h2>11. Aktualität und Änderung dieser Datenschutzerklärung</h2>
      <p>
        Diese Datenschutzerklärung ist aktuell gültig. Durch die Weiterentwicklung unserer Website
        und Angebote oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es
        notwendig werden, diese Datenschutzerklärung zu ändern.
      </p>
    </LegalLayout>
  )
}
