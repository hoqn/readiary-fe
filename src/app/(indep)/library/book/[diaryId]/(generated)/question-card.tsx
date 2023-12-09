"use client";

import Link from "next/link";
import styles from "./question-card.module.scss";
import cs from "classnames";
import { usePathname } from "next/navigation";

interface Props extends BaseProps {
  data: {
    question: string;
    answer: string;
    degree: number;
    //TODO: 백엔드
    questionId: number;
  };
}

export default function QuestionCard({ data, className }: Props) {
  const pathname = usePathname();

  return (
    <div className={cs(styles["root"], className)}>
      <div className={styles["question"]}>{data.question}</div>
      <div className={styles["answer"]}>
        <Link className={styles["answer__inner"]} href={`${pathname}/question/${data.questionId}`}>
          {data.answer?.length ? (
            <p>{data.answer}</p>
          ) : (
            <p className={styles["answer__empty"]}>아직 답하시지 않았어요. 여길 눌러 답하세요!</p>
          )}
        </Link>
      </div>
    </div>
  );
}
