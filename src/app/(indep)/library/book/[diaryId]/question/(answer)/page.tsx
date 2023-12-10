"use client";

import WideButton from "@/components/ui/wide-button";
import { useAnimate } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./page.module.scss";
import Button from "@/components/ui/button";
import { useQuestionContext } from "../context";
import { Controller, useForm } from "react-hook-form";
import { submitQuestionAnswer } from "@/services/api/question.api";
import { useAnswerStore } from "@/stores/answer.store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useLocalContext } from "../../context";

export default function Page({ params: { diaryId } }: { params: { diaryId: number } }) {
  const AnswerStore = useAnswerStore();
  const { questionAnswers } = useQuestionContext();

  const router = useRouter();

  useEffect(() => {
    AnswerStore.clear();
  }, []);

  if (!questionAnswers?.length) throw "잘못된 접근입니다";

  const [currentQA, setCurrentQA] = useState(() => ({
    index: 0,
    data: questionAnswers[0],
  }));

  const { revalidateDiaryDetail } = useLocalContext();

  const { mutate, status } = useMutation({
    mutationKey: ["answer", diaryId, questionAnswers],
    mutationFn: () =>
      submitQuestionAnswer({
        questionAndAnswer: AnswerStore.questionAndAnswer,
      }),
    onSuccess: () => {
      revalidateDiaryDetail();
      router.replace(".");
    },
  });

  const prevQA = useMemo(
    () =>
      currentQA.index > 0
        ? {
            index: currentQA.index - 1,
            data: questionAnswers[currentQA.index - 1],
          }
        : null,
    [currentQA.index, questionAnswers]
  );
  const nextQA = useMemo(
    () =>
      currentQA.index < questionAnswers.length - 1
        ? {
            index: currentQA.index + 1,
            data: questionAnswers[currentQA.index + 1],
          }
        : null,
    [currentQA.index, questionAnswers]
  );

  const { register, reset, getValues } = useForm<Record<"answer", string>>({
    defaultValues: {
      answer: "",
    },
  });

  const doOnClickPrev = useCallback(() => {
    if (prevQA) {
      AnswerStore.addQuestionAndAnswer(currentQA.data.questionId, getValues("answer"));
      setCurrentQA(prevQA);
      reset();
    }
  }, [AnswerStore, currentQA.data.questionId, getValues, prevQA, reset]);
  const doOnClickNext = useCallback(() => {
    if (nextQA) {
      AnswerStore.addQuestionAndAnswer(currentQA.data.questionId, getValues("answer"));
      setCurrentQA(nextQA);
      reset();
    }
  }, [AnswerStore, currentQA.data.questionId, getValues, nextQA, reset]);

  const doOnClickDone = useCallback(() => {
    AnswerStore.addQuestionAndAnswer(currentQA.data.questionId, getValues("answer"));
    mutate();
    
  }, [AnswerStore, currentQA.data.questionId, getValues, mutate]);

  return (
    <main className={styles["root"]}>
      <div className={styles["head"]}>
        {/* <h2 className={styles["head__title"]}>질문</h2> */}
        {/* <div className={styles["head__navigation-container"]}>
          <Button className={styles["head__navigation"]} intent="text">
            이전 질문
          </Button>
          <Button className={styles["head__navigation"]} intent="text">
            다음 질문
          </Button>
        </div> */}
        <div className={styles["head__content"]}>
          {/* <p ref={questionRef}></p> */}
          <p>{currentQA.data.question}</p>
        </div>
      </div>
      <div className={styles["body"]}>
        <textarea
          className={styles["body__textarea"]}
          placeholder="여기에 답변을 자유롭게 적어주세요"
          {...register("answer")}
        ></textarea>
      </div>
      <div className={styles["foot-actions"]}>
        {/* <Button className={styles["actions__pass"]} intent="text">
          이 질문은 넘길래요
        </Button> */}
        {/* <WideButton className={styles["actions__done"]} onClick={doOnSubmit} loading={isSubmitting}> */}
        {nextQA ? (
          <WideButton className={styles["actions__next"]} onClick={doOnClickNext}>
            다음 질문으로
          </WideButton>
        ) : (
          <WideButton className={styles["actions__done"]} onClick={doOnClickDone} loading={status === "pending"}>
            다 작성했어요!
          </WideButton>
        )}
      </div>
    </main>
  );
}
