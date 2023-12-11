"use client";

import { GetDiaryDetailResponse, ReadingStatus } from "@/services/api/diary.api";
import styles from "./question-section.module.scss";
import { usePathname } from "next/navigation";
import { useLocalContext } from "../context";
import QuestionCard from "./question-card";
import cs from "classnames";
import Button from "@/components/ui/button";
import Link from "next/link";
import Section from "@/components/ui/section";

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
          <Button intent="contained" tint="primary" asChild>
            <Link href={`${pathname}/question/gen?d=1`}>질문 생성</Link>
          </Button>
        </div>
      </div>
    );
  }

  const firstQuestions = questions.filter(({ degree }) => degree == 1);
  const secondQuestions = questions.filter(({ degree }) => degree == 2);

  const canGenerateSecondQuestions = firstQuestions?.every(({ answer }) => answer?.length > 0) || false;

  return (
    <div className={styles["root"]}>
      <Section title="1차 질문" className={styles["question-service"]}>
        {!secondQuestions?.length && (
          <Button className={styles["question-edit"]} asChild>
            <Link href={`${pathname}/question?d=1`}>답 수정하기</Link>
          </Button>
        )}
        <ul className={styles["question-list"]}>
          {firstQuestions.map((question, i) => (
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
      </Section>
      <Section title="2차 질문" className={styles["question-service"]}>
        <Button className={styles["question-edit"]} asChild>
          <Link href={`${pathname}/question?d=2`}> 2차 답 수정하기</Link>
        </Button>
        {secondQuestions?.length ? (
          <ul>
            {secondQuestions.map((question, i) => (
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
        ) : canGenerateSecondQuestions ? (
          <div className={cs(styles["info"], styles["info--gen-able"])}>
            <p>질문을 생성할 수 있어요!</p>
            <Button intent="contained" tint="primary" asChild>
              <Link href={`${pathname}/question/gen?d=2`}>질문 생성</Link>
            </Button>
          </div>
        ) : (
          <div className={styles["info"]}>
            <p>
              앞 질문들에 대해 답변을 남겨주시면,
              <br />더 심도 깊은 질문들을 만들어 드릴게요.
            </p>
          </div>
        )}
      </Section>
    </div>
  );
}
