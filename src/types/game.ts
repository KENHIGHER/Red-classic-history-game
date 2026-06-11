export type Difficulty = "easy" | "normal" | "hard";

export type LevelId = "awakening" | "long-march" | "founding";

export type QuestionType = "choice" | "timeline" | "quote";

export type Level = {
  id: LevelId;
  title: string;
  era: string;
  order: number;
  badgeTitle: string;
};

export type ChoiceOption = {
  id: string;
  text: string;
  correct?: boolean;
};

export type TimelineItem = {
  id: string;
  text: string;
  year: number;
};

export type BaseQuestion = {
  id: string;
  levelId: LevelId;
  type: QuestionType;
  prompt: string;
  explanation: string;
  points: number;
};

export type ChoiceQuestion = BaseQuestion & {
  type: "choice";
  options: ChoiceOption[];
  answerId: string;
};

export type TimelineQuestion = BaseQuestion & {
  type: "timeline";
  items: TimelineItem[];
};

export type QuoteQuestion = BaseQuestion & {
  type: "quote";
  quote: string;
  options: ChoiceOption[];
  answerId: string;
};

export type Question = ChoiceQuestion | TimelineQuestion | QuoteQuestion;

export type AnswerRecord =
  | {
      questionId: string;
      type: "choice" | "quote";
      selectedId: string;
      correct: boolean;
      earned: number;
    }
  | {
      questionId: string;
      type: "timeline";
      order: string[];
      correct: boolean;
      earned: number;
    };

export type LevelProgress = {
  levelId: LevelId;
  completed: boolean;
  bestScore: number;
  bestTimeMs: number;
};

export type Settings = {
  difficulty: Difficulty;
  soundOn: boolean;
};

export type Session = {
  levelId: LevelId;
  startedAt: number;
  finishedAt?: number;
  questionIndex: number;
  answers: AnswerRecord[];
  hintUsed: number;
};

