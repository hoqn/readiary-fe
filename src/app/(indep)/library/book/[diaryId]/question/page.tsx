"use client";

import Link from "next/link";
import styles from "./page.module.scss";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getQuestions } from "@/services/api/question.api";
import Loading from "@/app/loading";
import Error from "@/app/error";
import QuestionListItem from "./question-list-item";

export default function Page({ params: { diaryId } }: { params: { diaryId: number } }) {
  const pathname = usePathname();

  const {
    data: questions,
    status,
    error,
  } = useQuery({
    queryKey: ["questions", diaryId],
    queryFn: () => getQuestions(diaryId),
  });

  if (status === "pending") {
    return <Loading />;
  }

  if (status === "error") {
    throw error;
  }

  if (questions === undefined) return null;

  return (
    <main className={styles["root"]}>
      <div className={styles["body"]}>
        <ul className={styles["question-list"]}>
          {questions.questionAnswer.map((item) => (
            <li key={item.question}>
              <QuestionListItem questionAnswer={{ ...item, questionId: 2 }} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
