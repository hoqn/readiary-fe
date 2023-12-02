"use client";

import { useRouter } from "next/navigation";
import styles from "./layout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <div className={styles["overlay"]} onClick={() => router.back()}></div>
      <div role="dialog" className={styles["dialog"]}>
        {children}
      </div>
    </>
  );
}
