import type { AnswerRecord, Question } from "@/types/game";
import ChoiceQuestionCard from "@/components/questions/ChoiceQuestionCard";
import QuoteQuestionCard from "@/components/questions/QuoteQuestionCard";
import TimelinePuzzleCard from "@/components/questions/TimelinePuzzleCard";

export default function QuestionStage({
  question,
  hintMode,
  onAnswered,
}: {
  question: Question;
  hintMode: "none" | "weak" | "strong";
  onAnswered: (record: AnswerRecord) => void;
}) {
  if (question.type === "choice") {
    return (
      <ChoiceQuestionCard
        question={question}
        hintMode={hintMode}
        onSubmit={(selectedId, correct) => {
          onAnswered({
            questionId: question.id,
            type: "choice",
            selectedId,
            correct,
            earned: correct ? question.points : 0,
          });
        }}
      />
    );
  }

  if (question.type === "quote") {
    return (
      <QuoteQuestionCard
        question={question}
        hintMode={hintMode}
        onSubmit={(selectedId, correct) => {
          onAnswered({
            questionId: question.id,
            type: "quote",
            selectedId,
            correct,
            earned: correct ? question.points : 0,
          });
        }}
      />
    );
  }

  return (
    <TimelinePuzzleCard
      question={question}
      hintMode={hintMode}
      onSubmit={(order, earned, correct) => {
        onAnswered({ questionId: question.id, type: "timeline", order, correct, earned });
      }}
    />
  );
}
