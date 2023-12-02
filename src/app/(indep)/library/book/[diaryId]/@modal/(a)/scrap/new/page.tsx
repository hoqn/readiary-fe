"use client";

import { useForm } from "react-hook-form";
import styles from "./page.module.scss";
import Button from "@/components/ui/button";
import { useMemo, useState } from "react";
import { postScrap } from "./actions";
import { useRouter } from "next/navigation";

export default function Page({
  params: { diaryId },
}: {
  params: {
    diaryId: number;
  };
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<Record<"content" | "memo", string>>();

  const doOnSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        setLoading(true);
        postScrap(diaryId, data)
          .then(() => {
            router.back();
            router.refresh();
          })
          .catch(e => alert(e))
          .finally(() => setLoading(false));
      }),
    [diaryId, handleSubmit, router]
  );

  return (
    <div className={styles["root"]}>
      <form onSubmit={doOnSubmit}>
        <fieldset>
          <label className={styles["label"]} htmlFor="content">
            스크랩 내용
          </label>
          <textarea
            className={styles["textarea"]}
            placeholder="여기에 스크랩할 내용을 입력해주세요"
            {...register("content", {
              required: true,
            })}
          />
        </fieldset>
        <fieldset>
          <label className={styles["label"]} htmlFor="memo">
            메모
          </label>
          <textarea
            className={styles["textarea"]}
            placeholder="스크랩에 대한 생각이나 메모을 남길 수도 있어요"
            {...register("memo", {
            })}
          />
        </fieldset>
        <div className={styles["actions"]}>
          <Button type="submit" intent="contained" tint="primary" size="md" loading={isLoading}>
            추가
          </Button>
        </div>
      </form>
    </div>
  );
}
