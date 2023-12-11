import { RequestOptionsAuthorized, fetchApiClient } from "./core";

export interface AddBookToLibraryDto {
  memberId: number;
  title: string;
  author: string;
  coverImageUrl: string;
  isbn: string;
}

export interface AddBookToLibraryResponse {
  bookDiaryId: number;
}

function addBookToLibrary(
  body: AddBookToLibraryDto,
  { apiClient = fetchApiClient, authorization }: RequestOptionsAuthorized
) {
  return apiClient.fetch<AddBookToLibraryResponse>("/api/diary", {
    method: "POST",
    body: JSON.stringify(body),
    authorization,
  });
}

export interface AddScrapDto {
  content: string;
  memo: string;
}

export interface AddScrapResponse {
  scrapId: string;
}

function addScrap(
  diaryId: number,
  body: AddScrapDto,
  { apiClient = fetchApiClient, authorization }: RequestOptionsAuthorized
) {
  return apiClient.fetch<AddScrapResponse>(`/api/diary/${diaryId}/scrap`, {
    method: "POST",
    body: JSON.stringify(body),
    authorization,
  });
}

export interface SetReportDto {
  takeaway: string;
}

export interface SetReportResponse {
  bookDiaryId: number;
}

function setReport(
  diaryId: number,
  body: SetReportDto,
  { apiClient = fetchApiClient, authorization }: RequestOptionsAuthorized
) {
  return apiClient.fetch<SetReportDto>(`/api/diary/${diaryId}/report`, {
    method: "PATCH",
    body: JSON.stringify(body),
    authorization,
  });
}

export enum ReadingStatus {
  BEFORE = "0",
  READING = "1",
  AFTER = "2",
}

export interface SetReadingStatusDto {
  readingStatus: ReadingStatus;
}

export interface SetReadingStatusResponse {
  bookDiaryId: number;
}

function setReadingStatus(
  diaryId: number,
  body: SetReadingStatusDto,
  { apiClient = fetchApiClient, authorization }: RequestOptionsAuthorized
) {
  return apiClient.fetch<SetReadingStatusResponse>(`/api/diary/${diaryId}/reading-status`, {
    method: "PATCH",
    body: JSON.stringify(body),
    authorization,
  });
}

export interface SetRatingDto {
  score: number | null;
}

export interface SetRatingResponse {
  bookDiaryId: number;
}

function setRating(
  diaryId: number,
  body: SetRatingDto,
  { apiClient = fetchApiClient, authorization }: RequestOptionsAuthorized
) {
  return apiClient.fetch<SetRatingResponse>(`/api/diary/${diaryId}/rate`, {
    method: "PATCH",
    body: JSON.stringify(body),
    authorization,
  });
}

export interface GetDiariesByMemberIdResponse {
  response: {
    data: {
      bookDiaryId: number;
      title: string;
      author: string;
      coverImageUrl: string;
      isbn: string;
      readingStatus: ReadingStatus;
      score: number | null;
    }[];

    pageInfo: {
      pageNo: number;
      pageSize: number;
      totalElements: number;
      totalPages: number;
    };
  };
}

function getDiariesByMemberId(
  memberId: number,
  { page }: { page: number },
  { apiClient = fetchApiClient, authorization }: RequestOptionsAuthorized
) {
  return apiClient.fetch<GetDiariesByMemberIdResponse>(`/api/diary/${memberId}?pageNo=${page}`, {
    method: "GET",
    authorization,
  });
}

export interface GetDiaryDetailResponse {
  bookDiary: {
    title: string;
    author: string;
    coverImageUrl: string;
    isbn: string;
    readingStatus: ReadingStatus;
    score: number | null;
    takeaway: string;
  };
  scraps: { scrapId: number; content: string; memo?: string | null; page: number; imageUrl?: string | null }[];
  questions: { question: string; answer: string; degree: number }[];
}

function getDiaryDetail(diaryId: number, { apiClient = fetchApiClient, authorization }: RequestOptionsAuthorized) {
  return apiClient.fetch<GetDiaryDetailResponse>(`/api/diary/specific/${diaryId}`, {
    method: "GET",
    authorization,
    next: {
      tags: ["diary/detail"],
    },
  });
}

export interface CheckIfDiaryExistsResponse {
  bookDiaryId: number;
}

function checkIfDiaryExists(
  memberId: number,
  isbn: string,
  { apiClient = fetchApiClient, authorization }: RequestOptionsAuthorized
) {
  return apiClient.fetch<CheckIfDiaryExistsResponse>(`/api/diary/${memberId}/${isbn}`, {
    method: "GET",
    authorization,
  });
}

const diaryApi = {
  addBookToLibrary,
  addScrap,
  setReadingStatus,
  setReport,
  setRating,
  getDiariesByMemberId,
  getDiaryDetail,
  checkIfDiaryExists,
};

export default diaryApi;
