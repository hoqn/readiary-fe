import { NextResponse } from "next/server";

interface D4SearchBooksResponseBody {
  response: {
    request: {
      title: string;
      pageNo: number;
      pageSize: number;
    };
    numFound: number;
    docs: {
      doc: {
        bookname: string;
        authors: string;
        publisher: string;
        publication_year: string;
        isbn13: string;
        vol: string;
        bookImageURL: string;
        bookDtlUrl: string;
        loan_count: string;
      };
    }[];
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  console.log("Requested ", request.url);
  
  const title = searchParams.get("title");
  console.log("params ", title);

  return fetch(
    `https://data4library.kr/api/srchBooks?authKey=a55417ec1b1e5f19f5707f4e5a8e0ee7871ffd48b717296280299fd096817b95&title="${title}"&format=json`,
    {
      method: "GET",
    }
  )
    .then((res): Promise<D4SearchBooksResponseBody> => res.json())
    .then(
      ({
        response: {
          numFound,
          request: { pageNo, pageSize },
          docs,
        },
      }) =>
        NextResponse.json({
          itemCount: numFound,
          pageNo,
          pageSize,
          items: docs.map(({ doc }) => ({
            title: doc.bookname,
            // authors: doc.authors.split(";").reduce((ac, cu) => {
            //   const [key, value] = cu.split(":");
            //   return { ...ac, [key]: value };
            // }, {}),
            authors: doc.authors.split(";").map((value) => value.trim()),
            pubYear: doc.publication_year,
            vol: doc.vol,
            bookImageUrl: doc.bookImageURL,
            loanCount: doc.loan_count,
            isbn13: doc.isbn13,
          })),
        })
    );
}
