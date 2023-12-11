"use client";

import Button from "@/components/ui/button";
import Link from "next/link";
import { deleteScrap } from "./actions";
import ImageSection from "./image-section";
import styles from "./page.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useLocalContext } from "../../context";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({
  params: { diaryId, scrapId },
}: {
  params: {
    diaryId: number;
    scrapId: number;
  };
}) {
  const router = useRouter();

  const { diaryDetail, revalidateDiaryDetail } = useLocalContext();

  if (!diaryDetail) throw "잘못된 접근입니다";

  const { scraps } = diaryDetail;
  const scrap = scraps.find(({ scrapId: s }) => `${s}` === `${scrapId}`);

  if (!scrap) throw "존재하지 않는 스크랩이에요";

  const [isDeleting, setDeleting] = useState<boolean>(false);

  const doOnDelete = useCallback(() => {
    setDeleting(true);
    deleteScrap(scrapId)
      .then(() => {
        revalidateDiaryDetail();
        router.back();
      })
      .finally(() => {
        setDeleting(false);
      });
  }, [revalidateDiaryDetail, router, scrapId]);

  return (
    <main className={styles["root"]}>
      <div className={styles["page-head"]}>
        <h4 className={styles["page-head__title"]}>{diaryDetail.bookDiary.title}</h4>
      </div>
      <div className={styles["page-body"]}>
        <div className={styles["image-container"]}>
          <ImageSection scrap={scrap} />
        </div>
        <div className={styles["content-container"]}>
          <div className={styles["content__label"]}>스크랩한 내용</div>
          <div className={styles["content"]}>{scrap.content}</div>
        </div>
        <div className={styles["memo-container"]}>
          <div className={styles["memo__label"]}>메모</div>
          <div className={styles["memo"]}>{scrap.memo}</div>
        </div>
        <div className={styles["actions-container"]}>
          <Button intent="text" onClick={doOnDelete} loading={isDeleting}>
            삭제
          </Button>
          <Button intent="text" asChild>
            <Link href={`./${scrap.scrapId}/edit`}>수정</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
