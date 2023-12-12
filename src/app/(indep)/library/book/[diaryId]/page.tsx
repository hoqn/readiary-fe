"use client";

import BasicLayout from "@/components/layouts/basic";
import SafeImage from "@/components/ui/safe-image";
import { ReadingStatus } from "@/services/api/diary.api";
import GeneratedSection from "./(generated)/generated";
import InfoSection from "./(info)/info-section";
import { useLocalContext } from "./context";
import styles from "./page.module.scss";
import { motion } from "framer-motion";

const MotionImage = motion(SafeImage);

const ReadingStatusLabel: Record<ReadingStatus, string> = {
  "0": "읽기 전",
  "1": "읽는 중",
  "2": "다 읽은 책",
};

export default function Page({ params: { diaryId } }: { params: { diaryId: number } }) {
  // const currentSession = getServerSession();

  // const response = await diaryApi.getDiaryDetail(params.diaryId, { authorization: currentSession!.accessToken });
  // const data = await response.json();

  const { diaryDetail } = useLocalContext();

  if (!diaryDetail) return null;

  return (
    <BasicLayout title="나의 책장">
      <main>
        <section className={styles["head-section"]}>
          <div className={styles["head-section__inner"]}>
            <div className={styles["head-section__left"]}>
              <MotionImage
                unoptimized
                className={styles["book-img"]}
                src={diaryDetail.bookDiary.coverImageUrl}
                alt={diaryDetail.bookDiary.title}
                width={96}
                height={144}
                layoutId={`diarythumb-${diaryId}`}
              />
            </div>
            <div className={styles["head-section__right"]}>
              <h4 className={styles["book-title"]}>{diaryDetail.bookDiary.title}</h4>
              <div className={styles["book-authors"]}>
                <span>{diaryDetail.bookDiary.author}</span>
              </div>
              <div className={styles["head-section__under"]}>
                <span className={styles["status-chip"]}>{ReadingStatusLabel[diaryDetail.bookDiary.readingStatus]}</span>
              </div>
            </div>
          </div>
        </section>
        <div>
          <InfoSection />
          <GeneratedSection />
        </div>
      </main>
    </BasicLayout>
  );
}
