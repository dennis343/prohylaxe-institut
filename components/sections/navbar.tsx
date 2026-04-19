"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

type NavLink = {
  href: string
  label: string
  // Optional: section IDs on the home page that this item represents.
  // The first that matches wins for active-highlighting on "/".
  sectionIds?: string[]
}

const navLinks: NavLink[] = [
  { href: "/", label: "Start", sectionIds: ["hero"] },
  {
    href: "/programme",
    label: "Programme",
    sectionIds: ["programme", "warteliste", "foerderung"],
  },
  {
    href: "/mentor",
    label: "Mentorin",
    sectionIds: ["mentorin", "stimmen"],
  },
  { href: "/journal", label: "Journal" },
  { href: "/kontakt", label: "Kontakt" },
]

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) {
      setActive(null)
      return
    }

    const visibility = new Map<string, number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio)
        }
        let bestId: string | null = null
        let bestRatio = 0
        for (const [id, ratio] of visibility) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        }
        if (bestRatio === 0) {
          // Fallback: pick the topmost section whose top is above the viewport midpoint
          const mid = window.innerHeight / 2
          let fallback: string | null = null
          let bestDist = Infinity
          for (const el of elements) {
            const rect = el.getBoundingClientRect()
            const dist = Math.abs(rect.top - mid)
            if (rect.top <= mid && dist < bestDist) {
              bestDist = dist
              fallback = el.id
            }
          }
          setActive(fallback)
        } else {
          setActive(bestId)
        }
      },
      {
        rootMargin: "-20% 0px -40% 0px",
        threshold: [0, 0.15, 0.3, 0.5, 0.75, 1],
      },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const isHome = pathname === "/"

  const trackedIds = useMemo(
    () =>
      isHome
        ? Array.from(
            new Set(navLinks.flatMap((l) => l.sectionIds ?? [])),
          )
        : [],
    [isHome],
  )
  const activeId = useActiveSection(trackedIds)

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

  const isActive = (link: NavLink): boolean => {
    if (isHome) {
      if (link.href === "/" && (!activeId || activeId === "hero")) return true
      if (link.sectionIds && activeId && link.sectionIds.includes(activeId))
        return true
      return false
    }
    if (link.href === "/") return false
    // Subpage match (exact or prefix for /programme, /mentor, /kontakt)
    return pathname === link.href || pathname.startsWith(link.href + "/")
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/90 backdrop-blur-xl"
          : "border-b border-transparent bg-background/75 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-5 md:h-20 md:px-8">
        <Link
          href="/"
          aria-label="Zur Startseite"
          className="group flex items-center gap-2 sm:gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/15 bg-primary text-primary-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
            <span className="font-serif text-base italic leading-none">M</span>
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-serif text-[15px] font-medium italic tracking-tight text-foreground md:text-base">
              Prophylaxe-Institut
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground md:text-[11px]">
              by Minka
            </span>
          </span>
        </Link>

        <nav
          aria-label="Hauptnavigation"
          className="hidden items-center gap-7 md:flex lg:gap-10"
        >
          {navLinks.map((link) => {
            const active = isActive(link)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-sm font-medium tracking-wide transition-colors",
                  active
                    ? "text-foreground"
                    : "text-foreground/70 hover:text-foreground",
                )}
              >
                {link.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-0 right-0 top-full mt-2 block h-px origin-left bg-accent transition-transform duration-300",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:block">
          <Button
            asChild
            size="sm"
            className="rounded-full px-5 text-sm font-semibold tracking-wide"
          >
            <Link href="/gespraech">Termin buchen</Link>
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
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col overflow-y-auto bg-background md:hidden">
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col gap-1 px-5 pt-6"
          >
            {navLinks.map((link) => {
              const active = isActive(link)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between gap-4 border-b border-border/60 py-5 font-serif text-2xl tracking-tight transition-colors sm:text-3xl",
                    active ? "text-accent" : "text-foreground",
                  )}
                >
                  <span className="flex items-center gap-3">
                    {active && (
                      <span
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                      />
                    )}
                    {link.label}
                  </span>
                  <span aria-hidden className="text-accent">
                    →
                  </span>
                </Link>
              )
            })}
          </nav>
          <div className="mt-auto px-5 pb-10 pt-6">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full"
              onClick={() => setOpen(false)}
            >
              <Link href="/gespraech">Termin buchen</Link>
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
