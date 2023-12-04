"use client";

import { ModalOverlay, ModalSheet } from "@/components/ui/modal";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const doOnCancel = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <>
      <ModalOverlay isCancelable onCancel={doOnCancel} />
      <ModalSheet>{children}</ModalSheet>
    </>
  );
}
