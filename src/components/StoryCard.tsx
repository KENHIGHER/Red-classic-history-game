import { ChevronsRight, FastForward, ScrollText } from "lucide-react";
import PaperCard from "@/components/PaperCard";
import { cn } from "@/lib/utils";
import useTypewriter from "@/hooks/useTypewriter";
import type { StoryScene } from "@/data/story";

export default function StoryCard({
  scene,
  onContinue,
  className,
}: {
  scene: StoryScene;
  onContinue: () => void;
  className?: string;
}) {
  const { text, done, skip } = useTypewriter(scene.lines, { speed: 14 });

  return (
    <PaperCard className={cn("p-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs tracking-[0.22em] text-black/55">剧情衔接</div>
          <div className="mt-2 flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[color:var(--seal)]/10 text-[color:var(--seal)]">
              <ScrollText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="font-display text-lg text-black/90">{scene.title}</div>
              {scene.subtitle ? <div className="mt-0.5 text-xs text-black/55">{scene.subtitle}</div> : null}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={skip}
          className={cn(
            "inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/60 px-3 py-2 text-xs font-medium text-black/70 hover:bg-white/80",
            done && "opacity-40",
          )}
          disabled={done}
        >
          <FastForward className="h-4 w-4" />
          跳过动画
        </button>
      </div>

      <div className="mt-5 rounded-2xl border border-black/10 bg-white/55 p-5">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-black/75">{text}</pre>
        {!done ? <div className="mt-3 h-1 w-20 rounded-full bg-[color:var(--seal)]/25" /> : null}
      </div>

      <div className="mt-5 flex items-center justify-end">
        <button
          type="button"
          onClick={onContinue}
          disabled={!done}
          className={cn(
            "inline-flex items-center gap-2 rounded-2xl bg-[color:var(--ink)] px-5 py-3 text-sm font-semibold text-[color:var(--paper)] shadow-[0_24px_50px_-34px_rgba(0,0,0,0.85)] transition hover:-translate-y-[1px]",
            !done && "cursor-not-allowed opacity-50",
          )}
        >
          {scene.cta}
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </PaperCard>
  );
}

