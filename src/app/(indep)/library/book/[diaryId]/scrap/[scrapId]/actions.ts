"use server";

import { getAccessTokenFromCookie } from "@/helpers/auth.server";
import { fetchApiClient } from "@/services/api/core";
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

export async function deleteScrap(scrapId: number) {
  const authorization = await getAccessTokenFromCookie();

  if (!authorization) throw "잘못된 로그인 정보입니다";

  return fetchApiClient
    .fetch(`/api/diary/${scrapId}`, {
      method: "DELETE",
      authorization,
    })
    .then((res) => res.json());
}
