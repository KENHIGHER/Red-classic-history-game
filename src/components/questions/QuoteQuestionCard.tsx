import { Check, Quote, X } from "lucide-react";
import { useMemo, useState } from "react";
import PaperCard from "@/components/PaperCard";
import { cn } from "@/lib/utils";
import type { QuoteQuestion } from "@/types/game";

export default function QuoteQuestionCard({
  question,
  hintMode,
  onSubmit,
}: {
  question: QuoteQuestion;
  hintMode: "none" | "weak" | "strong";
  onSubmit: (selectedId: string, correct: boolean) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  const eliminated = useMemo(() => {
    if (hintMode === "none") return new Set<string>();
    const wrong = question.options.filter((o) => o.id !== question.answerId);
    const take = hintMode === "strong" ? 2 : 1;
    return new Set(wrong.slice(0, take).map((o) => o.id));
  }, [hintMode, question.answerId, question.options]);

  return (
    <PaperCard className="p-6">
      <div className="text-xs tracking-[0.22em] text-black/55">语录辨识</div>
      <div className="mt-2 text-lg font-semibold text-black/90">{question.prompt}</div>

      <div className="mt-5 rounded-2xl border border-black/10 bg-[linear-gradient(180deg,rgba(0,0,0,0.03),rgba(0,0,0,0.06))] p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[color:var(--seal)]/10 text-[color:var(--seal)]">
            <Quote className="h-5 w-5" />
          </div>
          <div className="font-display text-[17px] leading-relaxed text-black/85">{question.quote}</div>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {question.options.map((opt) => {
          const isEliminated = eliminated.has(opt.id);
          const isSelected = selected === opt.id;
          const isCorrect = opt.id === question.answerId;

          return (
            <button
              key={opt.id}
              type="button"
              disabled={locked || isEliminated}
              onClick={() => setSelected(opt.id)}
              className={cn(
                "group flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition",
                "border-black/10 bg-white/60 hover:bg-white/80 active:translate-y-[1px]",
                isEliminated && "cursor-not-allowed border-black/10 bg-black/5 text-black/35",
                isSelected && "border-[color:var(--seal)] bg-[color:var(--paper)]",
              )}
            >
              <span className="text-sm leading-relaxed text-black/85">{opt.text}</span>
              <span className="grid h-7 w-7 place-items-center rounded-lg border border-black/10 bg-white/70 text-black/60">
                {locked ? (
                  isCorrect ? (
                    <Check className="h-4 w-4 text-emerald-700" />
                  ) : isSelected ? (
                    <X className="h-4 w-4 text-rose-700" />
                  ) : null
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="text-xs text-black/55">
          {hintMode === "none"
            ? "提示：每关可用 1 次"
            : hintMode === "strong"
              ? "提示：已排除两个错误选项"
              : "提示：已排除一个错误选项"}
        </div>
        <button
          type="button"
          disabled={locked || !selected}
          onClick={() => {
            if (!selected) return;
            const correct = selected === question.answerId;
            setLocked(true);
            onSubmit(selected, correct);
          }}
          className={cn(
            "rounded-xl bg-[color:var(--ink)] px-4 py-2 text-sm font-medium text-[color:var(--paper)] shadow-[0_20px_30px_-24px_rgba(0,0,0,0.9)] transition",
            (!selected || locked) && "cursor-not-allowed opacity-50",
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
