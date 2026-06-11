import { ChevronRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Level } from "@/types/game";
import PaperCard from "@/components/PaperCard";
import BadgeChip from "@/components/BadgeChip";

export default function LevelCard({
  level,
  locked,
  completed,
  bestScore,
  bestTimeLabel,
  onClick,
}: {
  level: Level;
  locked: boolean;
  completed: boolean;
  bestScore: number;
  bestTimeLabel: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} disabled={locked} className="text-left">
      <PaperCard
        className={cn(
          "h-full p-5 transition",
          locked ? "opacity-60" : "hover:-translate-y-[1px] hover:shadow-[0_26px_70px_-44px_rgba(0,0,0,0.85)]",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="font-display text-[18px] text-black/90">{level.title}</div>
            <div className="mt-1 text-xs tracking-[0.18em] text-black/55">{level.era}</div>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-black/10 bg-white/60 text-black/55">
            {locked ? <Lock className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <BadgeChip title={`徽章：${level.badgeTitle}`} active={completed} />
          <div className="text-xs text-black/55">最高分：{bestScore}</div>
          <div className="text-xs text-black/55">最佳用时：{bestTimeLabel}</div>
        </div>

        {locked ? (
          <div className="mt-3 text-xs text-black/45">完成上一关后解锁</div>
        ) : completed ? (
          <div className="mt-3 text-xs text-black/60">已解锁 · 可重复挑战刷新纪录</div>
        ) : (
          <div className="mt-3 text-xs text-black/60">未完成 · 进入闯关</div>
        )}
      </PaperCard>
    </button>
  );
}

