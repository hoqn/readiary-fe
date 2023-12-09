"use client";

import BasicLayout from "@/components/layouts/basic";
import { QuestionContext } from "./context";
import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "@/services/api/question.api";

export default function Layout({
  children,
  params: { diaryId },
}: {
  children: React.ReactNode;
  params: { diaryId: number };
}) {
  const { data: questionAnswers, refetch: revalidateQuestions } = useQuery({
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
      <BasicLayout title="질문">{questionAnswers && children}</BasicLayout>;
    </QuestionContext.Provider>
  );
}
