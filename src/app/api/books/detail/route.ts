import { NextResponse } from "next/server";

type YN = "Y" | "N";

interface D4SearchDtlListResponseBody {
  response: {
    request: {
      isbn13: string;
      loaninfoYN: YN;
    };
    detail: {
      book: {
        no: number;
        bookname: string;
        publication_date: string;
        authors: string;
        publisher: string;
        class_no: string;
        class_nm: string;
        publication_year: string;
        bookImageURL: string;
        isbn: string;
        isbn13: string;
        description: string;
      };
    }[];
    loanInfo: [
      {
        Total: string;
      },
      {
        regionResult: string;
      },
      {
        ageResult: string;
      },
      {
        genderResult: string;
      }
    ];
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const isbn = searchParams.get("isbn");

  return fetch(
    `https://data4library.kr/api/srchDtlList?authKey=a55417ec1b1e5f19f5707f4e5a8e0ee7871ffd48b717296280299fd096817b95&isbn13=${isbn}&format=json`,
    {
      method: "GET",
    }
  )
    .then((res): Promise<D4SearchDtlListResponseBody> => res.json())
    .then(({ response: { detail } }) =>
      Response.json({
        items: detail.map(({ book }) => ({
          title: book.bookname.trim(),
          // authors: book.authors.split(";").reduce((ac, cu) => {
          //   const [key, value] = cu.split(":");
          //   return { ...ac, [key]: value };
          // }, {}),
          authors: book.authors.split(";"),
          pubDate: book.publication_date,
          pubYear: book.publication_year,
          publisher: book.publisher,
          classNo: book.class_no,
          className: book.class_nm.split(">").map((value) => value.trim()),
          bookImageUrl: book.bookImageURL,
          isbn: book.isbn,
          isbn13: book.isbn13,
          description: book.description,
        })),
      })
    );
}
