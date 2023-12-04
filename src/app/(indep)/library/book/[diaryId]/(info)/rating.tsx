"use client";

import styles from "./rating.module.scss";
import RatingStars from "@/components/ui/rating-stars";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  value: number | null;
}

export default function Rating({ value }: Props) {
  const pathname = usePathname();

  return (
    <Link className={styles["rating-stars-wrapper"]} href={`${pathname}/rate`}>
      <div className={styles["rating-stars-label"]}>
        {value ? `${Math.floor(value / 2)}.${value % 2 ? "5" : "0"}점을 주셨어요!` : "평가를 남겨주세요"}
      </div>
      <RatingStars className={styles["rating-stars"]} value={value || 0} />
    </Link>
  );
}
