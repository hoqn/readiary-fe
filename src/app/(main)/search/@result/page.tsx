// TESTING 용
import { GET as getSearchBooks } from "@/app/api/books/route";

import $ from "./page.module.scss";
import Image from "next/image";

// type ResponseBody<T extends NextResponse> = T extends NextResponse<infer Body> ? Body : never;

// async function fetchBooks(searchValue: string) {
//   type Ret = ResponseBody<Exclude<Awaited<typeof searchResult>, null>>;

//   const searchResult = getSearchBooks(new Request(`http://localhost?title=${searchValue}`));

//   return searchResult
//     .then((res): Promise<Ret> => res.json());
// }

// BookSearch Fetching
async function fetchBooks(searchValue: string) {
  // let items: any[] | null = null;

  // const suspend = getSearchBooks(new Request(`http://localhost?title=${searchValue}`))
  //   .then((res) => res.json())
  //   .then((json) => {
  //     items = json.items;
  //   });

  // return {
  //   read() {
  //     if (items === null)
  //       throw suspend;
  //     else
  //       return items;
  //   }
  // }

  const suspend = getSearchBooks(new Request(`http://localhost?title=${searchValue}`)).then(
    (
      res
    ): Promise<{
      itemCount: number;
      pageNo: number;
      pageSize: number;
      items: {
        title: string;
        authors: string[];
        pubYear: string;
        vol: string;
        bookImageUrl: string;
        loanCount: number;
        isbn13: string;
      }[];
    }> => res.json()
  );

  return suspend;
}

export default async function SearchResult({ searchParams: { q: searchValue = "" } }: { searchParams: { q: string } }) {
  if (!searchValue.length) return null;

  const { items, itemCount, pageNo, pageSize } = await fetchBooks(searchValue);

  console.log("search", searchValue, items);

  return (
    <div>
      <div className={$.resultHead}>
        <span className={$.resultHead__title}>도서</span>
        <span className={$.resultHead__caption}>{itemCount}개가 검색되었어요</span>
      </div>
      <ul>
        {items &&
          items.map((item) => (
            <li key={item.isbn13} className={$.resultItem}>
              <Image
                // 어차피 썸네일용 이미지라 그냥 unoptimized로 해도 괜찮을 듯 함.. 더 검토 필요
                // unoptimized
                className={$.resultItem__thumbnail}
                width={72}
                height={108}
                src={item.bookImageUrl}
                alt={item.title}
              />
              <div className={$.resultItem__body}>
                <div className={$.resultItem__title}>{item.title}</div>
                <div className={$.resultItem__authors}>
                  {item.authors.map((author) => (
                    <span key={author}>{author}</span>
                  ))}
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
