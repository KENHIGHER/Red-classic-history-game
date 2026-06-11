import { HelpCircle, Sparkles, Timer } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandHeader from "@/components/BrandHeader";
import PaperCard from "@/components/PaperCard";
import QuestionStage from "@/components/QuestionStage";
import StoryCard from "@/components/StoryCard";
import { LEVEL_BY_ID } from "@/data/levels";
import { QUESTIONS_BY_LEVEL } from "@/data/questions";
import { STORY } from "@/data/story";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/store/gameStore";
import type { Question } from "@/types/game";
import { formatTimeMs } from "@/utils/time";

export default function Play() {
  const navigate = useNavigate();
  const session = useGameStore((s) => s.session);
  const submitAnswer = useGameStore((s) => s.submitAnswer);
  const useHint = useGameStore((s) => s.useHint);
  const finishLevel = useGameStore((s) => s.finishLevel);
  const difficulty = useGameStore((s) => s.settings.difficulty);

  const [now, setNow] = useState(() => Date.now());
  const [hintActive, setHintActive] = useState(false);
  const [phase, setPhase] = useState<"prologue" | "interlude" | "idle" | "finale">("prologue");
  const [sceneIndex, setSceneIndex] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(t);
  }, []);

  const levelId = session?.levelId;
  const level = levelId ? LEVEL_BY_ID[levelId] : undefined;
  const story = levelId ? STORY[levelId] : undefined;
  const questions = useMemo(() => (levelId ? (QUESTIONS_BY_LEVEL[levelId] ?? []) : []), [levelId]);

  useEffect(() => {
    if (!session) navigate("/", { replace: true });
  }, [navigate, session]);

  useEffect(() => {
    setHintActive(false);
  }, [session?.questionIndex, session?.levelId]);

  useEffect(() => {
    setPhase("prologue");
    setSceneIndex(0);
  }, [session?.levelId]);

  const hasQuestion = !!session && session.questionIndex < questions.length;
  const current = (hasQuestion ? questions[session!.questionIndex] : undefined) as Question | undefined;

  const elapsed = session ? now - session.startedAt : 0;

  if (!session || !level || (!current && phase === "idle")) {
    return (
      <div className="min-h-dvh bg-[color:var(--bg)] text-white">
        <BrandHeader />
        <main className="mx-auto max-w-6xl px-6 pb-16 pt-10">
          <PaperCard className="p-6">
            <div className="text-sm text-black/70">未找到进行中的关卡，已返回首页。</div>
          </PaperCard>
        </main>
      </div>
    );
  }

  const hintAvailable = session.hintUsed < 1;
  const hintMode: "none" | "weak" | "strong" =
    hintActive ? (difficulty === "hard" ? "weak" : "strong") : "none";

  const activeScene = useMemo(() => {
    if (!story) return undefined;
    if (phase === "prologue") return story.prologue;
    if (phase === "interlude") return story.interludes[sceneIndex] ?? story.interludes[story.interludes.length - 1];
    if (phase === "finale") return story.finale;
    return undefined;
  }, [phase, sceneIndex, story]);

  return (
    <div className="min-h-dvh bg-[color:var(--bg)] text-white">
      <BrandHeader />

      <main className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <PaperCard className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-xs tracking-[0.22em] text-black/55">正在挑战</div>
                  <div className="mt-2 font-display text-2xl text-black/90">{level.title}</div>
                  <div className="mt-1 text-xs tracking-[0.18em] text-black/55">{level.era}</div>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--seal)]/10 text-[color:var(--seal)]">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-5 grid gap-3 rounded-2xl border border-black/10 bg-white/50 p-4">
                <div className="flex items-center justify-between gap-3 text-sm text-black/75">
                  <span>进度</span>
                  <span>
                    {session.questionIndex + 1}/{questions.length}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-black/10">
                  <div
                    className="h-2 rounded-full bg-[color:var(--seal)] transition-[width]"
                    style={{ width: `${((session.questionIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between gap-3 text-sm text-black/75">
                  <span className="inline-flex items-center gap-2">
                    <Timer className="h-4 w-4" />
                    用时
                  </span>
                  <span className="font-mono">{formatTimeMs(elapsed)}</span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={!hintAvailable}
                  onClick={() => {
                    if (!hintAvailable) return;
                    useHint();
                    setHintActive(true);
                  }}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-medium transition",
                    hintAvailable
                      ? "border-[color:var(--seal)]/25 bg-[color:var(--seal)]/10 text-[color:var(--ink)] hover:bg-[color:var(--seal)]/15"
                      : "border-black/10 bg-black/5 text-black/45",
                  )}
                >
                  <HelpCircle className="h-4 w-4" />
                  使用提示（本关 1 次）
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/", { replace: true })}
                  className="rounded-2xl border border-black/10 bg-white/60 px-4 py-3 text-sm font-medium text-black/70 hover:bg-white/80"
                >
                  返回关卡
                </button>
              </div>

              <div className="mt-4 text-xs text-black/55">
                {difficulty === "hard"
                  ? "挑战模式：提示更克制，靠你自己把线索串起来。"
                  : "提示：会排除选项或给出建议位置。"}
              </div>
            </PaperCard>

            {activeScene ? (
              <StoryCard
                scene={activeScene}
                onContinue={() => {
                  if (phase === "prologue") {
                    setPhase("idle");
                    return;
                  }
                  if (phase === "interlude") {
                    setPhase("idle");
                    return;
                  }
                  if (phase === "finale") {
                    finishLevel();
                    navigate("/result", { replace: true });
                  }
                }}
              />
            ) : (
              <PaperCard className="p-6">
                <div className="text-xs tracking-[0.22em] text-black/55">线索板</div>
                <div className="mt-2 text-sm leading-relaxed text-black/70">
                  先作答再看解析；时间线题支持拖拽与上下微调。每关 1 次提示：标准/入门会排除选项或给出建议位置，挑战模式更克制。
                </div>
              </PaperCard>
            )}
          </div>

          <div>
            {phase !== "idle" ? (
              <PaperCard className="p-7">
                <div className="text-xs tracking-[0.22em] text-black/55">提示</div>
                <div className="mt-2 text-lg font-semibold text-black/90">
                  {phase === "prologue"
                    ? "先读完这一幕，再开始作答"
                    : phase === "interlude"
                      ? "这一幕已衔接到下一题"
                      : "尾声已到，准备结算"}
                </div>
                <div className="mt-4 text-sm leading-relaxed text-black/70">
                  {phase === "prologue"
                    ? "左侧是剧情衔接，它会把每道题串成一个连续的叙事。读完后点击“进入第一幕”开始。"
                    : phase === "interlude"
                      ? "读完左侧这一幕，再进入下一题。这样你会感觉自己在推进一段故事，而不是刷题。"
                      : "读完左侧尾声，点击“查看结算”，把本关的线索与错题一起复盘。"}
                </div>
              </PaperCard>
            ) : (
              <QuestionStage
                question={current!}
                hintMode={hintMode}
                onAnswered={(record) => {
                  submitAnswer(record);
                  setHintActive(false);
                  const answeredIndex = session.questionIndex;
                  const nextIndex = answeredIndex + 1;
                  if (nextIndex >= questions.length) {
                    setPhase("finale");
                    return;
                  }
                  setSceneIndex(Math.min(answeredIndex, (story?.interludes.length ?? 1) - 1));
                  setPhase("interlude");
                }}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
