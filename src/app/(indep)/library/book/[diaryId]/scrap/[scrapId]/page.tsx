import diaryApi from "@/services/api/diary.api";
import styles from "./page.module.scss";
import { fetchDiaryDetail } from "./actions";
import Image from "next/image";
import Button from "@/components/ui/button";
import { useCallback } from "react";
import { genImage } from "@/services/api/image.api";
import ImageSection from "./image-section";

export default async function Page({
  params: { diaryId, scrapId },
}: {
  params: {
    diaryId: number;
    scrapId: number;
  };
}) {
  const data = await fetchDiaryDetail(diaryId);

  const diary = data.bookDiary;
  const scrap = data.scraps.find(({ scrapId: r }) => `${r}` === `${scrapId}`);

  if (!scrap) throw "존재하지 않는 스크랩이에요";

  return (
    <main className={styles["root"]}>
      <div className={styles["page-head"]}>
        <h4 className={styles["page-head__title"]}>{diary.title}</h4>
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
      </div>
    </main>
  );
}
