import { useAuthStore } from "@/stores/auth.store";
import { AuthSession } from "@/types/auth";
import { getServerSessionFromCookies } from "./server";

/**
 * httpOnly 쿠키에서 token 가져와 저장
 */
export async function hydrateSession() {
  const { setCurrentAccessToken, clearCurrentSession } = useAuthStore.getState();

  const accessToken = await getServerSessionFromCookies();

  if (accessToken)
    setCurrentAccessToken(accessToken);
  else
    clearCurrentSession();
}

export function useSession(): AuthSession | null {
  const currentSession = useAuthStore((s) => s.currentSession);

  return currentSession;
}

export function getClientSession(): AuthSession {
  const currentSession = useAuthStore.getState().currentSession;

  if (!currentSession) throw new Error("로그인되어 있지 않거나 잘못된 토큰입니다");

  return currentSession;
}
