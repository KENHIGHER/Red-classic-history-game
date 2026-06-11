import { BookOpen, Play } from "lucide-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import BrandHeader from "@/components/BrandHeader";
import LevelCard from "@/components/LevelCard";
import PaperCard from "@/components/PaperCard";
import { LEVELS } from "@/data/levels";
import { QUESTIONS_BY_LEVEL } from "@/data/questions";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/gameStore";
import { formatTimeMs } from "@/utils/time";

const difficultyLabel = {
  easy: "入门",
  normal: "标准",
  hard: "挑战",
} as const;

export default function Home() {
  const navigate = useNavigate();
  const difficulty = useGameStore((s) => s.settings.difficulty);
  const setDifficulty = useGameStore((s) => s.setDifficulty);
  const progress = useGameStore((s) => s.progress);
  const startLevel = useGameStore((s) => s.startLevel);

  const unlocked = useMemo(() => {
    const set = new Set<string>();
    for (const level of LEVELS.sort((a, b) => a.order - b.order)) {
      if (level.order === 1) {
        set.add(level.id);
        continue;
      }
      const prev = LEVELS.find((l) => l.order === level.order - 1);
      if (prev && progress[prev.id].completed) set.add(level.id);
    }
    return set;
  }, [progress]);

  return (
    <div className="min-h-dvh bg-[color:var(--bg)] text-white">
      <BrandHeader />

      <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="font-display text-4xl leading-[1.08] tracking-tight text-white lg:text-5xl">
              把党史装进一场
              <span className="text-[color:var(--gold)]">闯关</span>
            </div>
            <div className="mt-4 max-w-xl text-sm leading-relaxed text-white/70">
              三种题型混合：时间线拼图、选择题、语录辨识。每关一次提示，道具不靠运气，靠记忆与理解。
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  startLevel("awakening");
                  navigate("/play");
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-[color:var(--gold)] px-5 py-3 text-sm font-semibold text-black shadow-[0_24px_50px_-34px_rgba(0,0,0,0.85)] transition hover:-translate-y-[1px]"
              >
                <Play className="h-4 w-4" />
                立即开始
              </button>
              <a
                href="#levels"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 backdrop-blur hover:bg-white/10"
              >
                <BookOpen className="h-4 w-4" />
                选择关卡
              </a>
            </div>
          </div>

          <PaperCard className="p-6">
            <div className="text-xs tracking-[0.22em] text-black/55">设置</div>
            <div className="mt-2 text-lg font-semibold text-black/90">难度</div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {(["easy", "normal", "hard"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-sm transition",
                    difficulty === d
                      ? "border-[color:var(--seal)] bg-[color:var(--paper)] text-black/85"
                      : "border-black/10 bg-white/60 text-black/65 hover:bg-white/80",
                  )}
                >
                  {difficultyLabel[d]}
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-black/10 bg-white/50 p-4 text-sm text-black/70">
              题目内容不变，难度会影响“通关徽章”判定阈值与提示强度（挑战模式提示更弱）。
            </div>
          </PaperCard>
        </div>

        <div id="levels" className="mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs tracking-[0.22em] text-white/60">关卡列表</div>
              <div className="mt-2 font-display text-2xl text-white">从星火到新生</div>
            </div>
            <div className="text-sm text-white/65">
              总题量：{LEVELS.reduce((sum, l) => sum + (QUESTIONS_BY_LEVEL[l.id]?.length ?? 0), 0)}
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {LEVELS.sort((a, b) => a.order - b.order).map((level) => {
              const p = progress[level.id];
              const locked = !unlocked.has(level.id);
              return (
                <LevelCard
                  key={level.id}
                  level={level}
                  locked={locked}
                  completed={p.completed}
                  bestScore={p.bestScore}
                  bestTimeLabel={p.bestTimeMs ? formatTimeMs(p.bestTimeMs) : "--:--"}
                  onClick={() => {
                    if (locked) return;
                    startLevel(level.id);
                    navigate("/play");
                  }}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
