import { getQuestions } from "@/services/api/question.api";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

export function useQuestions(diaryId: number) {
  const {
    data: { questionAnswer: questionAnswers },
    refetch: revalidateQuestions,
  } = useSuspenseQuery({
    queryKey: ["questions", diaryId],
    queryFn: () => getQuestions(diaryId),
  });

  const queryClient = useQueryClient();
  const invalidateQuestions = () =>
    queryClient.invalidateQueries({
      queryKey: ["questions", diaryId],
    });

  return { questionAnswers, revalidateQuestions, invalidateQuestions };
}
