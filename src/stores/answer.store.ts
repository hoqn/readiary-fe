import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AnswerStoreActions {
  addQuestionAndAnswer(questionId: number, answer: string): void;
  clear(): void;
}

interface AnswerStoreState {
  questionAndAnswer: {
    questionId: number;
    answer: string;
  }[];
}

const defaultAnswerStoreState: AnswerStoreState = {
  questionAndAnswer: [],
};

export const useAnswerStore = create(
  persist<AnswerStoreState & AnswerStoreActions>(
    (set, get) => ({
      ...defaultAnswerStoreState,
      addQuestionAndAnswer(questionId, answer) {
        set(({ questionAndAnswer }) => {
          const newQuestionAndAnswer = [...questionAndAnswer];
          const existingIndex = newQuestionAndAnswer.findIndex(({ questionId: r }) => r == questionId);

          if (existingIndex >= 0) {
            newQuestionAndAnswer[existingIndex].answer = answer;
          } else {
            newQuestionAndAnswer.push({
              questionId,
              answer,
            });
          }

          return {
            questionAndAnswer: newQuestionAndAnswer,
          };
        });
      },
      clear: () => set(defaultAnswerStoreState),
    }),
    {
      name: "question-answer",
    }
  )
);
