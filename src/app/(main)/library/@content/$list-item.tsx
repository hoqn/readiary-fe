import RatingStars from "@/components/ui/rating-stars";
import { GetDiariesByMemberIdResponse, ReadingStatus } from "@/services/api/diary.api";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./$list-item.module.scss";
import cs from "classnames";
import SafeImage from "@/components/ui/safe-image";

const MotionImage = motion(SafeImage);

const statusLabel: Record<ReadingStatus, string> = {
  [ReadingStatus.BEFORE]: "읽기 전",
  [ReadingStatus.READING]: "읽는 중",
  [ReadingStatus.AFTER]: "다 읽음",
};

function StatusTag({ status }: { status: ReadingStatus }) {
  return (
    <span
      className={cs(
        styles["status-tag"],
        status === ReadingStatus.BEFORE && styles["status-tag--before"],
        status === ReadingStatus.READING && styles["status-tag--reading"]
        // status === ReadingStatus.AFTER && styles["status-tag--after"]
      )}
    >
      {statusLabel[status]}
    </span>
  );
}

interface Props extends BaseProps {
  item: GetDiariesByMemberIdResponse["response"]["data"][number];
}

export default function ListItem({ className, item, ...restProps }: Props) {
  return (
    <Link className={styles["item"]} href={`/library/book/${item.bookDiaryId}`} {...restProps}>
      <div className={styles["item__inner"]}>
        <div className={styles["item__left"]}>
          <picture className={styles["item__image-wrapper"]}>
            <MotionImage
              unoptimized
              className={styles["item__image"]}
              alt={item.title}
              src={item.coverImageUrl}
              width={64}
              height={96}
              layoutId={`diarythumb-${item.bookDiaryId}`}
            />
          </picture>
        </div>
        <div className={styles["item__right"]}>
          <div className={styles["item__title"]}>{item.title}</div>
          <div className={styles["item__authors"]}>{item.author}</div>
          <div className={styles["item__under"]}>
            {item.readingStatus === ReadingStatus.AFTER ? (
              item.score ? (
                <div className={styles["item__rating-container"]}>
                  <span className={styles["item__rating-score"]}>
                    {Math.floor(item.score / 2)}.{item.score % 2 ? 5 : 0}
                  </span>
                  <RatingStars className={styles["item__rating-stars"]} value={item.score} />
                </div>
              ) : (
                <div className={cs(styles["item__rating-container"], styles["item__rating-null"])}>
                  회원님의 평가를 기다리고 있어요!
                </div>
              )
            ) : (
              <StatusTag status={item.readingStatus} />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
