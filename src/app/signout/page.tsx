"use client";

import { useRouter } from "next/navigation";
import Loading from "../loading";
import { useEffect } from "react";
import { clearCookie } from "./actions";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    clearCookie().finally(() => {
      router.replace("/");
    })
  }, [router]);

  return <Loading />
}