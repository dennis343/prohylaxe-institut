import Link from "next/link"

const sitemap = {
  angebot: {
    title: "Angebot",
    links: [
      { href: "/programme", label: "Programme" },
      { href: "/mentor", label: "Mentorin Minka" },
      { href: "/#ansatz", label: "Unser Ansatz" },
      { href: "/#foerderung", label: "Förderung" },
    ],
  },
  services: {
    title: "Services",
    links: [
      { href: "/kontakt", label: "Erstgespräch" },
      { href: "/kontakt#warteliste", label: "Warteliste" },
      { href: "/matching-magnet", label: "Matching Magnet" },
    ],
  },
  rechtliches: {
    title: "Rechtliches",
    links: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
      { href: "/agb", label: "AGB" },
      { href: "/widerruf", label: "Widerrufsbelehrung" },
    ],
  },
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <div className="grid gap-14 md:grid-cols-[5fr_7fr]">
          <div>
            <Link
              href="/"
              aria-label="Prophylaxe-Institut"
              className="inline-flex items-center gap-3"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 font-serif text-xl italic text-accent">
                M
              </span>
              <span className="leading-tight">
                <span className="block font-serif text-base italic text-foreground">
                  Prophylaxe-Institut
                </span>
                <span className="mt-0.5 block text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  by Minka
                </span>
              </span>
            </Link>

            <p className="mt-8 max-w-md font-serif text-lg font-light italic leading-snug text-foreground">
              Nachhaltiger Praxiserfolg mit System.
            </p>

            <div className="mt-10 border-t border-border pt-8 text-sm text-muted-foreground">
              <p className="text-[13px] uppercase tracking-[0.18em] text-foreground">
                Kontakt
              </p>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href="mailto:info@prophylaxe-institut.de"
                    className="hover:text-accent"
                  >
                    info@prophylaxe-institut.de
                  </a>
                </li>
                <li>
                  <span className="block">Prophylaxe-Institut UG (haftungsbeschränkt)</span>
                  <span className="block">Grenzstraße 144, 47441 Moers</span>
                </li>
                <li className="text-foreground/70">
                  Leitung &amp; Ansprechpartnerin: Minka Mujezinovic
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {(Object.keys(sitemap) as Array<keyof typeof sitemap>).map((key) => (
              <div key={key}>
                <h3 className="text-[13px] uppercase tracking-[0.18em] text-foreground">
                  {sitemap[key].title}
                </h3>
                <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                  {sitemap[key].links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Prophylaxe-Institut UG
            (haftungsbeschränkt) · Alle Rechte vorbehalten.
          </p>
          <p className="uppercase tracking-[0.18em]">
            Made with care in Moers
          </p>
        </div>
      </div>
    </footer>
  )
}
