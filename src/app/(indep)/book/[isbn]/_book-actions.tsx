"use client";

import WideButton from "@/components/ui/wide-button";
import styles from "./_book-actions.module.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetBookResponse } from "@/services/api/book.api";
import diaryApi, { ReadingStatus } from "@/services/api/diary.api";
import { ElementType, MouseEventHandler, createContext, useCallback, useContext, useEffect, useState } from "react";
import Button from "@/components/ui/button";
import cs from "classnames";
import Link from "next/link";
import { addBookToLibrary, checkDiaryAvaility } from "./actions";

const LocalContext = createContext<{
  diaryId: number | null;
  setDiaryId: (value: number | null) => void;
} | null>(null);

type BookData = GetBookResponse["response"]["detail"][0]["book"];

interface AddBookToLibraryProps extends BaseProps {
  bookData: BookData;
}

function AddBookToLibrary({ bookData }: AddBookToLibraryProps) {
  const localContext = useContext(LocalContext);

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-to-library", bookData.isbn13 || bookData.isbn],
    mutationFn: () =>
      addBookToLibrary({
        title: bookData.bookname,
        author: bookData.authors,
        coverImageUrl: bookData.bookImageURL,
        isbn: bookData.isbn13 || bookData.isbn,
      }),
    onSuccess: ({ bookDiaryId }) => {
      localContext?.setDiaryId(bookDiaryId);
    },
  });

  const doOnClickAddToLibraryButton: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      mutate();
    },
    [mutate]
  );

  return (
    <WideButton className={styles["button-add2lib"]} onClick={doOnClickAddToLibraryButton} loading={isPending}>
      내 서재에 추가하기
    </WideButton>
  );
}

interface Props extends BaseProps {
  bookData: BookData;
}

export default function BookActions({ bookData, className }: Props) {
  const [diaryId, setDiaryId] = useState<number | null>(null);

  // 이미 담긴 책인지 체크
  const { data, status } = useQuery({
    queryKey: ["check-diary-exist", bookData.isbn13 || bookData.isbn],
    queryFn: () => {
      return checkDiaryAvaility(bookData.isbn13 || bookData.isbn).then(({ bookDiaryId }) =>
        bookDiaryId >= 0 ? bookDiaryId : null
      );
      // 없을 땐 -1, 있을 땐 0 이상의 다이어리 id 반환
    },
  });

  useEffect(() => {
    setDiaryId(typeof data === "undefined" ? null : data);
  }, [data]);

  if (status !== "success") {
    return null;
  }

  return (
    <LocalContext.Provider
      value={{
        diaryId,
        setDiaryId,
      }}
    >
      <div className={cs(styles["root"], className)}>
        <div className={styles["root__inner"]}>
          {diaryId !== null ? (
            <>
              <p className={styles["pre-description"]}>이 책은 서재에 있어요.</p>
              <Button asChild>
                <Link className={styles["button-go2lib"]} href={`/library/book/${diaryId}`}>
                  서재로 이동 &#xF045;
                </Link>
              </Button>
            </>
          ) : (
            <>
              <p className={styles["pre-description"]}>서재에 추가되어 있지 않은 책이에요.</p>
              <AddBookToLibrary bookData={bookData} />
            </>
          )}
        </div>
      </div>
    </LocalContext.Provider>
  );
}
