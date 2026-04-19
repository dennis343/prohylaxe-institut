import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prophylaxe-Institut by Minka",
    short_name: "Prophylaxe-Institut",
    description:
      "Nachhaltiger Praxiserfolg mit System — Praxismentoring für Zahnärzte.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5ecd6",
    theme_color: "#14203a",
    lang: "de-DE",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  }
}
