import type { Metadata } from "next"
import { LegalLayout } from "@/components/sections/legal-layout"

export const metadata: Metadata = {
  title: "Widerrufsbelehrung",
  description:
    "Widerrufsbelehrung für Verbraucher beim Prophylaxe-Institut.",
  alternates: { canonical: "/widerruf" },
  robots: { index: true, follow: true },
}

export default function WiderrufPage() {
  return (
    <LegalLayout
      title="Widerrufsbelehrung"
      description="Informationen zum Widerrufsrecht für Verbraucherinnen und Verbraucher."
      breadcrumbs={[{ href: "/widerruf", label: "Widerruf" }]}
    >
      <h2>Widerrufsrecht</h2>
      <p>
        Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
        diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn
        Tage ab dem Tag des Vertragsschlusses.
      </p>
      <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns</p>
      <p>
        <strong>Prophylaxe-Institut UG (haftungsbeschränkt)</strong>
        <br />
        Grenzstraße 144
        <br />
        47441 Moers
        <br />
        E-Mail:{" "}
        <a href="mailto:info@prophylaxe-institut.de">
          info@prophylaxe-institut.de
        </a>
      </p>
      <p>
        mittels einer eindeutigen Erklärung (z. B. ein mit der Post
        versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag
        zu widerrufen, informieren. Sie können dafür das beigefügte
        Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben
        ist.
      </p>
      <p>
        Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung
        über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist
        absenden.
      </p>

      <h2>Folgen des Widerrufs</h2>
      <p>
        Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen,
        die wir von Ihnen erhalten haben, einschließlich der Lieferkosten
        (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass
        Sie eine andere Art der Lieferung als die von uns angebotene,
        günstigste Standardlieferung gewählt haben), unverzüglich und
        spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem
        die Mitteilung über Ihren Widerruf dieses Vertrags bei uns
        eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe
        Zahlungsmittel, das Sie bei der ursprünglichen Transaktion
        eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas
        anderes vereinbart; in keinem Fall werden Ihnen wegen dieser
        Rückzahlung Entgelte berechnet.
      </p>
      <p>
        Haben Sie verlangt, dass die Dienstleistungen während der
        Widerrufsfrist beginnen sollen, so haben Sie uns einen angemessenen
        Betrag zu zahlen, der dem Anteil der bis zu dem Zeitpunkt, zu dem
        Sie uns von der Ausübung des Widerrufsrechts hinsichtlich dieses
        Vertrags unterrichten, bereits erbrachten Dienstleistungen im
        Vergleich zum Gesamtumfang der im Vertrag vorgesehenen
        Dienstleistungen entspricht.
      </p>

      <h2>Vorzeitiges Erlöschen des Widerrufsrechts</h2>
      <p>
        Das Widerrufsrecht erlischt vorzeitig, wenn wir die Dienstleistung
        vollständig erbracht haben und mit der Ausführung der Dienstleistung
        erst begonnen haben, nachdem Sie dazu Ihre ausdrückliche Zustimmung
        gegeben haben und gleichzeitig Ihre Kenntnis davon bestätigt haben,
        dass Sie Ihr Widerrufsrecht bei vollständiger Vertragserfüllung
        durch uns verlieren.
      </p>

      <h2>Muster-Widerrufsformular</h2>
      <p>
        (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte
        dieses Formular aus und senden Sie es zurück.)
      </p>
      <ul>
        <li>
          An: Prophylaxe-Institut UG (haftungsbeschränkt), Grenzstraße 144,
          47441 Moers, E-Mail: info@prophylaxe-institut.de
        </li>
        <li>
          Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen
          Vertrag über die Erbringung der folgenden Dienstleistung (*)
        </li>
        <li>Bestellt am (*) / erhalten am (*)</li>
        <li>Name des/der Verbraucher(s)</li>
        <li>Anschrift des/der Verbraucher(s)</li>
        <li>
          Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)
        </li>
        <li>Datum</li>
      </ul>
      <p>(*) Unzutreffendes streichen.</p>
    </LegalLayout>
  )
}
