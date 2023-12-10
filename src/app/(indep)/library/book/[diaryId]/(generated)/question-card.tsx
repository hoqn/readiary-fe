"use client";

import cs from "classnames";
import { usePathname } from "next/navigation";
import styles from "./question-card.module.scss";

interface Props extends BaseProps {
  data: {
    question: string;
    answer: string;
    degree: number;
  };
}

export default function QuestionCard({ data, className }: Props) {
  const pathname = usePathname();

  return (
    <div className={cs(styles["root"], className)}>
      <div className={styles["question"]}>{data.question}</div>
      <div className={styles["answer"]}>
        <div className={styles["answer__inner"]}>
          {data.answer?.length ? (
            <p>{data.answer}</p>
          ) : (
            <p className={styles["answer__empty"]}>아직 답하시지 않았어요.</p>
          )}
        </div>
      </div>
    </div>
  );
}
