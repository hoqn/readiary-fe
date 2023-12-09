import styles from "./question-card.module.scss";
import cs from "classnames";

interface Props extends BaseProps {
  data: {
    question: string;
    answer: string;
    degree: number;
  };
}

export default function QuestionCard({ data, className }: Props) {
  return (
    <div className={cs(className)}>
      <div>{data.question}</div>
      <div>{data.answer}</div>
    </div>
  );
}
