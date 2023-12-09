"use client";

import { useAnimate } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface Props {
  questionAnswer: {
    question: string;
    answer: string;
    degree: number;
    // TODO: 백엔드에서 추가해줘야 함!
    questionId: number;
  };
}

export default function QuestionListItem({ questionAnswer }: Props) {
  const pathname = usePathname();

  const [questionRef, questionAnimate] = useAnimate<HTMLParagraphElement>();

  useEffect(() => {
    if (questionAnswer.question?.length) {
      questionRef.current.textContent = "";
      const controls = questionAnimate(0, questionAnswer.question.length, {
        duration: 0.05 * questionAnswer.question.length,
        ease: "easeOut",
        onUpdate(latest) {
          questionRef.current.textContent = questionAnswer.question.slice(0, latest);
        },
      });

      return controls.stop;
    }
  }, []);

  return (
    <Link className="" href={`${pathname}/${questionAnswer.questionId}`}>
      <div>
        질문 <p ref={questionRef}>{questionAnswer.question}</p>
      </div>
      <div>A. {questionAnswer.answer}</div>
    </Link>
  );
}
