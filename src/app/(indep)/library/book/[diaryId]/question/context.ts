import { GetQuestionsResponse } from "@/services/api/question.api";
import { createContext, useContext } from "react";

export const QuestionContext = createContext({
  questionAnswers: undefined as GetQuestionsResponse["questionAnswer"] | undefined,
  revalidateQuestions: () => {},
});

export function useQuestionContext() {
  return useContext(QuestionContext);
}
