const challenges = [
  {
    title: "Prophylaxe wird erbracht — aber nicht strategisch gelebt",
    description:
      "Die Leistung läuft, ist aber kein bewusst gesteuerter Umsatzbaustein.",
  },
  {
    title: "Patienten kommen — aber nicht regelmäßig und freiwillig",
    description:
      "Termine werden eher erinnert als gewünscht. Bindung entsteht zufällig.",
  },
  {
    title: "Waschanlagen-Prinzip statt hochwertige Prävention",
    description:
      "Standardisierter Ablauf ohne wirkliche Beratung — Wertigkeit geht verloren.",
  },
  {
    title: "Zusatzleistungen werden erklärt — aber nicht systematisch gebucht",
    description:
      "Empfehlungen verpuffen, weil Gesprächsführung und Anschlusslogik fehlen.",
  },
  {
    title: "Engagiertes Team — ohne messbare Leistungskennzahlen",
    description:
      "Niemand weiß genau, ob etwas wirkt. Steuern wird zum Bauchgefühl.",
  },
  {
    title: "Umsatz entsteht — aber selten planbar",
    description:
      "Was möglich wäre, bleibt unsichtbar. Sie nutzen häufig nur einen Bruchteil.",
  },
]

export function Challenges() {
  return (
    <section className="bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <div className="eyebrow">Typische Realität in vielen Praxen</div>
          <h2 className="serif-display mt-6 text-4xl leading-[1.1] text-foreground md:text-5xl">
            Fachlich hervorragend —{" "}
            <em className="italic text-accent">
              aber wirtschaftlich unter Wert.
            </em>
          </h2>
          <p className="lead mt-6">
            Die meisten Praxen arbeiten exzellent. Was häufig fehlt, ist eine
            klare Kunden­kommunikation und wirtschaftliche Steuerung. Die
            Folge: Umsatz entsteht — aber selten planbar.
          </p>
        </div>

        <ol className="mt-16 divide-y divide-border border-y border-border md:mt-20">
          {challenges.map((c, i) => (
            <li
              key={c.title}
              className="grid grid-cols-[auto_1fr] items-start gap-x-6 py-9 md:grid-cols-[4rem_1fr_1.4fr] md:gap-x-10 md:py-11"
            >
              <span className="font-serif text-base italic text-accent md:text-lg">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-xl font-normal tracking-tight text-foreground md:text-2xl">
                {c.title}
              </h3>
              <p className="col-span-2 mt-3 max-w-xl text-base leading-relaxed text-muted-foreground md:col-span-1 md:mt-0">
                {c.description}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-16 max-w-2xl text-balance font-serif text-2xl font-normal italic tracking-tight text-foreground md:text-3xl">
          Es ist Zeit für Struktur, Messbarkeit und Steuerbarkeit — nicht nur
          kosmetisch, sondern organisatorisch und betriebswirtschaftlich.
        </p>
      </div>
    </section>
  )
}
