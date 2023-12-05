"use server";

import { getAccessTokenFromCookie } from "@/helpers/auth.server";
import diaryApi from "@/services/api/diary.api";

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

  // TODO: 이 부분 오류로 client side에서 처리. 이후 상황에 따라 개선
  // revalidateTag("diary/detail");
  // redirect(`/library/book/${diaryId}`, RedirectType.replace);
}
