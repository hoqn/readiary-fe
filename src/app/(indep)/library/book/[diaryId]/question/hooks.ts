import { getQuestions } from "@/services/api/question.api";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useQuestions(diaryId: number) {
  const {
    data: { questionAnswer: questionAnswers },
    refetch: revalidateQuestions,
  } = useSuspenseQuery({
    queryKey: ["questions", diaryId],
    queryFn: () => getQuestions(diaryId),
  });

  return { questionAnswers, revalidateQuestions };
}
