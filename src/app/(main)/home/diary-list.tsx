"use client";

import { useQuery } from "@tanstack/react-query";
import { getDiariesOfCurrentMember } from "../library/@content/actions";
import Section from "@/components/ui/section";
import Loading from "@/app/loading";
import Link from "next/link";
import { GetDiariesByMemberIdResponse, ReadingStatus } from "@/services/api/diary.api";
import styles from "./diary-list.module.scss";

function DiaryListItem({ diary }: { diary: GetDiariesByMemberIdResponse["response"]["data"][number] }) {
  return (
    <Link className={styles["item"]} href={`/library/book/${diary.bookDiaryId}`}>
      <div className={styles["item__bookname"]}>{diary.title}</div>
      <div className={styles["item__authors"]}>{diary.author}</div>
    </Link>
  );
}

export default function DiaryList() {
  const { data, status } = useQuery({
    queryKey: ["diary-list-reading-recent"],
    queryFn: () =>
      getDiariesOfCurrentMember({ page: 1 }).then((data) => {
        return data.response.data?.filter(({ readingStatus }) => readingStatus === ReadingStatus.READING) || [];
      }),
  });

  if (status === "pending") {
    return <Loading />;
  }

  return (
    <Section title="나의 서재" subtitle="최근 읽고 있는 책">
      <ul>
        {data?.map((diary) => (
          <li key={diary.bookDiaryId}>
            <DiaryListItem diary={diary} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
