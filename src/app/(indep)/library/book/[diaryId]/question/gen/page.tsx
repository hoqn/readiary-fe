"use client";

import WideButton from "@/components/ui/wide-button";
import { generateQuestions } from "@/services/api/question.api";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { useQuestionContext } from "../context";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

export default function Page({
  params: { diaryId },
  searchParams,
}: {
  params: { diaryId: number };
  searchParams: { d: number };
}) {
  const degree = useMemo(() => Number(searchParams?.d || 1), [searchParams?.d]);

  const router = useRouter();

  const { status, mutateAsync } = useMutation({
    mutationKey: ["question-generate", diaryId, degree],
    mutationFn: () => generateQuestions(degree, diaryId),
    onSuccess(data, variables, context) {
      router.replace(".");
    },
  });

  const { questionAnswers, revalidateQuestions } = useQuestionContext();

  if (questionAnswers === undefined) throw "일시적 오류가 발생했어요";

  const hasDegreeQuestions = useMemo(() => {
    return questionAnswers.length > 0 && questionAnswers?.some(({ degree: r }) => r == degree);
  }, [degree, questionAnswers]);

  const canGenerateQuestions = useMemo(() => {
    if (degree == 2) {
      return questionAnswers.every(({ degree: r }) => r != degree);
    } else {
      return !questionAnswers.length;
    }
  }, [degree, questionAnswers]);

  const doOnClickGenerate = useCallback(() => {
    mutateAsync().then(() => {
      revalidateQuestions();
    });
  }, [mutateAsync, revalidateQuestions]);

  if (status === "success") {
    router.replace(".");
    return null;
  }

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
