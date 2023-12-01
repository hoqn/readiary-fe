export interface RequestOptions {
  apiClient?: FetchApiClient;
  authorization?: string;
}

export interface RequestOptionsAuthorized extends RequestOptions {
  authorization: string;
}

type TypedResponse<D extends object> = {
  json(): Promise<D>;
} & Response;

class FetchApiClient {
  public baseUrl: string = process.env.BACKEND_URL || "";

  public async fetch<D extends object>(
    input: string,
    init?: RequestInit & {
      authorization?: string;
    }
  ): Promise<TypedResponse<D>> {
    const headers = new Headers(init?.headers);

    if (init?.authorization) headers.set("Authorization", init.authorization);
    if (headers.get("Content-Type") == null) headers.set("Content-Type", "application/json");

    return fetch(this.baseUrl ? new URL(input, this.baseUrl) : input, { ...init, headers }).then((res) => {
      if (res.ok) return res as TypedResponse<D>;
      else throw new Error(res.statusText);
    });
  }
}

const fetchApiClient = new FetchApiClient();

export { FetchApiClient, fetchApiClient };
export type { TypedResponse };
