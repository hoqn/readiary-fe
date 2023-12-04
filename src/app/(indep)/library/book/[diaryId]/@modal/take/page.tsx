import { fetchDiaryDetail } from "../../actions";
import ClientPage from "./page.client";

export default async function Page(props: { params: { diaryId: number } }) {
  const initialData = { takeaway: await (await fetchDiaryDetail(props.params.diaryId)).bookDiary.takeaway };

  return <ClientPage initialData={initialData} {...props} />;
}
