"use server";

import { getServerSession } from "@/helpers/auth.server";
import diaryApi, { AddBookToLibraryDto } from "@/services/api/diary.api";

export async function checkDiaryAvaility(isbn: string) {
  const session = await getServerSession();

  if (!session) throw "로그인 정보가 잘못되었습니다";

  return await diaryApi
    .checkIfDiaryExists(session.user.memberId, isbn, {
      authorization: session.accessToken,
    })
    .then((res) => res.json());
}

export async function addBookToLibrary(body: Omit<AddBookToLibraryDto, "memberId">) {
  const session = await getServerSession();

  if (!session) throw "로그인 정보가 잘못되었습니다";

  return await diaryApi
    .addBookToLibrary(
      {
        memberId: session.user.memberId,
        ...body,
      },
      {
        authorization: session.accessToken,
      }
    )
    .then((res) => res.json());
}
