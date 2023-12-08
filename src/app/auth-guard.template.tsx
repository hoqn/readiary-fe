import { getAccessTokenFromCookie } from "@/helpers/auth.server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Template({ children }: { children: ReactNode }) {
  const currentSession = await getAccessTokenFromCookie();

  if (!currentSession) redirect("/signin");

  return <>{children}</>;
}
