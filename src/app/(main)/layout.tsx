"use client";

import MainNavigation from "@/components/common/main-nav";
import { PropsWithChildren } from "react";
import styles from "./common.module.scss";
import { AnimatePresence } from "framer-motion";
import React from "react";
import { usePathname } from "next/navigation";

export default function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence initial={false}>
        <React.Fragment key={pathname}>{children}</React.Fragment>
      </AnimatePresence>
      <MainNavigation className={styles["bottom-nav"]} />
    </>
  );
}
