"use client";

import WideButton from "@/components/ui/wide-button";
import { useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

export default function Page() {
  //DUMMY
  const [question, setQuestion] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setQuestion("동해물과 백두산이 마르고 닳도록 하느님이 보우하사?");
    }, 5000);
  }, []);

  const [questionRef, questionAnimate] = useAnimate<HTMLParagraphElement>();

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
  }, [question]);

  return (
    <main className={styles["root"]}>
      <div className={styles["head"]}>
        <h2 className={styles["head__title"]}>질문</h2>
        <div className={styles["head__content"]}>
          <p ref={questionRef}></p>
        </div>
      </div>
      <div className={styles["body"]}>
        <textarea className={styles["body__textarea"]} placeholder="여기에 답변을 자유롭게 적어주세요"></textarea>
      </div>
      <div className={styles["foot-actions"]}>
        <WideButton className={styles["actions__done"]}>다 썼어요</WideButton>
      </div>
    </main>
  );
}
