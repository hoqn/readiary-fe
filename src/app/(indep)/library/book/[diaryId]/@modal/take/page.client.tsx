"use client";

import { useMemo, useState } from "react";
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

  const doOnSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        setLoading(true);
        setDiaryReport(diaryId, data.takeaway)
          .then(() => {
            router.back();
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
      <form onSubmit={doOnSubmit}>
        <div>
          <textarea
            {...register("takeaway", {
              required: true,
            })}
          />
        </div>
        <div className={styles["actions-container"]}>
          <Button
            intent="text"
            tint="neutral"
            size="md"
            onClick={(e) => {
              e.preventDefault();
              // router.back();
            }}
          >
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
