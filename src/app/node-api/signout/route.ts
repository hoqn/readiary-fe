import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  return new NextResponse(null, {
    headers: {
      "Set-Cookie": "access-token=; path=/; Max-Age=0;",
    },
  });
}