"use client";

import { GetDiaryDetailResponse } from "@/services/api/diary.api";
import { genImage } from "@/services/api/image.api";
import { MouseEventHandler, useCallback, useState } from "react";
import styles from "./page.module.scss";
import Button from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocalContext } from "../../context";

interface Props {
  scrap: GetDiaryDetailResponse["scraps"][number];
}

const MotionImage = motion(Image);

export default function ImageSection({ scrap }: Props) {
  const [isGenerating, setGenerating] = useState<boolean>(false);

  const [imageUrl, setImageUrl] = useState<string>(scrap.imageUrl || "");

  const doOnClickGenButton: MouseEventHandler = useCallback(
    async (e) => {
      e.preventDefault();

      setGenerating(true);
      genImage({
        scrapId: scrap.scrapId,
        content: scrap.content,
        memo: scrap.memo || "",
      }).then(({ imageUrl }) => {
        setImageUrl(imageUrl);
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

  if (imageUrl.length) {
    return <MotionImage className={styles["image"]} src={imageUrl} alt="스크랩 생성 이미지" width="192" height="192" layoutId={`scrap-thumb-${scrap.scrapId}`} onError={(e) => {
      e.currentTarget.style.display = "none";
    }} />;
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
