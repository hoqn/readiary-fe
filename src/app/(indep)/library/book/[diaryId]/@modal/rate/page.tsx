"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import RatingStars from "@/components/ui/rating-stars";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { setDiaryRate } from "./actions";

export default function Page({ params: { diaryId } }: { params: { diaryId: number } }) {
  const router = useRouter();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<number | null>(null);

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
        <Button
          intent="text"
          tint="neutral"
          size="md"
          onClick={() => {
            router.back();
          }}
        >
          취소
        </Button>
        <Button
          intent="contained"
          tint="primary"
          size="md"
          loading={isLoading}
          onClick={() => {
            setLoading(true);
            setDiaryRate(diaryId, value)
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          저장
        </Button>
      </div>
    </div>
  );
}
