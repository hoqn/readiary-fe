"use server";

import diaryApi from "@/services/api/diary.api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setDiaryReport(diaryId: number, content: string) {
  const authorization = cookies().get("access-token")?.value || "";

  await diaryApi.setReport(diaryId, {
    takeaway: content,
  }, {
    authorization,
  });

  revalidateTag("diary/detail");
  redirect("..");
}
