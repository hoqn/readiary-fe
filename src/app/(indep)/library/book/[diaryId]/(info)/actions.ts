"use server";

import { getAccessTokenFromCookie } from "@/helpers/auth.server";
import diaryApi, { ReadingStatus } from "@/services/api/diary.api";

export async function setReadingStatus(diaryId: number, readingStatus: ReadingStatus) {
  const authorization = await getAccessTokenFromCookie() || "";

  await diaryApi.setReadingStatus(diaryId, {
    readingStatus,
  }, {
    authorization
  });
}
