"use client";

import BookSearchBar from "@/components/search/book-search-bar";
import * as BookSearchResult from "@/components/search/book-search-result";
import bookApiService from "@/services/book.service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import Button from "@/components/ui/button/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LoadingIndicator from "@/components/ui/loading-indicator";
import cs from "classnames";

export default function Layout({ searchParams }: { searchParams: { q: string } }) {
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>(searchParams.q || "");

  useEffect(() => {
    router.replace(`${pathname}?q=${searchQuery}`);
  }, [pathname, router, searchQuery]);

  // Fetch
  const {
    data: searchResult,
    status,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["search-book", "title", searchQuery],
    queryFn: ({ pageParam }) => bookApiService.searchBooksByTitle(searchQuery, pageParam).then((res) => res.json()),
    enabled: !!searchQuery?.length,
    getNextPageParam: (lastPage, _, lastPageParam) => (lastPage?.response?.docs?.length ? lastPageParam + 1 : null),
    initialPageParam: 1,
  });

  // Detecting scroll to bottom
  const resultScrollToBottomObserver = useRef<IntersectionObserver>();

  useEffect(() => {
    resultScrollToBottomObserver.current = new window.IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) fetchNextPage();
    });
  }, [fetchNextPage]);

  const resultLastElement = useRef<HTMLDivElement>(null);

  // Apply Observers
  useEffect(() => {
    const currentResultLastElement = resultLastElement?.current;

    if (!!currentResultLastElement) resultScrollToBottomObserver.current?.observe(currentResultLastElement);

    return () => {
      if (!!currentResultLastElement) resultScrollToBottomObserver.current?.unobserve(currentResultLastElement);
    };
  }, []);

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
                  <div className={styles["result__bottom-item"]} ref={resultLastElement}>
                    <LoadingIndicator />
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
            if (!searchQuery.length) {
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
              <div className={styles['result-error']}>
                <div className={styles['result-error__message']}>오류가 발생했어요 {":("}</div>
                <div className={styles["result-error__extra"]}>{error.message}</div>
              </div>
            );
          }
        })()}
      </main>
    </>
  );
}
