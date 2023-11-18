import { useForm } from "react-hook-form";
import cs from "classnames";
import styles from "./book-search-bar.module.scss";
import { FormEventHandler, useCallback, useMemo } from "react";

type FormValues = Record<"query", string>;

interface Props extends BaseProps {
  initialValue?: string;
  onSubmit: (data: FormValues) => void;
}

export default function BookSearchBar({ className, onSubmit, initialValue, ...restProps }: Props) {
  // Form Control
  const { handleSubmit, reset, register } = useForm<FormValues>({
    defaultValues: {
      query: initialValue,
    },
  });

  const doOnSubmit = useMemo(() => handleSubmit(onSubmit), [handleSubmit, onSubmit]);

  return (
    <form className={cs(styles["book-search-bar"], className)} onSubmit={doOnSubmit} {...restProps}>
      <input className={styles["book-search-bar__query-input"]} type="search" placeholder="찾으시는 책 제목을 입력해주세요" {...register("query", { required: true })} />
    </form>
  );
}
