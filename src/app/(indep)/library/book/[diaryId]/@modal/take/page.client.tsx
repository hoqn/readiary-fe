"use client";

import { MouseEventHandler, useCallback, useMemo, useState } from "react";
import styles from "./page.module.scss";
import RatingStars from "@/components/ui/rating-stars";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { setDiaryReport } from "./actions";
import { useForm } from "react-hook-form";

interface Props {
  initialData: {
    takeaway: string;
  };
  params: { diaryId: number };
}

export default function Page({ initialData, params: { diaryId } }: Props) {
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<Record<"takeaway", string>>({
    defaultValues: {
      takeaway: initialData.takeaway,
    },
  });

  const doCancel: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      router.back();
    },
    [router]
  );

  const doOnSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        setLoading(true);
        setDiaryReport(diaryId, data.takeaway)
          .then(() => {
            router.back();
            router.refresh();
          })
          .catch((e) => {
            alert(e);
          })
          .finally(() => {
            setLoading(false);
          });
      }),
    [diaryId, handleSubmit, router]
  );

  return (
    <div className={styles["root"]}>
      <div className={styles["page-head"]}>
        <h4 className={styles["page-head__title"]}>감상평</h4>
        <div className={styles["page-head__description"]}>이 책을 읽고 어떤 느낌이 드셨나요?</div>
      </div>
      <form onSubmit={doOnSubmit}>
        <div className={styles["page-body"]}>
          <textarea
            className={styles["textarea"]}
            {...register("takeaway", {
              required: true,
            })}
          />
        </div>
        <div className={styles["actions-container"]}>
          <Button intent="text" tint="neutral" size="md" onClick={doCancel}>
            취소
          </Button>
          <Button type="submit" intent="contained" tint="primary" size="md" loading={isLoading}>
            저장
          </Button>
        </div>
      </form>
    </div>
  );
}
