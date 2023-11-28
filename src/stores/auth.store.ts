import { AuthSession } from "@/types/auth";
import { decodeJwt } from "@/utils/jwt";
import { create } from "zustand";
import { createJSONStorage, devtools, persist, StateStorage } from "zustand/middleware";

interface AuthStoreActions {
  setCurrentAccessToken(accessToken: string): void;
  clearCurrentSession(): void;
}

interface AuthStoreState {
  currentSession: AuthSession | null;
}

const useAuthStore = create(
  devtools<AuthStoreState & AuthStoreActions>(
    // persist<AuthStoreState & AuthStoreActions>(  // 보안을 위해 persist하지 않음 (대신, cookie와 동기화 必)
      (set) => ({
        currentSession: null,
        setCurrentAccessToken(accessToken) {
          const decoded = decodeJwt(accessToken);

          if (decoded) {
            set({
              currentSession: {
                accessToken,
                user: {
                  email: decoded.sub,
                  memberId: decoded.memberId,
                },
              },
            });
          }
        },
        clearCurrentSession() {
          set({ currentSession: null });
        },
      }),
      // {
      //   name: "auth-session",
      //   storage: createJSONStorage(() => window.localStorage),
      // }
    // )
    {
      name: "auth-session",
    }
  )
);

export { useAuthStore };
