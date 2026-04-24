"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const hideOn = ["/gespraech", "/foerder-check", "/kontakt"]
  const shouldRender = !hideOn.some((p) => pathname.startsWith(p))

  useEffect(() => {
    if (!shouldRender) return
    const onScroll = () => {
      const y = window.scrollY
      const h = window.innerHeight
      setVisible(y > h * 0.5)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [shouldRender])

  useEffect(() => {
    if (!shouldRender) return
    const check = () => {
      setMenuOpen(document.body.style.overflow === "hidden")
    }
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    })
    return () => observer.disconnect()
  }, [shouldRender])

  if (!shouldRender) return null

  const show = visible && !menuOpen

  return (
    <div
      aria-hidden={!show}
      className={[
        "fixed inset-x-0 bottom-0 z-30 md:hidden",
        "transition-transform duration-300 ease-out",
        show ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
    >
      <div className="border-t border-border bg-background/95 px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <Link
            href="/gespraech"
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold tracking-wide text-primary-foreground shadow-[0_10px_28px_-14px_rgba(0,0,0,0.45)]"
          >
            Termin buchen
          </Link>
          <Link
            href="/foerder-check"
            className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/30 bg-background px-4 text-xs font-semibold uppercase tracking-[0.18em] text-foreground"
          >
            Förder-Check
          </Link>
        </div>
      </div>
    </div>
  )
}
