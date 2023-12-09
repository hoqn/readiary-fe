"use client";

import ErrorPage from "@/components/common/error-page";
import FetchingPage from "@/components/common/fetching-page";
import LoadingIndicator from "@/components/ui/loading-indicator";
import RatingStars from "@/components/ui/rating-stars";
import { useBottomDetection } from "@/helpers/hooks/bottom-detect";
import diaryApi from "@/services/api/diary.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import cs from "classnames";
import Link from "next/link";
import styles from "./page.module.scss";
import { getDiariesOfCurrentMember } from "./actions";
import ListItem from "./$list-item";

export default function Page() {
  const { data, status, isFetchingNextPage, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["lib-book"],
    queryFn: ({ pageParam }) => getDiariesOfCurrentMember({ page: pageParam }),
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.response.data.length) return lastPageParam + 1;
      else return null;
    },
    initialPageParam: 1,
  });

  const { lastElementRef } = useBottomDetection({
    onDetect: () => {
      fetchNextPage();
    },
  });

  return (
    <>
      <div className={styles["body"]}>
        {(() => {
          if (status === "success") {
            return (
              <>
                <section className={styles["meta-section"]}>
                  <div>총 {data.pages[0].response.pageInfo.totalElements}권 읽었어요</div>
                </section>
                <section className={styles["list-section"]}>
                  <ul className={styles["items"]}>
                    {data?.pages.map((page) =>
                      page.response.data.map((item) => (
                        <li key={item.isbn} className={styles["item-wrapper"]}>
                          <ListItem item={item} />
                        </li>
                      ))
                    )}
                  </ul>
                  {hasNextPage ? (
                    <div className={styles["last-item"]} ref={lastElementRef}>
                      {isFetchingNextPage && <LoadingIndicator />}
                    </div>
                  ) : (
                    <div className={cs(styles["last-item"], styles["last-item--no-next-page"])}>목록의 끝이에요</div>
                  )}
                </section>
              </>
            );
          } else if (status === "pending") {
            return <FetchingPage />;
          } else {
            return <ErrorPage description={error.message} />;
          }
        })()}
      </div>
    </>
  );
}
