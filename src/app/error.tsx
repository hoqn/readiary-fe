"use client";

import ErrorPage from "@/components/common/error-page";
import { redirect, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  const doOnClickBackButton = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <ErrorPage description={error.message} />
      <div>
        <button onClick={reset}>다시 시도</button>
        <button onClick={doOnClickBackButton}>뒤로 가기</button>
      </div>
    </>
  );
}
