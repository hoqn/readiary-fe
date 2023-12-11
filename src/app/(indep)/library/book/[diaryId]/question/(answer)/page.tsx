"use client";

import Button from "@/components/ui/button";
import WideButton from "@/components/ui/wide-button";
import { getQuestions, submitQuestionAnswer } from "@/services/api/question.api";
import { useAnswerStore } from "@/stores/answer.store";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocalContext } from "../../context";
import { useQuestions } from "../hooks";
import styles from "./page.module.scss";

export default function Page({
  params: { diaryId },
  searchParams,
}: {
  params: { diaryId: number };
  searchParams: { d: number };
}) {
  const AnswerStore = useAnswerStore();
  const { questionAnswers: questionAnswersRaw } = useQuestions(diaryId);

  const router = useRouter();
  const degree = useMemo(() => Number(searchParams?.d || 1), [searchParams?.d]);

  const {
    data: questionAnswers
  } = useSuspenseQuery({
    queryKey: ["questions-d", diaryId, degree],
    queryFn: () =>
      getQuestions(diaryId)
        .then((data) => data.questionAnswer?.filter(({ degree: r }) => r == degree))
        .then((qas) => {
          if (!qas?.length)
            throw Error;
          return qas;
        }),
    retry: true,
  });

  useEffect(() => {
    AnswerStore.clear();
  }, []);

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

  const { register, getValues, setValue } = useForm<Record<"answer", string>>({
    defaultValues: {
      answer: "",
    },
  });

  const doOnClickPrev = useCallback(() => {
    if (prevQA) {
      AnswerStore.addQuestionAndAnswer(currentQA.data.questionId, getValues("answer"));
      setCurrentQA(prevQA);
      setValue(
        "answer",
        AnswerStore.questionAndAnswer.find(({ questionId: r }) => r == prevQA.data.questionId)?.answer ||
          prevQA.data.answer
      );
    }
  }, [AnswerStore, currentQA.data.questionId, getValues, prevQA, setValue]);
  const doOnClickNext = useCallback(() => {
    if (nextQA) {
      AnswerStore.addQuestionAndAnswer(currentQA.data.questionId, getValues("answer"));
      setCurrentQA(nextQA);
      setValue(
        "answer",
        AnswerStore.questionAndAnswer.find(({ questionId: r }) => r == nextQA.data.questionId)?.answer ||
          nextQA.data.answer
      );
    }
  }, [AnswerStore, currentQA.data.questionId, getValues, nextQA, setValue]);

  const doOnClickPass = useCallback(() => {
    if (nextQA) {
      AnswerStore.addQuestionAndAnswer(currentQA.data.questionId, "");
      setCurrentQA(nextQA);
      setValue(
        "answer",
        AnswerStore.questionAndAnswer.find(({ questionId: r }) => r == nextQA.data.questionId)?.answer ||
          nextQA.data.answer
      );
    }
  }, [AnswerStore, currentQA.data.questionId, nextQA, setValue]);

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
        <Button className={styles["actions__pass"]} intent="text" onClick={doOnClickPass}>
          이 질문은 넘길래요
        </Button>
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
