"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { fetchDiaryDetail } from "./actions";
import { LocalContext } from "./context";

export default function Layout({
  children,
  modal,
  params: { diaryId },
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: {
    diaryId: number;
  };
}) {
  const pathname = usePathname();

  const { data: diaryDetail, refetch: revalidateDiaryDetail } = useQuery({
    queryKey: ["diary-detail", diaryId],
    queryFn: () => fetchDiaryDetail(diaryId),
  });

  if (!diaryDetail)
    return null;

  return (
    <LocalContext.Provider
      value={{
        diaryDetail,
        diaryId,
        revalidateDiaryDetail,
      }}
    >
      {children}
      <Fragment key={pathname}>{modal}</Fragment>
      {/* {modal} */}
    </LocalContext.Provider>
  );
}
