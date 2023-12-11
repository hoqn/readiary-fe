"use server";

import { getAccessTokenFromCookie } from "@/helpers/auth.server";
import { fetchApiClient } from "@/services/api/core";
import diaryApi from "@/services/api/diary.api";

export async function postScrap(
  diaryId: number,
  body: {
    content: string;
    memo: string;
    page: number;
  }
) {
  const authorization = (await getAccessTokenFromCookie()) || "";

  await diaryApi.addScrap(diaryId, body, {
    authorization,
  });

  // TODO: 이 부분 오류로 client side에서 처리. 이후 상황에 따라 개선
  // revalidateTag("diary/detail");
  // redirect(`/library/book/${diaryId}`, RedirectType.replace);
}

export async function editScrap(
  scrapId: number,
  body: {
    content: string;
    memo: string;
    page: number;
  }
) {
  const authorization = await getAccessTokenFromCookie();

  if (!authorization) throw "로그인 정보가 잘못되었습니다";

  return fetchApiClient
    .fetch<Record<"scrapId", number>>(`/api/diary/${scrapId}`, {
      method: "PUT",
      body: JSON.stringify(body),
      authorization,
    })
    .then((res) => res.json());
}
