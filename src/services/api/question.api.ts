"use server";

import { getAccessTokenFromCookie } from "@/helpers/auth.server";
import { RequestOptionsAuthorized, fetchApiClient } from "./core";

export interface GetQuestionsResponse {
  questionAnswer: {
    questionId: number;
    question: string;
    answer: string;
    degree: number;
  }[];
}

export async function getQuestions(diaryId: number) {
  const authorization = await getAccessTokenFromCookie();

  console.log("Get Questions Requested!");

  if (!authorization) throw "잘못된 로그인 정보입니다";

  return fetchApiClient
    .fetch<GetQuestionsResponse>(`/api/questions/${diaryId}`, {
      method: "GET",
      authorization,
    })
    .then((res) => res.json());
}

export interface GenerateQuestionsResponse {
  questionIds: number[];
}

export async function generateQuestions(degree: number, diaryId: number) {
  const authorization = await getAccessTokenFromCookie();

  if (!authorization) throw "잘못된 로그인 정보입니다";
  if (degree !== 1 && degree !== 2) throw "잘못된 요청입니다";

  /**
   * 처리가 10초 이상 걸리는 경우 발생 -> 배포 시 Timeout의 원인
   * 따라서 이 부분만 비동기 식으로 처리
   */

  fetchApiClient
    .fetch<GenerateQuestionsResponse>(`/api/questions/${degree === 1 ? "first" : "second"}/${diaryId}`, {
      method: "POST",
      authorization,
    });
}

interface SubmitQuestionAnswerDto {
  questionAndAnswer: {
    questionId: number;
    answer: string;
  }[];
}

interface SubmitQuestionAnswerResponse {
  questionIds: number[];
}

export async function submitQuestionAnswer(body: SubmitQuestionAnswerDto) {
  const authorization = await getAccessTokenFromCookie();

  if (!authorization) throw "잘못된 로그인 정보입니다";

  console.log("Submit answer", JSON.stringify(body));

  return fetchApiClient
    .fetch<SubmitQuestionAnswerResponse>(`/api/questions/first/answer`, {
      method: "PATCH",
      body: JSON.stringify(body),
      authorization,
    })
    .then((res) => res.json());
}
