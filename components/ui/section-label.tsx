import { cn } from "@/lib/utils"

type Props = {
  numeral: string
  label: string
  className?: string
}

export function SectionLabel({ numeral, label, className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em]",
        className,
      )}
    >
      <span className="font-serif text-[11px] tracking-[0.3em] text-accent">
        {numeral}
      </span>
      <span aria-hidden className="h-px w-10 bg-accent" />
      <span className="text-foreground/70">{label}</span>
    </div>
  )
}
