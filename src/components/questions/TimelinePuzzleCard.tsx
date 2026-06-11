import { ArrowDown, ArrowUp, Check, GripVertical } from "lucide-react";
import { useMemo, useState } from "react";
import PaperCard from "@/components/PaperCard";
import { cn } from "@/lib/utils";
import type { TimelineQuestion } from "@/types/game";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TimelinePuzzleCard({
  question,
  hintMode,
  onSubmit,
}: {
  question: TimelineQuestion;
  hintMode: "none" | "weak" | "strong";
  onSubmit: (order: string[], earned: number, correct: boolean) => void;
}) {
  const correctOrder = useMemo(
    () => [...question.items].sort((a, b) => a.year - b.year).map((i) => i.id),
    [question.items],
  );
  const itemsById = useMemo(() => Object.fromEntries(question.items.map((i) => [i.id, i])), [question.items]);

  const [order, setOrder] = useState<string[]>(() => shuffle(question.items.map((i) => i.id)));
  const [dragId, setDragId] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [earned, setEarned] = useState<number | null>(null);

  const correctPositions = useMemo(() => {
    if (!locked) return new Set<number>();
    const s = new Set<number>();
    for (let idx = 0; idx < order.length; idx++) {
      if (order[idx] === correctOrder[idx]) s.add(idx);
    }
    return s;
  }, [correctOrder, locked, order]);

  function move(id: string, dir: -1 | 1) {
    setOrder((prev) => {
      const idx = prev.indexOf(id);
      const nextIdx = idx + dir;
      if (idx < 0 || nextIdx < 0 || nextIdx >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[nextIdx]] = [next[nextIdx], next[idx]];
      return next;
    });
  }

  function swap(a: string, b: string) {
    setOrder((prev) => {
      const ai = prev.indexOf(a);
      const bi = prev.indexOf(b);
      if (ai < 0 || bi < 0) return prev;
      const next = [...prev];
      [next[ai], next[bi]] = [next[bi], next[ai]];
      return next;
    });
  }

  function submit() {
    const per = question.points / order.length;
    const hit = order.reduce((sum, id, idx) => sum + (id === correctOrder[idx] ? 1 : 0), 0);
    const earnedPoints = Math.round(per * hit);
    const isCorrect = hit === order.length;
    setLocked(true);
    setEarned(earnedPoints);
    onSubmit(order, earnedPoints, isCorrect);
  }

  return (
    <PaperCard className="p-6">
      <div className="text-xs tracking-[0.22em] text-black/55">时间线拼图</div>
      <div className="mt-2 text-lg font-semibold text-black/90">{question.prompt}</div>

      <div className="mt-5 grid gap-3">
        {order.map((id, idx) => {
          const item = itemsById[id];
          const showHint = hintMode !== "none" && !locked && (hintMode === "strong" || idx === 0);
          const hintIndex = correctOrder.indexOf(id);
          const isPosCorrect = correctPositions.has(idx);

          return (
            <div
              key={id}
              draggable={!locked}
              onDragStart={() => setDragId(id)}
              onDragOver={(e) => {
                if (locked) return;
                e.preventDefault();
              }}
              onDrop={() => {
                if (locked) return;
                if (!dragId || dragId === id) return;
                swap(dragId, id);
                setDragId(null);
              }}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl border border-black/10 bg-white/60 px-3 py-3 transition",
                !locked && "hover:bg-white/80",
                locked && isPosCorrect && "border-emerald-700/30 bg-emerald-50/70",
                locked && !isPosCorrect && "border-rose-700/20 bg-rose-50/60",
              )}
            >
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-xl border border-black/10 bg-white/70 text-black/55">
                  <GripVertical className="h-4 w-4" />
                </div>
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-black/5 text-xs font-semibold text-black/60">
                  {idx + 1}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="truncate text-sm text-black/85">{item.text}</div>
                <div className="mt-0.5 text-xs text-black/45">{locked ? `年份：${item.year}` : "拖拽排序或用按钮调整"}</div>
              </div>

              {!locked ? (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => move(id, -1)}
                    className="grid h-9 w-9 place-items-center rounded-xl border border-black/10 bg-white/70 text-black/70 hover:bg-white"
                    aria-label="上移"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(id, 1)}
                    className="grid h-9 w-9 place-items-center rounded-xl border border-black/10 bg-white/70 text-black/70 hover:bg-white"
                    aria-label="下移"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="grid h-9 w-9 place-items-center rounded-xl border border-black/10 bg-white/70 text-black/70">
                  <Check className={cn("h-4 w-4", isPosCorrect ? "text-emerald-700" : "text-rose-700")} />
                </div>
              )}

              {showHint ? (
                <div className="pointer-events-none absolute -right-2 -top-2 rounded-full border border-black/10 bg-[color:var(--seal)]/10 px-2 py-1 text-[11px] text-[color:var(--seal)]">
                  建议位置：{hintIndex + 1}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="text-xs text-black/55">
          {hintMode === "none"
            ? "提示：每关可用 1 次"
            : hintMode === "strong"
              ? "提示：每张卡显示一个“建议位置”"
              : "提示：仅显示 1 张卡的“建议位置”"}
          {locked && earned !== null ? ` · 本题得分：${earned}/${question.points}` : null}
        </div>
        <button
          type="button"
          disabled={locked}
          onClick={submit}
          className={cn(
            "rounded-xl bg-[color:var(--ink)] px-4 py-2 text-sm font-medium text-[color:var(--paper)] shadow-[0_20px_30px_-24px_rgba(0,0,0,0.9)] transition",
            locked && "cursor-not-allowed opacity-50",
          )}
        >
          提交
        </button>
      </div>

      {locked ? (
        <div className="mt-5 rounded-xl border border-black/10 bg-white/50 p-4 text-sm text-black/75">
          {question.explanation}
        </div>
      ) : null}
    </PaperCard>
  );
}
