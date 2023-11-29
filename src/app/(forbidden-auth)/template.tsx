"use client";

import { useSession } from "@/helpers/auth.client";
import { useRouter } from "next/navigation";
import { ReactNode, useLayoutEffect } from "react";

/**
 * 로그인되지 않은 상태에서만 접근할 수 있도록 해야 함
 * 만약, 로그인이 되어 있다면 `/`로 리다이렉트.
*/

export default function Template({ children }: { children: ReactNode }) {
  const clientSession = useSession();
  const router = useRouter();

  useLayoutEffect(() => {
    if (clientSession != null)
      router.replace("/");
  }, [children]);

  return <>{children}</>;
}
