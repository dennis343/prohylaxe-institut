"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/#herausforderungen", label: "Herausforderungen" },
  { href: "/#ansatz", label: "Ansatz" },
  { href: "/programme", label: "Programme" },
  { href: "/mentor", label: "Mentorin" },
  { href: "/kontakt", label: "Kontakt" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-background/60 backdrop-blur-sm",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
            P
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold text-foreground md:text-base">
              Prophylaxe Institut
            </span>
            <span className="text-[11px] text-muted-foreground md:text-xs">by Minka</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href="/kontakt">Erstgespräch</Link>
          </Button>
          <Button asChild size="sm" className="shadow-sm">
            <Link href="/kontakt#warteliste">Auf die Warteliste</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-secondary lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button asChild variant="outline" onClick={() => setOpen(false)}>
                <Link href="/kontakt">Erstgespräch anfragen</Link>
              </Button>
              <Button asChild onClick={() => setOpen(false)}>
                <Link href="/kontakt#warteliste">Auf die Warteliste</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
