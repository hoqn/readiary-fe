import BaseApiService from "./base.service";

// DTOs
export interface SearchBooksByTitleResponse extends Response {
  json: () => Promise<{
    "response": {
      "request": {
        "pageNo": number,
        "pageSize": number,
        "title": string,
      },
      "docs": {
        "doc": {
          "publication_year": string,
          "vol": string[],
          "bookImageURL": string,
          "isbn13": string,
          "publisher": string,
          "bookDtlUrl": string,
          "loan_count": number,
          "bookname": string,
          "authors": string,
        }
      }[],
      "numFound": number,
    }
  }>,
}
export interface GetBookResponse extends Response {
  json: () => Promise<{
    "response": {
      "request": {
        "isbn13": string
      },
      "detail": [
        {
          "book": {
            "no": number,
            "bookname": string,
            "publication_date": string,
            "authors": string,
            "publisher": string,
            "class_no": string,
            "class_nm": string,
            "publication_year": string,
            "bookImageURL": string,
            "isbn": string,
            "isbn13": string,
            "description": string,
          }
        }
      ]
    }
  }>,
}

// Service
class BookApiService extends BaseApiService {
  public async searchBooksByTitle(title: string, page: number = 1) {
    return fetch(`${this.BASE_URL}/search/${title}/${page}`, {
      method: "get"
    }) as Promise<SearchBooksByTitleResponse>;
  }

  public async getBook(isbn13: string) {
    return fetch(`${this.BASE_URL}/book/${isbn13}`, {
      method: "get"
    }) as Promise<GetBookResponse>;
  }
}

const bookApiService = new BookApiService();

export default bookApiService;