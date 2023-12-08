import { getAccessTokenFromCookie } from "@/helpers/auth.server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

/**
 * 로그인되지 않은 상태에서만 접근할 수 있도록 해야 함
 * 만약, 로그인이 되어 있다면 `/`로 리다이렉트.
 */

export default async function Template({ children }: { children: ReactNode }) {
  const currentSession = await getAccessTokenFromCookie();

  if (currentSession) {
    redirect("/");
  }

  return <>{children}</>;
}
