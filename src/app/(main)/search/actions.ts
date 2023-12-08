"use serveŕ";

import { getAccessTokenFromCookie } from "@/helpers/auth.server";
import bookApi from "@/services/api/book.api";

export async function getBooksByTitle(title: string, { page }: { page: number }) {
  const authorization = await getAccessTokenFromCookie();

  if (!authorization) throw "로그인 정보가 잘못되었습니다";

  return await bookApi
    .searchBooksByTitle(title, page, {
      authorization,
    })
    .then((res) => res.json());
}
