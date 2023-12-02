"use server";

import diaryApi, { GetDiaryDetailResponse } from "@/services/api/diary.api";
import { cookies } from "next/headers";

export async function fetchDiaryDetail(diaryId: number): Promise<GetDiaryDetailResponse> {
  const authorization = cookies().get("access-token")?.value || "";

  const data = await diaryApi.getDiaryDetail(diaryId, {
    authorization
  }).then(res => res.json());

  return data;
}
