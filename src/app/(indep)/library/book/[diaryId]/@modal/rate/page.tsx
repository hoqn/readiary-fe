import { fetchDiaryDetail } from "../../actions";
import ClientPage from "./page.client";

export default async function Page(props: { params: { diaryId: number } }) {
  const initialData = { score: await (await fetchDiaryDetail(props.params.diaryId)).bookDiary.score };

  return <ClientPage initialData={initialData} {...props} />;
}
