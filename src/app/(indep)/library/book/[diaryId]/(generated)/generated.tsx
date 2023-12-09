"use client";

import { useState } from "react";
import ScrapSection from "./scrap-section";
import QuestionSection from "./question-section";
import { GetDiaryDetailResponse } from "@/services/api/diary.api";
import { useLocalContext } from "../context";
import styles from "./generated.module.scss";
import { AnimatePresence, Variants, motion } from "framer-motion";
import cs from "classnames";

const animVariants: Variants = {
  fromLeft: {
    opacity: 0,
    x: "-10%",
  },
  fromRight: {
    opacity: 0,
    x: "10%",
  },
  show: {
    opacity: 1,
    x: 0,
  },
};

interface Props {}

export default function GeneratedSection({}: Props) {
  const [view, setView] = useState<"scrap" | "question">("scrap");

  const { diaryDetail } = useLocalContext();

  if (!diaryDetail) return null;

  const {
    questions,
    bookDiary: { readingStatus },
  } = diaryDetail;

  return (
    <div className={styles["root"]}>
      <div className={styles["head"]}>
        <div className={styles["tabs"]}>
          <div
            className={cs(styles["tabs__item"], view === "scrap" && styles["tabs__item--active"])}
            onClick={() => setView("scrap")}
          >
            <span>스크랩</span>
            {view === "scrap" && (
              <motion.div className={styles["tabs__indicator"]} layoutId="tab-indicator"></motion.div>
            )}
          </div>
          <div
            className={cs(styles["tabs__item"], view === "question" && styles["tabs__item--active"])}
            onClick={() => setView("question")}
          >
            <span>질문</span>
            {view === "question" && (
              <motion.div className={styles["tabs__indicator"]} layoutId="tab-indicator"></motion.div>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {view === "scrap" ? (
          <motion.div
            key={view}
            className={styles["body"]}
            variants={animVariants}
            initial="fromLeft"
            exit="fromLeft"
            animate="show"
            transition={{
              duration: 0.1,
              ease: "easeInOut",
            }}
          >
            <ScrapSection />
          </motion.div>
        ) : view === "question" ? (
          <motion.div
            key={view}
            className={styles["body"]}
            variants={animVariants}
            initial="fromRight"
            exit="fromRight"
            animate="show"
            transition={{
              duration: 0.1,
              ease: "easeInOut",
            }}
          >
            <QuestionSection />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
