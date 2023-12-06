"use client";

import { ReadingStatus } from "@/services/api/diary.api";
import styles from "./status.module.scss";
import cs from "classnames";
import { useState } from "react";
import LoadingIndicator from "@/components/ui/loading-indicator";
import { setReadingStatus } from "./actions";
import { useLocalContext } from "../context";
import { motion } from "framer-motion";

const data: {
  // icon: React.ReactNode;
  label: string;
  value: ReadingStatus;
}[] = [
  {
    label: "읽기 전",
    value: ReadingStatus.BEFORE,
  },
  {
    label: "읽는 중",
    value: ReadingStatus.READING,
  },
  {
    label: "다 읽음",
    value: ReadingStatus.AFTER,
  },
];

export default function Status() {
  const { diaryDetail, diaryId, revalidateDiaryDetail } = useLocalContext();

  const [isPending, setPending] = useState<boolean>(false);
  const [displayStatus, setDisplayStatus] = useState<ReadingStatus | undefined>(diaryDetail?.bookDiary.readingStatus);

  if (!diaryDetail) return;

  return (
    <div className={styles["status-container"]}>
      <ul className={styles["status"]}>
        {data.map(({ label, value }) => {
          const isActive = displayStatus === value;
          const showPending = isActive && isPending;

          return (
            <li key={value} className={styles["status-item-wrapper"]}>
              <div
                className={cs(styles["status-item"], isActive && styles["status-item--active"])}
                onClick={
                  !isPending && !isActive
                    ? () => {
                        setDisplayStatus(value);
                        setPending(true);
                        setReadingStatus(diaryId, value)
                          .then(() => {
                            revalidateDiaryDetail();
                          })
                          .finally(() => {
                            setPending(false);
                          });
                      }
                    : undefined
                }
              >
                {showPending ? (
                  <div className={styles["status-item__loading"]}>
                    <LoadingIndicator />
                  </div>
                ) : (
                  <>
                    {/* <div className={styles["status-item__icon"]} >  </div> */}
                    <div className={styles["status-item__label"]}>{label}</div>
                  </>
                )}
                {isActive && (
                  <motion.div
                    className={styles["status-item__active-background"]}
                    layoutId="status-active"
                  ></motion.div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
