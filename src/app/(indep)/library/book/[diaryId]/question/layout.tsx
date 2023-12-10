"use client";

import { getQuestions } from "@/services/api/question.api";
import { useQuery } from "@tanstack/react-query";
import { QuestionContext } from "./context";

export default function Layout({
  children,
  params: { diaryId },
}: {
  children: React.ReactNode;
  params: { diaryId: number };
}) {
  const {
    data: questionAnswers,
    refetch: revalidateQuestions,
    status,
  } = useQuery({
    queryKey: ["questions", diaryId],
    queryFn: () => getQuestions(diaryId).then((data) => data.questionAnswer),
  });

  return (
    <QuestionContext.Provider
      value={{
        questionAnswers,
        revalidateQuestions,
      }}
    >
      <>{status === "success" && questionAnswers && children}</>
    </QuestionContext.Provider>
  );
}
