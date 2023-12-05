"use client";

import { MouseEventHandler, useCallback, useState } from "react";
import styles from "./page.module.scss";
import RatingStars from "@/components/ui/rating-stars";
import Button from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { setDiaryRate } from "./actions";
import { setDiaryReport } from "../take/actions";

interface Props {
  initialData: {
    score: number | null;
  };
  params: { diaryId: number };
}

export default function Page({ initialData, params: { diaryId } }: Props) {
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<number | null>(initialData.score);

  const doOnCancel: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      router.back();
    },
    [router]
  );

  const doOnSubmit: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);
      setDiaryRate(diaryId, value)
        .then(() => {
          router.back();
          router.refresh();
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [diaryId, router, value]
  );

  return (
    <div className={styles["root"]}>
      <div className={styles["label-container"]}>
        {value ? (
          <p>
            {Math.floor(value / 2)}.{value % 2 ? "5" : "0"}점 / 5.0점
          </p>
        ) : (
          <p>점수가 없어요</p>
        )}
      </div>
      <div className={styles["rating-stars-container"]}>
        <RatingStars isEditable value={value || 0} onEdit={setValue} />
      </div>
      <div className={styles["actions-container"]}>
        <Button intent="text" tint="neutral" size="md" onClick={doOnCancel}>
          취소
        </Button>
        <Button intent="contained" tint="primary" size="md" loading={isLoading} onClick={doOnSubmit}>
          저장
        </Button>
      </div>
    </div>
  );
}
