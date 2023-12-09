"use client";

import { useState } from "react";
import ScrapSection from "./scrap-section";
import QuestionSection from "./question-section";
import { GetDiaryDetailResponse } from "@/services/api/diary.api";
import { useLocalContext } from "../context";
import styles from "./generated.module.scss";
import { motion } from "framer-motion";
import cs from "classnames";

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
      <div className={styles["body"]}>
        {view === "scrap" ? <ScrapSection /> : view === "question" ? <QuestionSection /> : null}
      </div>
    </div>
  );
}
