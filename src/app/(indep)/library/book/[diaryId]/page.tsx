import Header from "@/components/common/header";
import { ReadingStatus } from "@/services/api/diary.api";
import ScrapSection from "./(scrap)/scrap-section";
import { fetchDiaryDetail } from "./actions";
import styles from "./page.module.scss";

const ReadingStatusLabel: Record<ReadingStatus, string> = {
  "0": "읽기 전",
  "1": "읽는 중",
  "2": "다 읽은 책",
};

export default async function Page({ params }: { params: { diaryId: number } }) {
  // const currentSession = getServerSession();

  // const response = await diaryApi.getDiaryDetail(params.diaryId, { authorization: currentSession!.accessToken });
  // const data = await response.json();

  const data = await fetchDiaryDetail(params.diaryId);

  return (
    <>
      <Header title="책" hasBackButton />
      <main>
        <section className={styles["head-section"]}>
          <div className={styles["head-section__inner"]}>
            <div className={styles["head-section__left"]}>
              <picture>
                <img className={styles["book-img"]} src={data.bookDiary.coverImageUrl} alt={data.bookDiary.title} />
              </picture>
            </div>
            <div className={styles["head-section__right"]}>
              <h4 className={styles["book-title"]}>{data.bookDiary.title}</h4>
              <div className={styles["book-authors"]}>
                <span>{data.bookDiary.author}</span>
              </div>
              <div className={styles["head-section__under"]}>
                <span className={styles["status-chip"]}>{ReadingStatusLabel[data.bookDiary.readingStatus]}</span>
              </div>
            </div>
          </div>
        </section>
        <div>
          <ScrapSection scraps={data.scraps} />
        </div>
      </main>
    </>
  );
}
