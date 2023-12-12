"use client";

import { GetDiaryDetailResponse } from "@/services/api/diary.api";
import { genImage } from "@/services/api/image.api";
import { EventHandler, MouseEventHandler, ReactEventHandler, useCallback, useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import Button from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocalContext } from "../../context";
import LoadingIndicator from "@/components/ui/loading-indicator";
import { useMutation, useQuery } from "@tanstack/react-query";

interface Props {
  scrap: GetDiaryDetailResponse["scraps"][number];
}

const MotionImage = motion(Image);

export default function ImageSection({ scrap }: Props) {
  const { revalidateDiaryDetail } = useLocalContext();

  const [imageUrl, setImageUrl] = useState<string>(scrap.imageUrl || "");

  const { mutate: doGenerateImage, isPending: isGenerating } = useMutation({
    mutationFn: () =>
      genImage({
        scrapId: scrap.scrapId,
        content: scrap.content,
        memo: scrap.memo || "",
      }),
    onSuccess({ imageUrl }) {
      setImageUrl(imageUrl);
      revalidateDiaryDetail();
    },
  });

  const doOnClickGenButton: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      doGenerateImage();
    },
    [doGenerateImage]
  );

  const doOnClickRegenButton: MouseEventHandler = useCallback(e => {
    e.preventDefault();
    // 기존 이미지 url 무효화
    setImageUrl("");
    revalidateDiaryDetail();
    doGenerateImage();
  }, [doGenerateImage, revalidateDiaryDetail]);

  const [isValid, setValid] = useState<boolean>(false);
  const [imgKey, setImgKey] = useState<number>(0);

  const __onError: ReactEventHandler<HTMLImageElement> = useCallback((e) => {
    setTimeout(() => {
      setImgKey((s) => s + 1);
    }, 5000);
  }, []);

  const __onLoad: ReactEventHandler<HTMLImageElement> = useCallback((e) => {
    setValid(true);
  }, []);

  if (isGenerating) {
    return (
      <div>
        <LoadingIndicator />
        <p>그림 그릴 준비를 하고 있어요</p>
      </div>
    );
  } else if (imageUrl?.length && !isValid) {
    return (
      <>
        <img style={{ display: "none" }} src={`${imageUrl}?${imgKey}`} onError={__onError} onLoad={__onLoad} />
        <div>
          <LoadingIndicator />
          <p>열심히 그림을 그리는 중이에요</p>
        </div>
      </>
    );
  }

  if (isValid) {
    return (
      <>
        <div className={styles["image-wrapper"]}>
          <MotionImage
            // unoptimized
            // src={`${imageUrl}?${imageKey}`}
            src={imageUrl}
            alt="스크랩 생성 이미지"
            fill={true}
            layoutId={`scrap-thumb-${scrap.scrapId}`}
          />
        </div>
        <div className={styles["image-regen-wrapper"]}>
          <Button onClick={doOnClickRegenButton}>이미지 재생성</Button>
        </div>
      </>
    );
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
