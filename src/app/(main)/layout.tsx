"use client";

import MainNavigation from "@/components/common/main-nav";
import { AnimatePresence, AnimationProps, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useCallback } from "react";
import styles from "./common.module.scss";

const animVariants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  show: {
    opacity: 1,
    scale: 1,
  },
} satisfies AnimationProps["variants"];

export default function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const doOnAnimationStart = useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);
  const doOnAnimationComplete = useCallback(() => {
    document.body.style.overflow = "";
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          className={styles["main"]}
          key={pathname}
          variants={animVariants}
          initial="hidden"
          // exit="hidden"
          onAnimationStart={doOnAnimationStart}
          onAnimationComplete={doOnAnimationComplete}
          animate="show"
          transition={{
            bounce: 0,
            ease: "linear",
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <MainNavigation className={styles["bottom-nav"]} />
    </>
  );
}
