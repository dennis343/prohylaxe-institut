import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="container mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-primary">404</p>
      <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        Seite nicht gefunden
      </h1>
      <p className="mt-4 text-pretty text-muted-foreground">
        Die aufgerufene Seite existiert nicht oder wurde verschoben. Kein Problem – wir helfen
        Ihnen zurück zum Wesentlichen.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link href="/">Zur Startseite</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/kontakt">Kontakt aufnehmen</Link>
        </Button>
      </div>
    </main>
  )
}
