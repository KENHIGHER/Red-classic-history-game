import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BadgeChip({
  title,
  active,
  className,
}: {
  title: string;
  active: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs",
        active
          ? "border-[color:var(--gold)]/40 bg-[color:var(--gold)]/10 text-[color:var(--ink)]"
          : "border-black/10 bg-black/5 text-black/45",
        className,
      )}
    >
      <Award className={cn("h-4 w-4", active ? "text-[color:var(--gold)]" : "text-black/40")} />
      {title}
    </div>
  );
}

