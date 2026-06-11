import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function PaperCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-black/10 bg-[color:var(--paper)] shadow-[0_18px_50px_-30px_rgba(0,0,0,0.7)]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.65),transparent_42%),radial-gradient(circle_at_78%_22%,rgba(255,255,255,0.30),transparent_44%),radial-gradient(circle_at_42%_86%,rgba(0,0,0,0.06),transparent_48%)]",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.06))]",
        className,
      )}
    >
      <div className="relative">{children}</div>
    </div>
  );
}

