"use client";

import Button from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { MouseEventHandler, useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { editScrap, postScrap } from "./actions";
import styles from "./page.module.scss";
import { useLocalContext } from "../../../../context";
import { useMutation } from "@tanstack/react-query";

export default function Page({
  params: { diaryId, scrapId },
}: {
  params: {
    diaryId: number;
    scrapId: number | "new";
  };
}) {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);

  const { diaryDetail, revalidateDiaryDetail } = useLocalContext();

  if (scrapId !== "new" && !diaryDetail) throw "잘못된 접근이에요";

  const currentScrap = diaryDetail?.scraps.find(({ scrapId: r }) => r === Number(scrapId));

  const { register, handleSubmit, watch, formState } = useForm<{
    content: string;
    memo: string;
    page: number | null;
  }>({
    mode: "onBlur",
    defaultValues: {
      content: currentScrap?.content || "",
      memo: currentScrap?.memo || "",
      page: currentScrap?.page || null,
    },
  });

  const doOnSubmit = useMemo(() => {
    if (scrapId === "new") {
      // 새로운 스크랩 추가
      return handleSubmit((data) => {
        setLoading(true);
        postScrap(diaryId, {
          content: data.content,
          memo: data.memo,
          page: data.page || 0,
        })
          .then(() => {
            router.back();
            revalidateDiaryDetail();
          })
          .catch((e) => alert(e))
          .finally(() => setLoading(false));
      });
    } else {
      // 기존 스크랩 수정
      return handleSubmit((data) => {
        setLoading(true);
        editScrap(scrapId, {
          content: data.content,
          memo: data.memo,
          page: data.page || 0,
        })
          .then(() => {
            router.back();
            revalidateDiaryDetail();
          })
          .catch((e) => alert(e))
          .finally(() => setLoading(false));
      });
    }
  }, [diaryId, handleSubmit, revalidateDiaryDetail, router, scrapId]);

  const doCancel: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      router.back();
    },
    [router]
  );

  return (
    <div className={styles["root"]}>
      <form onSubmit={doOnSubmit}>
        <fieldset className={styles["field"]}>
          <label className={styles["field__label"]} htmlFor="memo">
            페이지
          </label>
          <input
            className={styles["field__input"]}
            type="number"
            placeholder="(입력하지 않으셔도 돼요)"
            {...register("page", {
              maxLength: 256,
            })}
          />
        </fieldset>
        <fieldset className={styles["field"]}>
          <label className={styles["field__label"]} htmlFor="content">
            스크랩 내용
          </label>
          <textarea
            className={styles["field__textarea"]}
            aria-invalid={!!formState.errors.content}
            placeholder="여기에 스크랩할 내용을 입력해주세요"
            {...register("content", {
              required: true,
              maxLength: 256,
            })}
          />
          <div className={styles["field__status"]}>
            {formState.errors.content && (
              <div className={styles["field__error"]}>
                {formState.errors.content.type === "maxLength" && "내용이 너무 길어요"}
                {formState.errors.content.type === "required" && "반드시 입력해주셔야 해요"}
              </div>
            )}
            <div className={styles["field__length"]}>{watch("content")?.length || 0}/256</div>
          </div>
        </fieldset>
        <fieldset className={styles["field"]}>
          <label className={styles["field__label"]} htmlFor="memo">
            메모
          </label>
          <textarea
            className={styles["field__textarea"]}
            placeholder="스크랩에 대한 생각이나 메모를 남길 수도 있어요"
            {...register("memo", {
              maxLength: 256,
            })}
          />
          <div className={styles["field__status"]}>
            {formState.errors.memo && <div className={styles["field__error"]}>{formState.errors.memo.message}</div>}
            <div className={styles["field__length"]}>{watch("memo")?.length || 0}/256</div>
          </div>
        </fieldset>
        <div className={styles["actions"]}>
          <Button intent="text" tint="neutral" size="lg" onClick={doCancel}>
            취소
          </Button>
          <Button type="submit" intent="contained" tint="primary" size="lg" loading={isLoading}>
            {scrapId === "new" ? "추가" : "저장"}
          </Button>
        </div>
      </form>
    </div>
  );
}
