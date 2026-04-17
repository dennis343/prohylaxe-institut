export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <p className="text-lg font-semibold text-foreground">Prophylaxe Institut by Minka</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Ein Angebot der WissensReich Academy
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Impressum
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Datenschutz
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              AGB
            </a>
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Prophylaxe Institut by Minka. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}
