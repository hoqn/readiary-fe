"use server";

import { cookies } from "next/headers";

export async function getServerSessionFromCookies() {
  return cookies().get("access-token")?.value || null;
}