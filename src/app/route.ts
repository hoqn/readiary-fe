import { NextResponse } from "next/server";

export function GET() {
  return new NextResponse(null, {
    status: 302,
    headers: {
      "Location": "/home",
    }
  });
}
