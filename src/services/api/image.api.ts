"use server";

import { getAccessTokenFromCookie } from "@/helpers/auth.server";
import { fetchApiClient } from "./core";

interface GenImageDto {
  scrapId: number;
  content: string;
  memo: string;
}

interface GenImageResponse {
  imageId: number;
}

export async function genImage(body: GenImageDto) {
  const authorization = await getAccessTokenFromCookie();

  if (!authorization) throw "로그인 정보가 잘못되었습니다";

  return fetchApiClient.fetch<GenImageResponse>("/api/image", {
    method: "POST",
    body: JSON.stringify(body),
    authorization,
  }).then(res => res.json());
}
