import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LEVELS } from "@/data/levels";
import { QUESTIONS_BY_LEVEL } from "@/data/questions";
import type { AnswerRecord, Difficulty, LevelId, LevelProgress, Session, Settings } from "@/types/game";

type LevelResult = {
  levelId: LevelId;
  score: number;
  maxScore: number;
  timeMs: number;
  answers: AnswerRecord[];
};

type GameState = {
  settings: Settings;
  progress: Record<LevelId, LevelProgress>;
  session?: Session;
  result?: LevelResult;

  setDifficulty: (difficulty: Difficulty) => void;
  toggleSound: () => void;

  startLevel: (levelId: LevelId) => void;
  useHint: () => void;
  submitAnswer: (answer: AnswerRecord) => void;
  finishLevel: () => void;
  clearResult: () => void;
  resetAll: () => void;
};

const PROGRESS_KEY = "rhg_progress_v1";

function createInitialProgress(): Record<LevelId, LevelProgress> {
  return LEVELS.reduce(
    (acc, l) => {
      acc[l.id] = {
        levelId: l.id,
        completed: false,
        bestScore: 0,
        bestTimeMs: 0,
      };
      return acc;
    },
    {} as Record<LevelId, LevelProgress>,
  );
}

function getMaxScore(levelId: LevelId): number {
  return (QUESTIONS_BY_LEVEL[levelId] ?? []).reduce((sum, q) => sum + q.points, 0);
}

function sumEarned(answers: AnswerRecord[]): number {
  return answers.reduce((sum, a) => sum + a.earned, 0);
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      settings: { difficulty: "normal", soundOn: true },
      progress: createInitialProgress(),

      setDifficulty: (difficulty) => {
        set((s) => ({ settings: { ...s.settings, difficulty } }));
      },
      toggleSound: () => {
        set((s) => ({ settings: { ...s.settings, soundOn: !s.settings.soundOn } }));
      },

      startLevel: (levelId) => {
        set({
          session: {
            levelId,
            startedAt: Date.now(),
            questionIndex: 0,
            answers: [],
            hintUsed: 0,
          },
          result: undefined,
        });
      },

      useHint: () => {
        const session = get().session;
        if (!session) return;
        set({ session: { ...session, hintUsed: session.hintUsed + 1 } });
      },

      submitAnswer: (answer) => {
        const session = get().session;
        if (!session) return;
        const nextAnswers = [...session.answers, answer];
        set({
          session: {
            ...session,
            answers: nextAnswers,
            questionIndex: session.questionIndex + 1,
          },
        });
      },

      finishLevel: () => {
        const session = get().session;
        if (!session) return;
        const finishedAt = Date.now();
        const timeMs = Math.max(0, finishedAt - session.startedAt);
        const score = sumEarned(session.answers);
        const maxScore = getMaxScore(session.levelId);

        set((s) => {
          const prev = s.progress[session.levelId];
          const improvedScore = score > prev.bestScore;
          const improvedTime = prev.bestTimeMs === 0 ? true : timeMs < prev.bestTimeMs;
          const bestScore = improvedScore ? score : prev.bestScore;
          const bestTimeMs = improvedScore ? timeMs : improvedTime ? timeMs : prev.bestTimeMs;

          return {
            session: { ...session, finishedAt },
            result: { levelId: session.levelId, score, maxScore, timeMs, answers: session.answers },
            progress: {
              ...s.progress,
              [session.levelId]: {
                ...prev,
                completed: true,
                bestScore,
                bestTimeMs,
              },
            },
          };
        });
      },

      clearResult: () => set({ result: undefined }),

      resetAll: () => {
        set({
          settings: { difficulty: "normal", soundOn: true },
          progress: createInitialProgress(),
          session: undefined,
          result: undefined,
        });
      },
    }),
    {
      name: PROGRESS_KEY,
      partialize: (s) => ({ settings: s.settings, progress: s.progress }),
      version: 1,
      migrate: (persisted) => {
        const p = persisted as Partial<GameState> | undefined;
        return {
          settings: p?.settings ?? { difficulty: "normal", soundOn: true },
          progress: p?.progress ?? createInitialProgress(),
        };
      },
    },
  ),
);

