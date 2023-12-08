"use server";

import { getServerSession } from "@/helpers/auth.server";
import diaryApi from "@/services/api/diary.api";

export async function getDiariesOfCurrentMember({ page }: { page: number }) {
  const session = await getServerSession();

  if (!session) throw "로그인 정보가 잘못되었습니다";

  return await diaryApi
    .getDiariesByMemberId(
      session.user.memberId,
      {
        page,
      },
      {
        authorization: session.accessToken,
      }
    )
    .then((res) => res.json());
}
