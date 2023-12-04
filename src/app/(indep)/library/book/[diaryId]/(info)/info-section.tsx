"use client";

import RatingStars from "@/components/ui/rating-stars";
import Section from "@/components/ui/section";
import { GetDiaryDetailResponse } from "@/services/api/diary.api";
import styles from "./info-section.module.scss";
import Rating from "./rating";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  diaryInfo: GetDiaryDetailResponse["bookDiary"];
}

export default function InfoSection({ diaryInfo }: Props) {
  const pathname = usePathname();

  return (
    <Section className={styles["info-section"]}>
      <Rating value={diaryInfo.score} />
      <Link className={styles["takeaway-wrapper"]} href={`${pathname}/take`}>
        {diaryInfo.takeaway?.length ? (
          <div className={styles["takeaway"]}>{diaryInfo.takeaway}</div>
        ) : (
          <div className={styles["takeaway-empty"]}>감상평을 남겨주세요!</div>
        )}
      </Link>
    </Section>
  );
}
