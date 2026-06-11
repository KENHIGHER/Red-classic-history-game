import { Flag, Home, RotateCcw, Volume2, VolumeX } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/gameStore";

export default function BrandHeader({
  rightSlot,
  className,
}: {
  rightSlot?: ReactNode;
  className?: string;
}) {
  const soundOn = useGameStore((s) => s.settings.soundOn);
  const toggleSound = useGameStore((s) => s.toggleSound);
  const resetAll = useGameStore((s) => s.resetAll);

  return (
    <header className={cn("mx-auto w-full max-w-6xl px-6 pt-7", className)}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[color:var(--ink)] text-[color:var(--paper)] shadow-[0_16px_30px_-24px_rgba(0,0,0,0.85)]">
            <Flag className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display text-[17px] tracking-[0.22em] text-[color:var(--paper)]/90">
              红色经典 · 党史闯关
            </div>
            <div className="text-xs text-[color:var(--paper)]/60">时间线 · 选择题 · 语录辨识</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {rightSlot}
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 backdrop-blur hover:bg-white/10"
          >
            <Home className="h-4 w-4" />
            首页
          </Link>
          <button
            type="button"
            onClick={toggleSound}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 backdrop-blur hover:bg-white/10"
          >
            {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            音效
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 backdrop-blur hover:bg-white/10"
          >
            <RotateCcw className="h-4 w-4" />
            重置
          </button>
        </div>
      </div>
    </header>
  );
}
