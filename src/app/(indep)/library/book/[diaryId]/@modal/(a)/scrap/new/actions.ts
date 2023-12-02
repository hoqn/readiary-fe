"use server";

import diaryApi from "@/services/api/diary.api";
import { cookies } from "next/headers";

export async function postScrap(
  diaryId: number,
  body: {
    content: string;
    memo: string;
  }
) {
  const authorization = cookies().get("access-token")?.value || "";

  await diaryApi.addScrap(diaryId, body, {
    authorization,
  });
}
