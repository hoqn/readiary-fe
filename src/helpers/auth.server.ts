"use server";

import { AuthSession } from "@/types/auth";
import { decodeJwt } from "@/utils/jwt";
import { cookies } from "next/headers";

export async function getServerSession(): Promise<AuthSession | null> {
  const accessToken = await getAccessTokenFromCookie();

  if (!accessToken)
    return null;
  
  const decoded = decodeJwt(accessToken);

  if (!decoded)
    return null;

  return {
    accessToken,
    user: {
      email: decoded.sub,
      memberId: decoded.memberId
    },
  };
}

export async function getAccessTokenFromCookie(): Promise<string|null> {
  return cookies().get("access-token")?.value || null;
}
