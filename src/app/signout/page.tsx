"use client";

import { clearCookie } from "./actions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

export default function Page() {
  const clearCurrentSession = useAuthStore((s) => s.clearCurrentSession);
  const router = useRouter();

  useEffect(() => {
    clearCookie();
    clearCurrentSession();
    router.replace("/");
  }, []);

  return null;
}
