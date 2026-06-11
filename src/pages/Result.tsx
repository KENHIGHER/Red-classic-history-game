import { Download, RotateCcw, Trophy } from "lucide-react";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import BadgeChip from "@/components/BadgeChip";
import BrandHeader from "@/components/BrandHeader";
import PaperCard from "@/components/PaperCard";
import { LEVEL_BY_ID } from "@/data/levels";
import { QUESTIONS } from "@/data/questions";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/gameStore";
import type { Question } from "@/types/game";
import { formatTimeMs } from "@/utils/time";
import { downloadCanvas, renderLearningCard } from "@/utils/learningCard";

const thresholdByDifficulty = {
  easy: 0.6,
  normal: 0.75,
  hard: 0.85,
} as const;

export default function Result() {
  const navigate = useNavigate();
  const result = useGameStore((s) => s.result);
  const difficulty = useGameStore((s) => s.settings.difficulty);
  const startLevel = useGameStore((s) => s.startLevel);

  const questionById = useMemo(() => Object.fromEntries(QUESTIONS.map((q) => [q.id, q])) as Record<string, Question>, []);

  if (!result) {
    return (
      <div className="min-h-dvh bg-[color:var(--bg)] text-white">
        <BrandHeader />
        <main className="mx-auto max-w-6xl px-6 pb-16 pt-10">
          <PaperCard className="p-6">
            <div className="text-sm text-black/70">暂无结算数据，返回首页重新开始。</div>
            <div className="mt-4">
              <Link
                to="/"
                className="inline-flex rounded-2xl bg-[color:var(--ink)] px-4 py-2 text-sm font-medium text-[color:var(--paper)]"
              >
                返回首页
              </Link>
            </div>
          </PaperCard>
        </main>
      </div>
    );
  }

  const level = LEVEL_BY_ID[result.levelId];
  const threshold = thresholdByDifficulty[difficulty];
  const earnedBadge = result.maxScore ? result.score / result.maxScore >= threshold : false;

  const wrong = result.answers
    .map((a) => ({ a, q: questionById[a.questionId] }))
    .filter((x) => x.q && !x.a.correct);

  return (
    <div className="min-h-dvh bg-[color:var(--bg)] text-white">
      <BrandHeader />

      <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <PaperCard className="p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs tracking-[0.22em] text-black/55">结算</div>
                <div className="mt-2 font-display text-3xl text-black/90">{level.title}</div>
                <div className="mt-1 text-xs tracking-[0.18em] text-black/55">{level.era}</div>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-3xl bg-[color:var(--gold)]/15 text-[color:var(--ink)]">
                <Trophy className="h-6 w-6 text-[color:var(--gold)]" />
              </div>
            </div>

            <div className="mt-6 grid gap-4 rounded-2xl border border-black/10 bg-white/55 p-5 sm:grid-cols-3">
              <div>
                <div className="text-xs tracking-[0.22em] text-black/55">得分</div>
                <div className="mt-2 font-display text-3xl text-black/90">
                  {result.score}
                  <span className="text-base text-black/50">/{result.maxScore}</span>
                </div>
              </div>
              <div>
                <div className="text-xs tracking-[0.22em] text-black/55">用时</div>
                <div className="mt-2 font-display text-3xl text-black/90">{formatTimeMs(result.timeMs)}</div>
              </div>
              <div>
                <div className="text-xs tracking-[0.22em] text-black/55">徽章</div>
                <div className="mt-3">
                  <BadgeChip title={level.badgeTitle} active={earnedBadge} />
                </div>
                <div className="mt-2 text-xs text-black/55">通关阈值：{Math.round(threshold * 100)}%</div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const canvas = renderLearningCard({
                    title: "红色经典 · 党史闯关",
                    subtitle: `${level.title} / ${level.era}`,
                    scoreLine: `本关得分：${result.score}/${result.maxScore} · 用时 ${formatTimeMs(result.timeMs)}`,
                    badgeLine: earnedBadge ? `获得徽章：${level.badgeTitle}` : `未达徽章阈值（${Math.round(threshold * 100)}%）`,
                    footer: `完成时间：${new Date().toLocaleString("zh-CN")} · 继续加油，把线索串成自己的理解`,
                  });
                  downloadCanvas(canvas, `学习卡片-${level.title}.png`);
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-[color:var(--ink)] px-5 py-3 text-sm font-semibold text-[color:var(--paper)] shadow-[0_24px_50px_-34px_rgba(0,0,0,0.85)] transition hover:-translate-y-[1px]"
              >
                <Download className="h-4 w-4" />
                下载学习卡片
              </button>
              <button
                type="button"
                onClick={() => {
                  startLevel(level.id);
                  navigate("/play", { replace: true });
                }}
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white/60 px-5 py-3 text-sm font-medium text-black/75 hover:bg-white/80"
              >
                <RotateCcw className="h-4 w-4" />
                再来一次
              </button>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-2xl border border-black/10 bg-white/60 px-5 py-3 text-sm font-medium text-black/75 hover:bg-white/80"
              >
                返回首页
              </Link>
            </div>
          </PaperCard>

          <PaperCard className="p-7">
            <div className="text-xs tracking-[0.22em] text-black/55">错题复盘</div>
            <div className="mt-2 text-lg font-semibold text-black/90">把错题变成线索</div>

            {wrong.length === 0 ? (
              <div className="mt-5 rounded-2xl border border-black/10 bg-emerald-50/70 p-5 text-sm text-emerald-900/80">
                本关全对，解析与线索都在你心里了。
              </div>
            ) : (
              <div className="mt-5 grid gap-3">
                {wrong.map(({ a, q }) => {
                  if (!q) return null;
                  const correctText =
                    q.type === "timeline"
                      ? [...q.items].sort((x, y) => x.year - y.year).map((x) => x.text).join(" → ")
                      : q.options.find((o) => o.id === q.answerId)?.text ?? "";

                  return (
                    <div key={q.id} className="rounded-2xl border border-black/10 bg-white/55 p-5">
                      <div className="text-xs tracking-[0.22em] text-black/55">
                        {q.type === "timeline" ? "时间线" : q.type === "quote" ? "语录" : "选择题"}
                      </div>
                      <div className="mt-2 text-sm font-semibold text-black/85">{q.prompt}</div>
                      <div className="mt-3 text-sm text-black/70">
                        <span className="font-semibold text-black/80">正确：</span>
                        {correctText}
                      </div>
                      <div className="mt-3 text-sm text-black/70">
                        <span className="font-semibold text-black/80">解析：</span>
                        {q.explanation}
                      </div>
                      <div className={cn("mt-3 text-xs", a.earned > 0 ? "text-emerald-800/70" : "text-rose-800/70")}>
                        本题得分：{a.earned}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </PaperCard>
        </div>
      </main>
    </div>
  );
}

