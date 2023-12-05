"use server";

import { getAccessTokenFromCookie } from "@/helpers/auth.server";
import diaryApi from "@/services/api/diary.api";

export async function setDiaryReport(diaryId: number, content: string) {
  const authorization = await getAccessTokenFromCookie() || "";

  await diaryApi.setReport(diaryId, {
    takeaway: content,
  }, {
    authorization,
  });

  // revalidateTag("diary/detail");
  // redirect(`/library/book/${diaryId}`, RedirectType.replace);
}
