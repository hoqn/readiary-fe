"use server";

import { cookies } from "next/headers";

export async function signIn(body: Record<"email" | "password", string>) {
  return fetch(`${process.env.BACKEND_URL}/api/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res.ok) return res;
      else throw res;
    })
    .then((res) => res.json())
    .then((data) => {
      const token = data.token;

      if (token?.length) {
        cookies().set("access-token", token, {
          httpOnly: true,
          path: "/",
        });
        return {
          accessToken: token,
        };
      }

      throw "Access Token이 올바르지 않습니다.";
    });
}
