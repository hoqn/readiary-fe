"use server";

import diaryApi from "@/services/api/diary.api";
import { cookies } from "next/headers";

export async function fetchDiaryDetail(diaryId: number) {
  const authorization = cookies().get("access-token")?.value || "";

  const data = await diaryApi
    .getDiaryDetail(diaryId, {
      authorization,
    })
    .then((res) => res.json());
  
  return data;
}
