"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
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

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-background/70 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/15 bg-primary text-primary-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
            <span className="font-serif text-base italic leading-none">M</span>
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-serif text-base font-medium italic tracking-tight text-foreground">
              Prophylaxe-Institut
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              by Minka
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-foreground/85 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            asChild
            size="sm"
            className="rounded-full px-5 text-sm font-semibold tracking-wide"
          >
            <Link href="/kontakt">Erstgespräch</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 top-16 z-40 flex flex-col bg-background md:hidden">
          <nav className="flex flex-1 flex-col gap-1 px-5 pt-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-border/60 py-5 font-serif text-3xl font-light tracking-tight text-foreground"
              >
                {link.label}
                <span aria-hidden className="text-accent">→</span>
              </Link>
            ))}
          </nav>
          <div className="px-5 pb-10 pt-6">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full"
              onClick={() => setOpen(false)}
            >
              <Link href="/kontakt#warteliste">Erstgespräch anfragen</Link>
            </Button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              info@prophylaxe-institut.de
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
