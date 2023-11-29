import { FetchApiClient, fetchApiClient } from "./core";

interface SignInDto {
  email: string;
  password: string;
}

function signIn(data: SignInDto, apiClient: FetchApiClient = fetchApiClient) {
  return apiClient.fetch<{ "access-token": string }>("/node-api/signin", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

interface SignUpDto {
  email: string;
  password: string;
}

function signUp(data: SignUpDto, apiClient: FetchApiClient = fetchApiClient) {
  return apiClient.fetch<{ memberId: number }>("/api/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

const authApi = {
  signIn,
  signUp,
};

export default authApi;
