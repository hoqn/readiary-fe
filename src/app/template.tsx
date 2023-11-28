"use client";

import { hydrateSession } from "@/helpers/auth.client";
import { ReactNode, useEffect, useState } from "react";
import Loading from "./loading";

export default function Template({ children }: { children: ReactNode }) {
  const [sessionHydrated, setSessionHydrated] = useState<boolean>(false);

  useEffect(() => {
    hydrateSession().then(() => {
      setSessionHydrated(true);
    });
  }, [children]);

  return sessionHydrated ? <>{children}</> : <Loading />;
}
