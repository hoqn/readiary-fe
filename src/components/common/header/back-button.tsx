"use client";

import { useRouter } from "next/navigation";
import { MouseEventHandler, PropsWithChildren, useCallback, useMemo } from "react";

interface Props extends BaseProps, PropsWithChildren {}

export default function BackButton({ ...restProps }: Props) {
  const router = useRouter();

  const doOnClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    router.back();
  }, [router]);

  return <button onClick={doOnClick} {...restProps} />;
}
