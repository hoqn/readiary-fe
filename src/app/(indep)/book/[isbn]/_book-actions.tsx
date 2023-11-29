"use client";

import WideButton from "@/components/ui/wide-button";
import styles from "./_book-actions.module.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetBookResponse } from "@/services/api/book.api";
import diaryApi, { ReadingStatus } from "@/services/api/diary.api";
import { useSession } from "@/helpers/auth.client";
import { ElementType, MouseEventHandler, createContext, useCallback, useContext, useState } from "react";
import Button from "@/components/ui/button";
import cs from "classnames";
import Link from "next/link";

const LocalContext = createContext<{
  diaryExists: boolean | null;
  setDiaryExists: (value: boolean | null) => void;
} | null>(null);

type BookData = GetBookResponse["response"]["detail"][0]["book"];

interface AddBookToLibraryProps extends BaseProps {
  bookData: BookData;
}

function AddBookToLibrary({ bookData }: AddBookToLibraryProps) {
  const currentSession = useSession();

  if (!currentSession) throw Error;

  const localContext = useContext(LocalContext);

  const { mutate, isPending } = useMutation({
    mutationKey: ["add-to-library", bookData.isbn13 || bookData.isbn],
    mutationFn: async () => {
      await diaryApi.addBookToLibrary(
        {
          title: bookData.bookname,
          author: bookData.authors,
          coverImageUrl: bookData.bookImageURL,
          isbn: bookData.isbn13 || bookData.isbn,
          memberId: currentSession.user.memberId,
        },
        { authorization: currentSession.accessToken }
      );

      // 확인
      return diaryApi.checkIfDiaryExists(currentSession.user.memberId, bookData.isbn13 || bookData.isbn, {
        authorization: currentSession.accessToken,
      });
    },
    onSuccess: (data) => {
      localContext?.setDiaryExists(data);
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
  const currentSession = useSession();

  const [diaryExists, setDiaryExists] = useState<boolean | null>(null);

  // 이미 담긴 책인지 체크
  const { status } = useQuery({
    queryKey: ["check-diary-exist", bookData.isbn13 || bookData.isbn],
    queryFn: () => {
      const ret = diaryApi.checkIfDiaryExists(currentSession!.user.memberId, bookData.isbn13 || bookData.isbn, {
        authorization: currentSession!.accessToken,
      });

      ret.then(setDiaryExists);

      return ret;
    },
  });

  if (!currentSession || status !== "success" || diaryExists === null) {
    return null;
  }

  return (
    <LocalContext.Provider
      value={{
        diaryExists,
        setDiaryExists,
      }}
    >
      <div className={cs(styles["root"], className)}>
        <div className={styles["root__inner"]}>
          {diaryExists ? (
            <>
              <p className={styles["pre-description"]}>이 책은 서재에 있어요.</p>
              {/* TODO: 해당 항목으로 바로 이동 (현재는 목록으로 이동) */}
              <Button as={Link} className={styles["button-go2lib"]} href="/library/book">
                서재로 이동 &#xF045;
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
