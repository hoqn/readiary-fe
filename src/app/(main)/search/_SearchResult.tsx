// TESTING 용
import { GET as getSearchBooks } from "@/app/api/books/route";
import type { NextResponse } from "next/server";
import { useMemo } from "react";

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

  const suspend = getSearchBooks(new Request(`http://localhost?title=${searchValue}`))
    .then((res) => res.json())
    .then(({ items }): any[] => items);

  return suspend;
}

export default async function SearchResult({ searchValue }: { searchValue: string }) {
  const items = await fetchBooks(searchValue);

  return (
    <ul>
      {items &&
        items.map((item) => (
          <li key={item.isbn13}>
            <div style={{ borderBottom: "1px solid #dedede" }}>
              <div>{item.title}</div>
              <div>{item.authors}</div>
            </div>
          </li>
        ))}
    </ul>
  );
}
