import Header from "@/components/common/header";
import { getServerSession } from "@/helpers/auth.server";
import bookApi from "@/services/api/book.api";
import cs from "classnames";
import { NextResponse } from "next/server";
import BookActions from "./_book-actions";
import styles from "./page.module.scss";

export default async function Page({ params: { isbn } }: { params: { isbn: string } }) {
  const currentSession = getServerSession();

  if (!currentSession) {
    return NextResponse.redirect("/");
  }

  const response = await bookApi.getBook(isbn, {
    authorization: currentSession.accessToken,
  });
  const data = await response.json().then((json) => json.response.detail?.at(0)?.book);

  if (!data) throw Error("잘못된 ISBN13입니다.");

  return (
    <>
      <Header className={styles.header} hasBackButton />
      <main className={styles.body}>
        <section className={styles["head-section"]}>
          <div className={styles["head-section__content"]}>
            <picture>
              <img
                className={cs(styles["book-img"], styles["head-section__left"])}
                src={data?.bookImageURL}
                alt="책 표지 이미지"
              />
            </picture>
            <div className={styles["head-section__right"]}>
              <h4 className={styles["book-title"]}>{data?.bookname}</h4>
              <div className={styles["book-meta"]}>
                <span className={styles["book-authors"]}>{data?.authors}</span>
              </div>
            </div>
          </div>
        </section>
        <section className={styles["body-section"]}>
          <div className={styles["desc-section"]}>
            <h4 className={styles["desc-section__heading"]}>책 정보</h4>
            <div className={styles["desc-section__content"]}>
              <table>
                <tbody>
                  <tr>
                    <th className={styles["desc-section__th"]}>출판사</th>
                    <td className={styles["desc-section__td"]}>{data?.publisher}</td>
                  </tr>
                  <tr>
                    <th className={styles["desc-section__th"]}>출판년월</th>
                    <td className={styles["desc-section__td"]}>{data?.publication_date || data?.publication_year}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles["desc-section"]}>
            <h4 className={styles["desc-section__heading"]}>책 소개</h4>
            <div
              className={styles["desc-section__content"]}
              dangerouslySetInnerHTML={{
                __html: data?.description,
              }}
            />
          </div>
        </section>
        <BookActions className={styles["actions-container"]} bookData={data} />
      </main>
    </>
  );
}
