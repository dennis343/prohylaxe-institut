import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

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
      { href: "/datenschutz", label: "Datenschutz (DSGVO)" },
      { href: "/agb", label: "AGB" },
      { href: "/widerruf", label: "Widerrufsbelehrung" },
    ],
  },
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
                P
              </span>
              <div className="leading-tight">
                <p className="text-base font-bold text-foreground">Prophylaxe Institut</p>
                <p className="text-xs text-muted-foreground">by Minka</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Nachhaltiger Praxiserfolg mit System. Ein Angebot der WissensReich Academy.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:kontakt@prophylaxe-institut.de" className="hover:text-foreground">
                  kontakt@prophylaxe-institut.de
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+49" className="hover:text-foreground">
                  Rückruf anfragen
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Deutschland &middot; bundesweit online</span>
              </li>
            </ul>
          </div>

          {(Object.keys(sitemap) as Array<keyof typeof sitemap>).map((key) => (
            <div key={key}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {sitemap[key].title}
              </h3>
              <ul className="mt-4 space-y-2">
                {sitemap[key].links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-center text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:text-left">
          <p>&copy; {new Date().getFullYear()} Prophylaxe Institut by Minka. Alle Rechte vorbehalten.</p>
          <nav className="flex flex-wrap justify-center gap-6 md:justify-end">
            <Link href="/impressum" className="hover:text-foreground">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-foreground">Datenschutz</Link>
            <Link href="/agb" className="hover:text-foreground">AGB</Link>
            <Link href="/widerruf" className="hover:text-foreground">Widerruf</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
