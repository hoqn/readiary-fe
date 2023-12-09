"use client";

import { GetDiaryDetailResponse } from "@/services/api/diary.api";
import { genImage } from "@/services/api/image.api";
import { MouseEventHandler, useCallback, useState } from "react";
import styles from "./page.module.scss";
import Button from "@/components/ui/button";
import Image from "next/image";

interface Props {
  scrap: GetDiaryDetailResponse["scraps"][number];
}

export default function ImageSection({ scrap }: Props) {
  const [isGenerating, setGenerating] = useState<boolean>(false);

  const doOnClickGenButton: MouseEventHandler = useCallback(
    async (e) => {
      e.preventDefault();

      setGenerating(true);
      genImage({
        scrapId: scrap.scrapId,
        content: scrap.content,
        memo: scrap.memo || "",
      }).finally(() => {
        setGenerating(false);
      });
    },
    [scrap.content, scrap.memo, scrap.scrapId]
  );

  if (isGenerating) {
    return (
      <div>
        <p>열심히 그림을 그리는 중이에요</p>
      </div>
    );
  }

  if (scrap.imageUrl?.length) {
    return <Image className={styles["image"]} src={scrap.imageUrl} alt="스크랩 생성 이미지" width="192" height="192" />;
  } else {
    return (
      <div className={styles["image-no"]}>
        <p>이미지를 생성해보세요!</p>
        <Button className={styles["image-gen-button"]} tint="primary" onClick={doOnClickGenButton}>
          이미지 생성
        </Button>
      </div>
    );
  }
}
