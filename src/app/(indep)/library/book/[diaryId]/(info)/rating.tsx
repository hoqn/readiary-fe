"use client";

import styles from "./rating.module.scss";
import RatingStars from "@/components/ui/rating-stars";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocalContext } from "../context";

export default function Rating() {
  const pathname = usePathname();

  const { diaryDetail } = useLocalContext();

  if (!diaryDetail)
    return null;

  const { bookDiary: { score } } = diaryDetail;

  return (
    <Link className={styles["rating-stars-wrapper"]} href={`${pathname}/rate`}>
      <div className={styles["rating-stars-label"]}>
        {score ? `${Math.floor(score / 2)}.${score % 2 ? "5" : "0"}점을 주셨어요!` : "평가를 남겨주세요"}
      </div>
      <RatingStars className={styles["rating-stars"]} value={score || 0} />
    </Link>
  );
}
