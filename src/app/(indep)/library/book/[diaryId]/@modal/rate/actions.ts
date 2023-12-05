"use server";

import { getAccessTokenFromCookie } from "@/helpers/auth.server";
import diaryApi from "@/services/api/diary.api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export async function setDiaryRate(diaryId: number, rating: number | null) {
  const authorization = await getAccessTokenFromCookie() || "";

  await diaryApi.setRating(diaryId, {
    score: rating
  }, {
    authorization
  });

  revalidateTag("diary/detail");
  redirect(`/library/book/${diaryId}`, RedirectType.replace);
}
