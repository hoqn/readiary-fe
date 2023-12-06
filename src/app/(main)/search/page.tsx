"use client";

import BookSearchBar from "@/components/search/book-search-bar";
import * as BookSearchResult from "@/components/search/book-search-result";
import LoadingIndicator from "@/components/ui/loading-indicator";
import { getClientSession } from "@/helpers/auth.client";
import { useBottomDetection } from "@/helpers/hooks/bottom-detect";
import bookApi from "@/services/api/book.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import cs from "classnames";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from "./page.module.scss";

export default function Layout({ searchParams }: { searchParams: { q: string } }) {
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>(searchParams.q || "");

  useEffect(() => {
    setSearchQuery(searchParams.q);
  }, [searchParams.q]);

  useEffect(() => {
    if (!!searchQuery?.length) router.replace(`${pathname}?q=${searchQuery}`);
  }, [pathname, router, searchQuery]);

  // Fetch
  const {
    data: searchResult,
    status,
    error,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["search-book", "title", searchQuery],
    // queryFn: ({ pageParam }) => bookApiService.searchBooksByTitle(searchQuery, pageParam).then((res) => res.json()),
    queryFn: async ({ pageParam }) => {
      const authorization = getClientSession().accessToken;

      return bookApi
        .searchBooksByTitle(searchQuery, pageParam, {
          authorization,
        })
        .then((res) => res.json());
    },
    enabled: !!searchQuery?.length,
    getNextPageParam: (lastPage, _, lastPageParam) => (lastPage?.response?.docs?.length ? lastPageParam + 1 : null),
    initialPageParam: 1,
  });

  const { lastElementRef } = useBottomDetection({
    onDetect: () => {
      fetchNextPage();
    },
  });

  const doOnSubmitSearchQuery = useCallback(
    ({ query }: { query: string }) => {
      setSearchQuery(query);
    },
    [setSearchQuery]
  );

  return (
    <>
      <div className={styles.header}>
        <BookSearchBar initialValue={searchQuery} onSubmit={doOnSubmitSearchQuery} />
      </div>
      <main className={styles.body}>
        {(() => {
          if (status === "success") {
            return (
              <div className={styles.container}>
                <div className={styles.result__header}>
                  <h4 className={styles.result__heading}>책</h4>
                  <div className={styles.result__description}>
                    {searchResult?.pages[0].response?.numFound}권을 찾았어요.
                  </div>
                </div>
                <BookSearchResult.Root>
                  {searchResult?.pages.map((page) =>
                    page.response.docs.map(({ doc: { isbn13, bookname, authors, bookImageURL } }) => (
                      <BookSearchResult.Item
                        key={isbn13}
                        data={{
                          isbn13,
                          bookname,
                          authors,
                          bookImageURL,
                        }}
                      />
                    ))
                  )}
                </BookSearchResult.Root>
                {hasNextPage ? (
                  <div className={styles["result__bottom-item"]} ref={lastElementRef}>
                    {isFetching && <LoadingIndicator />}
                  </div>
                ) : (
                  <div className={cs(styles["result__bottom-item"], styles["result__bottom-item--no-next-page"])}>
                    목록의 끝이에요.
                  </div>
                )}
              </div>
            );
          } else if (status === "pending") {
            // 아직 검색어가 입력되지 않음
            if (!searchQuery?.length) {
              return (
                <div className={styles["result-waiting"]}>
                  <p>검색어를 입력해주세요</p>
                </div>
              );
            } else {
              return (
                <div className={styles["result-loading"]}>
                  <div className={styles["result-loading__content"]}>
                    <LoadingIndicator />
                    <div className={styles["result-loading__description"]}>책을 찾고 있어요</div>
                  </div>
                </div>
              );
            }
          } else {
            return (
              <div className={styles["result-error"]}>
                <div className={styles["result-error__message"]}>오류가 발생했어요 {":("}</div>
                <div className={styles["result-error__extra"]}>{error.message}</div>
              </div>
            );
          }
        })()}
      </main>
    </>
  );
}
