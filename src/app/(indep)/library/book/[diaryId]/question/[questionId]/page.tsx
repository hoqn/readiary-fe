"use client";

import WideButton from "@/components/ui/wide-button";
import { useAnimate } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./page.module.scss";
import Button from "@/components/ui/button";
import { useQuestionContext } from "../context";
import { useForm } from "react-hook-form";
import { submitQuestionAnswer } from "@/services/api/question.api";

export default function Page({ params: { questionId } }: { params: { questionId: number } }) {
  const { questionAnswers } = useQuestionContext();

  //TODO: 지금은 questionId 접근이 안 돼서
  const questionAnswer = questionAnswers?.at(0);

  if (!questionAnswer) throw "잘못된 접근입니다";

  const { question, answer, degree } = questionAnswer;

  const [questionRef, questionAnimate] = useAnimate<HTMLParagraphElement>();

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (question?.length) {
      questionRef.current.textContent = "";
      const control = questionAnimate(0, question.length, {
        duration: 0.05 * question.length,
        ease: "easeOut",
        onUpdate(latest) {
          questionRef.current.textContent = question.slice(0, latest);
        },
      });

      return control.stop;
    }
  }, [question, questionAnimate, questionRef]);

  const { handleSubmit, register, formState } = useForm<Record<"answer", string>>({
    defaultValues: {
      answer,
    },
  });

  const doOnSubmit = useMemo(
    () =>
      handleSubmit(({ answer }) => {
        setSubmitting(true);
        submitQuestionAnswer({
          questionAnswer: [
            {
              questionId,
              answer,
            },
          ],
        }).finally(() => {
          setSubmitting(false);
        });
      }),
    []
  );

  return (
    <main className={styles["root"]}>
      <div className={styles["head"]}>
        {/* <h2 className={styles["head__title"]}>질문</h2> */}
        <div className={styles["head__navigation-container"]}>
          <Button className={styles["head__navigation"]} intent="text">
            이전 질문
          </Button>
          <Button className={styles["head__navigation"]} intent="text">
            다음 질문
          </Button>
        </div>
        <div className={styles["head__content"]}>
          <p ref={questionRef}></p>
        </div>
      </div>
      <div className={styles["body"]}>
        <textarea
          className={styles["body__textarea"]}
          placeholder="여기에 답변을 자유롭게 적어주세요"
          aria-invalid={formState.errors.answer ? true : false}
          {...register("answer", {
            required: true,
          })}
        ></textarea>
      </div>
      <div className={styles["foot-actions"]}>
        {/* <Button className={styles["actions__pass"]} intent="text">
          이 질문은 넘길래요
        </Button> */}
        <WideButton className={styles["actions__done"]} onClick={doOnSubmit} loading={isSubmitting}>
          다 썼어요
        </WideButton>
      </div>
    </main>
  );
}
