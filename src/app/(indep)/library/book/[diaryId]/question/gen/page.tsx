"use client";

import Loading from "@/app/loading";
import WideButton from "@/components/ui/wide-button";
import { generateQuestions, getQuestions } from "@/services/api/question.api";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import styles from "./page.module.scss";
import { useQuestions } from "../hooks";

export default function Page({
  params: { diaryId },
  searchParams,
}: {
  params: { diaryId: number };
  searchParams: { d: number };
}) {
  const degree = useMemo(() => Number(searchParams?.d || 1), [searchParams?.d]);

  const router = useRouter();

  const { questionAnswers, invalidateQuestions } = useQuestions(diaryId);

  const queryClient = useQueryClient();

  const { status, mutate } = useMutation({
    mutationKey: ["question-generate", diaryId, degree],
    mutationFn: async () => {
      // 비동기 식으로 변경
      await generateQuestions(degree, diaryId);

      const check = async (resolve: ((data: any) => void), reject: any) => {
          invalidateQuestions();
          await queryClient.fetchQuery({
            queryKey: ["questions", diaryId],
            queryFn: () => getQuestions(diaryId),
          }).then((data) => {
            data.questionAnswer
          });
      };

    },
    onSuccess(data, variables, context) {
      router.replace(`./?d=${degree}`);
    },
  });

  if (questionAnswers === undefined) throw "일시적 오류가 발생했어요";

  const canGenerateQuestions = useMemo(() => {
    if (degree == 2) {
      return questionAnswers.every(({ degree: r }) => r != degree);
    } else {
      return !questionAnswers.length;
    }
  }, [degree, questionAnswers]);

  const doOnClickGenerate = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <main className={styles["root"]}>
      <div className={styles["head"]}></div>
      <div className={styles["body"]}>
        {status === "pending" ? (
          <Loading />
        ) : (
          canGenerateQuestions && (
            <>
              <div className={styles["info"]}>
                {degree == 2 ? (
                  <p>
                    스크랩과 메모, 그리고 앞서 답변해주신 내용을 바탕으로
                    <br />
                    2차 질문들을 만들어 드려요.
                  </p>
                ) : (
                  <p>
                    앞서 써주신 스크랩과 메모, 그리고 책 정보를 바탕으로
                    <br />
                    생각해보면 좋을 만한 질문들을 만들어 드려요.
                  </p>
                )}
              </div>
              <div className={styles["actions-container"]}>
                <WideButton className={styles["action"]} onClick={doOnClickGenerate}>
                  질문 생성
                </WideButton>
              </div>
            </>
          )
        )}
      </div>
    </main>
  );
}
