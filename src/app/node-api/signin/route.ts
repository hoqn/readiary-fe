/**
 * 백엔드 서버에 signin 요청 + set-cookie
 */

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const responseRaw = await fetch(new URL("/api/signin", request.url), {
    method: "POST",
    body: await request.json().then(json => JSON.stringify(json)),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!responseRaw.ok)
    return responseRaw;

  const accessToken = await responseRaw.json().then(json => json?.token || "");

  return new NextResponse(JSON.stringify({
    'access-token': accessToken,
  }), {
    headers: {
      "Set-Cookie": `access-token=${accessToken}; path=/; HttpOnly;`,
      "Content-Type": "application/json",
    }
  });
}