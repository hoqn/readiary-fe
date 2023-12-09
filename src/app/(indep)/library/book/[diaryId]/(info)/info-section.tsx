"use client";

import Section from "@/components/ui/section";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocalContext } from "../context";
import styles from "./info-section.module.scss";
import Rating from "./rating";
import Status from "./status";
import { ReadingStatus } from "@/services/api/diary.api";
import { AnimatePresence, motion } from "framer-motion";

export default function InfoSection() {
  const pathname = usePathname();

  const { diaryDetail } = useLocalContext();

  if (!diaryDetail) return;

  const {
    bookDiary: { takeaway, readingStatus },
  } = diaryDetail;

  return (
    <Section className={styles["info-section"]}>
      <Status />
      <AnimatePresence mode="popLayout">
        {readingStatus === ReadingStatus.AFTER && (
          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <Rating />
            <Link className={styles["takeaway-wrapper"]} href={`${pathname}/take`}>
              {takeaway?.length ? (
                <div className={styles["takeaway"]}>{takeaway}</div>
              ) : (
                <div className={styles["takeaway-empty"]}>감상평을 남겨주세요!</div>
              )}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
