import cs from "classnames";
import styles from "./question-card.module.scss";
import { useForm } from "react-hook-form";
import { useAnswerStore } from "@/stores/answer.store";
import { useEffect } from "react";

interface Props extends BaseProps {
  questionAnswer: {
    questionId: number;
    question: string;
    answer: string;
    degree: number;
  };
}

export default function QuestionCard({
  className,
  questionAnswer: { answer, degree, question, questionId },
  ...restProps
}: Props) {
  const { register, watch } = useForm<Record<"answer", string>>({
    defaultValues: {
      answer,
    },
  });

  const { addQuestionAndAnswer, questionAndAnswer } = useAnswerStore();

  useEffect(() => {
    
  }, []);

  return (
    <div className={cs(styles["root"], className)} {...restProps}>
      <div className={styles["body"]}>
        <div className={styles["question"]}>
          <p>{question}</p>
        </div>
        {/* {answer?.length ? (
          <div className={styles["answer"]}>
            <p>{answer}</p>
          </div>
        ) : ( */}
        <div className={styles["answer"]} {...register("answer")}>
          <textarea placeholder="답변을 달아주세요"></textarea>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}
