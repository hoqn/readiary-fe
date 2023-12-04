"use server";

import diaryApi from "@/services/api/diary.api";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setDiaryRate(diaryId: number, rating: number | null) {
  const authorization = cookies().get("access-token")?.value || "";

  await diaryApi.setRating(diaryId, {
    score: rating
  }, {
    authorization
  });

  revalidatePath(`/library/book/${diaryId}`, "page");
}
