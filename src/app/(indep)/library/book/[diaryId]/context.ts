import { GetDiaryDetailResponse } from "@/services/api/diary.api";
import { createContext, useContext } from "react";

export const LocalContext = createContext<{
  diaryDetail: GetDiaryDetailResponse | null;
  diaryId: number;
  revalidateDiaryDetail: () => void;
}>({
  diaryDetail: null,
  diaryId: -1,
  revalidateDiaryDetail: () => {},
});

export const useLocalContext = () => useContext(LocalContext);
