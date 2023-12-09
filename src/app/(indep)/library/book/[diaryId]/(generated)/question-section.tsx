"use client";

import { GetDiaryDetailResponse, ReadingStatus } from "@/services/api/diary.api";
import styles from "./question-section.module.scss";
import { usePathname } from "next/navigation";
import { useLocalContext } from "../context";
import QuestionCard from "./question-card";
import cs from "classnames";
import Button from "@/components/ui/button";

interface Props {
  questions: GetDiaryDetailResponse["questions"];
}

export default function QuestionSection() {
  const pathname = usePathname();

  const { diaryDetail } = useLocalContext();

  if (!diaryDetail) return null;

  const {
    questions,
    bookDiary: { readingStatus },
  } = diaryDetail;

  if (readingStatus !== ReadingStatus.AFTER) {
    return (
      <div className={styles["root"]}>
        <div className={cs(styles["info"], styles["info--need-read"])}>
          <p>책을 다 읽은 뒤에 질문을 생성할 수 있어요</p>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className={styles["root"]}>
        <div className={cs(styles["info"], styles["info--gen-able"])}>
          <p>질문을 생성할 수 있어요!</p>
          <Button intent="contained" tint="primary">
            질문 생성
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["root"]}>
      <ul>
        {questions.map((question, i) => (
          <QuestionCard
            key={i}
            data={{
              question: question.question,
              answer: question.answer,
              degree: question.degree,
            }}
          />
        ))}
      </ul>
    </div>
  );
}
