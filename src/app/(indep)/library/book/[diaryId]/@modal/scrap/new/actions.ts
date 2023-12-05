"use server";

import { getAccessTokenFromCookie } from "@/helpers/auth.server";
import diaryApi from "@/services/api/diary.api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";

export async function postScrap(
  diaryId: number,
  body: {
    content: string;
    memo: string;
  }
) {
  const authorization = await getAccessTokenFromCookie() || "";

  await diaryApi.addScrap(diaryId, body, {
    authorization,
  });

  revalidateTag("diary/detail");
  redirect(`/library/book/${diaryId}`, RedirectType.replace);
}
