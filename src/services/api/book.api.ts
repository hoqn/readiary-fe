import { FetchApiClient, fetchApiClient } from "./core";

export interface SearchBooksByTitleResponse {
  response: {
    request: {
      pageNo: number;
      pageSize: number;
      title: string;
    };
    docs: {
      doc: {
        publication_year: string;
        vol: string[];
        bookImageURL: string;
        isbn13: string;
        publisher: string;
        bookDtlUrl: string;
        loan_count: number;
        bookname: string;
        authors: string;
      };
    }[];
    numFound: number;
  };
}

function searchBooksByTitle(
  title: string,
  page: number,
  options: { apiClient?: FetchApiClient; authorization: string }
) {
  const { apiClient = fetchApiClient, authorization } = options;

  return apiClient.fetch<SearchBooksByTitleResponse>(`/api/search/${title}/${page}`, {
    method: "GET",
    authorization,
  });
}

export interface GetBookResponse {
  response: {
    request: {
      isbn13: string;
    };
    detail: [
      {
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
      }
    ];
  };
}

function getBook(isbn13: string, options: { apiClient?: FetchApiClient; authorization: string }) {
  const { apiClient = fetchApiClient, authorization } = options;

  return apiClient.fetch<GetBookResponse>(`/api/book/${isbn13}`, {
    method: "GET",
    authorization,
  });
}

const bookApi = {
  searchBooksByTitle,
  getBook,
};

export default bookApi;
